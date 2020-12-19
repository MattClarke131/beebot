import Database from '../db/databaseInterface'
import _JSONDatabase from '../db/jsonDatabase'

class ButtonCount {
  userSlackId: string
  count: number
  database: Database
  tableName: string

  constructor(userSlackId = '', count = 0, database: Database = new _JSONDatabase) {
    this.userSlackId = userSlackId
    this.count = count
    this.database = database
    this.tableName = 'button_count'
  }

  static async getFromUserSlackId(userSlackId: string, database: Database = new _JSONDatabase) {
    return await database.getRowsFromColVal(this.tableName, 'user_slack_id', userSlackId)[0]
  }

  increment() : void {
    this.count++
  }
}

export default ButtonCount
