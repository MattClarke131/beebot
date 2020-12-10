const CommandBase = require("./commandbase.js")

class NoOpCommand extends CommandBase {
  execute() {
    return
  }
}

module.exports = NoOpCommand
