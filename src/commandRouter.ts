import Anon from "./commands/anon"
import Button from "./commands/button"
import NoOpCommand from "./commands/noop"

class CommandRouter {
  botConfig: { [key: string]: any }
  defaultBotConfig: { [key: string]: any }

  constructor(botConfig: object, defaultBotConfig: object) {
    this.botConfig = botConfig
    this.defaultBotConfig = defaultBotConfig
  }

  route(alias: string) {
    if (this.commandHasAliasEnabled('anon', alias)) {
      return Anon
    } else if (this.commandHasAliasEnabled('button', alias)) {
      return Button
    } else {
      return NoOpCommand
    }
  }

  commandHasAliasEnabled(command: string, alias: string) {
    return this.commandIsEnabled(command) && this.aliasIsEnabled(command, alias)
  }

  commandIsEnabled(command: string) {
    return (
      this.botConfig.commands[command]?.enabled
      || (
        !this.botConfig.commands[command]
        && this.defaultBotConfig.commands[command]?.enabled
      )
    )
  }

  aliasIsEnabled(command: string, alias: string) {
    return (
      this.botConfig.commands[command]?.aliases?.includes(alias)
      || (
        !this.botConfig.commands[command]?.aliases
        && this.defaultBotConfig.commands[command]?.aliases?.includes(alias)
      )
    )
  }
}

export default CommandRouter
