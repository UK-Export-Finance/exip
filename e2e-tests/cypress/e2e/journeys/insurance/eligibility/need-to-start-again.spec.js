import { heading, submitButton, needToStartAgainPage } from '../../../pages/shared';
import { LINKS, ORGANISATION, PAGES } from '../../../../../content-strings';
import { ROUTES } from '../../../../../constants';
import partials from '../../../partials';
import { completeStartForm, completeCheckIfEligibleForm } from '../../../../support/insurance/eligibility/forms';

const CONTENT_STRINGS = PAGES.NEED_TO_START_AGAIN_PAGE;

const insuranceStartRoute = ROUTES.INSURANCE.START;
const buyerCountryRoute = ROUTES.INSURANCE.ELIGIBILITY.BUYER_COUNTRY;

context('Insurance Eligibility - Need to start again exit page', () => {
  beforeEach(() => {
    cy.navigateToUrl(ROUTES.INSURANCE.START);

    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('exip-session');

    completeStartForm();
    completeCheckIfEligibleForm();

    cy.url().should('include', ROUTES.INSURANCE.ELIGIBILITY.BUYER_COUNTRY);

    cy.navigateToUrl(ROUTES.INSURANCE.ELIGIBILITY.PRE_CREDIT_PERIOD);

    cy.url().should('include', ROUTES.INSURANCE.ELIGIBILITY.NEED_TO_START_AGAIN);
  });

  it('passes the audits', () => {
    cy.lighthouse({
      accessibility: 100,
      performance: 75,
      'best-practices': 100,
      seo: 60,
    });
  });

  it('renders an analytics cookies consent banner that can be accepted', () => {
    cy.checkAnalyticsCookiesConsentAndAccept();
  });

  it('renders an analytics cookies consent banner that can be rejected', () => {
    cy.rejectAnalyticsCookies();
  });

  it('renders a phase banner', () => {
    cy.checkPhaseBanner();
  });

  it('should render a header with href to insurance start', () => {
    partials.header.serviceName().should('have.attr', 'href', insuranceStartRoute);
  });

  it('renders a page title and heading', () => {
    const expectedPageTitle = `${CONTENT_STRINGS.PAGE_TITLE} - ${ORGANISATION}`;
    cy.title().should('eq', expectedPageTitle);

    cy.checkText(heading(), CONTENT_STRINGS.PAGE_TITLE);
  });

  it('renders a reason', () => {
    needToStartAgainPage.reason().should('exist');
  });

  it('renders a submit button', () => {
    submitButton().should('exist');

    cy.checkText(submitButton(), LINKS.START_AGAIN.TEXT);
  });

  describe('clicking the submit button', () => {
    it(`should redirect to ${buyerCountryRoute}`, () => {
      submitButton().click();

      const expected = `${Cypress.config('baseUrl')}${buyerCountryRoute}`;

      cy.url().should('eq', expected);
    });
  });
});
