import deleteAccount from './delete-account';
import api from '../../api';
import { INSURANCE_ROUTES as ROUTES } from '../../../constants/routes/insurance';
import account from '../../../fixtures/account';

const {
  ACCOUNT: { CREATE: { VERIFY_EMAIL } },
} = ROUTES;

const {
  firstName,
  lastName,
  email,
  password,
} = account;

const urlOrigin = Cypress.config('baseUrl');

/**
 * createAccount
 * Delete and create an account directly from the API,
 * @param {String}: First name
 * @param {String}: Last name
 * @param {String}: Email address
 * @param {String}: Password
 * @returns {String} URL to verify the account verification URL
 */
const createAccount = ({
  nameFirst = firstName,
  nameLast = lastName,
  emailAddress = email,
  accountPassword = password,
}) =>
  deleteAccount(emailAddress).then(() =>
    api.createAnAccount(urlOrigin, nameFirst, nameLast, emailAddress, accountPassword).then((createdAccount) => createdAccount)
      .then((createdAccount) => {
        const { id: accountId, verificationHash } = createdAccount;

        const verifyAccountUrl = `${urlOrigin}${VERIFY_EMAIL}?token=${verificationHash}&id=${accountId}`;

        return { accountId, verifyAccountUrl };
      }));

export default createAccount;
