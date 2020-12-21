import Database from './databaseInterface'

const DB_PATH = './sqlDatabase/beebot.sqlite'

class SQLDatabase implements Database {
  databasePath: string

  constructor(databasePath: string = DB_PATH) {
    this.databasePath = databasePath
  }

  getDb() {}
  getRowFromId(tableName: string, id: number) {}
  getRowsFromColVal(tableName: string, col: string, val: any) {
    return []
  }
  insertRow(tableName: string, row: {[key: string]: any}) {}
  updateRow(tableName: string, row:{[key: string]: any}) {}
}

export default SQLDatabase
