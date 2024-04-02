import { field as fieldSelector } from '../../../../../../pages/shared';
import { PAGES, ERROR_MESSAGES } from '../../../../../../content-strings';
import { COVER_PERIOD } from '../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { completeAndSubmitBuyerCountryForm } from '../../../../../../commands/forms';
import { FIELDS_ELIGIBILITY } from '../../../../../../content-strings/fields/insurance/eligibility';

const CONTENT_STRINGS = PAGES.INSURANCE.ELIGIBILITY.COVER_PERIOD;

const {
  ELIGIBILITY: { COVER_PERIOD: FIELD_ID },
} = INSURANCE_FIELD_IDS;

const {
  START,
  ELIGIBILITY: {
    COVER_PERIOD: COVER_PERIOD_ROUTE,
    LONG_TERM_COVER,
    TOTAL_VALUE_INSURED,
    UK_GOODS_OR_SERVICES,
  },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

const { ABOVE, BELOW } = FIELDS_ELIGIBILITY[FIELD_ID].OPTIONS;

context('Insurance - Cover period page - I want to enter the length of my export contract, So that I can cover my exposure for the period of the contract', () => {
  let url;

  before(() => {
    cy.navigateToUrl(START);

    cy.completeStartForm();
    cy.completeCheckIfEligibleForm();
    cy.completeExporterLocationForm();
    cy.completeCompaniesHouseNumberForm();
    cy.completeAndSubmitCompaniesHouseSearchForm({});
    cy.completeEligibilityCompanyDetailsForm();
    completeAndSubmitBuyerCountryForm({});
    cy.completeAndSubmitTotalValueInsuredForm({});

    url = `${baseUrl}${COVER_PERIOD_ROUTE}`;

    cy.assertUrl(url);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: COVER_PERIOD_ROUTE,
      backLink: TOTAL_VALUE_INSURED,
      assertAuthenticatedHeader: false,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('renders a hint', () => {
      cy.checkText(fieldSelector(FIELD_ID).hint(), CONTENT_STRINGS.HINT);
    });

    it(`renders a '${COVER_PERIOD.LESS_THAN_2_YEARS.VALUE}' radio button`, () => {
      const field = fieldSelector(`${FIELD_ID}-${ABOVE.ID}`);

      field.input().should('exist');

      cy.checkText(field.label(), ABOVE.TEXT);
    });

    it(`renders a '${COVER_PERIOD.MORE_THAN_2_YEARS.VALUE}' radio button`, () => {
      const field = fieldSelector(`${FIELD_ID}-${BELOW.ID}`);

      field.input().should('exist');

      cy.checkText(field.label(), BELOW.TEXT);
    });
  });

  describe('form submission', () => {
    describe('when submitting an empty form', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it('should render validation errors', () => {
        const fieldId = `${FIELD_ID}-${BELOW.ID}`;

        const expectedErrorsCount = 1;

        cy.submitAndAssertRadioErrors({
          field: fieldSelector(fieldId),
          expectedErrorsCount,
          expectedErrorMessage: ERROR_MESSAGES.INSURANCE.ELIGIBILITY[FIELD_ID].IS_EMPTY,
        });
      });
    });

    describe('when submitting the answer as under the threshold', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        cy.completeCoverPeriodForm({ underThreshold: true });
      });

      it(`should redirect to ${UK_GOODS_OR_SERVICES}`, () => {
        const expected = `${baseUrl}${UK_GOODS_OR_SERVICES}`;

        cy.assertUrl(expected);
      });

      describe('when going back to the page', () => {
        it('should have the originally submitted answer selected', () => {
          cy.clickBackLink();

          cy.assertCoverPeriodRadios({ underThreshold: true });
        });
      });
    });

    describe('when submitting the answer as over the threshold', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        cy.completeCoverPeriodForm({ underThreshold: false });
      });

      it(`should redirect to ${LONG_TERM_COVER}`, () => {
        const expected = `${baseUrl}${LONG_TERM_COVER}`;

        cy.assertUrl(expected);
      });
    });
  });
});
