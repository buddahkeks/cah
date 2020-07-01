import express from 'express';
import User from '../models/User';
import db from '../db';
import Category from '../models/Category';

function getNext (req: express.Request, res: express.Response): void {
    // TODO: get and return next card for user `req.user` ...
    res.send({
        success: false,
        msg: 'Not implemented yet!',
    });
}

function getCategories (req: express.Request, res: express.Response): void {
    Category.getAll().then(cs => res.send({
        success: true,
        body: cs,
    })).catch(e => res.status(500).send({
        success: false,
        msg: 'Internal server error!',
    }));
}

export default {
    getNext,
    getCategories,
};