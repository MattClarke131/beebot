interface Database {
  databasePath: string;
  getDb: () => any;
  getRowFromId: (tableName: string, id: number) => any;
  getRowsFromColVal: (tableName: string, col: string, val: any) => Promise<any> | {[key: string]: any}[];
  insertRow: (row: {[key: string]: any}) => void;
  updateRow: (row: {[key: string]: any}) => void;
  [others: string]: any;
}

export default Database
