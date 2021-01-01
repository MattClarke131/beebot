// @ts-ignore
import SlackBot from 'slackbots'
import * as dotenv from 'dotenv'
dotenv.config()

import CommandRouter from './commandRouter'
import SQLDatabase from './db/sqlDatabase'
const botConfig: any = require('../botConfig.json')
const defaultBotConfig: any = require( '../defaultBotConfig.json')

const dbPath = process.env.NODE_ENV === 'test' ?
    process.env.TEST_DB_PATH :
    process.env.PROD_DB_PATH
const database = new SQLDatabase(dbPath)
const commandRouter = new CommandRouter(botConfig, defaultBotConfig)

const bot = new SlackBot({
  token: `${process.env.BOT_TOKEN}`,
  name: botConfig.botName || defaultBotConfig.botName
})

bot.on('start', () => {
  const params = {}

  bot.postMessageToChannel(
    botConfig.devChannel || defaultBotConfig.devChannel,
    botConfig.bootMessage || defaultBotConfig.bootMessage,
    params
  )
})

bot.on('error', (err : any) => {
  console.log(err)
})

bot.on('message', (message : any) => {
  const commandCharacter = botConfig.commandCharacter || defaultBotConfig.commandCharacter
  if(
    !(message.subtype === 'bot_message')
    && message?.text?.[0] === commandCharacter
  ) {
    handleMessage(message)
  }
})

const handleMessage = (message : any) => {
  const commandString = getCommandString(message)
  const commandClass: any = commandRouter.route(commandString)
  const command = new commandClass(message, database)

  command.execute(bot)
}

const getCommandString = (message: any) => {
  return message.text.indexOf(' ') === -1
    ? message.text.slice(1)
    : message.slice(1, message.text.indexOf(' '))
}
