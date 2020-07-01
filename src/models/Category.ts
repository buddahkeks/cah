import db from '../db';

export default class Category {
    public cid: number;
    public name: string;

    constructor (cid: number, name: string) {
        this.cid = cid;
        this.name = name;
    }

    public static getAll (): Promise<Array<Category>> {
        return new Promise((resolve, reject) => {
            db.findmany('SELECT cid, name FROM categories', [])
              .then(cs => resolve(cs.map(c => new Category(c.cid, c.name))))
              .catch(e => reject(e));
        });
    }
};