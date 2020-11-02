const SlackBot = require('slackbots')
const axios = require('axios')
const dotenv = require('dotenv')
const fs = require('fs')

dotenv.config()

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
  } else if(message.text) {
    //console.log(event)
    handleMessage(message)
  }
})

function handleMessage(message) {

  if(message.text.includes("hey beebot")) {
    salutations()
  } else if(message.text.includes("bye beebot")) {
    goodbye()
  } else if(message.text.slice(0, 5) === "!anon") {
    anonSay(message.text.slice(6))
  } else if(message.text.slice(0,7) === "!button") {
    pushTheButton(message)
  }
}

salutations = () => {
  bot.postMessageToChannel(
    'dev-beebot',
    "hi friend",
  )
  bot.postMessageToChannel(
    'mlc',
    "hi friend",
  )
}

goodbye = () => {
  bot.postMessageToChannel(
    'dev-beebot',
    "you're dead to me"
  )
}

anonSay = (message) => {
  console.log(message)
  bot.postMessageToChannel(
    'dev-beebot',
    `:secret: ${message}`
  )
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
