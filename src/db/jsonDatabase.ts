import Database from './databaseInterface'
// @ts-ignore
import * as fs from 'fs'
const DB_PATH = './jsonDatabase/button.json'

class JSONDatabase implements Database {
  databasePath: string
  constructor(dbPath: string = DB_PATH) {
    this.databasePath = dbPath
  }
  getConnection() {}
  getRowFromId(tableName: string, id: number) {
    return {}
  }
  async getRowFromUserSlackId(userSlackId: string) {
    const rawData = await fs.readFileSync(this.databasePath)
    let buttonScores = JSON.parse(rawData.toString())
    const rows = buttonScores.filter((row:any) => row.user_slack_id === userSlackId)

    return rows.length !== 0 ?
      rows[0] :
      {}
  }
  async insertRow(tableName: string, row: {[key: string]: any}) {
    const rawData: string | undefined = await fs.readFileSync(this.databasePath).toString()
    let buttonScores = JSON.parse(rawData)
    const newRow = {
      id: buttonScores.length+1,
      user_slack_id: row.user_slack_id,
      count: row.count
    }
    buttonScores.push(newRow)
    const newRawData = JSON.stringify(buttonScores)
    await fs.writeFileSync(this.databasePath, newRawData)
  }
  async updateRow(tableName: string, row: {id: number, [key: string]: any}) {
    const rawData: string | undefined = await fs.readFileSync(this.databasePath).toString()
    let buttonScores = JSON.parse(rawData)
    let rows = buttonScores.filter((r:any) => r.user_slack_id !== row.user_slack_id)
    buttonScores = rows.concat(row)
    const newRawData = JSON.stringify(buttonScores)

    await fs.writeFileSync(this.databasePath, newRawData)
  }
  async getRowsFromColVal(tableName: string, col: string, val: any) {
    const rawData: string | undefined = await fs.readFileSync(this.databasePath).toString()
    const rows = JSON.parse(rawData)
    return rows
  }
}

export default JSONDatabase
