// @ts-ignore
import * as SlackBot from 'slackbots'
import * as dotenv from 'dotenv'
import * as fs from 'fs'

import commandRouter from './commandRouter'
import SQLDatabase from './db/sqlDatabase'

dotenv.config()
const dbPath = process.env.NODE_ENV === 'test' ?
    process.env.TEST_DB_PATH :
    process.env.PROD_DB_PATH
const database = new SQLDatabase(dbPath)

const COMMAND_CHARACTER = "!"
const BOT_NAME = 'beebot'

const bot = new SlackBot({
  token: `${process.env.BOT_TOKEN}`,
  name: BOT_NAME
})

bot.on('start', () => {
  const params = {
    // icon_emoji: ''
  }

  bot.postMessageToChannel(
    'dev-beebot',
    '`M̸̰͔̲̍̈́̓͌́ỵ̶̳̽̇ͅ ̶͎͈̳̞̙͙̂́͑̀̆͠S̷̤̻̠̠̍͂̐w̸͓̥̰̳̰̦̺̱̋̋͐͂̚͝a̸͉̼͋̋̔r̶̢̡̗̩̰͒̅̽̿̈̚͝͝ḿ̶̧̻̹͍̊̕ ̷̜̝̹̲͐͋͜i̴̖̬̜͖̹͌̒̄̂̑ͅs̵̞̮͓͎̤̮̓̀̍͗ ̴̩͔̥̭̈́͒̃Ŗ̶̙͌̊̅͌͂͌ȇ̴̤̦̺̬͎͓̄͘b̴̹͆̆̉̿͐o̵̹̾̏͛̽͑̔͒͝r̷̫̝̯̼͕̖͚̎ǹ̸̨̛̩̺̿̇̚͠`',
    params
  )
})

bot.on('error', (err : any) => {
  console.log(err)
  fs.appendFile('../errors.log', err, (err : any) => {
    if (err) throw err;
    console.log('Saved error!')
  })
})

bot.on('message', (message : any) => {
  console.log(message)
  if(message.subtype === 'bot_message') {
    return
  } else if(message.text && message.text[0] === COMMAND_CHARACTER) {
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
  const commandClass = commandRouter(commandString)
  const command = new commandClass(message, database)
  command.execute(bot)
}
