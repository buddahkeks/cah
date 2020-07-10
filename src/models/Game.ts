import path from 'path'; 
import User from './User';
import Player from './Player';
import utils from '../utils';

export const games: Array<Game> = [];

export default class Game {
    public players: Array<Player>;
    public name!: string;
    
    constructor(u: User, name?: string);
    constructor(p: Player, name?: string);

    constructor (u: User|Player, name?: string) {
        this.players = u instanceof Player ? [u] : [Player.of(u)];
        this.name = name || '';
    }

    public genName (games: Array<Game>): Promise<string> {
        return new Promise((resolve, reject) => {
            Game.randomName(games)
                .then(n => this.name = n)
                .catch(() => this.name = utils.randomString(16, games.map(g => g.name)))
                .finally(() => resolve(this.name));
        });
    }

    public join (u: User): boolean {
        if (this.players.map(u => u.uid).includes(u.uid)) return false;
        this.players.push(Player.of(u));
        return true;
    }

    public static randomName (games?: Array<Game>): Promise<string> {
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

    public toJSON (): object {
        return {
            name: this.name,
            players: this.players.length,
        };
    }
};