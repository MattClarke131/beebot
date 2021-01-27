# beebot
Beebot is a slackbot running on a node server.

## How to use
#### Installation
> npm run dbinit
#### Configuration
Create a .env file in the project directory with the following contents:
```
BOT_TOKEN=YOUR_BOT_TOKEN_HERE
PROD_DB_PATH='absolute/path/to/your/db/dir'
TEST_DB_PATH=absolute/path/to/your/db/dir
```
#### Run in production
> npm run start
#### Run in development
> npm run dev
#### Run tests
> npm run test

## Resources
#### Setting up slack side of things
https://www.freecodecamp.org/news/building-a-slackbot-with-node-js-and-slackbots-js/

#### Slackbots package documentation
https://www.npmjs.com/package/slackbots

#### Resource for building a better UI
https://www.blockbuilder.dev/#/

#### Possible resource for bot backend
https://botkit.ai/docs/v4/reference/slack.html
