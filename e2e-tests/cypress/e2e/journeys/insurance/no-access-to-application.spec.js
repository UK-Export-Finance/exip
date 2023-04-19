import noAccessToApplicationPage from '../../pages/insurance/noAccessToApplication';
import { PAGES } from '../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';

const CONTENT_STRINGS = PAGES.INSURANCE.NO_ACCESS_TO_APPLICATION_PAGE;

const {
  ROOT,
  ALL_SECTIONS,
  NO_ACCESS_TO_APPLICATION,
} = INSURANCE_ROUTES;

context('Insurance - no access to application page', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.saveSession();

    // sign into an account, create an application.
    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumber = refNumber;

      url = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      cy.url().should('eq', url);
    });
  });

  after(() => {
    cy.deleteAccountAndApplication(referenceNumber);
  });

  describe('when trying to access an application created by another user', () => {
    beforeEach(() => {
      // clear the session - means we are not a logged in user.
      cy.clearCookie('exip-session');

      cy.navigateToUrl(url);
    });

    it(`should redirect to ${NO_ACCESS_TO_APPLICATION}`, () => {
      const expectedUrl = `${Cypress.config('baseUrl')}${NO_ACCESS_TO_APPLICATION}`;

      cy.url().should('eq', expectedUrl);
    });

    it('renders core page elements', () => {
      cy.corePageChecks({
        pageTitle: CONTENT_STRINGS.PAGE_TITLE,
        currentHref: NO_ACCESS_TO_APPLICATION,
        assertSubmitButton: false,
        assertBackLink: false,
        assertAuthenticatedHeader: false,
      });
    });

    it('renders `check URL` text', () => {
      cy.checkText(noAccessToApplicationPage.checkUrl(), CONTENT_STRINGS.CHECK_URL);
    });
  });
});
