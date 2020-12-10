class CommandBase {
  static aliases = [
  ]

  constructor(message) {
    this.channelSource = message.channel
  }

  execute() {
    return
  }
}

module.exports = CommandBase
