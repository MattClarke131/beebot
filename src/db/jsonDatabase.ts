import Database from './databaseInterface'
//import * as fs from 'fs'

const JSONDatabase: Database = {
  databasePath: './button.json',
  getDb: () => {},
  getRowFromId: (tableName: string, id: number) => {
    return {}
  },
  save: () => {},
  insertRow: () => {},
  updateRow: () => {},
}

export default JSONDatabase
