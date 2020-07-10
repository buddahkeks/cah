import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import conf from './config/server.json';
import { users, cards, games } from './routes';
import next from 'next';
import Server from 'next/dist/next-server/server/next-server';
import path from 'path';
import http from 'http';
import socket from './utils/socket';

const server: Server = next({ dev: process.env.NODE_ENV !== 'production', });
const handle = server.getRequestHandler();

server.prepare()
      .then(() => {
        const app: express.Application = express();
        const httpServer: http.Server = http.createServer(app);

        app.use(cookieParser());
        app.use(bodyParser.json());

        const api: express.Router = express.Router();

        api.use('/users', users);
        api.use('/cards', cards);
        api.use('/games', games);

        app.use('/api', api);
        app.use('/', express.static(path.join(__dirname, 'public')));

        app.get('/34S73.-399', (req: express.Request, res: express.Response) => {
          res.status(418).send(`
              <style>
                  html, body {
                      margin: 0;
                      padding: 0;
                  }
              </style>
              <script src="https://cdn.jsdelivr.net/gh/0Adiber/C15c0d15c0JS@master/src/c15c0d15c0.js"></script>
              <p style="font-family: 'Comic Sans MS', cursive; width: 100%; height: 100%; margin: 0; display: flex; justify-content: center; align-items: center; font-size: 3em; color: #FC09FF;">smol pp</p>
              <script>
                  c15c0d15c0.initDisco(50);
              </script>
              <footer>
                  <a href="https://github.com/0adiber/">@adiber</a>
              </footer>
              `);
        });

        app.get('*', (req, res) => handle(req, res));

        socket(httpServer);
        httpServer.listen(conf.port, conf.hostname, () => console.log(`[SERVER]: Listening on http://${conf.hostname}:${conf.port} ... `));
      })
      .catch(e => {
          console.error(e.stack);
          process.exit(1);
      });
