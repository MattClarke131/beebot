import ButtonCount from './buttonCount'
import MockDatabase from '../db/mockDatabase'

const USER_SLACK_ID = 'ABC'
const COUNT = 5

describe('ButtonCount', () => {
  it('should exist', () => {
    expect(typeof ButtonCount).toBe('function')
  })

  describe('constructor()', () => {
    describe('parameter: params', () => {
      it('should accept a userSlackId key', () => {
        const params = { userSlackId: USER_SLACK_ID }
        const instance = new ButtonCount(params)
        expect(instance.userSlackId).toBe(USER_SLACK_ID)
      })

      it('should accept a count key', () => {
        const params = { count: COUNT }
        const instance = new ButtonCount(params)
        expect(instance.count).toBe(COUNT)
      })
    })

    describe('parameter: database', () => {
      it('should take a database as an argument', () => {
        const mockDatabase = new MockDatabase()
        const instance = new ButtonCount(undefined, mockDatabase)
        expect(instance.database).toBe(mockDatabase)
      })
    })


    it('should set default userSlackId to an empty string', () => {
      const instance = new ButtonCount()
      expect(instance.userSlackId).toBe('')
    })

    it('should set default count to 0', () => {
      const params = { userSlackId: USER_SLACK_ID }
      const instance = new ButtonCount(params, undefined)
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

  describe('static getFromUserSlackId()', () => {
    it('should return an instance from the db', async () => {
      let mockDatabase = new MockDatabase()
      const mockRows = [ {
        user_slack_id: USER_SLACK_ID,
        count: COUNT,
        } ]
      mockDatabase.getRowsFromColVal = () => { return mockRows }
      const instance = await ButtonCount.getFromUserSlackId(USER_SLACK_ID, mockDatabase)
      expect(instance.count).toBe(COUNT)
    })
  })

  describe('save()', () => {
    it('should exist', () => {
      const instance = new ButtonCount
      expect(typeof instance.save).toBe('function')
    })

    it('should call database.insertRow()', async () => {
      const params = { userSlackId: USER_SLACK_ID }
      let mockDatabase = new MockDatabase()
      mockDatabase.insertRow = jest.fn(() => {})
      const instance = new ButtonCount(params, mockDatabase)

      instance.save()

      expect(mockDatabase.insertRow).toHaveBeenCalled()
    })

    it('should call database.updateRow()', async () => {
      let mockDatabase = new MockDatabase()
      const mockRows = [ {
        id: 1,
        user_slack_id: USER_SLACK_ID,
        count: COUNT,
        } ]
      mockDatabase.getRowsFromColVal = () => { return mockRows }
      mockDatabase.updateRow = jest.fn(() => {})
      const instance = await ButtonCount.getFromUserSlackId(USER_SLACK_ID, mockDatabase)

      instance.save()

      expect(mockDatabase.updateRow).toHaveBeenCalled()
    })
  })
})
