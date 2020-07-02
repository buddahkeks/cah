import express from 'express';
import Game from '../models/Game';
import utils from '../utils';

const games: Array<Game> = [];

function _findGame (name: string): Game|null {
    for (const g of games)
        if (g.name === name) return g;
    return null;
}

function getAllGames (req: express.Request, res: express.Response): void {
    utils.respond(res, {
        games: games.map(g => ({
            name: g.name,
            players: g.players.length,
        })),
    });
}

function newGame (req: express.Request, res: express.Response): void {
    const g: Game = new Game(req.user!);
    g.genName(games).then(n => {
        games.push(g);
        utils.respond(res, {
            name: n,
        });
    });
}

function getUsers (req: express.Request, res: express.Response): void {
    const g: Game|null = _findGame(req.params.name);
    if (!g) return utils.respond(res, 400, 'Unknown game!');
    utils.respond(res, {
        users: g.players,
    });
}

function joinGame (req: express.Request, res: express.Response): void {
    const g: Game|null = _findGame(req.params.name);
    if (!g) return utils.respond(res, 400, 'Unknown game!');
    if (g.join(req.user!)) return utils.respond(res, {});
    utils.respond(res, 400, 'Already in game!');
}

export default {
    getAllGames,
    newGame,
    getUsers,
    joinGame,
};