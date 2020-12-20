import Database from '../db/databaseInterface'
import _JSONDatabase from '../db/jsonDatabase'

const TABLE_NAME = 'button_count'

interface Params {
  id?: number
  count?: number
  userSlackId?: string
  [key: string]: any
}

class ButtonCount {
  id: number
  userSlackId: string
  count: number
  database: Database
  tableName: string

  constructor(params: Params = {}, database: Database = new _JSONDatabase) {
    this.id = params.id || 0
    this.userSlackId = params.user_slack_id || ''
    this.count = params.count || 0
    this.database = database
    this.tableName = TABLE_NAME
  }

  static async getInstanceFromUserSlackId(userSlackId: string, database: Database = new _JSONDatabase) {
    const rows = await database.getRowsFromColVal(TABLE_NAME, 'user_slack_id', userSlackId)
    const row = rows[0]
    return new ButtonCount(row, database)
  }

  async save() {
    const row = this._createRowHash()
    if(this.id === 0) {
      this.database.insertRow(this.tableName, row)
    } else {
      this.database.updateRow(this.tableName, row)
    }
  }

  _createRowHash() {
    return {
      id: this.id,
      user_slack_id: this.userSlackId,
      count: this.count,
    }
  }

  increment() : void {
    this.count++
  }
}

export default ButtonCount
