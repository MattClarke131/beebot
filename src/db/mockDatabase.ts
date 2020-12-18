import Database from './databaseInterface'

const mockDatabase: Database = {
  databasePath: '',
  getDb: () => {},
  getRowFromId: (tableName: string, id: number) => {
    return {}
  },
  save: () => {},
  insertRow: () => {},
  updateRow: () => {},
}

export default mockDatabase
