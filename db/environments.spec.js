const dotenv = require('dotenv')
dotenv.config()

const getDatabasePath = () => {
  if (process.env.NODE_ENV === 'test') {
    return process.env.TEST_DB
  } else {
    return process.env.PROD_DB
  }
}

describe('When reading NODE_ENV in jest', () => {
  it('the node_env should be test', () => {
    expect(process.env.NODE_ENV).toBe('test')
  })
})

describe('When reading the database path in jest', () => {
  const databasePath = getDatabasePath()
  it('should return the test database path', () => {
    expect(databasePath).toBe(process.env.TEST_DB)
  })
})
