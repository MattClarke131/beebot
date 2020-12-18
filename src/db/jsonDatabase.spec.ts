import JSONDatabase from './jsonDatabase'
import * as fs from 'fs'

const TEST_DB_PATH = './jsonDatabase/testButton.json'
const USER_SLACK_ID = 'ABC123'
const BUTTON_COUNT = 2

beforeAll(() => {
  JSONDatabase.databasePath = TEST_DB_PATH
  setupDb()
})

afterAll(() => {
  teardownDb()
})

const setupDb = async () => {
  const testData = JSON.stringify({
    [USER_SLACK_ID]: BUTTON_COUNT
  });
  fs.writeFileSync('./jsonDatabase/testButton.json', testData)
}

const teardownDb = async () => {
  fs.writeFileSync('./jsonDatabase/testButton.json', JSON.stringify({}))
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
})
