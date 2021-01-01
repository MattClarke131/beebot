const TABLE_NAME = 'command_call'

interface Params {
  id?: number
  command: string
  messageText: string
  userSlackId: string
  timestamp: number
}

class CommandCall {
  tableName: string
  id: number
  command: string
  messageText: string
  userSlackId: string
  timestamp: number


  constructor(params: Params) {
    this.tableName = TABLE_NAME
    this.id = params.id ?? 0
    this.command = params.command
    this.messageText = params.messageText
    this.userSlackId = params.userSlackId
    this.timestamp = params.timestamp
  }
}

export default CommandCall
