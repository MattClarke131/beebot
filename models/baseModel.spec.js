const sqlite3 = require('sqlite3').verbose()
const sqlite = require('sqlite');
const dotenv = require('dotenv')
dotenv.config()
// TODO change this to use env.TEST_DB
const DB_PATH = process.env.DB_DIR + '/test.sqlite'
const BaseModel = require('./baseModel')

// Test Contants
const ROW_ID_1 = 1
const VALUE_STRING_1 = 'value_1'
const VALUE_STRING_2 = 'value_2'
const VALUE_INT_1 = 100
const VALUE_INT_2 = 200

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
      id        INTEGER   PRIMARY KEY   AUTOINCREMENT,
      col_1     TEXT,
      col_2     INTEGER
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

describe('constructor', () => {
  it('should return an instance with empty values', () => {
    const baseInstance = new BaseModel
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
    const baseInstance = new BaseModel
    await baseInstance._insertRow()
    const readBaseInstance = await BaseModel.getInstanceFromId(ROW_ID_1)
    expect(readBaseInstance.id).toBe(ROW_ID_1)
  })
  describe('when an optional column is included', () => {
    it('should create a row', async () => {
      const baseInstance = new BaseModel
      baseInstance.col_1 = VALUE_STRING_1
      await baseInstance._insertRow()
      const readBaseInstance = await BaseModel.getInstanceFromId(ROW_ID_1)
      expect(readBaseInstance.id).toBe(ROW_ID_1)
      expect(readBaseInstance.col_1).toBe(VALUE_STRING_1)
    })
  })
})

describe('BaseModel _updateRow()', () => {
  it('should update a row with instance properties', async () => {
    // write
    const baseInstance = new BaseModel
    baseInstance.col_1 = VALUE_STRING_1
    baseInstance.col_2 = VALUE_INT_1
    await baseInstance._insertRow()

    // update
    const readBaseInstance = await BaseModel.getInstanceFromId(ROW_ID_1)
    readBaseInstance.col_1 = VALUE_STRING_2
    readBaseInstance.col_2 = VALUE_INT_2
    await readBaseInstance._updateRow()

    // read
    const updatedBaseInstance = await BaseModel.getInstanceFromId(ROW_ID_1)

    // test
    expect(updatedBaseInstance.id).toBe(ROW_ID_1)
    expect(updatedBaseInstance.col_1).toBe(VALUE_STRING_2)
    expect(updatedBaseInstance.col_2).toBe(VALUE_INT_2)
  })
})

describe('BaseModel save()', () => {
  describe('when saving a new row', () => {
    it('should use _insertRow()', async () => {
      const baseInstance = new BaseModel
      baseInstance.col_1 = VALUE_STRING_1
      await baseInstance.save()
      const readBaseInstance = await BaseModel.getInstanceFromId(ROW_ID_1)

      expect(readBaseInstance.id).toBe(ROW_ID_1)
      expect(readBaseInstance.col_1).toBe(VALUE_STRING_1)
    })
  })

  describe('when saving an old row with new information', () => {
    it('should use _updateRow()', async () => {
    // write
    const baseInstance = new BaseModel
    baseInstance.col_1 = VALUE_STRING_1
    baseInstance.col_2 = VALUE_INT_1
    await baseInstance.save()

    // update
    const readBaseInstance = await BaseModel.getInstanceFromId(ROW_ID_1)
    readBaseInstance.col_1 = VALUE_STRING_2
    readBaseInstance.col_2 = VALUE_INT_2
    await readBaseInstance.save()

    // read
    const updatedBaseInstance = await BaseModel.getInstanceFromId(ROW_ID_1)

    // test
    expect(updatedBaseInstance.id).toBe(ROW_ID_1)
    expect(updatedBaseInstance.col_1).toBe(VALUE_STRING_2)
    expect(updatedBaseInstance.col_2).toBe(VALUE_INT_2)
    })
  })
})
