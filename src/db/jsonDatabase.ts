import Database from './databaseInterface'
// @ts-ignore
import * as fs from 'fs'
const DB_PATH = './button.json'

class JSONDatabase implements Database {
  databasePath: string
  constructor(dbPath: string = DB_PATH) {
    this.databasePath = dbPath
  }
  getDb() {}
  getRowFromId(tableName: string, id: number) {
    return {}
  }
  async getRowFromUserSlackId(userSlackId: string) {
    const rawData = await fs.readFileSync(this.databasePath)
    let buttonScores = JSON.parse(rawData.toString())
    if(buttonScores[userSlackId] !== undefined) {
      return {
        [userSlackId]: buttonScores[userSlackId]
      }
    } else {
      return { }
    }
  }
  async insertRow(tableName: string, row: {[key: string]: any}) {
    const rawData: string | undefined = await fs.readFileSync(this.databasePath).toString()
    let buttonScores = JSON.parse(rawData)
    const user = Object.keys(row)[0]
    const count = row[user]
    buttonScores[user] = count
    const newRawData = JSON.stringify(buttonScores)
    await fs.writeFileSync(this.databasePath, newRawData)
  }
  async updateRow(tableName: string, row: {[key: string]: any}) {
    await this.insertRow(tableName, row)
  }
  async getRowsFromColVal(tableName: string, col: string, val: any) {
    const rawData: string | undefined = await fs.readFileSync(this.databasePath).toString()
    const buttonScores = JSON.parse(rawData)
    const rows=[buttonScores]

    return rows
  }
}

export default JSONDatabase
