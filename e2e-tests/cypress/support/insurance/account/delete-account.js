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
    // get the account.
    api.getAccountByEmail(email).then((response) => {
      const { data } = response.body;

      const [firstAccount] = data.accounts;
      const account = firstAccount;

      return api.deleteAnAccount(email).then((id) => id);
    });
  } catch (err) {
    console.error(err);

    throw new Error('Deleting account');
  }
};

export default deleteAccount;
