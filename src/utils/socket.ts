import http from 'http';
import socketio from 'socket.io';
import cookie from 'cookie';
import conf from '../config/server.json';
import jwt from 'jsonwebtoken';
import { CAHToken } from '../middleware/auth';
import User from '../models/User';
import Game, { games } from '../models/Game';

export default function (server: http.Server): void {
  const io: socketio.Server = socketio(server, {});
  const gamesNsp: socketio.Namespace = io.of('/games');

  gamesNsp.use((socket, next) => {
    const cookies: {[key: string]: string} = cookie.parse(socket.request.headers.cookie || '');
    if (!cookies.tkn) return next(new Error('Authentication failed!'));
    jwt.verify(cookies.tkn, conf.secret, (err: jwt.VerifyErrors|null, dec?: object) => {
      if (err) return next(new Error('Authentication failed - invalid token!'));
      if (!(<CAHToken>dec).uname) return next(new Error('Authentication failed - no username!'));
      User.get((<CAHToken>dec).uname).then(u => {
        if (!u) return next(new Error('Authentication failed - unknown user!'));
        socket.request.user = u;
        next();
      }).catch(e => next(e));
    });
  });

  gamesNsp.on('connect', socket => {
    socket.on('join', (name?: string) => {
      if (!name) {
        const g: Game = new Game(socket.request.user!);
        g.genName(games).then(n => {
          games.push(g);
          socket.join(n);
        });
        return;
      }
      const g: Game[] = games.filter((g: Game) => g.name === name);
      if (!g.length) return;
      socket.join(g[0].name);
    });

    socket.on('game', () => console.log(socket.rooms));
    socket.on('disconnect', () => console.log('Bye, bye!'));
  });
};