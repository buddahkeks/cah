import db from '../db';
import Card from './Card';

export default class Category {
    public cid: number;
    public name: string;

    constructor (cid: number, name: string) {
        this.cid = cid;
        this.name = name;
    }

    public static get (id: number): Promise<Category|null> {
        return new Promise((resolve, reject) => {
            db.findone('SELECT name FROM categories WHERE cid = ?', [id])
              .then(c => c ? resolve(new Category(id, c.name)) : resolve(null))
              .catch(e => reject(e));
        });
    }

    public static getAll (): Promise<Array<Category>> {
        return new Promise((resolve, reject) => {
            db.findmany('SELECT cid, name FROM categories', [])
              .then(cs => resolve(cs.map(c => new Category(c.cid, c.name))))
              .catch(e => reject(e));
        });
    }

    public getCards (): Promise<Array<Card>> {
        return new Promise((resolve, reject) => {
            db.findmany('SELECT * FROM cards INNER JOIN cardscategories WHERE cat_id = ?', [this.cid])
              .then(cs => resolve(cs.map(c => new Card(c.cid, c.type, c.content))))
              .catch(e => reject(e));
        });
    }
};