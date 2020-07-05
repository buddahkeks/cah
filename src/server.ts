import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import conf from './config/server.json';
import { users, cards, games } from './routes';
import utils from './utils';

const app: express.Application = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());

app.use('/users', users);
app.use('/cards', cards);
app.use('/games', games);

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

app.use('/', (req: express.Request, res: express.Response) => {
    utils.respond(res, 404, 'Resource not found!');
});

app.listen(conf.port, conf.hostname, () => console.log(` [SERVER]: Listening on http://${conf.hostname}:${conf.port} ... `));