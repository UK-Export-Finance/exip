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

const getCurrencies = async () => {
  try {
    const response = await axios({
      method: 'GET',
      url: process.env.MULESOFT_API_MDM_EA_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      auth: {
        username: process.env.MULESOFT_API_MDM_EA_KEY,
        password: process.env.MULESOFT_API_MDM_EA_SECRET,
      },
    });

    return response.data;
  } catch (err) {
    console.error('Unable to fetch MDM-EA currencies', err);
    return err;
  }
};

const getCurrencyExchangeRate = async (source, target) => {
  console.info(`Calling Exchange rate API - ${source} to ${target}`);

  const url = process.env.MULESOFT_API_CURRENCY_EXCHANGE_RATE_URL;

  // API does not support XYZ to GBP conversion so we have to reverse and calculate
  let actualSource = source;
  let actualTarget = target;

  if (source !== 'GBP' && target === 'GBP') {
    actualSource = 'GBP';
    actualTarget = source;
  }

  try {
    const response = await axios({
      method: 'GET',
      url: `${url}?source=${actualSource}&target=${actualTarget}`,
      headers: {
        'Content-Type': 'application/json',
      },
      auth: {
        username: process.env.MULESOFT_API_CURRENCY_EXCHANGE_RATE_KEY,
        password: process.env.MULESOFT_API_CURRENCY_EXCHANGE_RATE_SECRET,
      },
    });

    const { status, data } = response;

    if (status !== 200) {
      throw new Error('Error fetching MDM-EA currency exchange rate');
    }

    const { midPrice } = data[0];

    const responseObj = {
      exchangeRate: midPrice,
    };

    // workaround for API not supporting XYZ to GBP conversion
    if (source !== 'GBP') {
      responseObj.exchangeRate = 1 / responseObj.exchangeRate;
    }

    return responseObj;
  } catch (err) {
    console.error('Unable to fetch MDM-EA currency exchange rate', err);
    return err;
  }
};

const api = {
  getCountries,
  getCurrencies,
  getCurrencyExchangeRate,
};

module.exports = api;
