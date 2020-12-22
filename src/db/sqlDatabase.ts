import * as sqlite from 'sqlite'
import * as sqlite3 from 'sqlite3'

import Database from './databaseInterface'

const DB_PATH = './sqlDatabase/beebot.sqlite'

class SQLDatabase implements Database {
  databasePath: string
  connection: Promise<any> | sqlite3.Database

  constructor(databasePath: string = DB_PATH) {
    this.databasePath = databasePath
    this.connection = sqlite.open({
      filename: databasePath,
      driver: sqlite3.Database
    })
  }

  getDb() {}
  async getRowFromId(tableName: string, id: number) :Promise<any> {
    const connection = await this.connection
    const row =  await connection.get(
      `SELECT * FROM ${tableName} WHERE ID = ?`,
      id
    )

    return row
  }
  getRowsFromColVal(tableName: string, col: string, val: any) {
    return []
  }
  async insertRow(tableName: string, row: {[key: string]: any}) {
    const connection = await this.connection
    const columns = Object.keys(row)
    const values = columns.map(k => row[k])
    const questionMarkParamString = columns.map(k => '?').join (', ')

    await connection.run(
      `INSERT INTO ${tableName} (${columns}) VALUES (${questionMarkParamString})`,
      values
    )
  }
  updateRow(tableName: string, row:{[key: string]: any}) {}
}

export default SQLDatabase
