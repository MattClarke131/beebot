const CommandBase = require("./commandbase.js")

class AnonCommand extends CommandBase {
  static aliases = [
    'anon',
    'secret',
  ]

  DEFAULT_CHANNEL = "dev-beebot"
  ENABLED_CHANNELS = [
    'dev-beebot'
  ]
  NUMBER_OF_REQUIRED_ARGS = 1
  NUMBER_OF_OPTIONAL_ARGS = 1
  USAGE_STRING = "!anon (#channel) Anonymous message"

  constructor(message) {
    super(message)

    this.parsable = true
    this.channelDestination = this.DEFAULT_CHANNEL

    if(message.text.split(" ").length < 2) {
      this.parsable = false
    } else if(message.text.split(" ")[1][0] === "#") {
      this.channelDestination = message.text.split(" ")[1]
      this.anonMessage = message.text.split(" ").slice(2).join(" ")
    } else {
      this.anonMessage = message.text.split(" ").slice(1).join(" ")
    }
  }

  execute(bot) {
    console.log(this.user)
    if(!this.parsable) {
      bot.postMessage(
        this.channelSource,
        this.USAGE_STRING
      )
    } else {
      bot.postMessageToChannel(
        this.channelDestination,
        `:secret: ${this.anonMessage}`
      )
    }
  }
}

module.exports = AnonCommand
