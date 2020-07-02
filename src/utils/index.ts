import fs from 'fs';
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

function randomLine (fname: string): Promise<string> {
    return new Promise((resolve, reject) => {
        fs.readFile(fname, (err, data) => {
            if (err) reject(err);
            const els: Array<string> = data.toString().replace('\r', '').split('\n');
            resolve(els[Math.floor(Math.random()*els.length)]);
        });
    });
}

function randomString (len: number, notIn?: Array<string>): string {
    let s: string = '';
    do {
        s = '';
        while (s.length < len) s += Math.random().toString(36).slice(2);
        s = s.slice(0, len);
    } while (notIn?.includes(s));
    return s;
}

export default {
    respond,
    randomLine,
    randomString,
};