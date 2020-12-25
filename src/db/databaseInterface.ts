interface Database {
  databasePath: string;
  getConnection: () => any;
  getRowFromId: (tableName: string, id: number) => any;
  getRowsFromColVal: (tableName: string, col: string, val: any) => Promise<any> | {[key: string]: any}[];
  insertRow: (tableName: string, row: {[key: string]: any}) => void;
  updateRow: (tableName: string, row: {id: number, [key: string]: any}) => void;
  [others: string]: any;
}

export default Database
