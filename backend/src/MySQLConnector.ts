import { Connection, Pool } from "mysql";
const mysql = require('mysql')
const config = require('./config');

class MySQLConnector {
    internalPool: Pool;
  
    constructor() {
      console.log(`Connecting to DB ${config.MYSQL_DB_ADDRESS} ${config.MYSQL_DB_USER} ${config.MYSQL_DB_PASSWORD}`);
        

      //Instantiates the connection pool
      this.internalPool = mysql.createPool({
          host: config.MYSQL_DB_ADDRESS,
          user: config.MYSQL_DB_USER,
          database: config.MYSQL_DB_NAME,
          password: config.MYSQL_DB_PASSWORD,
          connectionLimit: config.MYSQL_DB_POOL_SIZE,
          waitForConnections: true,
          queueLimit: 100,
          port : config.MYSQL_DB_PORT,
          connectTimeout : 10000,
          acquireTimeout: 10000,
          debug : false          
      });

      this.internalPool.on('connection', function (connection: Connection) {
        console.log('MySQL DB Connection established');
      });
      
      this.internalPool.on('acquire', function (connection: Connection) {
        console.log('Connection %d acquired', connection.threadId);
      });
      
      this.internalPool.on('enqueue', function () {
        console.log('Waiting for available connection slot...');
      });
      
      this.internalPool.on('release', function (connection: Connection) {
        console.log('Connection %d released', connection.threadId);
      });

      //Allows better control of openned connections
      this.registerThreadCounter();
    }

    /**
     * 
     * 
     * Registers an event lister to capture when new connections are oppened
     * This method uses console.log, but in an production environment you'd probably
     * use a async log write such as winston since console.log is blocking
     * 
     */
    registerThreadCounter() {
        this.internalPool.on('connection', (connection) => console.log(`New connection stablished with server on thread #${connection.threadId}`))
    }

    /**
     * 
     * 
     * Retrieves the connection pool
     * 
     */
    get pool() {
        return this.internalPool
    }
}

//Exports the connector singleton to be used by the wrapper
module.exports = new MySQLConnector()