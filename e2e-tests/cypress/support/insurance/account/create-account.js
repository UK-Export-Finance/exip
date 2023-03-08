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

/**
 * createAccount
 * Create an exporter account directly from the API,
 * @returns {String} URL to verify the account verification URL
 */
const createAccount = () =>
  api.createExporterAccount(firstName, lastName, email, password).then((createdExporter) => createdExporter)
    .then((exporter) => {
      const { verificationHash } = exporter;

      const url = `${Cypress.config('baseUrl')}${VERIFY_EMAIL}?token=${verificationHash}`;

      return url;
    });

export default createAccount;
