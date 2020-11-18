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

  DEFAULT_CHANNEL = "dev-beebot"
  ENABLED_CHANNELS = [
    'dev-beebot'
  ]
  NUMBER_OF_REQUIRED_ARGS = 1
  NUMBER_OF_OPTIONAL_ARGS = 1
  static USAGE_STRING = "!anon (#channel) Anonymous message"

  constructor(message) {
    super(message)

    this.arguments = this.getArguments(message.text)
    this.channelDestination = this.getChannelDestination
    this.outgoingMessage = this.getOutgoingMessage(this.arguments)
  }

  getArguments(message) {
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

  getChannelDestination(arguments, message) {
    if (arguments.msg === '' && arguments.channel === '') {
      return message.user
    } else if (arguments.msg === '') {
      return message.user
    } else if (arguments.channel === '') {
      return AnonCommand.DEFAULT_CHANNEL
    } else if (AnonCommand.ENABLED_CHANNELS.includes(arguments.channel)) {
      return arguments.channel
    } else {
      return AnonCommand.DEFAULT_CHANNEL
    }
  }

  getOutgoingMessage(arguments) {
    if (arguments.msg === '' && arguments.channel === '') {
      return AnonCommand.USAGE_STRING
    } else if (arguments.msg === '') {
      return AnonCommand.ERRORS.NO_MSG
    } else if (!AnonCommand.ENABLED_CHANNELS.includes(arguments.channel)) {
      return AnonCommand.ERRORS.BAD_CHANNEL
    } else {
      return arguments.msg
    }
  }

  execute(bot) {
    bot.postMessage(
      this.channelDestination,
      this.outgoingMessage
    )
  }
}

module.exports = AnonCommand
