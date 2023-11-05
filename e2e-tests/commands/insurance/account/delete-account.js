import api from '../../api';

const accountEmail = Cypress.env('GOV_NOTIFY_EMAIL_RECIPIENT_1');

/**
 * deleteAccount
 * Get an account and delete.
 * This prevents account tests from failing, where an account/email must be unique and verified.
 * @param {String}: Email address
 */
const deleteAccount = (email = accountEmail) => {
  try {
    const deleteResponse = api.deleteAnAccount(email).then((success) => success);

    return deleteResponse;
  } catch (err) {
    console.error('Deleting account', err);

    return err;
  }
};

export default deleteAccount;
