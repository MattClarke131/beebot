import JSONDatabase from './jsonDatabase'
import * as fs from 'fs'

const TEST_DB_PATH = './jsonDatabase/testButton.json'
const TABLE_NAME = 'button_count'
const USER_SLACK_ID = 'ABC123'
const BUTTON_COUNT = 2

beforeEach(() => {
  setupDb()
})

afterEach(() => {
  teardownDb()
})

const setupDb = async () => {
  const testData = JSON.stringify({
    [USER_SLACK_ID]: BUTTON_COUNT
  });
  await fs.writeFileSync(TEST_DB_PATH, testData)
}

const teardownDb = async () => {
  await fs.writeFileSync(TEST_DB_PATH, JSON.stringify({}))
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
      const expectedRow = { [USER_SLACK_ID]: BUTTON_COUNT }
      const dbInstance = new JSONDatabase(TEST_DB_PATH)
      const actualRow = await dbInstance.getRowFromUserSlackId(USER_SLACK_ID)
      expect(actualRow[USER_SLACK_ID]).toBe(expectedRow[USER_SLACK_ID])
    })
  })

  describe('insertRow', () => {
    it(TEST_DB_PATH, async () => {
      const NEW_SLACK_ID = 'XYZ789'
      const NEW_COUNT = 9001
      const inputRow = { [NEW_SLACK_ID]: NEW_COUNT }

      const dbInstance = new JSONDatabase(TEST_DB_PATH)
      await dbInstance.insertRow(TABLE_NAME, inputRow)

      const actualRow = await dbInstance.getRowFromUserSlackId(NEW_SLACK_ID)
      expect(actualRow[NEW_SLACK_ID]).toBe(inputRow[NEW_SLACK_ID])
    })
  })

  describe('updateRow', () => {
    it('should update an entry in testButton.json', async () => {
      const inputRow = {[USER_SLACK_ID]: BUTTON_COUNT + 1}

      const dbInstance = new JSONDatabase(TEST_DB_PATH)
      await dbInstance.updateRow(TABLE_NAME, inputRow)
      const actualRow = await dbInstance.getRowFromUserSlackId(USER_SLACK_ID)

      expect(actualRow[USER_SLACK_ID]).toBe(inputRow[USER_SLACK_ID])
    })
  })

  describe('getRowsFromColVal', () => {
    it('should exist', () => {
      const dbInstance = new JSONDatabase(TEST_DB_PATH)
      expect(typeof dbInstance.getRowsFromColVal).toBe('function')
    })

    it('should return an array of rows', async () => {
      const dbInstance = new JSONDatabase(TEST_DB_PATH)
      const result = await dbInstance.getRowsFromColVal('button_count', 'slack_user_id', USER_SLACK_ID)

      expect(result[0][USER_SLACK_ID]).toBe(BUTTON_COUNT)
    })
  })
})
