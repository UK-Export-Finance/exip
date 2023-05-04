import noAccessApplicationSubmittedPage from '../../pages/insurance/noAccessApplicationSubmitted';
import dashboardPage from '../../pages/insurance/dashboard';
import { PAGES } from '../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';

const CONTENT_STRINGS = PAGES.INSURANCE.NO_ACCESS_APPLICATION_SUBMITTED_PAGE;

const { table } = dashboardPage;

const {
  ROOT,
  DASHBOARD,
  APPLICATION_SUBMITTED,
  NO_ACCESS_APPLICATION_SUBMITTED,
} = INSURANCE_ROUTES;

context('Insurance - no access to application when application is submitted', () => {
  let referenceNumber;
  const url = `${Cypress.config('baseUrl')}${DASHBOARD}`;

  before(() => {
    cy.completeSignInAndSubmitAnApplication({}).then((refNumber) => {
      referenceNumber = refNumber;

      const submittedUrl = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${APPLICATION_SUBMITTED}`;

      cy.url().should('eq', submittedUrl);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteAccountAndApplication(referenceNumber);
  });

  describe('when trying to access an application which has already been submitted', () => {
    beforeEach(() => {
      cy.saveSession();

      cy.navigateToUrl(url);

      table.body.firstRow.referenceNumber().click();
    });

    it(`should redirect to ${NO_ACCESS_APPLICATION_SUBMITTED}`, () => {
      const expectedUrl = `${Cypress.config('baseUrl')}${NO_ACCESS_APPLICATION_SUBMITTED}`;

      cy.url().should('eq', expectedUrl);
    });

    it('renders core page elements', () => {
      cy.corePageChecks({
        pageTitle: CONTENT_STRINGS.PAGE_TITLE,
        currentHref: NO_ACCESS_APPLICATION_SUBMITTED,
        assertSubmitButton: false,
        backLink: DASHBOARD,
      });
    });

    it('renders the correct text on the page', () => {
      cy.checkText(noAccessApplicationSubmittedPage.processingText(), CONTENT_STRINGS.PROCESSING);
      cy.checkText(noAccessApplicationSubmittedPage.furtherInformation(), CONTENT_STRINGS.CONTACT_FURTHER_INFORMATION);
      cy.checkText(noAccessApplicationSubmittedPage.withdraw(), CONTENT_STRINGS.WITHDRAW);
      cy.checkText(noAccessApplicationSubmittedPage.contact(), CONTENT_STRINGS.CONTACT);
    });
  });
});
