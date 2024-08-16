import { field as fieldSelector } from '../../../../../../pages/shared';
import { PAGES, ERROR_MESSAGES } from '../../../../../../content-strings';
import { TOTAL_CONTRACT_VALUE } from '../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { FIELDS_ELIGIBILITY } from '../../../../../../content-strings/fields/insurance/eligibility';

const CONTENT_STRINGS = PAGES.INSURANCE.ELIGIBILITY.TOTAL_VALUE_INSURED;

const {
  ELIGIBILITY: { TOTAL_CONTRACT_VALUE: FIELD_ID },
} = INSURANCE_FIELD_IDS;

const {
  ELIGIBILITY: { BUYER_COUNTRY, TOTAL_VALUE_INSURED, COVER_PERIOD },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

const { ABOVE, BELOW } = FIELDS_ELIGIBILITY[FIELD_ID].OPTIONS;

context(
  'Insurance - Total value insured page - I want to enter the value that I want my export to be insured for so that I can obtain UKEF Credit Insurance for my export',
  () => {
    let url;

    before(() => {
      cy.completeAndSubmitEligibilityForms({ form: 'buyerCountry' });

      url = `${baseUrl}${TOTAL_VALUE_INSURED}`;

      cy.assertUrl(url);
    });

    beforeEach(() => {
      cy.saveSession();
    });

    it('renders core page elements', () => {
      cy.corePageChecks({
        pageTitle: CONTENT_STRINGS.PAGE_TITLE,
        currentHref: TOTAL_VALUE_INSURED,
        backLink: BUYER_COUNTRY,
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

      it(`renders a '${TOTAL_CONTRACT_VALUE.MORE_THAN_250K.VALUE}' radio button`, () => {
        const fieldId = `${FIELD_ID}-${ABOVE.ID}`;
        const field = fieldSelector(fieldId);

        field.input().should('exist');

        cy.checkText(field.label(), ABOVE.TEXT);
      });

      it(`renders a '${TOTAL_CONTRACT_VALUE.LESS_THAN_250K.VALUE}' radio button`, () => {
        const fieldId = `${FIELD_ID}-${BELOW.ID}`;
        const field = fieldSelector(fieldId);

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

          cy.completeAndSubmitTotalValueInsuredForm({ underThreshold: true });
        });

        it(`should redirect to ${COVER_PERIOD}`, () => {
          const expected = `${baseUrl}${COVER_PERIOD}`;

          cy.assertUrl(expected);
        });

        describe('when going back to the page', () => {
          it('should have the originally submitted answer selected', () => {
            cy.clickBackLink();

            cy.assertTotalValueInsuredRadios({ underThreshold: true });
          });
        });
      });

      describe('when submitting the answer as over the threshold', () => {
        beforeEach(() => {
          cy.navigateToUrl(url);

          cy.completeAndSubmitTotalValueInsuredForm({ underThreshold: false });
        });

        it(`should redirect to ${COVER_PERIOD}`, () => {
          const expected = `${baseUrl}${COVER_PERIOD}`;

          cy.assertUrl(expected);
        });

        describe('when going back to the page', () => {
          it('should have the originally submitted answer selected', () => {
            cy.clickBackLink();

            cy.assertTotalValueInsuredRadios({ underThreshold: false });
          });
        });
      });
    });
  },
);
