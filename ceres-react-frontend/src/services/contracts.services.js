import { AlertsService } from './alerts.services';

const axios = require('axios');
const config = require('../config/config');
const alert = new AlertsService();

export class ContractsServices {
    async getContract() {
        try {
            const resp = await axios.get(config.domain + 'api/contracts');
            return resp.data;
        } catch (err) {
            // Handle Error Here
            alert.error(err);
        }
    }
}