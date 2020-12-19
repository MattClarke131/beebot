import Database from './databaseInterface'

class MockDatabase implements Database {
  databasePath: string

  constructor() {
    this.databasePath = ''
  }

  getDb() {}
  getRowFromId(tableName: string, id: number) {
    return {}
  }
  getRowsFromColVal(tableName: string, col: string, val: any) {
    return [{}]
}
  save() {}
  insertRow() {}
  updateRow() {}
}

export default MockDatabase
