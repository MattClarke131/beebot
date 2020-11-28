const sqlite3 = require('sqlite3').verbose()
const sqlite = require('sqlite');
const dotenv = require('dotenv')
dotenv.config()
// TODO change this to use env.TEST_DB
const DB_PATH = process.env.DB_DIR + '/test.sqlite'

const BaseModel = require('./baseModel')
const ROW_ID_1 = 1

beforeEach(async () => {
  // This function returns a promise, so we need to return the function result
  return initializeTestDatabase()
})

afterEach(async () => {
  // This function returns a promise, so we need to return the function result
  return teardownTestDatabase()
})

const getDb = async () => {
  return await sqlite.open({
    filename: DB_PATH,
    driver: sqlite3.Database
  })
}

const initializeTestDatabase = async () => {
  const testDatabase = await getDb()
  const table = BaseModel.TABLE_NAME
  await testDatabase.run(`
    CREATE TABLE IF NOT EXISTS ${table} (
      id        INTEGER   PRIMARY KEY   AUTOINCREMENT
    )
  `)

  await testDatabase.close()
}

const teardownTestDatabase = async () => {
  const testDatabase = await getDb()
  const table = BaseModel.TABLE_NAME
  await testDatabase.run(`
    DROP TABLE IF EXISTS ${table}
  `)
  await testDatabase.close()
}

const addRow = async (params) => {
  const db = await getDb()
  const cols = Object.keys(params)
  const vals = cols.map(col => params[col])
  const placeholders = cols.map(p => '?').join(', ')
  await db.run(
    `INSERT INTO ${BaseModel.TABLE_NAME} (${cols}) VALUES (${placeholders})`,
    vals
  )
  await db.close()
}

const readRow = async (id) => {
  const db = await getDb()
  const result =  await db.get(`SELECT * FROM ${BaseModel.TABLE_NAME} WHERE id = ${id}`)
  await db.close()

  return result
}

describe('static _getDb', () => {
  it('should return an instance of a sqlite Database', async () => {
    db = await BaseModel._getDb()
    expect(db instanceof sqlite.Database).toBe(true)
  })

  it('should return an instance with with the correct database path', async () => {
    db = await BaseModel._getDb()
    expect(db.config.filename).toBe(DB_PATH)
  })
})

describe('BaseModel static getEmptyInstance', () => {
  it('should return an instance with empty values', () => {
    const baseInstance = BaseModel.getEmptyInstance()
    expect(baseInstance.id).toBe(0)
  })
})

describe('BaseModel static getInstanceFromId', () => {
  describe('when there is no corresponding db row', () => {
    it('should return an instance with empty values', async () => {
      const baseInstance = await BaseModel.getInstanceFromId(ROW_ID_1)
      expect(baseInstance.id).toBe(0)
    })
  })
  describe('when there is a corresponding db row', () => {
    it('should return an instance with an id equal to that of the row', async () => {
      const params = { id: ROW_ID_1 }
      await addRow(params)
      const baseInstance = await BaseModel.getInstanceFromId(ROW_ID_1)
      expect(baseInstance.id).toBe(ROW_ID_1)
    })
  })
})

describe('BaseModel _insertRow()', () => {
  it('should create a row', async () => {
    const baseInstance = BaseModel.getEmptyInstance()
    await baseInstance._insertRow()
    const readBaseInstance = await BaseModel.getInstanceFromId(ROW_ID_1)
    expect(readBaseInstance.id).toBe(ROW_ID_1)
  })
})
