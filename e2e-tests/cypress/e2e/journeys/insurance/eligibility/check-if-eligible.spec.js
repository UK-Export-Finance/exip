import { submitButton } from '../../../pages/shared';
import { insurance } from '../../../pages';
import { PAGES } from '../../../../../content-strings';
import { ROUTES } from '../../../../../constants';
import { completeStartForm } from '../../../../support/insurance/eligibility/forms';

const CONTENT_STRINGS = PAGES.INSURANCE.ELIGIBILITY.CHECK_IF_ELIGIBLE;

const insuranceStartRoute = ROUTES.INSURANCE.START;

context('Insurance Eligibility - check if eligible page', () => {
  before(() => {
    cy.navigateToUrl(ROUTES.INSURANCE.START);

    completeStartForm();

    cy.url().should('include', ROUTES.INSURANCE.ELIGIBILITY.CHECK_IF_ELIGIBLE);
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: ROUTES.INSURANCE.ELIGIBILITY.CHECK_IF_ELIGIBLE,
      expectedBackLink: insuranceStartRoute,
    });
  });

  it('renders a body text', () => {
    cy.checkText(insurance.eligibility.checkIfEligiblePage.body(), CONTENT_STRINGS.BODY);
  });

  context('form submission', () => {
    it(`should redirect to ${ROUTES.INSURANCE.ELIGIBILITY.BUYER_COUNTRY}`, () => {
      submitButton().click();

      const expected = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ELIGIBILITY.BUYER_COUNTRY}`;

      cy.url().should('eq', expected);
    });
  });
});
