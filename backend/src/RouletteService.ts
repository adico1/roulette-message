import * as express from 'express';
import * as socketIo from 'socket.io';
import * as path from 'path';

import { RouletteServiceEvent } from './constants';
import { WildClientDto, BlastClientDto, LoginClientDto } from './types';
import { createServer, Server } from 'http';
import { Routes, ApiRoute } from './api-routes';
import { SocketView } from './core/view/socket.view';
import { connectedSockets } from './ConnectedSockets';
import { MySqlLive } from './MySqlLive';
var cors = require('cors');
const config = require('./config');

export class RouletteService {
  public static readonly PORT: number = 8080;
  private _app: express.Application;
  private server: Server;
  private io: SocketIO.Server;
  private port: string | number;

  constructor () {
    // globally catching unhandled promise rejections
    process.on('unhandledRejection', (reason, promise) => {
      console.error('Unhandled Rejection at promise '+promise+' reason ', reason);
      console.log('Server is still running...\n');
    });

    // globally catching unhandled exceptions
    process.on('uncaughtException', (error) => {
      console.error(error.stack);
      console.error('Uncaught Exception is thrown with ',error+'\n');
      process.exit();
    });

    this._app = express();
    this.port = process.env.PORT || RouletteService.PORT;
    this._app.use(cors());
    this._app.options('*', cors());

    this._app.get("/", (req: any, res: any) => {
      res.sendFile(path.resolve("./src/public/index.html"));
    });

    new MySqlLive().start();

    this.server = createServer(this._app);
    this.initSocket();
    this.listen();
  }

  private initSocket (): void {
    this.io = socketIo(this.server);
  }

  private listen (): void {

    this.server.listen(this.port, () => {
      console.log('Running server on port %s', this.port);
    });

    this.io.on(RouletteServiceEvent.CONNECT, (socket: any) => {
      const socketId:string = socket.id;
      console.log(`Connected client: ${socketId} on port ${this.port}.`);

      connectedSockets.add(socket);
      // Load service api routes
      const socketView = new SocketView(this.io);
      const routes = new Routes(socketView);

      console.log(`[server][listen]`, JSON.stringify(config));

      routes.getApiRoutes(socketId, config.nodeId).forEach((route: ApiRoute) => {
        socket.on(route.name, route.fn)
      });
    });
  }

  get app (): express.Application {
    return this._app;
  }
}