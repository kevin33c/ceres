import { AlertsService } from './alerts.services';

const axios = require('axios');
const config = require('../config/config');
const alert = new AlertsService();


export class GamesServices {
    async createGame(data) {
        try {
            const res = await axios.post(config.domain + 'api/games', data);
            return res.data;
        } catch (err) {
            alert.error(err);
        }
    }

    async getGames() {
        try {
            const res = await axios.get(config.domain + 'api/games');
            return res.data;
        } catch (err) {
            alert.error(err);
        }
    }

    async getGameById(id) {
        try {
            const res = await axios.get(config.domain + `api/games/${id}`);
            return res.data;
        } catch (err) {
            alert.error(err);
        }
    }
}