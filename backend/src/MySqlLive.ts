import { IView } from "./core/view/socket.response.view";
import { InMessageController } from "./modules/roulette-notifier/in-message/controller";
import { InMessageUseCase } from "./modules/roulette-notifier/in-message/usecase";
import { InMessageRequest, NodesRecipients } from "./modules/roulette-notifier/in-message/request";
import { InMessageResponse } from "./modules/roulette-notifier/in-message/response";
import { request } from "express";
import { MessagingFactory } from "./core/view/MessagingFactory";

const MySQLEvents = require('@rodrigogs/mysql-events');
const mysql = require('mysql');

const config = require('./config');

export type LiveRow = { 
  affectedRows: {after: {content:string,recipients:string,create_at:string}}[];
}

export class MySqlLive {
  connection: any;
  messagingFactory: MessagingFactory;

  constructor(messagingFactory: MessagingFactory) {
    this.messagingFactory = messagingFactory;
  }

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
      onEvent: (e:LiveRow) => {
        console.log(`[MySqlLive][onEvent]`, JSON.stringify(e));
        this.incomingMessageHandler(e);
      }
    });
  
    instance.on(MySQLEvents.EVENTS.CONNECTION_ERROR, console.error);
    instance.on(MySQLEvents.EVENTS.ZONGJI_ERROR, console.error);

  }

  incomingMessageHandler(e:LiveRow) {
    const inMessageController = new InMessageController(new InMessageUseCase());
    console.log(`[server][incomingMessageHandler][b_callback]`, JSON.stringify(e));

    const recipients = 
      (e.affectedRows[0].after.recipients === '*' ? 
      '*' :JSON.parse(e.affectedRows[0].after.recipients)) as NodesRecipients

    const inMessageRequest = {
      content:e.affectedRows[0].after.content, 
      recipients: recipients
    } as InMessageRequest;
    console.log(`[server][incomingMessageHandler][b_callback]`, JSON.stringify(inMessageRequest));

      
    inMessageController.exec(inMessageRequest).then((response: InMessageResponse) => {
      console.log(`[server][incomingMessageHandler][callback]`, JSON.stringify(response));
      const view = this.messagingFactory.create(response.recipients);
      view.render(response);
    });
  }
}