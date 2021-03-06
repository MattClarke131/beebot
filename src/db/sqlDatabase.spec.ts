import * as sqlite from 'sqlite'
import * as sqlite3 from 'sqlite3'
import * as dotenv from 'dotenv'
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
    it('should set a databasepath', () => {
      const databasePath = 'databasePath'
      const db = new SQLDatabase(databasePath)
      expect(db.databasePath).toBe(databasePath)
    })

    it('should throw if given an empty path', () => {
      const databasePath = ''
      expect(() => {
          new SQLDatabase(databasePath)
        }).toThrow('sqlDatabase path must be defined')
    })
  })

  describe('insertRow()', () => {
    it('should insert a row into the database', async () => {
      const db = new SQLDatabase(process.env.TEST_DB_PATH ?? '')
      const inputRow = { col_1: 'hi', col_2: 2 }
      await db.insertRow(TABLE_NAME, inputRow)
      const outputRow = await db.getRowFromId(TABLE_NAME, 1)

      expect(outputRow.id).toBe(ROW_ID)
      expect(outputRow.col_1).toBe(inputRow.col_1)
      expect(outputRow.col_2).toBe(inputRow.col_2)
    })
  })

  describe('updateRow()', () => {
    it('should update an existing row', async () => {
      const db = new SQLDatabase(process.env.TEST_DB_PATH ?? '')
      const inputRow = { col_1: 'hi', col_2: 2 }
      await db.insertRow(TABLE_NAME, inputRow)
      const updatedRow = Object.assign(inputRow, {id: 1, col_1: 'hello'})
      await db.updateRow(TABLE_NAME, updatedRow)
      const outputRow = await db.getRowFromId(TABLE_NAME, 1)

      expect(outputRow.col_1).toBe(updatedRow.col_1)
      expect(outputRow.col_2).toBe(updatedRow.col_2)
    })
  })

  describe('getRowsFromColVal()', () => {
    it('should return an array of row hashes', async () => {
      const db = new SQLDatabase(process.env.TEST_DB_PATH ?? '')
      const inputRow = { col_1: 'hi', col_2: 2 }
      await db.insertRow(TABLE_NAME, inputRow)
      const outputRow = await db.getRowFromColVal(TABLE_NAME, 'col_2', 2)

      expect(outputRow.col_1).toBe(inputRow.col_1)
      expect(outputRow.col_2).toBe(inputRow.col_2)
    })
  })
})
