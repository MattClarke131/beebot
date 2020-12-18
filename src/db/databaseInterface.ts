interface Database {
  databasePath: string;
  getDb: () => any;
  getRowFromId: (tableName: string, id: number) => any;
  save: () => void;
  insertRow: (row: {[key: string]: any}) => void;
  updateRow: () => void;
  [others: string]: any;
}

export default Database
