const sqlite3 = require('sqlite3').verbose()
const sqlite = require('sqlite');
const dotenv = require('dotenv')
dotenv.config()

const getDatabasePath = () => {
  if (process.env.NODE_ENV === 'test') {
    return process.env.TEST_DB_PATH
  } else {
    return process.env.PROD_DB_PATH
  }
}

// Test Constants
const DB_PATH = getDatabasePath()
const TABLE = 'bee'
const NAME = 'NAME'
const NEW_NAME = 'Beebe'

beforeEach(() => {
  // This function returns a promise, so we need to return the function result
  return initializeTestDatabase()
})

afterEach(() => {
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
  await testDatabase.run(`
    CREATE TABLE IF NOT EXISTS ${TABLE} (
      id        INTEGER   PRIMARY KEY   AUTOINCREMENT,
      name      TEXT      NOT NULL
    )
  `)
  await testDatabase.close()
}

const teardownTestDatabase = async () => {
  const testDatabase = await getDb()
  await testDatabase.run(`
    DROP TABLE IF EXISTS ${TABLE}
  `)
  await testDatabase.close()
}

const writeBee = async (name) => {
  const db = await getDb()
  await db.run(
    `INSERT INTO ${TABLE} (name) VALUES (?)`,
    name 
  )
  await db.close()
}

const readBee = async (name) => {
  const db = await getDb()
  const result = await db.get(`SELECT * FROM ${TABLE} WHERE name = ?`, name);
  await db.close()

  return result
}

const updateBee = async (oldName, newName) => {
  const db = await getDb()
  await db.run(
    `UPDATE ${TABLE} SET name = ? WHERE name = ?`,
    newName, oldName
  )
  await db.close()
}

describe('database write/read', () => {
  it('adds and reads a record', async () => {
    await writeBee(NAME);
    const bee = await readBee(NAME);
    expect(bee['name']).toEqual(NAME);
  })
})

describe('database write/update/read', () => {
  it('adds, upddates, and reads a record', async () => {
    await writeBee(NAME)
    await updateBee(NAME, NEW_NAME)
    const bee = await readBee(NEW_NAME)
    expect(bee['name']).toEqual(NEW_NAME)
    expect(bee['id']).toEqual(1)
  })
})
