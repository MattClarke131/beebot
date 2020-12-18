import Database from '../db/databaseInterface'
import _JSONDatabase from '../db/jsonDatabase'

class ButtonCount {
  userSlackId: string
  count: number
  database: Database

  constructor(userSlackId = '', count = 0, database: Database = _JSONDatabase) {
    this.userSlackId = userSlackId
    this.count = count
    this.database = database
  }

  increment() : void {
    this.count++
  }
}

export default ButtonCount
