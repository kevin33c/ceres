import { AlertsService } from './alerts.services';

const axios = require('axios');
const config = require('../config/config');
const alert = new AlertsService();


export class GamesServices {
    async createGame(data) {
        try {
            const resp = await axios.post(config.domain + 'api/games', data);
            return resp.data;
        } catch (err) {
            // Handle Error Here
            alert.error(err);
        }
    }

    async getGames() {
        try {
            const resp = await axios.get(config.domain + 'api/games');
            return resp.data;
        } catch (err) {
            // Handle Error Here
            alert.error(err);
        }
    }

    async getGameByAccount() {
        try {
            const resp = await axios.get(config.domain + 'api/games');
            return resp.data;
        } catch (err) {
            // Handle Error Here
            alert.error(err);
        }
    }
}