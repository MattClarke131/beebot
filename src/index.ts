// @ts-ignore
import SlackBot from 'slackbots'
import * as dotenv from 'dotenv'
dotenv.config()

import CommandRouter from './commandRouter'
import SQLDatabase from './db/sqlDatabase'
import botConfig from '../botConfig.json'
import defaultBotConfig from '../defaultBotConfig.json'

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
  console.log(message)
  const commandCharacter = botConfig.commandCharacter || defaultBotConfig.commandCharacter
  if(message.subtype === 'bot_message') {
    return
  } else if(message.text && message.text[0] === commandCharacter) {
    handleMessage(message)
  }
})

const handleMessage = (message : any) => {
  let commandString
  if (message.text.indexOf(' ') === -1) {
    commandString = message.text.slice(1)
  } else {
    commandString = message.text.slice(1, message.text.indexOf(' '))
  }
  const commandClass = commandRouter.route(commandString)
  const command = new commandClass(message, database)
  command.execute(bot)
}
