import { field } from '../../../../../../pages/shared';
import { PAGES, ERROR_MESSAGES } from '../../../../../../content-strings';
import { ROUTES } from '../../../../../../constants';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { completeAndSubmitBuyerCountryForm } from '../../../../../../commands/forms';
import { FIELDS_ELIGIBILITY } from '../../../../../../content-strings/fields/insurance/eligibility';

const CONTENT_STRINGS = PAGES.INSURANCE.ELIGIBILITY.TOTAL_VALUE_INSURED;

const {
  ELIGIBILITY: { TOTAL_CONTRACT_VALUE: FIELD_ID },
} = INSURANCE_FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

const { ABOVE, BELOW } = FIELDS_ELIGIBILITY[FIELD_ID].OPTIONS;

context('Insurance - Total value insured page - I want to enter the value that I want my export to be insured for so that I can obtain UKEF Credit Insurance for my export', () => {
  let url;

  before(() => {
    cy.navigateToUrl(ROUTES.INSURANCE.START);

    cy.completeStartForm();
    cy.completeCheckIfEligibleForm();
    cy.completeExporterLocationForm();
    cy.completeCompaniesHouseNumberForm();
    cy.completeAndSubmitCompaniesHouseSearchForm({});
    cy.completeEligibilityCompanyDetailsForm();
    completeAndSubmitBuyerCountryForm();

    url = `${baseUrl}${ROUTES.INSURANCE.ELIGIBILITY.TOTAL_VALUE_INSURED}`;

    cy.assertUrl(url);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: ROUTES.INSURANCE.ELIGIBILITY.TOTAL_VALUE_INSURED,
      backLink: ROUTES.INSURANCE.ELIGIBILITY.BUYER_COUNTRY,
      assertAuthenticatedHeader: false,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('renders a hint', () => {
      cy.checkText(field(FIELD_ID).hint(), CONTENT_STRINGS.HINT);
    });

    it('renders a `above 250k` radio button', () => {
      const fieldId = `${FIELD_ID}-${ABOVE.ID}`;

      field(fieldId).input().should('exist');

      cy.checkText(field(fieldId).label(), ABOVE.TEXT);
    });

    it('renders a `below 250k` radio button', () => {
      const fieldId = `${FIELD_ID}-${BELOW.ID}`;

      field(fieldId).input().should('exist');

      cy.checkText(field(fieldId).label(), BELOW.TEXT);
    });
  });

  describe('form submission', () => {
    describe('when submitting an empty form', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it('should render validation errors', () => {
        const fieldId = `${FIELD_ID}-${ABOVE.ID}`;

        const expectedErrorsCount = 1;

        cy.submitAndAssertRadioErrors(
          field(fieldId),
          0,
          expectedErrorsCount,
          ERROR_MESSAGES.INSURANCE.ELIGIBILITY[FIELD_ID].IS_EMPTY,
        );
      });
    });

    describe('when submitting the answer as the second option', () => {
      const fieldId = `${FIELD_ID}-${BELOW.ID}`;

      beforeEach(() => {
        cy.navigateToUrl(url);

        cy.completeAndSubmitTotalValueInsuredForm({ secondOption: true });
      });

      it(`should redirect to ${ROUTES.INSURANCE.ELIGIBILITY.INSURED_PERIOD}`, () => {
        const expected = `${baseUrl}${ROUTES.INSURANCE.ELIGIBILITY.INSURED_PERIOD}`;

        cy.assertUrl(expected);
      });

      describe('when going back to the page', () => {
        it('should have the originally submitted answer selected', () => {
          cy.clickBackLink();

          field(fieldId).input().should('be.checked');
        });
      });
    });

    describe('when submitting the answer as as the first option', () => {
      const fieldId = `${FIELD_ID}-${ABOVE.ID}`;

      beforeEach(() => {
        cy.navigateToUrl(url);

        cy.completeAndSubmitTotalValueInsuredForm({});
      });

      it(`should redirect to ${ROUTES.INSURANCE.ELIGIBILITY.INSURED_PERIOD}`, () => {
        const expected = `${baseUrl}${ROUTES.INSURANCE.ELIGIBILITY.INSURED_PERIOD}`;

        cy.assertUrl(expected);
      });

      describe('when going back to the page', () => {
        it('should have the originally submitted answer selected', () => {
          cy.clickBackLink();

          field(fieldId).input().should('be.checked');
        });
      });
    });
  });
});
