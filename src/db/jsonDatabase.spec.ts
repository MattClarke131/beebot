import JSONDatabase from './jsonDatabase'
import * as fs from 'fs'

const TEST_DB_PATH = './jsonDatabase/testButton.json'
const TABLE_NAME = 'button_count'
const USER_SLACK_ID = 'ABC123'
const USER_SLACK_ID_2 = 'XYZ789'
const BUTTON_COUNT = 2

beforeEach(() => {
  setupDb()
})

afterEach(() => {
  teardownDb()
})

const setupDb = async () => {
  const testData = JSON.stringify([
    {
      id: 1,
      user_slack_id: USER_SLACK_ID,
      count: BUTTON_COUNT,
    }
  ]);
  await fs.writeFileSync(TEST_DB_PATH, testData)
}

const teardownDb = async () => {
  await fs.writeFileSync(TEST_DB_PATH, JSON.stringify([]))
}

describe('JSONDatabase', () => {
  it('should exist', () => {
    expect(typeof JSONDatabase).toBe('function')
  })

  describe('getRowFromUserSlackId', () => {
    it('should exist', () => {
      const dbInstance = new JSONDatabase(TEST_DB_PATH)
      expect(typeof dbInstance.getRowFromUserSlackId).toBe('function')
    })
    it('should read a row from the db', async () => {
      const expectedRow = {
        id: 1,
        user_slack_id: USER_SLACK_ID,
        count: BUTTON_COUNT,
      }
      const dbInstance = new JSONDatabase(TEST_DB_PATH)
      const actualRow = await dbInstance.getRowFromUserSlackId(USER_SLACK_ID)
      expect(actualRow.user_slack_id).toBe(expectedRow.user_slack_id)
    })

    it('should return an empy row if none is found', async () => {
      const expectedRow = {}
      const dbInstance = new JSONDatabase(TEST_DB_PATH)
      const actualRow = await dbInstance.getRowFromUserSlackId(USER_SLACK_ID_2)
      expect(actualRow).toStrictEqual(expectedRow)
    })
  })

  describe('insertRow', () => {
    it('should add an entry to testButton.json', async () => {
      const NEW_SLACK_ID = 'XYZ789'
      const NEW_COUNT = 9001
      const inputRow = {
        id: 0,
        user_slack_id: NEW_SLACK_ID,
        count: NEW_COUNT,
      }

      const dbInstance = new JSONDatabase(TEST_DB_PATH)
      await dbInstance.insertRow(TABLE_NAME, inputRow)

      const actualRow = await dbInstance.getRowFromUserSlackId(NEW_SLACK_ID)
      expect(actualRow.user_slack_id).toBe(inputRow.user_slack_id)
      expect(actualRow.id).toBe(2)
    })
  })

  describe('updateRow', () => {
    it('should update an entry in testButton.json', async () => {
      const inputRow = {
        id: 1,
        user_slack_id: USER_SLACK_ID,
        count: BUTTON_COUNT + 1,
      }

      const dbInstance = new JSONDatabase(TEST_DB_PATH)
      await dbInstance.updateRow(TABLE_NAME, inputRow)
      const actualRow = await dbInstance.getRowFromUserSlackId(USER_SLACK_ID)

      expect(actualRow.user_slack_id).toBe(inputRow.user_slack_id)
    })
  })

  describe('getRowFromColVal', () => {
    it('should exist', () => {
      const dbInstance = new JSONDatabase(TEST_DB_PATH)
      expect(typeof dbInstance.getRowFromColVal).toBe('function')
    })

    it('should return a row', async () => {
      const dbInstance = new JSONDatabase(TEST_DB_PATH)
      const result = await dbInstance.getRowFromColVal('button_count', 'slack_user_id', USER_SLACK_ID)

      expect(result.count).toBe(BUTTON_COUNT)
    })
  })
})
