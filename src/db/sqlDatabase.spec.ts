import * as sqlite from 'sqlite'
import * as sqlite3 from 'sqlite3'
import * as dotenv from 'dotenv'
// what is this doing?
dotenv.config()

const TABLE_NAME = 'test_table'

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
})
