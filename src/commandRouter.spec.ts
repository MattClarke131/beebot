import CommandRouter from './commandRouter'
import Button from "./commands/button"

describe('commandRouter', () => {
  describe('route(alias)', () => {
    it('should return Button class', () => {
      // Given
      const config = {
        commands: {
          button: {
            enabled: true,
            aliases: [ 'button' ],
          }
        }
      }
      const commandRouter = new CommandRouter(config);
      const commandClass = commandRouter.route('button');

      // Then
      expect(commandClass).toBe(Button)
    })
  })
})
