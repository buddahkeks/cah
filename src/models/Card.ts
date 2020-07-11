import db from "../db";

export enum CardType {
    Answer, Question
};

export default class Card {
    public cid: number;
    public type: CardType;
    public content: string;

    constructor (cid: number, type: CardType, content: string);
    constructor (cid: number, type: string, content: string);

    constructor (cid: number, type: CardType|string, content: string) {
        this.cid = cid;
        this.type = typeof type === 'string' ? (type === 'A' ? CardType.Answer : CardType.Question) : type;
        this.content = content;
    }

    private static random (type: string, categories: string[]): Promise<Card> {
        return new Promise((resolve, reject) => {
            db.findone('SELECT cd.cid, cd.type, cd.content FROM cards cd INNER JOIN cardscategories cc ON cd.cid = cc.card_id INNER JOIN categories ct ON cc.cat_id = ct.cid WHERE cd.type = ? AND ct.name IN ? ORDER BY RAND() LIMIT 1', [type, categories,])
              .then(res => new Card(res.cid, res.type, res.content))
              .catch(reject);
        });
    }

    public static randomQuestion (categories: string[] = []): Promise<Card> {
        return Card.random('q', categories);
    }

    public static randomAnswer (categories: string[] = []): Promise<Card> {
        return Card.random('a', categories);
    }

    public toJSON (): object {
        return {
            cid: this.cid,
            type: this.type.toString(),
            content: this.content,
        };
    }
};