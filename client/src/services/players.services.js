import { AlertsService } from './alerts.services';

const axios = require('axios');
const config = require('../config/config');
const alert = new AlertsService();


export class PlayersServices {
    async join(data) {
        try {
            const res = await axios.post(`${config.domain}api/players`, data);
            return res.data;
        } catch (err) {
            alert.error(err);
        }
    }

    async getPlayersByGameId(id) {
        try {
            const res = await axios.get(`${config.domain}api/players/${id}`);
            return res.data;
        } catch (err) {
            alert.error(err);
        }
    }
}