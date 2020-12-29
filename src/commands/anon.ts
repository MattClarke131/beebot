// @ts-ignore
import * as SlackBot from 'slackbots'
import CommandBase from './commandbase'
const botConfig: any = require('../../botConfig.json')
const defaultBotConfig: any = require( '../../defaultBotConfig.json')

class AnonCommand extends CommandBase {
  static USAGE_STRING : string = "!anon (#channel) Anonymous message"

  enabledChannels: string[]
  defaultChannel: string
  errors: { [key: string]: string }
  usageString: string
  commandArgs: { [key: string]: string }

  constructor(message: any, config = botConfig) {
    super(message)

    // Config
    this.enabledChannels =
      config?.commands?.anon?.enabledChannels ??
      defaultBotConfig.commands.anon.enabledChannels
    this.defaultChannel =
      config?.commands?.anon?.defaultChannel ??
      defaultBotConfig.commands.anon.defaultChannel
    this.errors =
      config?.commands?.anon?.errors ??
      defaultBotConfig.commands.anon.errors
    this.usageString =
      config?.commands?.anon?.usageString ??
      defaultBotConfig.commands.anon.usageString

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
    if (commandBody[0] !== '#') {
      return {
        'msg': commandBody,
        'channel': ''
      }
    } else if(commandBody.indexOf(' ') === -1) {
      return {
        'msg': '',
        'channel': commandBody,
      }
    } else {
      return {
        'msg': commandBody.slice(commandBody.indexOf(' ')+1),
        'channel': commandBody.slice(0, commandBody.indexOf(' ')),
      }
    }
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
      return this.defaultChannel
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
