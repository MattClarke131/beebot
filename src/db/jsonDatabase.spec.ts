import JSONDatabase from './jsonDatabase'
import * as fs from 'fs'

const TEST_DB_PATH = './jsonDatabase/testButton.json'
const USER_SLACK_ID = 'ABC123'
const BUTTON_COUNT = 2

beforeEach(() => {
  JSONDatabase.databasePath = TEST_DB_PATH
  setupDb()
})

afterEach(() => {
  teardownDb()
})

const setupDb = async () => {
  const testData = JSON.stringify({
    [USER_SLACK_ID]: BUTTON_COUNT
  });
  await fs.writeFileSync('./jsonDatabase/testButton.json', testData)
}

const teardownDb = async () => {
  await fs.writeFileSync('./jsonDatabase/testButton.json', JSON.stringify({}))
}

describe('JSONDatabase', () => {
  it('should exist', () => {
    expect(typeof JSONDatabase).toBe('object')
  })

  describe('getRowFromUserSlackId', () => {
    it('should exist', () => {
      expect(typeof JSONDatabase.getRowFromUserSlackId).toBe('function')
    })
    it('should read a row from the db', async () => {
      const expectedRow = { [USER_SLACK_ID]: BUTTON_COUNT }
      const actualRow = await JSONDatabase.getRowFromUserSlackId(USER_SLACK_ID)
      expect(actualRow[USER_SLACK_ID]).toBe(expectedRow[USER_SLACK_ID])
    })
  })

  describe('insertRow', () => {
    it('should add an entry to testButton.json', async () => {
      const NEW_SLACK_ID = 'XYZ789'
      const NEW_COUNT = 9001
      const inputRow = { [NEW_SLACK_ID]: NEW_COUNT }

      await JSONDatabase.insertRow(inputRow)

      const actualRow = await JSONDatabase.getRowFromUserSlackId(NEW_SLACK_ID)
      expect(actualRow[NEW_SLACK_ID]).toBe(inputRow[NEW_SLACK_ID])
    })
  })

  describe('updateRow', () => {
    it('should update an entry in testButton.json', async () => {
      const inputRow = {[USER_SLACK_ID]: BUTTON_COUNT + 1}

      await JSONDatabase.updateRow(inputRow)
      const actualRow = await JSONDatabase.getRowFromUserSlackId(USER_SLACK_ID)

      expect(actualRow[USER_SLACK_ID]).toBe(inputRow[USER_SLACK_ID])
    })
  })
})
