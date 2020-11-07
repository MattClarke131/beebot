const CommandBase = require("./commandbase.js")

class NullCommand extends CommandBase {
  execute() {
    return
  }
}

module.exports = NullCommand
