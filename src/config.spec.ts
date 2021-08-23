import config from './config'
import { getLeaves } from './config'

describe('config()', () => {
  describe('botConfig overrides defaultBotConfig', () => {
    it('should return overridden botname', () => {
      // given
      const defaultBotConfig = {
        botName: "ayybot",
        commands: { }
      }
      const botConfig = {
        botName: "beebot",
        commands: { }
      }

      // then
      const actual = config(botConfig, defaultBotConfig).botName;
      const expected = botConfig.botName;
      expect(actual).toBe(expected);
    })
  })

  describe('botConfig only overrides config Leafs', () => {
    it("should override 'bee value' but not 'commands'." , () => {
      // given
      const defaultBotConfig = {
        commands: {
          ayy: {
            enabled: false
          },
          bee: {
            enabled: false,
          }
        }
      }
      const botConfig = {
        commands: {
          bee: {
            enabled: true,
          }
        }
      }

      // then
      const actual = config(botConfig, defaultBotConfig);
      const expected = {
        commands: {
          ayy: {
            enabled: false
          },
          bee: {
            enabled: true,
          }
        }
      }
      expect(actual).toStrictEqual(expected);
    })
  })

  describe('getLeaves(obj)', () => {
    it('should get leaves from an object', () => {
      //given
      const obj = {
        botName: 'beebot',
        commands: {
          ayy: {
            enabled: false,
            aliases: ['ayy', 'lmao'],
          },
          bee: {
            enabled: true,
            aliases: ['bee', 'bees'],
          },
        }
      }

      // then
      const actual = getLeaves(obj)
      const expected = [
        {
          keys: ['botName'],
          value: 'beebot',
        },
        {
          keys: ['commands', 'ayy', 'enabled'],
          value: false,
        },
        {
          keys: ['commands', 'ayy', 'aliases'],
          value: ['ayy', 'lmao'],
        },
        {
          keys: ['commands', 'bee', 'enabled'],
          value: true,
        },
        {
          keys: ['commands', 'bee', 'aliases'],
          value: ['bee', 'bees'],
        },
      ]
      expect(actual).toStrictEqual(expected);
    })
  })
})
