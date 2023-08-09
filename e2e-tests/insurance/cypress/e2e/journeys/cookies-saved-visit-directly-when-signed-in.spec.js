import { FIELD_IDS, ROUTES } from '../../../../constants';
import { cookiesPage, cookiesSavedPage } from '../../../../pages';
import { submitButton } from '../../../../pages/shared';

const {
  INSURANCE: { COOKIES, DASHBOARD },
} = ROUTES;

context('Cookies saved page - Insurance - visit the page directly as a signed in user and submit the cookies form', () => {
  let referenceNumber;
  const baseUrl = Cypress.config('baseUrl');
  const dashboardUrl = `${baseUrl}${DASHBOARD}`;

  before(() => {
    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumber = refNumber;

      cy.navigateToUrl(COOKIES);

      cookiesPage[FIELD_IDS.OPTIONAL_COOKIES].acceptInput().click();

      submitButton().click();
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it('should render an authenticated header', () => {
    cy.checkAuthenticatedHeader();
  });

  describe('when clicking `return to service` link button', () => {
    beforeEach(() => {
      cy.navigateToUrl(COOKIES);

      cookiesPage[FIELD_IDS.OPTIONAL_COOKIES].acceptInput().click();

      submitButton().click();
    });

    it(`should redirect to the ${DASHBOARD}`, () => {
      cookiesSavedPage.returnToServiceLinkButton().click();

      cy.assertUrl(dashboardUrl);
    });
  });
});
