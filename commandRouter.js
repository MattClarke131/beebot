const Anon = require("./commands/anon")
const Button = require("./commands/button")
const NullCommand = require("./commands/null")

const commandRouter = (command) => {
  if (Anon.aliases.includes(command)) {
    return Anon
  } else if (Button.aliases.includes(command)) {
    return Button
  } else {
    return NullCommand
  }
}

exports.commandRouter = commandRouter
