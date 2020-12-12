const CommandBase = require("./commandbase.js")

class NoOpCommand extends CommandBase {
  execute() {
    return
  }
}

export default NoOpCommand
