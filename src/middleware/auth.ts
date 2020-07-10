import express from 'express';
import jwt from 'jsonwebtoken';
import conf from '../config/server.json';
import User from '../models/User';
import utils from '../utils';

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}

export interface CAHToken {
    uname: string;
};

function restrict (req: express.Request, res: express.Response, next: express.NextFunction): void {
    if (!req.cookies.tkn) return utils.respond(res, 400, 'Authentication failed!');
    jwt.verify(req.cookies.tkn, conf.secret, (err: jwt.VerifyErrors|null, dec?: object) => {
        if (err) return utils.respond(res, 400, 'Authentication failed1');
        if (!(<CAHToken>dec).uname) return utils.respond(res, 400, 'Invalid token!');
        User.get((<CAHToken>dec).uname).then(u => {
            if (!u) return utils.respond(res, 400, 'Unknown user!');
            req.user = u;
            next();
        }).catch(err => utils.respond(res, 500, 'Internal server error!', err));
    });
}

export default {
    restrict,
};