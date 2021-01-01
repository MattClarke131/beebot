const sqlite3 = require('sqlite3').verbose();
const sqlite = require('sqlite');
const path = require('path')
const fs = require('fs');
const dotenv = require('dotenv')

dotenv.config()

const createDbPath = async () => {
  fs.mkdirSync(process.env.PROD_DB_DIR, { recursive: true})
}

const dbinit = async () => {
  const db = await sqlite.open({
    filename: './sqlDatabase/beebot.sqlite',
    driver: sqlite3.Database,
  })

  db.run(`
    CREATE TABLE IF NOT EXISTS user (
      id        INTEGER   PRIMARY KEY,
      slack_id  TEXT      NOT NULL
    )
  `);
  
  db.run(`
    CREATE TABLE IF NOT EXISTS button_count (
      id              INTEGER   PRIMARY KEY,
      user_slack_id   INTEGER   NOT NULL,
      count           INTEGER   NOT NULL
    )
 `);

  db.run(`
    CREATE TABLE IF NOT EXISTS command_call (
      id              INTEGER   PRIMARY KEY,
      user_slack_id   INTEGER   NOT NULL,
      command         TEXT      NOT NULL,
      message_text    TEXT      NOT NULL,
      time_stamp      INTEGER   NOT NULL
    )
  `);

  await db.close();
}

createDbPath();
dbinit();
