import { Pool, MysqlError, PoolConnection, FieldInfo } from "mysql";

var mysqlpool: Pool = require('../MySQLConnector').pool;

export class Db {
  exec(query: string): Promise<any> {
    return new Promise((resolve, reject) => {
      mysqlpool.getConnection(function(err: MysqlError, connection: PoolConnection) {
        //If an error was passed getting a connection, fails the promise sending it to the caller
        if (err) {
          return reject(err);
        }

        connection.query(query, function (error: MysqlError, results: any, fields: FieldInfo[]) {
          connection.release();
          if (error) {
            return reject(error);
          }

          resolve(results);
        });
      });  
    });
  }
}