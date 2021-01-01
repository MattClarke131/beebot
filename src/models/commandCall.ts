import Database from '../db/databaseInterface'
import SQLDatabase from '../db/sqlDatabase'

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
  database: Database

  constructor(params: Params, database: Database = new SQLDatabase) {
    this.tableName = TABLE_NAME
    this.id = params.id ?? 0
    this.command = params.command
    this.messageText = params.messageText
    this.userSlackId = params.userSlackId
    this.timestamp = params.timestamp

    this.database = database
  }

  static fromMessage(message: any) : CommandCall {
    const params: Params = {
        command: this._getCommand(message.text),
        messageText: message.text,
        timestamp: Math.floor(message.ts),
        userSlackId: message.user,
      }

    return new CommandCall(params)
  }

  static _getCommand(messageText: string) : string {
    return messageText.indexOf(' ') === -1
      ? messageText.slice(1)
      : messageText.slice(1, messageText.indexOf(' '))
  }

  async save() {
    const row = this._createRowHash()
    if(this.id === 0) {
      this.database.insertRow(this.tableName, row)
    } else {
        throw('CommandCall rows should not be updated')
    }
  }

  _createRowHash() {
    return {
      id: this.id,
      command: this.command,
      message_text: this.messageText,
      user_slack_id: this.userSlackId,
      timestamp: this.timestamp,
    }
  }
}

export default CommandCall
