export enum CardType {
    Answer, Question
};

export default class Card {
    public cid: number;
    public type: CardType;
    public content: string;

    constructor (cid: number, type: CardType, content: string) {
        this.cid = cid;
        this.type = type;
        this.content = content;
    }
};