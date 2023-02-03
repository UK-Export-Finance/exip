import { confirmEmailPage } from '../../../../../pages/insurance/account/create';
import { PAGES } from '../../../../../../../content-strings';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES as ROUTES } from '../../../../../../../constants/routes/insurance';
import account from '../../../../../../fixtures/account';

const CONTENT_STRINGS = PAGES.INSURANCE.ACCOUNT.CREATE.CONFIRM_EMAIL;

const {
  START,
  ACCOUNT: { CREATE: { YOUR_DETAILS, CONFIRM_EMAIL } },
} = ROUTES;

const { ACCOUNT: { EMAIL } } = INSURANCE_FIELD_IDS;

context('Insurance - Account - Create - Confirm email page should render the submitted email', () => {
  before(() => {
    cy.navigateToUrl(START);

    cy.submitEligibilityAndStartAccountCreation();
    cy.completeAndSubmitCreateAccountForm();

    const expected = `${Cypress.config('baseUrl')}${CONFIRM_EMAIL}`;

    cy.url().should('eq', expected);
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  it('renders `sent a link to` with the submitted email', () => {
    const expectedEmail = account[EMAIL];

    const expected = `${CONTENT_STRINGS.WE_SENT_LINK_TO} ${expectedEmail}`;

    cy.checkText(confirmEmailPage.weSentLinkTo(), expected);
  });
});
