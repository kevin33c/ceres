import { AlertsService } from './alerts.services';

const axios = require('axios');
const config = require('../config/config');
const alert = new AlertsService();

export class ContractsServices {
    async getContract() {
        try {
            const res = await axios.get(`${config.domain}api/contracts`);
            return res.data;
        } catch (err) {
            alert.error(err);
        }
    }
}