interface Database {
}

const JSONDatabase: Database  = {}

class ButtonCount {
  userSlackId: string
  count: number
  database: Database

  constructor(userSlackId = '', count = 0, database = JSONDatabase) {
    this.userSlackId = userSlackId
    this.count = count
    this.database = database
  }

  increment() : void {
    this.count++
  }

}

export default ButtonCount
