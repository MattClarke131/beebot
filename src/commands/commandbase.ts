interface CommandBase {
  outgoingMessage: string,
  channelDestination: string,
  commandArgs: {},
}

class CommandBase implements CommandBase {
  channelSource: string

  constructor(message: any) {
    this.channelSource = message.channel
  }
}

export default CommandBase
