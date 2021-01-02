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
  async getRowFromColVal(tableName: string, column: string, val: any) {
    const connection = await this.getConnection()
    const rows = await connection.get(
      `SELECT * FROM ${tableName} WHERE ${column} = ?`,
      val
    )

    connection.close()

    return rows
  }

  async insertRow(tableName: string, row: {[key: string]: any}) {
    const connection = await this.getConnection()
    const columns = Object.keys(row).filter(key => key !== 'id')
    const values = columns.map(key => row[key])
    const questionMarkParamString = columns.map(key => '?').join (', ')

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
      .filter(key => key !== 'id')
    const keyValuePairs = columns
      .map((column) => {
        const value = typeof rowHash[column] === 'string'
          ? `'${rowHash[column]}'`
          : `${rowHash[column]}`

        return `${column} = ${value}`
      })
      .join(', ')

    return keyValuePairs
  }
}

export default SQLDatabase
