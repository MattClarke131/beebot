const Anon = require("./commands/anon")
const NullCommand = require("./commands/null")

const commandRouter = (command) => {
  if (Anon.aliases.includes(command)) {
    return Anon
  } else {
    return NullCommand
  }
}

exports.commandRouter = commandRouter
