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

  getDb() {}
  async getRowFromId(tableName: string, id: number) :Promise<any> {
    const connection = await this.getConnection()
    const row =  await connection.get(
      `SELECT * FROM ${tableName} WHERE ID = ?`,
      id
    )
    connection.close()

    return row
  }

  getRowsFromColVal(tableName: string, col: string, val: any) {
    return []
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
  updateRow(tableName: string, row:{[key: string]: any}) {}
}

export default SQLDatabase
