import Anon from "./commands/anon"
import Button from "./commands/button"
import NoOpCommand from "./commands/noop"

const commandMap: {[key: string]: any} = {
  // Please keep alphabetized
  'anon': Anon,
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

  commandIsEnabled(command: string) {
    return this.config.commands?.[command]?.enabled;
  }

  aliasIsEnabled(command: string, alias: string) {
    return this.config.commands?.[command]?.aliases?.includes(alias);
  }
}

export default CommandRouter
