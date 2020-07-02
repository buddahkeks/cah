import fs from 'fs';
import winston from 'winston';
import express from 'express';
import 'winston-daily-rotate-file';
import e from 'express';

const logger: winston.Logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.prettyPrint(),
    ),
    transports: [
        new winston.transports.DailyRotateFile({
            filename: 'log/error-%DATE%.log', 
            level: 'error',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
        }),
        new winston.transports.DailyRotateFile({
            filename: 'log/combined-%DATE%.log', 
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '40m',
            maxFiles: '14d',
        }),
    ],
    exitOnError: false,
});

function respond (res: express.Response, body: object): void;
function respond (res: express.Response, status: number, msg: string): void;
function respond (res: express.Response, status: number, msg: string, err: Error): void;

function respond (res: express.Response, p1: object|number, p2?: string, err?: Error): void {
    res.status(typeof p1 === 'number' ? p1 : 200).send({
        success: typeof p1 !== 'number' || p1 === 200,
        msg: p2,
        body: typeof p1 !== 'number' ? p1 : undefined,
    });
    if (typeof p1 === 'number' && p1 >= 500 && p1 < 600 && err) log(err.stack||err.toString());
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

function log (msg: string, lvl: string = 'error'): void {
    logger.log(lvl, msg);
}

export default {
    respond,
    randomLine,
    randomString,
    log,
};