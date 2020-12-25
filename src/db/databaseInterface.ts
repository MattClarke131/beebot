interface Database {
  databasePath: string;
  getRowFromId: (tableName: string, id: number) => any;
  getRowFromColVal: (tableName: string, col: string, val: any) => Promise<any> | {[key: string]: any};
  insertRow: (tableName: string, row: {[key: string]: any}) => void;
  updateRow: (tableName: string, row: {id: number, [key: string]: any}) => void;
  [others: string]: any;
}

export default Database
