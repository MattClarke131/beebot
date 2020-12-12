interface CommandBase {
  channelSource: string,
  outgoingMessage: string,
  channelDestination: string,
  commandArgs: {},
}

class CommandBase implements CommandBase {
  constructor(message: any) {
    this.channelSource = message.channel
  }
}

export default CommandBase
