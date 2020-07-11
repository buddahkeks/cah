import User from "./User";
import Card from "./Card";
import Game from "./Game";

export default class Player extends User {
    private score: number;
    private cards: Array<Card>;

    public game?: Game;
    public ready: boolean;

    constructor (u: User, score?: number, cards?: Array<Card>);
    constructor (uid: number, uname: string, pwd: string, score: number, cards?: Array<Card>);

    constructor (a: User|number, b?: number|string, c?: Array<Card>|string, score?: number, cards?: Array<Card>) {
        if (a instanceof User) {
            super(a.uid, a.uname, a.pwd);
            this.score = <number>b||0;
            this.cards = <Array<Card>>c||[];
        } else {
            super(a, <string>b, <string>c);
            this.score = score!;
            this.cards = cards!;
        }
        this.ready = false;
    }

    public static of (u: User): Player {
        return new Player(u);
    }

    public toJSON (game: boolean = true): object {
        return {
            ...super.toJSON(),
            score: this.score,
            cards: this.cards.map(c => c.toJSON()),
            game: game ? this.game : undefined,
            ready: this.ready,
        };
    }
};