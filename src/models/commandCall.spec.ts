import CommandCall from './commandCall'

const COMMAND = '!thing'
const TEXT = '!thing arg1 arg2 arg3'
const USER_SLACK_ID = 'ABC123'
const TIMESTAMP = Date.now()

describe('CommandCall', () => {
  it('should exist', () => {
    expect(typeof CommandCall).toBe('function')
  })

  describe('constructor', () => {
    it('should be able to be instantiated', () => {
      const params = {
        command: COMMAND,
        messageText: TEXT,
        userSlackId: USER_SLACK_ID,
        timestamp: TIMESTAMP,
      }
      const instance = new CommandCall(params)
      expect(instance instanceof CommandCall).toBe(true)
    })
  })
})
