import api from '../../api';

/**
 * getAccountByEmail
 * Get an exporter directly from the API,
 * @param {string} Account email
 * @returns {object} Account
 */
const getAccountByEmail = (email) => {
  try {
    return api.getAccountByEmail(email);
  } catch (error) {
    console.error(error);

    throw new Error('Getting account by email');
  }
};

export default getAccountByEmail;
