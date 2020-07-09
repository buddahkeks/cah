import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import conf from '../config/server.json';
import User from '../models/User';
import utils from '../utils';

function getUser (req: express.Request, res: express.Response): void {
    User.get(req.params.uname)
        .then(u => {
            if (!u) return utils.respond(res, 404, 'User wasn\'t found!');
            utils.respond(res, u);
        })
        .catch(e => utils.respond(res, 500, 'Internal server error!', e));
}

function login (req: express.Request, res: express.Response): void {
    if (!req.body.uname || !req.body.pwd) return utils.respond(res, 400, 'Invalid body!');
    User.get(req.body.uname)
        .then(u => {
            if (!u) return utils.respond(res, 404, 'User wasn\'t found!');
            bcrypt.compare(req.body.pwd, u.pwd)
                  .then(m => {
                      if (m) {
                          const tkn: string = jwt.sign({ uname: req.body.uname, }, conf.secret, { expiresIn: '24h', });
                          res.cookie('tkn', tkn);
                          return utils.respond(res, { tkn, });
                      }
                      utils.respond(res, 400, 'Wrong password!');
                  });
        })
        .catch(e => utils.respond(res, 500, 'Internal server error!', e));
}

function register (req: express.Request, res: express.Response): void {
    if (!req.body.uname || !req.body.pwd) return utils.respond(res, 400, 'Invalid body!');
    User.get(req.body.uname)
        .then(u => {
            if (u) return utils.respond(res, 400, 'User already exists!');
            bcrypt.hash(req.body.pwd, 12)
                  .then(h => {
                      User.insert(req.body.uname, h)
                          .then(() => {
                              const tkn: string = jwt.sign({ uname: req.body.uname, }, conf.secret, { expiresIn: '24h', });
                              res.cookie('tkn', tkn);
                              return utils.respond(res, { tkn, });
                          })
                          .catch(e => utils.respond(res, 500, 'Internal server error!', e));
                  });
        })
        .catch(e => utils.respond(res, 500, 'Internal server error!', e));
}

function status (req: express.Request, res: express.Response): void {
    utils.respond(res, { });
}

export default {
    getUser,
    login,
    register,
    status,
};