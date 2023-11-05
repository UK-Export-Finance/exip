import noAccessToApplicationPage from '../../../../../pages/insurance/noAccessToApplication';
import { PAGES } from '../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';
import { COOKIE } from '../../../../../constants';

const CONTENT_STRINGS = PAGES.INSURANCE.NO_ACCESS_TO_APPLICATION_PAGE;

const {
  ROOT,
  ALL_SECTIONS,
  NO_ACCESS_TO_APPLICATION,
} = INSURANCE_ROUTES;

context('Insurance - no access to application page - signed out', () => {
  let referenceNumber;
  let applicationUrl;

  before(() => {
    cy.saveSession();

    // sign into an account, create an application.
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      applicationUrl = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      cy.assertUrl(applicationUrl);
    });
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe('when trying to access an application', () => {
    beforeEach(() => {
      // clear the session - means we are not a signed in user.
      cy.clearCookie(COOKIE.NAME.SESSION);

      cy.navigateToUrl(applicationUrl);
    });

    it(`should redirect to ${NO_ACCESS_TO_APPLICATION}`, () => {
      const expectedUrl = `${Cypress.config('baseUrl')}${NO_ACCESS_TO_APPLICATION}`;

      cy.assertUrl(expectedUrl);
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
