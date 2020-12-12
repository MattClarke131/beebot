const CommandBase = require('./commandbase.js')
const buttonData = require('../../button.json')
const fs = require('fs')
const path = require('path')

class ButtonCommand extends CommandBase {
  static aliases = [
    'button',
  ]

  constructor(message) {
    super(message)

    this.channelDestination = message.channel
    this.user = message.user
    this.newButtonCount = this.getNewButtonCount(this.user)
    this.outgoingMessage = `:radio_button: ${this.newButtonCount}`
  }

  getNewButtonCount(user) {
    const currentCount = JSON.parse(fs.readFileSync('./button.json'))[user]
    return currentCount === undefined ? 1 : currentCount + 1
  }

  updateButtonJson(user, newNumber) {
    // path is relative to pwd
    // TODO Lean on something more robust
    const rawData = fs.readFileSync('./button.json')
    let buttonScores = JSON.parse(rawData)
    buttonScores[user] = newNumber
    const newRawData = JSON.stringify(buttonScores)
    fs.writeFileSync('./button.json', newRawData)
  }

  execute(bot) {
    this.updateButtonJson(this.user, this.newButtonCount)

    bot.postMessage(
      this.channelDestination,
      this.outgoingMessage,
    )
  }
}

export default ButtonCommand
