import * as SQLite from 'expo-sqlite';

const openDatabase = () => {
  const db = SQLite.openDatabase('db.db');
  return db;
};

const createTable = (db) => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS "Entry" (
        id INTEGER PRIMARY KEY NOT NULL,
        createdOn TIMESTAMP NOT NULL,
        lastEdited TIMESTAMP NOT NULL,
        entryText TEXT,
        deleted INT DEFAULT 0 NOT NULL CHECK (deleted IN (0, 1))
      )`,
    );
  });
};

const deleteTable = (db) => {
  db.transaction((tx) => {
    tx.executeSql('DROP TABLE IF EXISTS "Entry"');
  });
};

const addEntry = (db, timestamp, text) => {
  db.transaction((tx) => {
    tx.executeSql(
      'INSERT INTO "Entry" (createdOn, lastEdited, entryText) VALUES (?, ?, ?) RETURNING id',
      [timestamp, timestamp, text],
      () => {},
      (txObj, error) => console.log('Error: ', error),
    );
  });
};

const editEntry = (db, id, timestamp, text) => {
  db.transaction((tx) => {
    tx.executeSql(
      'UPDATE "Entry" SET lastEdited = ?, entryText = ? WHERE id = ? RETURNING id',
      [timestamp, text, id],
      (txObj, res) => console.log(res),
      (txObj, error) => console.log('Error: ', error),
    );
  });
};

const getEntryDates = (db, setter) => {
  db.transaction((tx) => {
    tx.executeSql(
      'SELECT DISTINCT(STRFTIME("%Y-%m-%d", createdOn)) AS entryDate FROM "Entry"',
      null,
      (txObj, { rows: { _array } }) => setter(_array.map((x) => x.entryDate)),
      (txObj, error) => console.log('Error: ', error),
    );
  });
};

const getEntriesOnDate = (db, date, setter) => {
  db.transaction((tx) => {
    tx.executeSql(
      'SELECT * FROM "Entry" WHERE STRFTIME("%Y-%m-%d", createdOn) = ? AND deleted = 0',
      [date],
      (txObj, { rows: { _array } }) => setter(_array),
      (txObj, error) => console.log('Error: ', error),
    );
  });
};

export default {
  openDatabase,
  createTable,
  deleteTable,
  addEntry,
  editEntry,
  getEntryDates,
  getEntriesOnDate,
};
