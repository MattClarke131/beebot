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
  botConfig: { [key: string]: any }
  defaultBotConfig: { [key: string]: any }

  constructor(botConfig: object, defaultBotConfig: object) {
    this.botConfig = botConfig
    this.defaultBotConfig = defaultBotConfig
  }

  route(alias: string) {
    const command: string = Object.keys(commandMap).find((key: string) => {
      return this.commandIsEnabled(key)
      && this.aliasIsEnabled(key, alias)
    }) || 'noOpCommand'

    return commandMap[command]
  }

  commandIsEnabled(command: string) {
    return (
      this.botConfig.commands?.[command]?.enabled
      || (
        !this.botConfig.commands?.[command]
        && this.defaultBotConfig.commands?.[command]?.enabled
      )
    )
  }

  aliasIsEnabled(command: string, alias: string) {
    return (
      this.botConfig.commands?.[command]?.aliases?.includes(alias)
      || (
        !this.botConfig.commands?.[command]?.aliases
        && this.defaultBotConfig.commands[command]?.aliases?.includes(alias)
      )
    )
  }
}

export default CommandRouter
