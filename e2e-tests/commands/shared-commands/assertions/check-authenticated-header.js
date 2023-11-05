import { HEADER } from '../../../content-strings';
import { ROUTES } from '../../../constants';
import { INSURANCE_FIELD_IDS } from '../../../constants/field-ids/insurance';
import header from '../../../partials/header';
import mockAccount from '../../../fixtures/account';

const {
  INSURANCE: {
    DASHBOARD,
    ACCOUNT: { MANAGE, SIGN_OUT },
  },
} = ROUTES;

const {
  ACCOUNT: { FIRST_NAME, LAST_NAME },
} = INSURANCE_FIELD_IDS;

/**
 * checkAuthenticatedHeader
 * Run authenticated header check
 */
const checkAuthenticatedHeader = () => {
  const expectedAccountName = `${mockAccount[FIRST_NAME]} ${mockAccount[LAST_NAME]}`;

  cy.checkLink(header.navigation.manageAccount(), MANAGE, expectedAccountName);
  cy.checkLink(header.navigation.applications(), DASHBOARD, HEADER.APPLICATIONS.TEXT);
  cy.checkLink(header.navigation.signOut(), SIGN_OUT, HEADER.SIGN_OUT.TEXT);
};

export default checkAuthenticatedHeader;
