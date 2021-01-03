import AnonCommand from './anon'
const COMMAND = 'anon'
const DEFAULT_CHANNEL = "#dev-beebot"
const GOOD_CHANNEL = '#dev-beebot'
const BAD_CHANNEL = '#bad_channel'
const MESSAGE_TEXT = 'Buzz Buzz'
const USER = 'ANamelessDrone';

const mockBotConfig = {
  "commands": {
    "anon": {
      "defaultChannel": DEFAULT_CHANNEL,
      "enabledChannels": [ DEFAULT_CHANNEL ],
      "usageString":  "!anon (#channel) Anonymous message",
      "errors": {
        "NO_MSG": "!anon needs a message body",
        "BAD_CHANNEL": "That channel either doesn't exist, or the bees aren't aloud to share secrets there"
      }
    }
  }
}

describe('getCommandArgs(message)', () => {
  describe('when given a message has no arguments', () => {
    const messageText = COMMAND
    const commandMessage = { text: messageText }
    const anonCommand = new AnonCommand(commandMessage, null, mockBotConfig)
    test('anonCommand instance should have no arguments', () => {
      expect(anonCommand.commandArgs.msg).toEqual('')
      expect(anonCommand.commandArgs.channel).toEqual('')
    })
  })
  describe('when given only a channel as an argument', () => {
    const messageText = COMMAND + ' ' + GOOD_CHANNEL
    const commandMessage = { text: messageText }
    const anonCommand = new AnonCommand(commandMessage, null, mockBotConfig)
    test('anonCommand instance should only have a channel argument', () => {
      expect(anonCommand.commandArgs.msg).toEqual('')
      expect(anonCommand.commandArgs.channel).toEqual(GOOD_CHANNEL)
    })
  })
  describe('when given only a message as an argument', () => {
    const messageText = COMMAND + ' ' + MESSAGE_TEXT
    const commandMessage = { text: messageText }
    const anonCommand = new AnonCommand(commandMessage, null, mockBotConfig)
    test('anonCommand instance should only have a msg argument', () => {
      expect(anonCommand.commandArgs.msg).toEqual(MESSAGE_TEXT)
      expect(anonCommand.commandArgs.channel).toEqual('')
    })
  })
  describe('when given a message and channel as arguments', () => {
    const messageText = COMMAND + ' ' + GOOD_CHANNEL + ' ' + MESSAGE_TEXT
    const commandMessage = { text: messageText }
    const anonCommand = new AnonCommand(commandMessage, null, mockBotConfig)
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
    const anonCommand = new AnonCommand(commandMessage, null, mockBotConfig)
    test('channel destination should be original sender', () => {
      expect(anonCommand.channelDestination).toEqual(commandMessage.user)
    })
  })
  describe('when only channel is defined', () => {
    const messageText = COMMAND + ' ' + GOOD_CHANNEL
    const commandMessage = { text: messageText, user:USER }
    const anonCommand = new AnonCommand(commandMessage, null, mockBotConfig)
    test('channel destination should be original sender', () => {
      expect(anonCommand.channelDestination).toEqual(commandMessage.user)
    })
  })
  describe('when only msg is defined', () => {
    const messageText = COMMAND + ' ' + MESSAGE_TEXT
    const commandMessage = { text: messageText, user:USER }
    const anonCommand = new AnonCommand(commandMessage, null, mockBotConfig)
    test('channel destination should be default channel', () => {
      expect(anonCommand.channelDestination).toEqual(DEFAULT_CHANNEL)
    })
  })
  describe('when msg and channel is defined', () => {
    const messageText = COMMAND + ' ' + MESSAGE_TEXT
    const commandMessage = { text: messageText, user:USER }
    const anonCommand = new AnonCommand(commandMessage, null, mockBotConfig)
    test('channel destination should be default channel', () => {
      expect(anonCommand.channelDestination).toEqual(DEFAULT_CHANNEL)
    })
  })
  describe('when a bad channel is given', () => {
    const messageText = COMMAND + ' ' + BAD_CHANNEL + ' ' + MESSAGE_TEXT
    const commandMessage = { text: messageText, user:USER }
    const anonCommand = new AnonCommand(commandMessage, null, mockBotConfig)
    test('outgoing message should be bad channel error', () => {
      expect(anonCommand.channelDestination).toEqual(commandMessage.user)
    })
  })
})

describe('getOutGoingMessage(commandArgs)', () => {
  describe('when neither msg nor channel is defined', () => {
    const messageText = COMMAND
    const commandMessage = { text: messageText, user:USER }
    const anonCommand = new AnonCommand(commandMessage, null, mockBotConfig)
    test('outgoing message should be a usage string', () => {
      expect(anonCommand.outgoingMessage).toEqual(mockBotConfig.commands.anon.usageString)
    })
  })
  describe('when only a good channel is defined', () => {
    const messageText = COMMAND + ' ' + GOOD_CHANNEL
    const commandMessage = { text: messageText, user:USER }
    const anonCommand = new AnonCommand(commandMessage, null, mockBotConfig)
    test('outgoing message should be missing msg error', () => {
      expect(anonCommand.outgoingMessage).toEqual(mockBotConfig.commands.anon.errors.NO_MSG)
    })
  })
  describe('when a bad channel is given', () => {
    const messageText = COMMAND + ' ' + BAD_CHANNEL + ' ' + MESSAGE_TEXT
    const commandMessage = { text: messageText, user:USER }
    const anonCommand = new AnonCommand(commandMessage, null, mockBotConfig)
    test('outgoing message should be bad channel error', () => {
      expect(anonCommand.outgoingMessage).toEqual(mockBotConfig.commands.anon.errors.BAD_CHANNEL)
    })
  })
  describe('when msg and channel is defined', () => {
    const messageText = COMMAND + ' ' + GOOD_CHANNEL + ' ' + MESSAGE_TEXT
    const commandMessage = { text: messageText, user:USER }
    const anonCommand = new AnonCommand(commandMessage, null, mockBotConfig)
    test('outgoing message should be msg from commandArgs', () => {
      expect(anonCommand.outgoingMessage).toEqual(anonCommand.commandArgs.msg)
    })
  })
})
