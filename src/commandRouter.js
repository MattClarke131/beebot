const Anon = require("./commands/anon")
const Button = require("./commands/button")
const NoOpCommand = require("./commands/noop")

const commandRouter = (command) => {
  if (Anon.aliases.includes(command)) {
    return Anon
  } else if (Button.aliases.includes(command)) {
    return Button
  } else {
    return NoOpCommand
  }
}

export default commandRouter
