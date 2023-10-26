import { submitButton, needToStartAgainPage } from '../../../../../pages/shared';
import { LINKS, PAGES } from '../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';

const CONTENT_STRINGS = PAGES.NEED_TO_START_AGAIN_PAGE;

const {
  START,
  ELIGIBILITY: { BUYER_COUNTRY, EXPORTER_LOCATION, NEED_TO_START_AGAIN },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

const buyerCountryUrl = `${baseUrl}${BUYER_COUNTRY}`;
const exporterLocationUrl = `${baseUrl}${EXPORTER_LOCATION}`;

context('Insurance Eligibility - Need to start again exit page', () => {
  beforeEach(() => {
    cy.navigateToUrl(START);

    cy.saveSession();

    cy.completeStartForm();
    cy.completeCheckIfEligibleForm();

    cy.navigateToUrl(buyerCountryUrl);

    const expectedUrl = `${baseUrl}${NEED_TO_START_AGAIN}`;

    cy.assertUrl(expectedUrl);
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: NEED_TO_START_AGAIN,
      backLink: BUYER_COUNTRY,
      assertBackLink: false,
      submitButtonCopy: LINKS.START_AGAIN.TEXT,
      assertAuthenticatedHeader: false,
    });
  });

  it('renders a reason', () => {
    needToStartAgainPage.reason().should('exist');
  });

  describe('clicking the submit button', () => {
    it(`should redirect to ${EXPORTER_LOCATION}`, () => {
      submitButton().click();

      cy.assertUrl(exporterLocationUrl);
    });
  });
});
