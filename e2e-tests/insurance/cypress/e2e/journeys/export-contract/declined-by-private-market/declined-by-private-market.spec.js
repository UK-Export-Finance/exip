import { field as fieldSelector, headingCaption } from '../../../../../../pages/shared';
import { MAXIMUM_CHARACTERS, EXPECTED_MULTI_LINE_STRING } from '../../../../../../constants';
import { ERROR_MESSAGES, PAGES } from '../../../../../../content-strings';
import { EXPORT_CONTRACT_FIELDS as FIELD_STRINGS } from '../../../../../../content-strings/fields/insurance/export-contract';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/export-contract';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const CONTENT_STRINGS = PAGES.INSURANCE.EXPORT_CONTRACT.DECLINED_BY_PRIVATE_MARKET;

const {
  ROOT,
  EXPORT_CONTRACT: { PRIVATE_MARKET, DECLINED_BY_PRIVATE_MARKET, AGENT },
} = INSURANCE_ROUTES;

const {
  PRIVATE_MARKET: { DECLINED_DESCRIPTION: FIELD_ID },
} = FIELD_IDS;

const {
  INSURANCE: {
    EXPORT_CONTRACT: { PRIVATE_MARKET: ERRORS },
  },
} = ERROR_MESSAGES;

const textareaField = {
  ...fieldSelector(FIELD_ID),
  input: fieldSelector(FIELD_ID).textarea,
};

const baseUrl = Cypress.config('baseUrl');

context(
  'Insurance - Export contract - Declined by private market page - As an exporter, I want to explain why I could not get insurance through the private market previously, So that UKEF can accurately assess the viability of my insurance application',
  () => {
    let referenceNumber;
    let url;
    let agentUrl;

    before(() => {
      cy.completeSignInAndGoToApplication({ totalContractValueOverThreshold: true }).then(({ referenceNumber: refNumber }) => {
        referenceNumber = refNumber;

        // go to the page we want to test.
        cy.completeAndSubmitExportContractForms({
          stopSubmittingAfter: 'privateMarket',
          totalContractValueOverThreshold: true,
          attemptedPrivateMarketCover: true,
        });

        url = `${baseUrl}${ROOT}/${referenceNumber}${DECLINED_BY_PRIVATE_MARKET}`;
        agentUrl = `${baseUrl}${ROOT}/${referenceNumber}${AGENT}`;
      });
    });

    beforeEach(() => {
      cy.saveSession();
    });

    after(() => {
      cy.deleteApplication(referenceNumber);
    });

    it('renders core page elements', () => {
      cy.corePageChecks({
        pageTitle: CONTENT_STRINGS.PAGE_TITLE,
        currentHref: `${ROOT}/${referenceNumber}${DECLINED_BY_PRIVATE_MARKET}`,
        backLink: `${ROOT}/${referenceNumber}${PRIVATE_MARKET}`,
      });
    });

    describe('page tests', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it('renders a heading caption', () => {
        cy.checkText(headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
      });

      it(`renders ${FIELD_ID} hint and textarea`, () => {
        const fieldStrings = FIELD_STRINGS.PRIVATE_MARKET[FIELD_ID];

        cy.assertTextareaRendering({
          fieldId: FIELD_ID,
          maximumCharacters: fieldStrings.MAXIMUM,
          expectedHint: fieldStrings.HINT,
        });
      });
    });

    describe('form validation', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it(`should render validation errors if ${FIELD_ID} is left empty`, () => {
        cy.submitAndAssertFieldErrors({
          field: textareaField,
          expectedErrorMessage: ERRORS[FIELD_ID].IS_EMPTY,
        });
      });

      describe(`when ${FIELD_ID} is over ${MAXIMUM_CHARACTERS.DECLINED_BY_PRIVATE_MARKET_DESCRIPTION} characters`, () => {
        it('should render validation errors and retain the submitted value', () => {
          const submittedValue = 'a'.repeat(MAXIMUM_CHARACTERS.DECLINED_BY_PRIVATE_MARKET_DESCRIPTION + 1);

          cy.submitAndAssertFieldErrors({
            field: textareaField,
            value: submittedValue,
            expectedErrorMessage: ERRORS[FIELD_ID].ABOVE_MAXIMUM,
          });

          cy.checkTextareaValue({
            fieldId: FIELD_ID,
            expectedValue: submittedValue,
          });
        });
      });
    });

    describe('form submission', () => {
      it(`should redirect to ${AGENT} page`, () => {
        cy.navigateToUrl(url);

        cy.completeAndSubmitDeclinedByPrivateMarketForm({});

        cy.assertUrl(agentUrl);
      });

      describe('after submitting the form', () => {
        it('should retain the `export contract` task status as `in progress`', () => {
          cy.navigateToUrl(url);

          cy.completeAndSubmitDeclinedByPrivateMarketForm({});

          cy.navigateToAllSectionsUrl(referenceNumber);

          cy.checkTaskExportContractStatusIsInProgress();
        });
      });

      describe('when going back to the page', () => {
        it('should have the submitted value', () => {
          cy.navigateToUrl(url);

          cy.checkTextareaValue({
            fieldId: FIELD_ID,
            expectedValue: EXPECTED_MULTI_LINE_STRING,
          });
        });
      });
    });
  },
);
