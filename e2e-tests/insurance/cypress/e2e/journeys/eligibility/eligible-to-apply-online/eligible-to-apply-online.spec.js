import { submitButton } from '../../../../../../pages/shared';
import { insurance } from '../../../../../../pages';
import { PAGES } from '../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { completeAndSubmitBuyerCountryForm } from '../../../../../../commands/forms';

const CONTENT_STRINGS = PAGES.INSURANCE.ELIGIBILITY.ELIGIBLE_TO_APPLY_ONLINE;

const {
  START,
  ELIGIBILITY: {
    ELIGIBLE_TO_APPLY_ONLINE,
    COMPANIES_HOUSE_NUMBER,
    ACCOUNT_TO_APPLY_ONLINE,
  },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Eligibility - You are eligible to apply online page - I want to check if I can use online service to apply for UKEF Export Insurance Policy for my export transaction', () => {
  let url;

  before(() => {
    cy.navigateToUrl(START);

    cy.completeStartForm();
    cy.completeCheckIfEligibleForm();

    cy.completeExporterLocationForm();
    cy.completeCompaniesHouseNumberForm();
    completeAndSubmitBuyerCountryForm();
    cy.completeInsuredAmountForm();
    cy.completeInsuredPeriodForm();
    cy.completeUkGoodsAndServicesForm();

    url = `${baseUrl}${ELIGIBLE_TO_APPLY_ONLINE}`;

    cy.assertUrl(url);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: ELIGIBLE_TO_APPLY_ONLINE,
      backLink: COMPANIES_HOUSE_NUMBER,
      submitButtonCopy: CONTENT_STRINGS.SUBMIT_BUTTON,
      assertAuthenticatedHeader: false,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('renders inset text', () => {
      insurance.eligibility.eligibleToApplyOnlinePage.insetText().should('exist');

      cy.checkText(insurance.eligibility.eligibleToApplyOnlinePage.insetText(), CONTENT_STRINGS.INSET);
    });

    it('renders body text', () => {
      insurance.eligibility.eligibleToApplyOnlinePage.body().should('exist');

      cy.checkText(insurance.eligibility.eligibleToApplyOnlinePage.body(), CONTENT_STRINGS.BODY);
    });

    describe('form submission', () => {
      it(`should redirect to ${ACCOUNT_TO_APPLY_ONLINE}`, () => {
        submitButton().click();

        const expectedUrl = `${baseUrl}${ACCOUNT_TO_APPLY_ONLINE}`;

        cy.assertUrl(expectedUrl);
      });
    });
  });
});
