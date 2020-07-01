import express from 'express';

function respond (res: express.Response, body: object): void;
function respond (res: express.Response, status: number, msg: string): void;

function respond (res: express.Response, p1: object|number, p2?: string): void {
    res.status(typeof p1 === 'number' ? p1 : 200).send({
        success: typeof p1 !== 'number' || p1 === 200,
        msg: p2,
        body: typeof p1 !== 'number' ? p1 : undefined,
    });
}

export default {
    respond,
};