const SlackBot = require('slackbots')
const axios = require('axios')
const dotenv = require('dotenv')
const fs = require('fs')
const { commandRouter } = require('./commandRouter')

dotenv.config()

const COMMAND_CHARACTER = "!"

const bot = new SlackBot({
  token: `${process.env.BOT_TOKEN}`,
  name: 'beebot'
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

bot.on('error', (err) => {
  console.log(err)
  fs.appendFile('../errors.log', err, (err) => {
    if (err) throw err;
    console.log('Saved error!')
  })
})

bot.on('message', (message) => {
  if(message.username === 'beebot') {
    return
  } else if(message.text && message.text[0] === COMMAND_CHARACTER) {
    handleMessage(message)
  }
})

const handleMessage = (message) => {
  console.log(message)
  let commandString
  if (message.text.indexOf(' ') === -1) {
    commandString = message.text.slice(1)
  } else {
    commandString = message.text.slice(1, message.text.indexOf(' '))
  }
  commandClass = commandRouter(commandString)
  command = new commandClass(message)
  command.execute(bot)
}
