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
};