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
    'col_1': '',
    'col_2': 1,
  }

  constructor(params = {}) {
    this.defaultValues = BaseModel.DEFAULT_VALUES
    this.tableName = BaseModel.TABLE_NAME
    this._assignColumnProperties(params)
  }

  // constructor helper
  _assignColumnProperties(params) {
    const columns = Object.keys(this.defaultValues)
    for(let i=0; i<columns.length; i++) {
      this[columns[i]] = params[columns[i]] ? params [columns[i]] : this.defaultValues[columns[i]]
    }
  }

  // alternate constructors
  static async getInstanceFromId(id) {
    const row = await this._getRowFromId(id)
    return new BaseModel(row)
  }

  // public instance methods
  async save() {
    if (this.id === this.defaultValues.id) {
      await this._insertRow()
    } else {
      await this._updateRow()
    }
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

  // "private" instance methods
  async _getDb() {
    return BaseModel._getDb()
  }

  async _insertRow() {
    const db = await this._getDb()
    const columns = Object.keys(this.defaultValues).filter(k => k!=='id').join(',')
    const unnamedParamString = Object.keys(this.defaultValues).filter(k => k!=='id').map(k => '?').join(', ')
    const values = Object.keys(this.defaultValues).filter(k => k!=='id').map(c => this[c])
    await db.run(
      `INSERT INTO ${this.tableName} (${columns}) VALUES (${unnamedParamString})`,
      values
    )
    db.close()
  }

  async _updateRow() {
    const db = await this._getDb()
    let keyValues = Object.keys(this.defaultValues)
      .map((k) => {
        const value = typeof this[k] === 'string'
          ? `'${this[k]}'`
          : `${this[k]}`

          return `${k} = ${value}`
      })
      .join(', ')

    await db.run(
      `UPDATE ${this.tableName} SET ${keyValues} WHERE id = ${this.id}`
    )
    db.close()
  }
}

module.exports = BaseModel
