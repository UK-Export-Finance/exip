const axios = require('axios');

require('dotenv').config();

const getCountries = async () => {
  try {
    const response = await axios({
      method: 'GET',
      url: process.env.MULESOFT_API_CIS_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      auth: {
        username: process.env.MULESOFT_API_CIS_KEY,
        password: process.env.MULESOFT_API_CIS_SECRET,
      },
    });

    return response.data;
  } catch (err) {
    console.error('Unable to fetch CIS countries', err);
    return err;
  }
};

const api = {
  getCountries,
};

module.exports = api;
