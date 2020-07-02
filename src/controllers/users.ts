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
        .catch(e => utils.respond(res, 500, 'Internal server error!'));
}

function login (req: express.Request, res: express.Response): void {
    if (!req.body.uname || !req.body.pwd) return utils.respond(res, 400, 'Invalid body!');
    User.get(req.body.uname)
        .then(u => {
            if (!u) return utils.respond(res, 404, 'User wasn\'t found!');
            bcrypt.compare(req.body.pwd, u.pwd)
                  .then(m => {
                      if (m) {
                          let tkn: string = jwt.sign({ uname: req.body.uname, }, conf.secret, { expiresIn: '24h', });
                          res.cookie('tkn', tkn);
                          return utils.respond(res, {
                              tkn: tkn,
                          });
                      }
                      utils.respond(res, 400, 'Wrong password!');
                  });
        })
        .catch(e => utils.respond(res, 500, 'Internal server error!'));
}

export default {
    getUser,
    login,
};