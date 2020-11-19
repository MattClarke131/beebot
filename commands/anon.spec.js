const AnonCommand = require('./anon.js')
//TODO
// Use config to get good and bad channels
const COMMAND = AnonCommand.aliases[0]
const GOOD_CHANNEL = '#dev-beebot'
const BAD_CHANNEL = '#anon'
const MESSAGE_TEXT = 'Buzz Buzz'
const USER = 'ANamelessDronw';

describe('getCommandArgs(message)', () => {
  describe('when given a message has no arguments', () => {
    const messageText = COMMAND
    const commandMessage = { text: messageText }
    const anonCommand = new AnonCommand(commandMessage)
    test('anonCommand instance should have no arguments', () => {
      expect(anonCommand.commandArgs.msg).toEqual('')
      expect(anonCommand.commandArgs.channel).toEqual('')
    })
  })
  describe('when given only a channel as an argument', () => {
    const messageText = COMMAND + ' ' + GOOD_CHANNEL
    const commandMessage = { text: messageText }
    const anonCommand = new AnonCommand(commandMessage)
    test('anonCommand instance should only have a channel argument', () => {
      expect(anonCommand.commandArgs.msg).toEqual('')
      expect(anonCommand.commandArgs.channel).toEqual(GOOD_CHANNEL)
    })
  })
  describe('when given only a message as an argument', () => {
    const messageText = COMMAND + ' ' + MESSAGE_TEXT
    const commandMessage = { text: messageText }
    const anonCommand = new AnonCommand(commandMessage)
    test('anonCommand instance should only have a msg argument', () => {
      expect(anonCommand.commandArgs.msg).toEqual(MESSAGE_TEXT)
      expect(anonCommand.commandArgs.channel).toEqual('')
    })
  })
  describe('when given a message and channel as arguments', () => {
    const messageText = COMMAND + ' ' + GOOD_CHANNEL + ' ' + MESSAGE_TEXT
    const commandMessage = { text: messageText }
    const anonCommand = new AnonCommand(commandMessage)
    test('anonCommand instance should only have a msg argument', () => {
      expect(anonCommand.commandArgs.msg).toEqual(MESSAGE_TEXT)
      expect(anonCommand.commandArgs.channel).toEqual(GOOD_CHANNEL)
    })
  })
})

describe('getChannelDestination(commandArgs, message', () => {
  describe('when neither msg nor channel is defined', () => {
    const messageText = COMMAND
    const commandMessage = { text: messageText, user:USER }
    const anonCommand = new AnonCommand(commandMessage)
    test('channel destination should be original sender', () => {
      expect(anonCommand.channelDestination).toEqual(commandMessage.user)
    })
  })
  describe('when only channel is defined', () => {
    const messageText = COMMAND + ' ' + GOOD_CHANNEL
    const commandMessage = { text: messageText, user:USER }
    const anonCommand = new AnonCommand(commandMessage)
    test('channel destination should be original sender', () => {
      expect(anonCommand.channelDestination).toEqual(commandMessage.user)
    })
  })
  describe('when only msg is defined', () => {
    const messageText = COMMAND + ' ' + MESSAGE_TEXT
    const commandMessage = { text: messageText, user:USER }
    const anonCommand = new AnonCommand(commandMessage)
    test('channel destination should be default channel', () => {
      expect(anonCommand.channelDestination).toEqual(AnonCommand.DEFAULT_CHANNEL)
    })
  })
  describe('when msg and channel is defined', () => {
    const messageText = COMMAND + ' ' + MESSAGE_TEXT
    const commandMessage = { text: messageText, user:USER }
    const anonCommand = new AnonCommand(commandMessage)
    test('channel destination should be default channel', () => {
      expect(anonCommand.channelDestination).toEqual(AnonCommand.DEFAULT_CHANNEL)
    })
  })
})

describe('getOutGoingMessage(commandArgs)', () => {
  describe('when neither msg nor channel is defined', () => {
    const messageText = COMMAND
    const commandMessage = { text: messageText, user:USER }
    const anonCommand = new AnonCommand(commandMessage)
    test('outgoing message should be a usage string', () => {
      expect(AnonCommand.outgoingMessage).toEqual(AnonCommand.USEAGE_STRING)
    })
  })
  describe('when only a good channel is defined', () => {
    const messageText = COMMAND + ' ' + GOOD_CHANNEL
    const commandMessage = { text: messageText, user:USER }
    const anonCommand = new AnonCommand(commandMessage)
    test('outgoing message should be missing msg error', () => {
      expect(anonCommand.outgoingMessage).toEqual(AnonCommand.ERRORS.NO_MSG)
    })
  })
  describe('when a bad channel is given', () => {
    const messageText = COMMAND + ' ' + MESSAGE_TEXT
    const commandMessage = { text: messageText, user:USER }
    const anonCommand = new AnonCommand(commandMessage)
    test('outgoing message should be bad channel error', () => {
      expect(anonCommand.outgoingMessage).toEqual(AnonCommand.ERRORS.BAD_CHANNEL)
    })
  })
  describe('when msg and channel is defined', () => {
    const messageText = COMMAND + ' ' + GOOD_CHANNEL + ' ' + MESSAGE_TEXT
    const commandMessage = { text: messageText, user:USER }
    const anonCommand = new AnonCommand(commandMessage)
      console.log('================================================================================')
      console.log(anonCommand.commandArgs)
    test('outgoing message should be msg from commandArgs', () => {
      expect(anonCommand.outgoingMessage).toEqual(anonCommand.commandArgs.msg)
    })
  })
})
