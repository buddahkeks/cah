import db from '../db';

export default class User {
    public uid: number;
    public uname: string;
    public pwd: string;

    constructor (uid: number, uname: string, pwd: string) {
        this.uid = uid;
        this.uname = uname;
        this.pwd = pwd;
    }

    public static get (uname: string): Promise<User|null> {
        return new Promise((resolve, reject) => {
            db.findone('SELECT uid, pwd FROM users WHERE uname = ?', [uname]).then(res => {
                if (!res) resolve(null);
                resolve(new User(res.uid, uname, res.pwd));
            }).catch(err => reject(err));
        });
    }
};