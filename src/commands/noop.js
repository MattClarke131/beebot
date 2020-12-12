const CommandBase = require("./commandbase")

class NoOpCommand extends CommandBase {
  execute() {
    return
  }
}

export default NoOpCommand
