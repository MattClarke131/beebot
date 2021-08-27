// @ts-ignore
import * as SlackBot from 'slackbots'
import CommandBase from './commandbase'

class BeeCommand extends CommandBase {
  message: any

  constructor(message: any) {
    super(message)
    this.message = message;
  }

  async execute(bot: SlackBot) {
    bot.postReactionToChannel(
      this.message.channel,
      'bee',
      this.message.ts
    )
  }
}

export default BeeCommand
