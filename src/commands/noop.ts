import CommandBase from './commandbase'

class NoOpCommand extends CommandBase {
  execute() {
    return
  }
}

export default NoOpCommand
