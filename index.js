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
  fs.append('errors.log', err, (err) => {
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

function handleMessage(message) {
  console.log(message)
  if (message.text.indexOf(' ') === -1) {
    const commandString = message.text
  } else {
    const commandString = message.text.slice(1, message.text.indexOf(' '))
  }
  commandClass = commandRouter(commandString)
  command = new commandClass(message)
  command.execute(bot)
}

pushTheButton = (message) => {
  const rawdata = fs.readFileSync('button.json')
  let buttonScore = JSON.parse(rawdata)
  buttonScore[message.user] = buttonScore[message.user] || 0
  buttonScore[message.user]++
  console.log(buttonScore)
  newRawData = JSON.stringify(buttonScore)
  fs.writeFileSync('button.json', newRawData)

  bot.postMessageToChannel(
    'dev-beebot',
    `:radio_button: ${buttonScore[message.user]}`
  )
}
