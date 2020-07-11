import path from 'path'; 
import User from './User';
import Player from './Player';
import utils from '../utils';
import Card from './Card';

export const games: Array<Game> = [];

export default class Game {
    public players: Player[];
    public categories: string[];
    public name: string;
    public round: number;
    public question: Card|null;
    public running: boolean;

    private czar: Player;
    
    constructor(u: User, categories?: string[], name?: string);
    constructor(p: Player, categories?: string[], name?: string);

    constructor (u: User|Player, categories?: string[], name?: string) {
        this.players = u instanceof Player ? [u] : [Player.of(u)];
        this.categories = categories||[];
        this.name = name || '';
        this.round = 0;
        this.czar = this.players[0];
        this.question = null;
        this.running = false;
        if (u instanceof Player) u.game = this;
    }

    public genName (games: Game[]): Promise<string> {
        return new Promise((resolve, reject) => {
            Game.randomName(games)
                .then(n => this.name = n)
                .catch(() => this.name = utils.randomString(16, games.map(g => g.name)))
                .finally(() => resolve(this.name));
        });
    }

    public static randomName (games?: Game[]): Promise<string> {
        return new Promise((resolve, reject) => {
            utils.randomLine(path.resolve(__dirname, '../config/adjectives.txt'))
                 .then(a => {
                     utils.randomLine(path.resolve(__dirname, '../config/nouns.txt'))
                          .then(n => {
                              const name: string = a.replace('\\r', '').trim() + '-' + n.replace('\\r', '').trim();
                              if (games?.map(g => g.name).includes(name)) return this.randomName(games).then(n => resolve(n)).catch(e => reject(e));
                              resolve(name);
                            })
                          .catch(e => reject(e));
                 })
                 .catch(e => reject(e));
        });
    }

    public ready(): boolean {
        return this.players.every(p => p.ready);
    }

    public start (): Promise<void> {
        return new Promise((resolve, reject) => {
            if (!this.ready()) return reject('Not every player is ready!');
            if (this.players.length < 2) return reject('Too little players!');
            if (!this.categories.length) return reject('No categories selected!');
            Card.randomQuestion(this.categories).then(c => {
                this.question = c;
                this.czar = this.players[0];
                this.running = true;
                this.players.forEach(p => p.ready = false);
                resolve();
            }).catch(reject);
        });
    }

    public stop (): void {
        this.question = null;
    }

    public join (u: User|Player): boolean {
        if (this.players.map(u => u.uid).includes(u.uid)) return false;
        this.players.push(u instanceof Player ? u : Player.of(u));
        return true;
    }

    public leave (u: User|Player): void {
        this.players = this.players.filter(p => p.uid !== u.uid);
        if (!this.players.length) games.splice(games.indexOf(this));
    }

    public nextCzar (): void {
        this.czar = this.players[(this.players.indexOf(this.czar)+1)%this.players.length];
        if (!this.players.indexOf(this.czar)) this.round++;
    }

    public toJSON (): object {
        return {
            name: this.name,
            running: this.running,
            players: this.players.map(p => p.toJSON(false)),
            categories: this.categories,
            round: this.round,
        };
    }
};