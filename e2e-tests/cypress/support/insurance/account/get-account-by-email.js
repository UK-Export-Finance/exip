import api from '../../api';

/**
 * getAccountByEmail
 * Get an exporter directly from the API,
 * @param {String} Account email
 * @returns {Object} Account
 */
const getAccountByEmail = (email) => {
  try {
    api.getAccountByEmail(email).then((response) => {
      if (!response?.body || !response?.body?.data) {
        throw new Error('Getting account by email', { response });
      }

      return response;
    });
  } catch (err) {
    console.error(err);

    throw new Error('Getting account by email');
  }
};

export default getAccountByEmail;
