import functions from "firebase-functions";
import firebase from "firebase-admin";
import dotenv from "dotenv";
import axios from "axios";
import ical from "node-ical";

import { Bot, InlineKeyboard } from "grammy";
dotenv.config({ path: "../.env" });
const { BOT_TOKEN, WEBAPP_URL, BOT_URL } = process.env;
const bot = new Bot(BOT_TOKEN);

firebase.initializeApp({
  credential: firebase.credential.applicationDefault(),
});
// await bot.api.setMyCommands([{ command: "start", description: "Start Tidy" }]);

bot.command("start", async (ctx) => {
  const { chat } = ctx;
  const inlineKeyboard = new InlineKeyboard().webApp("Launch Tidy", WEBAPP_URL);
  if (chat.type === "private") {
    return await ctx.reply(
      `<b>Let's get started 🧼</b>\n\nPlease tap the button below to launch app!`,
      { parse_mode: "HTML", reply_markup: inlineKeyboard }
    );
  }
  ctx.reply(
    `<b>Let's get started 🧼</b>\n\nPlease follow this link! <a href="${BOT_URL}">Tidy</a>`,
    { parse_mode: "HTML" }
  );
});

bot.catch(functions.logger.error);
// bot.start();

async function getBookings(name, url) {
  try {
    const firestore = firebase.firestore();
    const db = firestore.collection("bookings");
    const batch = firestore.batch();
    const { data } = await axios.get(url);
    const webEvents = ical.parseICS(data);
    const events = [];
    for (const key in webEvents) {
      if (Object.hasOwnProperty.call(webEvents, key)) {
        const { end, summary, description } = webEvents[key];
        if (end && summary.includes("Reserved")) {
          const id = description.match(/reservations\/details\/([A-Z0-9]+)/)[1];
          const date = new Date(end);

          events.push({ id, name, date, claimed: null });
        }
      }
    }

    //if there are no events no action needs to be taken
    if (!events.length) return events;

    const bookings = await db
      .where(
        "id",
        "in",
        events.map(({ id }) => id)
      )
      .get();

    if (bookings.empty) {
      events.forEach((event) => batch.set(db.doc(event.id), event));
      await batch.commit();
      return events;
    }
    //books not empty
  } catch (error) {
    functions.logger.error(error);
  }
}

const workers = {
  reminder: async function (options) {
    const db = firebase.firestore();
    const now = firebase.firestore.Timestamp.now();
    const { ref, reminders, pid, uid } = options;
    const remainingReminders = [];
    reminders.forEach((reminder) => {
      if (now.toDate() >= reminder.toDate()) {
        bot.api.sendMessage(uid, `Cleaning reminder for property ${pid}`);
      } else {
        remainingReminders.push(reminder);
      }
    });
    if (!remainingReminders.length) return ref.update({ status: "completed" });
  },
};
//     return await getBookings("Habour Drive", process.env.HARBOURDRIVE);
//Run this function every minute to perform a number of tasks
export const taskRunner = functions
  .runWith({ memory: "2GB" })
  .pubsub.schedule("* * * * *")
  .onRun(async (context) => {
    const db = firebase.firestore();
    const now = firebase.firestore.Timestamp.now();

    // Query all documents ready to perform
    const query = db
      .collection("tasks")
      .where("runAt", "<=", now)
      .where("status", "==", "scheduled");

    const tasks = await query.get();
    const jobs = [];
    tasks.forEach((snapshot) => {
      const task = snapshot.data();
      const options = { ...task.options, ref: snapshot.ref };

      // The runner function can update the task based on it's ref
      const job = workers[task.worker](options);
      jobs.push(job);
    });
    // Execute all jobs concurrently
    return await Promise.all(jobs);
  });

export const codesbyTidyBot = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});
