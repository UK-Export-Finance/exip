import api from '../../api';
import { INSURANCE_ROUTES as ROUTES } from '../../../../constants/routes/insurance';
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
 * Create an account directly from the API,
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
  api.createAnAccount(urlOrigin, nameFirst, nameLast, emailAddress, accountPassword).then((createdExporter) => createdExporter)
    .then((createdAccount) => {
      const { verificationHash } = createdAccount;

      let url;

      if (!verificationHash) {
        url = `${urlOrigin}${VERIFY_EMAIL}?exists=${createdAccount.alreadyExists}-success=${createdAccount.success}-id=${createdAccount.id}`;

        return url;
      }

      url = `${urlOrigin}${VERIFY_EMAIL}?token=${verificationHash}`;

      return url;
    });

export default createAccount;
