const axios = require('axios');
const config = require('../config/config');

export class Contracts {
    async get() {
        try {
            const resp = await axios.get(config.domain + 'api/contracts');
            return resp.data;
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    }
}