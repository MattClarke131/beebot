import * as sqlite from 'sqlite'
import * as sqlite3 from 'sqlite3'
import * as dotenv from 'dotenv'
// what is this doing?
dotenv.config()

const TABLE_NAME = 'test_table'
const ROW_ID = 1

import SQLDatabase from './sqlDatabase'

let databaseConnection: any
beforeAll(async () => {
  databaseConnection = await sqlite.open({
    filename: process.env.TEST_DB_PATH ?? '',
    driver: sqlite3.Database
  })
})

afterAll(async () => {
  // is this necessary?
  databaseConnection.close()
})

beforeEach(async () => {
  return initializeTestDatabase(databaseConnection)
})

afterEach(async () => {
  return teardownTestDatabase(databaseConnection)
})

const initializeTestDatabase = async (dbConnection: any) => {
  await dbConnection.run(`
    CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
      id      INTEGER   PRIMARY KEY   AUTOINCREMENT,
      col_1   TEXT,
      col_2   INTEGER
    )
  `)
}

const teardownTestDatabase = async (dbConnection: any) => {
  await dbConnection.run(`
    DROP TABLE IF EXISTS ${TABLE_NAME}
  `)
}

describe('SQLDatabase', () => {
  it('should exist', () => {
    expect(typeof SQLDatabase).toBe('function')
  })

  describe('constructor()', () => {
    it('should set an instance property for a database connection', async () => {
      const db = new SQLDatabase(process.env.TEST_DB_PATH ?? '')
      expect(db.connection instanceof Promise).toBe(true)
    })
  })

  describe('insertRow()', () => {
    it('should insert a row into the database', async () => {
      const db = new SQLDatabase(process.env.TEST_DB_PATH ?? '')
      const inputRow = {
        col_1: 'hi',
        col_2: 2
      }
      await db.insertRow(TABLE_NAME, inputRow)
      const outputRow = await db.getRowFromId(TABLE_NAME, ROW_ID)

      expect(outputRow.id).toBe(ROW_ID)
    })
  })
})
