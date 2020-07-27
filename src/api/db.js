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
  `DROP TABLE IF EXISTS permittype;`,
  `DROP TABLE IF EXISTS permit;`,
  `DROP TABLE IF EXISTS finding;`,
];

const clearAllTables = [
  `DELETE FROM user;`,
  `DELETE FROM connection;`,
  `DELETE FROM terminal;`,
  `DELETE FROM permittype;`,
  `DELETE FROM permit;`,
  `DELETE FROM finding;`,
];

const clearTxnTables = [
  `DELETE FROM permittype;`,
  `DELETE FROM permit;`,
  `DELETE FROM finding;`,
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

  `CREATE TABLE IF NOT EXISTS permittype (
    objid TEXT PRIMARY KEY NOT NULL, 
    title TEXT NOT NULL,
    recordcount INTEGER NOT NULL,
    completed INTEGER NOT NULL,
    assigneeid TEXT NOT NULL
  )
`,

  `CREATE TABLE IF NOT EXISTS permit (
    objid TEXT PRIMARY KEY NOT NULL, 
    permittypeid TEXT NOT NULL,
    state TEXT NOT NULL,
    seqno TEXT NOT NULL,
    permitno TEXT NOT NULL,
    permitteename TEXT NOT NULL,
    permitteeaddress TEXT NOT NULL,
    title TEXT NOT NULL,
    lng REAL,
    lat REAL,
    findings TEXT NOT NULL
  )
  ;
  CREATE INDEX ix_permittype ON permit (permittype)
  ;
  CREATE INDEX ix_state ON permit (state)
  ;
  CREATE INDEX ix_permitno ON permit (permitno)
  ;
`,

  `CREATE TABLE IF NOT EXISTS finding (
    objid TEXT PRIMARY KEY NOT NULL, 
    permitid TEXT NOT NULL,
    type TEXT NOT NULL,
    description TEXT NOT NULL,
    photourl TEXT NULL
  )
  ;
  CREATE INDEX ix_permitid ON finding (permitid)
  ;
`,
];
