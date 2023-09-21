import api from '../../api';

/**
 * getAccountByEmail
 * Get an exporter directly from the API,
 * @param {String} Account email
 * @returns {Object} Account
 */
const getAccountByEmail = (email) => {
  try {
    return api.getAccountByEmail(email);
  } catch (err) {
    console.error(err);

    throw new Error('Getting account by email');
  }
};

export default getAccountByEmail;
