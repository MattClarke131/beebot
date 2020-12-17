import ButtonCount from './buttonCount'

const USER_SLACK_ID = 'ABC'
const COUNT = 5
const mockDatabase = {}

describe('ButtonCount', () => {
  it('should exist', () => {
    expect(typeof ButtonCount).toBe('function')
  })

  describe('constructor', () => {
    it('should take a database as an argument', () => {
      const instance = new ButtonCount(undefined, undefined, mockDatabase)
      expect(instance.database).toBe(mockDatabase)
    })

    it('should take userSlackId as an argument', () => {
      const instance = new ButtonCount(USER_SLACK_ID)
      expect(instance.userSlackId).toBe(USER_SLACK_ID)
    })

    it('should set default userSlackId to an empty string', () => {
      const instance = new ButtonCount(undefined)
      expect(instance.userSlackId).toBe('')
    })

    it('should take count as an argument', () => {
      const instance = new ButtonCount(USER_SLACK_ID, COUNT)
      expect(instance.count).toBe(COUNT)
    })

    it('should set default count to 0', () => {
      const instance = new ButtonCount(USER_SLACK_ID, undefined)
      expect(instance.count).toBe(0)
    })
  })

  describe('increment()', () => {
    it('should increase count by one', () => {
      const instance = new ButtonCount()
      instance.increment()
      expect(instance.count).toBe(1)
    })
  })

  describe('static getFromUserSlackId', () => {
    it('should return an instance from the db', () => {
      const instance = new ButtonCount(undefined, undefined, mockDatabase)
      expect(instance.database).toBe(mockDatabase)
    })
  })
})
