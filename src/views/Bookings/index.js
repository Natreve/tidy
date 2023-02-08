import React, { useEffect, useState } from "react";
import { BookingCard } from "components/Card";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getFirestore, updateDoc, doc } from "firebase/firestore";
import telegramParamToJson from "../../utils/telegramParamToJson";
// import { Router } from "@reach/router";
import Todo from "components/Todo";

// import Reservation from "./Reservation";
// import Clockin from "./Clockin";

const Bookings = (props) => {
  const { ctx } = props;
  const [bookings, setBookings] = useState([]);

  async function getBookings(name, url) {
    // const { data } = await axios.get(url);
    // const webEvents = ical.parseICS(data);
    // const events = [];
    // for (const key in webEvents) {
    //   if (Object.hasOwnProperty.call(webEvents, key)) {
    //     const { end, summary, description } = webEvents[key];
    //     if (end && summary.includes("Reserved")) {
    //       const id = description.match(/reservations\/details\/([A-Z0-9]+)/)[1];
    //       // const date = new Date(webEvents[key].end);

    //       events.push({ id, name, date, claimed: false });
    //     }
    //   }
    // }
    const events = [];
    setBookings(events);

    return events;
  }
  const tasks = [
    {
      name: "Replace Sheets, Towels, etc",
      description:
        "Strip used linen, bed sheets, towels, hand towels, cushion covers and bathmats",
    },
    {
      name: "Wash Sheets, Towels, etc",
      description:
        "Wash stripped linen, bed sheets, towels, hand towels, cushion covers and bathmats",
    },
    {
      name: "Ventilate the space",
      description:
        "Ventilate the space before and during cleaning, when possible",
    },
    {
      name: "Sanitize Surfaces",
      description: "Sanitize Furniture Surfaces and AC remotes",
    },
    {
      name: "Check closet",
      description: "Check closet for guests’ possessions",
    },
    {
      name: "Check lamps & Unplug",
      description:
        "Ensure lamps are working. Unplug the two lamps in the twin bed rooms",
    },
    {
      name: "Place AC remotes on the wall",
      description: "Place AC remotes on the wall",
    },
    {
      name: "Wash dishes",
      description: "Wash and put away any dishes left out",
    },
    {
      name: "Check & clean microwave",
      description: "Check if microwave empty, clean and functional",
    },
    {
      name: "Check & clean coffee maker",
      description: "Check if coffee maker empty, clean and functional",
    },
    {
      name: "Clean fridge",
      description:
        "Remove anything left behind by guests. Ensure 1 bottle of water per incoming guest and ice cubes are restocked",
    },
  ];
  //Function expected to fail in development environment
  const onBooking = (booking) => {
    try {
     
      ctx.Telegram.WebApp.showConfirm(
        "Seleting this booking will clock you in automatically",
        (e) => {
          console.log(e);
        }
      );
    } catch (error) {}
  };
  //Function expected to fail in development environment
  const onClaim = async (booking) => {
    const db = getFirestore();
    const task = doc(db, "tasks", booking.id);
    const initData = telegramParamToJson(ctx.Telegram.WebApp.initData);
    ctx.Telegram.WebApp.sendData(
      `${booking.id} was ${booking.options.claimed ? "claimed" : "unclaimed"}`
    );
    if (booking.options.claimed) {
      return await updateDoc(task, { "options.claimed": initData.user.id });
    }
    await updateDoc(task, { "options.claimed": null });
  };
  useEffect(() => {
    // const db = getFirestore();
    // const events = [];
    // let q = query(collection(db, "tasks"), where("status", "==", "scheduled"));
    // getDocs(q).then((querySnapshot) => {
    //   querySnapshot.forEach((doc) => {
    //     events.push(doc.data());
    //   });
    //   setBookings(events);
    //   ctx.Telegram.WebApp.ready();
    // });
  }, [ctx]);

  return (
    <section>
      {bookings.map((booking) => (
        <BookingCard
          ctx={ctx}
          key={booking.id}
          data={booking}
          onBooking={onBooking}
          onClaim={onClaim}
          claimed={booking.options.claimed}
        />
      ))}
      {/* <Todo header="Tue Jan 24 2023" tasks={tasks} /> */}
    </section>
  );
};
export default Bookings;
