import CommandCall from './commandCall'
import MockDatabase from '../db/mockDatabase'
import Database from '../db/databaseInterface'

const COMMAND = 'thing'
const TEXT = '!thing arg1 arg2 arg3'
const USER_SLACK_ID = 'ABC123'
const TIMESTAMP = Date.now()

const getMockMessage = () => {
  return {
    'text': TEXT,
    'user': USER_SLACK_ID,
    'ts': TIMESTAMP
  }
}

const getCommandCallInstance = (database: Database = new MockDatabase) => {
  const params = {
    command: COMMAND,
    messageText: TEXT,
    userSlackId: USER_SLACK_ID,
    timestamp: TIMESTAMP,
  }

  return new CommandCall(params, database)
}

describe('CommandCall', () => {
  it('should exist', () => {
    expect(typeof CommandCall).toBe('function')
  })

  describe('constructor', () => {
    it('should be able to be instantiated', () => {
      const instance = getCommandCallInstance()
      expect(instance instanceof CommandCall).toBe(true)
    })
  })

  describe('static fromMessage', () => {
    it('should return an instance of CommandCall', () => {
      const message = getMockMessage()
      const instance = CommandCall.fromMessage(message)

      expect(instance.userSlackId).toBe(message.user)
      expect(instance.messageText).toBe(message.text)
      expect(instance.timestamp).toBe(message.ts)
      expect(instance.command).toBe(COMMAND)
    })
  })

  describe('save', () => {
    it('should call database.insertRow', () => {
      let mockDatabase = new MockDatabase()
      mockDatabase.insertRow = jest.fn(() => {})
      const instance = getCommandCallInstance(mockDatabase)

      instance.save()

      expect(mockDatabase.insertRow).toHaveBeenCalled()
    })
  })

  it('should throw if trying to update an existing row', () => {
    let instance: CommandCall = getCommandCallInstance()
    instance.id = 1
    expect(instance.save()).rejects.toMatch('CommandCall rows should not be updated')
  })
})
