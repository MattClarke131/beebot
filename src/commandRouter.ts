import Anon from "./commands/anon"
import Button from "./commands/button"
import NoOpCommand from "./commands/noop"

const commandRouter = (command: string) => {
  if (Anon.aliases.includes(command)) {
    return Anon
  } else if (Button.aliases.includes(command)) {
    return Button
  } else {
    return NoOpCommand
  }
}

export default commandRouter
