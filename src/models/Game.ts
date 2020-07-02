import path from 'path'; 
import User from "./User";
import utils from '../utils';

export default class Game {
    public players: Array<User>;
    public name!: string;
    
    constructor (u: User, p2?: string) {
        this.players = [u];
        this.name = p2 || '';
    }

    public genName (games: Array<Game>): Promise<string> {
        return new Promise((resolve, reject) => {
            Game.randomName(games)
                .then(n => this.name = n)
                .catch(() => this.name = utils.randomString(16, games.map(g => g.name)))
                .finally(() => resolve(this.name));
        });
    }

    public static randomName (games?: Array<Game>): Promise<string> {
        return new Promise((resolve, reject) => {
            utils.randomLine(path.resolve(__dirname, '../config/adjectives.txt'))
                 .then(a => {
                     utils.randomLine(path.resolve(__dirname, '../config/nouns.txt'))
                          .then(n => {
                              const name: string = a + '-' + n;
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