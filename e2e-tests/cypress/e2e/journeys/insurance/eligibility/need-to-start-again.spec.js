import { submitButton, needToStartAgainPage } from '../../../pages/shared';
import { LINKS, PAGES } from '../../../../../content-strings';
import { ROUTES } from '../../../../../constants';
import partials from '../../../partials';
import { completeStartForm, completeCheckIfEligibleForm } from '../../../../support/insurance/eligibility/forms';

const CONTENT_STRINGS = PAGES.NEED_TO_START_AGAIN_PAGE;

const insuranceStartRoute = ROUTES.INSURANCE.START;
const buyerCountryRoute = ROUTES.INSURANCE.ELIGIBILITY.BUYER_COUNTRY;

context('Insurance Eligibility - Need to start again exit page', () => {
  beforeEach(() => {
    cy.navigateToUrl(ROUTES.INSURANCE.START);

    cy.saveSession();

    completeStartForm();
    completeCheckIfEligibleForm();

    cy.assertUrl(ROUTES.INSURANCE.ELIGIBILITY.BUYER_COUNTRY);

    cy.navigateToUrl(ROUTES.INSURANCE.ELIGIBILITY.PRE_CREDIT_PERIOD);

    cy.assertUrl(ROUTES.INSURANCE.ELIGIBILITY.NEED_TO_START_AGAIN);
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: ROUTES.INSURANCE.ELIGIBILITY.NEED_TO_START_AGAIN,
      backLink: ROUTES.INSURANCE.ELIGIBILITY.BUYER_COUNTRY,
      assertBackLink: false,
      submitButtonCopy: LINKS.START_AGAIN.TEXT,
      assertAuthenticatedHeader: false,
    });
  });

  it('should render a header with href to insurance start', () => {
    partials.header.serviceName().should('have.attr', 'href', insuranceStartRoute);
  });

  it('renders a reason', () => {
    needToStartAgainPage.reason().should('exist');
  });

  describe('clicking the submit button', () => {
    it(`should redirect to ${buyerCountryRoute}`, () => {
      submitButton().click();

      const expected = `${Cypress.config('baseUrl')}${buyerCountryRoute}`;

      cy.assertUrl(expected);
    });
  });
});
