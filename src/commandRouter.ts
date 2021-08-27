import Anon from "./commands/anon"
import Bee from "./commands/bee"
import Button from "./commands/button"
import NoOpCommand from "./commands/noop"

const commandMap: {[key: string]: any} = {
  // Please keep alphabetized
  'anon': Anon,
  'bee': Bee,
  'button': Button,
  'noOpCommand': NoOpCommand,
}

class CommandRouter {
  config: { [key: string]: any }

  constructor(config: object) {
    this.config = config;
  }

  route(alias: string) {
    const command: string = Object.keys(commandMap).find((key: string) => {
      return this.commandIsEnabled(key)
        && this.aliasIsEnabled(key, alias)
    }) || 'noOpCommand'

    return commandMap[command]
  }

  commandIsEnabled(command: string) : boolean {
    return this.config.commands?.[command]?.enabled ?? false;
  }

  aliasIsEnabled(command: string, alias: string) : boolean {
    return this.config.commands?.[command]?.aliases?.includes(alias) ?? false;
  }
}

export default CommandRouter
