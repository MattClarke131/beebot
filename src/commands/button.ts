// @ts-ignore
import * as SlackBot from 'slackbots'
import CommandBase from './commandbase'
import * as fs from 'fs'

interface ButtonCommand {
  newButtonCount: number,
  user: string,
}

class ButtonCommand extends CommandBase implements ButtonCommand {
  static aliases = [
    'button',
  ]

  constructor(message: any) {
    super(message)

    this.channelDestination = message.channel
    this.user = message.user
    this.newButtonCount = this.getNewButtonCount(this.user)
    this.outgoingMessage = `:radio_button: ${this.newButtonCount}`
  }

  getNewButtonCount(user: any) : number {
    const currentCount = JSON.parse(fs.readFileSync('./button.json').toString())[user]
    return currentCount === undefined ? 1 : currentCount + 1
  }

  updateButtonJson(user: any, newNumber: any) {
    // path is relative to pwd
    // TODO Lean on something more robust
    const rawData = fs.readFileSync('./button.json').toString()
    let buttonScores = JSON.parse(rawData)
    buttonScores[user] = newNumber
    const newRawData = JSON.stringify(buttonScores)
    fs.writeFileSync('./button.json', newRawData)
  }

  execute(bot: SlackBot) {
    this.updateButtonJson(this.user, this.newButtonCount)

    bot.postMessage(
      this.channelDestination,
      this.outgoingMessage,
    )
  }
}

export default ButtonCommand
