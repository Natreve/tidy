The PubSub emulator still not yet support scheduled functions.

But you can use firebase functions:shell and setInterval to simulate scheduler.

NOTE: Please ensure you are running the firebase emulator locally, or the shell may call the functions in Production !!

firebase functions:shell

firebase > setInterval(() => yourScheduledFunc(), 60000)
Don't exit, then it will run your functions every 60 seconds.

NOTE: functions ran in shell will not be shown in emulator's log.
https://podzemski.com/2020/10/14/how-to-trigger-and-run-firebase-scheduled-functions-from-localhost/
https://stackoverflow.com/questions/61253788/how-to-use-firebase-emulators-pubsub-to-test-timed-functions-locally