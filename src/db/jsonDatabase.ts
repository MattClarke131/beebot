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
    const row = JSON.parse(rawData.toString())

    return row
  },
  save: () => {},
  insertRow: async function(row: {[key: string]: any}) {
    const rawData: string | undefined = await fs.readFileSync(this.databasePath).toString()
    let buttonScores = JSON.parse(rawData)
    const user = Object.keys(row)[0]
    const count = row[user]
    buttonScores[user] = count
    const newRawData = JSON.stringify(buttonScores)
    await fs.writeFileSync(this.databasePath, newRawData)
  },
  updateRow: () => {},
}

export default JSONDatabase
