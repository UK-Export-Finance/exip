import header from '../../../../partials/header';
import { HEADER } from '../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../constants/field-ids/insurance';
import mockAccount from '../../../../fixtures/account';

const {
  DASHBOARD,
  ACCOUNT: { MANAGE, SIGN_OUT },
} = INSURANCE_ROUTES;

const {
  ACCOUNT: { FIRST_NAME, LAST_NAME },
} = INSURANCE_FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - header - authenticated - As an Exporter, I want the system to have a login service header across every page of the digital service once I am signed in, So that I can easily access the header content anywhere on the application', () => {
  let referenceNumber;

  const dashboardUrl = `${baseUrl}${DASHBOARD}`;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe('`manage account` link', () => {
    beforeEach(() => {
      cy.navigateToAllSectionsUrl(referenceNumber);
    });

    const selector = header.navigation.manageAccount;

    it('should render', () => {
      const expectedAccountName = `${mockAccount[FIRST_NAME]} ${mockAccount[LAST_NAME]}`;

      cy.checkLink(selector(), MANAGE, expectedAccountName);
    });

    it(`should redirect to ${MANAGE} when clicking the link`, () => {
      selector().click();

      const expectedUrl = `${baseUrl}${MANAGE}`;

      cy.assertUrl(expectedUrl);
    });
  });

  describe('`my applications` link', () => {
    beforeEach(() => {
      cy.navigateToAllSectionsUrl(referenceNumber);
    });

    const selector = header.navigation.applications;

    it('should render', () => {
      cy.checkLink(selector(), DASHBOARD, HEADER.APPLICATIONS.TEXT);
    });

    it(`should redirect to ${DASHBOARD} when clicking the link`, () => {
      selector().click();

      cy.assertUrl(dashboardUrl);
    });
  });

  describe('`sign out` link', () => {
    beforeEach(() => {
      cy.navigateToAllSectionsUrl(referenceNumber);
    });

    const selector = header.navigation.signOut;

    it('should render', () => {
      cy.checkLink(selector(), SIGN_OUT, HEADER.SIGN_OUT.TEXT);
    });
  });
});
