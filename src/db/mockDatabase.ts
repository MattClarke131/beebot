import Database from './databaseInterface'

class MockDatabase implements Database {
  databasePath: string

  constructor() {
    this.databasePath = ''
  }

  getConnection() {}
  getRowFromId(tableName: string, id: number) {
    return {}
  }
  getRowFromColVal(tableName: string, col: string, val: any) {
    return {}
}
  save() {}
  insertRow() {}
  updateRow() {}
}

export default MockDatabase
