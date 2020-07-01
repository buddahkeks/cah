import mysql from 'mysql';
import conf from '../config/db.json';

export function connect (): mysql.Connection {
    const con: mysql.Connection = mysql.createConnection(conf);
    con.connect();
    return con;
}

export function close (con: mysql.Connection) {
    con.end();
}

export function findone (query: string, params: any[], con?: mysql.Connection): Promise<any> {
    return new Promise((resolve, reject) => {
        findmany(query, params, con).then(res => resolve(res[0])).catch(err => reject(err));
    });
}

export function findmany (query: string, params: any[], con?: mysql.Connection): Promise<any[]> {
    return new Promise((resolve, reject) => {
        const gCon: boolean = Boolean(con);
        if (!gCon) con = connect();
        con!.query(query, params, (err: mysql.MysqlError | null, res: any[]) => {
            if (err) reject(err);
            resolve(res);
        });
        if (!gCon) close(con!);
    });
}

export default {
    connect,
    close,
    findone,
    findmany,
};