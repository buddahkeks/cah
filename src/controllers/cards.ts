import express from 'express';
import User from '../models/User';
import db from '../db';
import Category from '../models/Category';
import utils from '../utils';

function getNext (req: express.Request, res: express.Response): void {
    // TODO: get and return next card for user `req.user` ...
    utils.respond(res, 501, 'Not implemented yet!');
}

function getCategories (req: express.Request, res: express.Response): void {
    Category.getAll()
            .then(cs => utils.respond(res, cs))
            .catch(e => utils.respond(res, 500, 'Internal server error!', e));
}

function getCardsFrom (req: express.Request, res: express.Response): void {
    Category.get(+req.params.id)
            .then(c => c ? c.getCards()
                            .then(cs => utils.respond(res, cs))
                            .catch(e => utils.respond(res, 500, 'Internal server error!', e))
                         : utils.respond(res, 404, 'Unknown category!'))
            .catch(e => utils.respond(res, 500, 'Internal server error!', e));
}

export default {
    getNext,
    getCategories,
    getCardsFrom,
};