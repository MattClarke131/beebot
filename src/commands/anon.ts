// @ts-ignore
import * as SlackBot from 'slackbots'
import CommandBase from './commandbase'
const defaultBotConfig: any = require( '../../defaultBotConfig.json')

class AnonCommand extends CommandBase {

  enabledChannels: string[]
  defaultChannel: string
  errors: { [key: string]: string }
  usageString: string
  commandArgs: { [key: string]: string }

  constructor(message: any, database: any, config = defaultBotConfig) {
    super(message)

    // Config
    this.enabledChannels = config.commands.anon.enabledChannels
    this.defaultChannel = config.commands.anon.defaultChannel
    this.errors = config.commands.anon.errors
    this.usageString = config.commands.anon.usageString

    this.commandArgs = this.getCommandArgs(message.text)
    this.channelDestination = this.getChannelDestination(this.commandArgs, message)
    this.outgoingMessage = this.getOutgoingMessage(this.commandArgs)
  }

  getCommandArgs(message: any) {
    if (message.indexOf(' ') === -1) {
      return {
        'msg': '',
        'channel': '',
      }
    }

    const commandBody = message.slice(message.indexOf(' ')+1)
    if (commandBody[0] !== '<') { // No Channel is specified
      return {
        'msg': commandBody,
        'channel': ''
      }
    } else if(commandBody.indexOf(' ') === -1) { // Nothing is specified
      return {
        'msg': '',
        'channel': this.getChannelFromCommandBody(commandBody)
      }
    } else {
      return {
        'msg': commandBody.slice(commandBody.indexOf(' ')+1),
        'channel': this.getChannelFromCommandBody(commandBody)
      }
    }
  }

  private getChannelFromCommandBody(commandBody: string) {
    return '#' +
      commandBody.slice(
        commandBody.indexOf('|')+1,
        commandBody.indexOf('>')
      )
  }

  getChannelDestination(commandArgs: any, message: any) {
    if (commandArgs.msg === '' && commandArgs.channel === '') {
      return message.user
    } else if (commandArgs.msg === '') {
      return message.user
    } else if (commandArgs.channel === '') {
      return this.defaultChannel
    } else if (this.enabledChannels.includes(commandArgs.channel)) {
      return commandArgs.channel
    } else {
      return message.user
    }
  }

  getOutgoingMessage(commandArgs: any) {
    if (commandArgs.msg === '' && commandArgs.channel === '') {
      return this.usageString
    } else if (commandArgs.msg === '') {
      return this.errors.NO_MSG
    } else if (
        commandArgs.channel !== '' &&
        !this.enabledChannels.includes(commandArgs.channel)
    ) {
      return this.errors.BAD_CHANNEL
    } else {
      return commandArgs.msg
    }
  }

  execute(bot: SlackBot) {
    bot.postMessage(
      this.channelDestination,
      this.outgoingMessage
    )
  }
}

export default AnonCommand
