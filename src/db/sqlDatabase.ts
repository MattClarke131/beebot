import * as sqlite from 'sqlite'
import * as sqlite3 from 'sqlite3'
sqlite3.verbose()

import Database from './databaseInterface'

const DB_PATH = './sqlDatabase/beebot.sqlite'

class SQLDatabase implements Database {
  databasePath: string

  constructor(databasePath: string = DB_PATH) {
    this.databasePath = databasePath
  }

  async getConnection() {
    return sqlite.open({
      filename: this.databasePath,
      driver: sqlite3.Database
    })
  }

  async getRowFromId(tableName: string, id: number) :Promise<any> {
    const connection = await this.getConnection()
    const row = await connection.get(
      `SELECT * FROM ${tableName} WHERE ID = ?`,
      id
    )
    connection.close()

    return row
  }

  // if multiple values exist, only one will be returned
  async getRowFromColVal(tableName: string, col: string, val: any) {
    const connection = await this.getConnection()
    const rows = await connection.get(
      `SELECT * FROM ${tableName} WHERE ${col} = ?`,
      val
    )

    connection.close()

    return rows
  }

  async insertRow(tableName: string, row: {[key: string]: any}) {
    const connection = await this.getConnection()
    const columns = Object.keys(row)
    const values = columns.map(k => row[k])
    const questionMarkParamString = columns.map(k => '?').join (', ')

    await connection.run(
      `INSERT INTO ${tableName} (${columns}) VALUES (${questionMarkParamString})`,
      values
    )

    connection.close()
  }

  async updateRow(tableName: string, row:{id: number,[ key: string]: any}) {
    const connection = await this.getConnection()
    const keyValuePairs = this._getKeyValuePairsFromRowHash(row)

    await connection.run(
      `UPDATE ${tableName} SET ${keyValuePairs} WHERE id = ${row.id}`
    )
  }

  private _getKeyValuePairsFromRowHash(rowHash: {[key: string]: any}) {
    const columns = Object.keys(rowHash)
      .filter(k => k !== 'id')
    const keyValuePairs = columns
      .map((col) => {
        const value = typeof rowHash[col] === 'string'
          ? `'${rowHash[col]}'`
          : `${rowHash[col]}`

        return `${col} = ${value}`
      })
      .join(', ')

    return keyValuePairs
  }
}

export default SQLDatabase
