// @ts-ignore
import * as SlackBot from 'slackbots'

import CommandBase from './commandbase'
import Database from '../db/databaseInterface'
import JSONDatabase from'../db/jsonDatabase'
import ButtonCount from'../models/buttonCount'

interface ButtonCommand {
  newButtonCount: number,
  user: string,
}

class ButtonCommand extends CommandBase implements ButtonCommand {
  static aliases = [
    'button',
  ]

  userSlackId: string

  constructor(message: any, database: Database = new JSONDatabase) {
    super(message)

    this.channelDestination = message.channel
    this.userSlackId = message.user
  }

  async execute(bot: SlackBot) {
    const button = await ButtonCount.getInstanceFromUserSlackId(this.userSlackId)
    button.increment()
    await button.save()
    const outgoingMessage = `:radio_button: ${button.count}`
    bot.postMessage(
      this.channelDestination,
      outgoingMessage
    )
  }
}

export default ButtonCommand
