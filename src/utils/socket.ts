import http from 'http';
import socketio from 'socket.io';
import cookie from 'cookie';
import conf from '../config/server.json';
import jwt from 'jsonwebtoken';
import { CAHToken } from '../middleware/auth';
import User from '../models/User';
import Game, { games } from '../models/Game';
import Player from '../models/Player';

interface GameSocket extends socketio.Socket {
  user?: User;
  player?: Player;
};

export default function (server: http.Server): void {
  const io: socketio.Server = socketio(server, {});
  const gamesNsp: socketio.Namespace = io.of('/games');

  gamesNsp.use((socket: GameSocket, next) => {
    const cookies: {[key: string]: string} = cookie.parse(socket.request.headers.cookie || '');
    if (!cookies.tkn) return next(new Error('Authentication failed!'));
    jwt.verify(cookies.tkn, conf.secret, (err: jwt.VerifyErrors|null, dec?: object) => {
      if (err) return next(new Error('Authentication failed - invalid token!'));
      if (!(<CAHToken>dec).uname) return next(new Error('Authentication failed - no username!'));
      User.get((<CAHToken>dec).uname).then(u => {
        if (!u) return next(new Error('Authentication failed - unknown user!'));
        socket.user = u;
        next();
      }).catch(e => next(e));
    });
  });

  gamesNsp.on('connect', (socket: GameSocket) => {
    socket.leave(socket.id);

    function joinGame (game: Game) {
      Object.keys(socket.rooms).forEach(r => socket.leave(r));
      socket.join(game.name);
    }

    function leaveGame () {
      socket.player!.game!.leave(socket.player!);
      socket.player = undefined;
      Object.keys(socket.rooms).forEach(r => socket.leave(r));
    }

    socket.on('join', (name?: string) => {
      if (!name) {
        socket.player = new Player(socket.user!);
        const g: Game = new Game(socket.player);
        g.genName(games).then(n => {
          games.push(g);
          joinGame(g);
        });
        return;
      }
      const g: Game[] = games.filter((g: Game) => g.name === name);
      if (!g.length) return;
      socket.player = new Player(socket.user!);
      joinGame(g[0]);
    });

    socket.on('leave', () => {
      leaveGame();
    });

    socket.on('ready', () => {
      socket.player!.ready = true;
    });

    socket.on('disconnect', () => {
      leaveGame();
    });
  });
};