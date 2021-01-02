// packages
// @ts-ignore
import SlackBot from 'slackbots'
import * as dotenv from 'dotenv'
dotenv.config()

// dependencies
import CommandRouter from './commandRouter'
import SQLDatabase from './db/sqlDatabase'
import CommandCall from './models/commandCall'
const botConfig: any = require('../botConfig.json')
const defaultBotConfig: any = require( '../defaultBotConfig.json')
const config: any = Object.assign(defaultBotConfig, botConfig)
const dbPath = process.env.NODE_ENV === 'test' ?
    process.env.TEST_DB_PATH :
    process.env.PROD_DB_PATH
const database = new SQLDatabase(dbPath)
const commandRouter = new CommandRouter(botConfig, defaultBotConfig)

// bot
const bot = new SlackBot({
  token: `${process.env.BOT_TOKEN}`,
  name: config.botName
})

bot.on('start', () => {
  const params = {}
  bot.postMessageToChannel(config.devChannel, config.bootMessage, params)
})

bot.on('error', (err : any) => {
  console.log(err)
})

bot.on('message', (message : any) => {
  if(message?.error?.msg !== 'invalid message type: null') {
    console.log(message)
  }

  if(
    !(message.subtype === 'bot_message')
    && message?.text?.[0] === config.commandCharacter
  ) {
    handleMessage(message)
  }
})

// helper methods
const handleMessage = (message: any) => {
  executeCommand(message)
  logCommand(message)
}

const executeCommand = (message: any) => {
  const commandString = getCommandString(message)
  const commandClass: any = commandRouter.route(commandString)
  const command = new commandClass(message, database)

  command.execute(bot)
}

const logCommand = (message: any) => {
  const commandCall = new CommandCall(
    {
      command: getCommandString(message),
      messageText: message.text,
      userSlackId: message.user,
      timestamp: message.ts,
    }
  )

  commandCall.save()
}

const getCommandString = (message: any) => {
  return message.text.indexOf(' ') === -1
    ? message.text.slice(1)
    : message.text.slice(1, message.text.indexOf(' '))
}
