import { db } from "../rsi-react-native";

const dbName = "obo.db";

export const initDb = (
  options = { 
    dropTables: false, 
    clearAllTables: false, 
    clearTxnTables: false, 
    clearCredentials: false
  }
) => {

  const sqls = [];

  if (options.dropTables) {
    sqls.push(...dropTables)
  }
  if (options.clearAllTables) {
    sqls.push(...clearAllTables)
  }
  if (options.clearTxnTables) {
    sqls.push(...clearTxnTables)
  }
  if (options.clearCredentials) {
    sqls.push(...clearCredentials)
  }
  sqls.push(...createTables)
  db.initDb(dbName, sqls);
};

const dropTables = [
  `DROP TABLE IF EXISTS user;`,
  `DROP TABLE IF EXISTS connection;`,
  `DROP TABLE IF EXISTS terminal;`,
];

const clearAllTables = [
  `DELETE FROM user;`,
  `DELETE FROM connection;`,
  `DELETE FROM terminal;`,
];

const clearTxnTables = [
];

const clearCredentials = [
  `DELETE FROM user;`,
  `DELETE FROM terminal;`,
];

const createTables = [
  `CREATE TABLE IF NOT EXISTS user (
  objid TEXT PRIMARY KEY NOT NULL, 
  username TEXT NOT NULL,
  password TEXT NOT NULL,
  svrpassword TEXT NULL,
  lastname TEXT NULL,
  firstname TEXT NULL,
  middlename TEXT NULL,
  name TEXT NULL,
  jobtitle TEXT NULL
)
`,

  `CREATE TABLE IF NOT EXISTS connection (
  objid TEXT PRIMARY KEY NOT NULL, 
  ipaddress TEXT NOT NULL,
  port TEXT NOT NULL
)
`,

  `CREATE TABLE IF NOT EXISTS terminal (
    terminalid TEXT PRIMARY KEY NOT NULL, 
    macaddress TEXT NULL
)
`,
];
