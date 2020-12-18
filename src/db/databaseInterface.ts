interface Database {
  databasePath: string;
  getDb: () => any;
  getRowFromId: (tableName: string, id: number) => any;
  save: () => void;
  insertRow: () => void;
  updateRow: () => void;
  [others: string]: any;
}

export default Database
