const sqlite3 = require('sqlite3').verbose()
const sqlite = require('sqlite');
const dotenv = require('dotenv')
dotenv.config()
const DB_PATH = process.env.DB_DIR + '/test.sqlite'

class BaseModel {
  static TABLE_NAME = 'base'

  constructor(params) {
    // An id of 0 means there is no corresponding db row
    this.id = params.id
    this.tableName = BaseModel.TABLE_NAME
  }

  // Alternate constructors
  static getEmptyInstance() {
    const id = 0
    const params = { id }

    return new BaseModel(params)
  }

  static async getInstanceFromId(id) {
    const row = await this._getRowFromId(id)
    return row.id === undefined ? this.getEmptyInstance() : new BaseModel(row)
  }

  // "private" static methods
  static async _getDb() {
    return await sqlite.open({
      filename: DB_PATH,
      driver: sqlite3.Database
    })
  }

  static async _getRowFromId(id) {
    const db = await this._getDb()
    const row = await db.get(
      `SELECT * FROM ${this.TABLE_NAME} WHERE id = ?`,
      id
    )
    db.close()

    return row === undefined ? {} : row
  }

  // "private" Instance methods
  async _getDb() {
    return BaseModel._getDb()
  }

  async _insertRow() {
    const db = await this._getDb()
    const id = this.id === 0 ? null : this.id
    await db.run(
      `INSERT INTO ${this.tableName} VALUES (?)`,
      id
    )
    db.close()
  }
}

module.exports = BaseModel
