const sqlite3 = require('sqlite3').verbose();
const sqlite = require('sqlite');

const dbinit = async () => {
  const db = await sqlite.open({
    filename: './db/beebot.sqlite',
    driver: sqlite3.Database,
  })

  db.run(`
    CREATE TABLE IF NOT EXISTS slack_user (
      id        INTEGER   PRIMARY KEY,
      slack_id  TEXT      NOT NULL
    )
  `);
  
  db.run(`
    CREATE TABLE IF NOT EXISTS button_total (
      id              INTEGER   PRIMARY KEY,
      slack_user_id   INTEGER   NOT NULL,
      total           INTEGER   NOT NULL
    )
 `);

  await db.close();
}

dbinit();
