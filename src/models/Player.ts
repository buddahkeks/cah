import User from "./User";
import Card from "./Card";

export default class Player extends User {
    private score: number;
    private cards: Array<Card>;

    constructor (u: User, score: number, cards?: Array<Card>);
    constructor (uid: number, uname: string, pwd: string, score: number, cards?: Array<Card>);

    constructor (a: User|number, b: number|string, c?: Array<Card>|string, score?: number, cards?: Array<Card>) {
        if (a instanceof User) {
            super(a.uid, a.uname, a.pwd);
            this.score = <number>b;
            this.cards = <Array<Card>>c;
        } else {
            super(a, <string>b, <string>c);
            this.score = score!;
            this.cards = cards!;
        }
    }

    public static of (u: User): Player {
        return new Player(u, 0, []);
    }
};