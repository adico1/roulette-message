const MySQLEvents = require('@rodrigogs/mysql-events');
const mysql = require('mysql');

const config = require('./config');

export class MySqlLive {
  connection: any;

  constructor() {}

  stop() {
    this.connection.release();
  }

  async start() {
    this.connection = mysql.createConnection({
      host: config.MYSQL_DB_ADDRESS,
      user: config.MYSQL_DB_USER,
      password: config.MYSQL_DB_PASSWORD
    });
    const instance = new MySQLEvents(this.connection, {
      startAtEnd: true // to record only the new binary logs, if set to false or you didn'y provide it all the events will be console.logged after you start the app
    });
  
    await instance.start();

    instance.addTrigger({
      name: 'monitoring all statments',
      expression: `${config.MYSQL_DB_NAME}.roulette_messages`, // listen to TEST database !!!
      statement: MySQLEvents.STATEMENTS.INSERT, // you can choose only insert for example MySQLEvents.STATEMENTS.INSERT, but here we are choosing everything
      onEvent: (e:any) => {
        console.log(`[MySqlLive][onEvent]`, JSON.stringify(e));
      }
    });
  
    instance.on(MySQLEvents.EVENTS.CONNECTION_ERROR, console.error);
    instance.on(MySQLEvents.EVENTS.ZONGJI_ERROR, console.error);


  }
}