import Database from './databaseInterface'
// @ts-ignore
import * as fs from 'fs'

const JSONDatabase: Database = {
  databasePath: './button.json',
  getDb: () => {},
  getRowFromId: (tableName: string, id: number) => {
    return {}
  },
  getRowFromUserSlackId: async function(userSlackId: string) {
    const rawData = await fs.readFileSync(this.databasePath)
    const row = JSON.parse(rawData)

    return row
  },
  save: () => {},
  insertRow: () => {},
  updateRow: () => {},
}

export default JSONDatabase
