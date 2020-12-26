import CommandRouter from './commandRouter'

const botConfig = {
  "commands": {
    "command 1": {
      "enabled": true,
      "aliases": [ 'command 1a']
    },
    "command 2": {
      "enabled": true,
      "aliases": [ 'command 2a']
    },
    "command 3": {
      "enabled": false,
      "aliases": []
    },
    "command 4": {
      "enabled": false,
      "aliases": []
    }
  }
}

const defaultBotConfig = {
  "commands": {
    "command 1": {
      "enabled": true,
      "aliases": [ 'command 1a']
    },
    "command 2": {
      "enabled": false,
      "aliases": []
    },
    "command 3": {
      "enabled": true,
      "aliases": [ 'command 3a']
    },
    "command 4": {
      "enabled": false,
      "aliases": []
    },
    "command 5": {
      "enabled": true,
      "aliases": [ 'command 5a']
    },
    "command 6": {
      "enabled": false,
      "aliases": []
    },
  }
}

describe('commandRouter', () => {
  const commandRouter = new CommandRouter(botConfig, defaultBotConfig)

  describe('commandIsEnabled(command:string)', () => {
    describe('when botConfig is enabled and defaultBotConfig is enabled', () => {
      it('should return true', () => {
        const result = commandRouter.commandIsEnabled('command 1')
        expect(result).toBe(true) })
    })
    describe('when botConfig is enabled and defaultBotConfig is disabled', () => {
      it('should return true', () => {
        const result = commandRouter.commandIsEnabled('command 2')
        expect(result).toBe(true)
      })
    })
    describe('when botConfig is disabled and defaultBotConfig is enabled', () => {
      it('should return false', () => {
        const result = commandRouter.commandIsEnabled('command 3')
        expect(result).toBe(false)
      })
    })
    describe('when botConfig is disabled and defaultBotConfig id disabled', () => {
      it('should return false', () => {
        const result = commandRouter.commandIsEnabled('command 4')
        expect(result).toBe(false)
      })
    })
    describe('when botConfig is undefined and defaultBotConfig is enabled', () => {
      it('should return true', () => {
        const result = commandRouter.commandIsEnabled('command 5')
        expect(result).toBe(true)
      })
    })
    describe('when botConfig is undefined and defaultBotConfig is disabled', () => {
      it('should return true', () => {
        const result = commandRouter.commandIsEnabled('command 6')
        expect(result).toBe(false)
      })
    })
  })

  describe('aliasIsEnabled(command: string, alias: string)', () => {
    describe('when botConfig alias enabled and defaultBotConfig alias enabled', () => {
      it('should return true', () => {
        const result = commandRouter.aliasIsEnabled('command 1', 'command 1a')
        expect(result).toBe(true)
      })
    })
    describe('when botConfig alias enabled and defaultBotConfig alias disabled', () => {
      it('should return true', () => {
        const result = commandRouter.aliasIsEnabled('command 2', 'command 2a')
        expect(result).toBe(true)
      })
    })
    describe('when botConfig alias disabled and defaultBotConfig alias enabled', () => {
      it('should return true', () => {
        const result = commandRouter.aliasIsEnabled('command 3', 'command 3a')
        expect(result).toBe(false)
      })
    })
    describe('when botConfig alias disabled and defaultBotConfig alias disabled', () => {
      it('should return true', () => {
        const result = commandRouter.aliasIsEnabled('command 4', 'command 4a')
        expect(result).toBe(false)
      })
    })
    describe('when botConfig alias undefined and defaultBotConfig alias enabled', () => {
      it('should return true', () => {
        const result = commandRouter.aliasIsEnabled('command 5', 'command 5a')
        expect(result).toBe(true)
      })
    })
    describe('when botConfig alias undefined and defaultBotConfig alias disabled', () => {
      it('should return true', () => {
        const result = commandRouter.aliasIsEnabled('command 6', 'command 6a')
        expect(result).toBe(false)
      })
    })
  })
})
