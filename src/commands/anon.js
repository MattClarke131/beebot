const CommandBase = require("./commandbase.js")

class AnonCommand extends CommandBase {
  static aliases = [
    'anon',
    'secret',
  ]

  static ERRORS = {
    'NO_MSG': '!anon needs a message body',
    'BAD_CHANNEL': 'That channel either doesn\'t exist, or the bees aren\'t aloud to share secrets there'
  }

  static ENABLED_CHANNELS = [
    '#anon',
    '#dev-beebot',
  ]

  static DEFAULT_CHANNEL = "dev-beebot"
  static USAGE_STRING = "!anon (#channel) Anonymous message"
  NUMBER_OF_REQUIRED_ARGS = 1
  NUMBER_OF_OPTIONAL_ARGS = 1

  constructor(message) {
    super(message)

    this.commandArgs = this.getCommandArgs(message.text)
    this.channelDestination = this.getChannelDestination(this.commandArgs, message)
    this.outgoingMessage = this.getOutgoingMessage(this.commandArgs)
  }

  getCommandArgs(message) {
    if (AnonCommand.aliases.includes(message)) {
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

  getChannelDestination(commandArgs, message) {
    if (commandArgs.msg === '' && commandArgs.channel === '') {
      return message.user
    } else if (commandArgs.msg === '') {
      return message.user
    } else if (commandArgs.channel === '') {
      return AnonCommand.DEFAULT_CHANNEL
    } else if (AnonCommand.ENABLED_CHANNELS.includes(commandArgs.channel)) {
      return commandArgs.channel
    } else {
      return AnonCommand.DEFAULT_CHANNEL
    }
  }

  getOutgoingMessage(commandArgs) {
    if (commandArgs.msg === '' && commandArgs.channel === '') {
      return AnonCommand.USAGE_STRING
    } else if (commandArgs.msg === '') {
      return AnonCommand.ERRORS.NO_MSG
    } else if (
        commandArgs.channel !== '' &&
        !AnonCommand.ENABLED_CHANNELS.includes(commandArgs.channel)
    ) {
      return AnonCommand.ERRORS.BAD_CHANNEL
    } else {
      return commandArgs.msg
    }
  }

  execute(bot) {
    bot.postMessage(
      this.channelDestination,
      this.outgoingMessage
    )
  }
}

export default AnonCommand
