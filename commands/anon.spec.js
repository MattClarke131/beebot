const AnonCommand = require('./anon.js')
//TODO
// Use config to get good and bad channels
const COMMAND = AnonCommand.aliases[0]
const GOOD_CHANNEL = '#dev-beebot'
const BAD_CHANNEL = '#bad-channel'
const MESSAGE = 'Buzz Buzz'

describe('getArguments(message)', () => {
  describe('when given a message has no arguments', () => {
    const commandMessage = COMMAND
    const anonCommand = new AnonCommand(commandMessage)
    test('anonCommand instance should have no arguments', () => {
      expect(anonCommand.arguments.msg).toEqual('')
      expect(anonCommand.arguments.channel).toEqual('')
    })
  })

  describe('when given only a channel as an argument', () => {
    const commandMessage = COMMAND + ' ' + GOOD_CHANNEL
    const anonCommand = new AnonCommand(commandMessage)
    test('anonCommand instance should only have a channel argument', () => {
      expect(anonCommand.arguments.msg).toEqual('')
      expect(anonCommand.arguments.channel).toEqual(GOOD_CHANNEL)
    })
  })

  describe('when given only a message as an argument', () => {
    const commandMessage = COMMAND + ' ' + MESSAGE
    const anonCommand = new AnonCommand(commandMessage)
    test('anonCommand instance should only have a msg argument', () => {
      expect(anonCommand.arguments.msg).toEqual(MESSAGE)
      expect(anonCommand.arguments.channel).toEqual('')
    })
  })

  describe('when given a message and channel as arguments', () => {
    const commandMessage = COMMAND + ' ' + GOOD_CHANNEL + ' ' + MESSAGE
    const anonCommand = new AnonCommand(commandMessage)
    test('anonCommand instance should only have a msg argument', () => {
      expect(anonCommand.arguments.msg).toEqual(MESSAGE)
      expect(anonCommand.arguments.channel).toEqual(GOOD_CHANNEL)
    })
  })
})
