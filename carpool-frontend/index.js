
<<<<<<< HEAD
import pkg from '@slack/bolt' 
import dotenv from 'dotenv'

// fetch the environment variables
dotenv.config() 

// App package from pkg
const { App } = pkg 

// create a slack bolt app
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

(async () => {
  // start the app and listen to the port
  const port = process.env.PORT || 3000
  await app.start(port)

  console.log(`Hello world... Bolt app is running on port ${port}!`)
})()

app.event('app_home_opened', async ({ event, say }) => {
  console.log('Hello! Someone just opened the app')
  await say(`Hello world and <@${event.user}>!`)
})
=======
import pkg from '@slack/bolt'; 
import dotenv from 'dotenv';

// fetch the environment variables
dotenv.config(); 

// App package from pkg
const { App } = pkg; 

// create a slack bolt app
const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
});

(async () => {
    // start the app and listen to the port
    const port = process.env.PORT || 3000;
    await app.start(port);

    console.log(`Hello world... Bolt app is running on port ${port}!`);
})();

app.event('app_home_opened', async ({ event, say }) => {
    console.log('Hello! Someone just opened the app');
    await say(`Hello world and <@${event.user}>!`);
});
>>>>>>> 8325f8ade864eee6e7af0bc46d995d5e52c6960b
