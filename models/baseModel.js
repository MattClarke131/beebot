const sqlite3 = require('sqlite3').verbose()
const sqlite = require('sqlite');
const dotenv = require('dotenv')
dotenv.config()
const DB_PATH = process.env.DB_DIR + '/test.sqlite'

class BaseModel {
  static TABLE_NAME = 'base'
  static DEFAULT_VALUES = {
    // An id of 0 means there is no corresponding db row
    'id': 0,
  }

  constructor(params = {}) {
    this._assignColumnProperties(params)
    this.tableName = BaseModel.TABLE_NAME
  }

  // constructor helper
  _assignColumnProperties(params) {
    const columns = Object.keys(BaseModel.DEFAULT_VALUES)
    for(let i=0; i<columns.length; i++) {
      this[columns[i]] = params[columns[i]] ? params [columns[0]] : BaseModel.DEFAULT_VALUES[columns[0]]
    }
  }

  // Alternate constructors
  static async getInstanceFromId(id) {
    const row = await this._getRowFromId(id)
    return new BaseModel(row)
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
