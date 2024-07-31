import { headingCaption } from '../../../../../../pages/shared';
import { howWillYouGetPaidPage } from '../../../../../../pages/insurance/export-contract';
import { EXPECTED_MULTI_LINE_STRING, MAXIMUM_CHARACTERS } from '../../../../../../constants';
import { ERROR_MESSAGES, PAGES } from '../../../../../../content-strings';
import { EXPORT_CONTRACT_FIELDS as FIELD_STRINGS } from '../../../../../../content-strings/fields/insurance/export-contract';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/export-contract';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const CONTENT_STRINGS = PAGES.INSURANCE.EXPORT_CONTRACT.HOW_WILL_YOU_GET_PAID;

const {
  ROOT,
  EXPORT_CONTRACT: { ABOUT_GOODS_OR_SERVICES, HOW_WILL_YOU_GET_PAID, AGENT },
} = INSURANCE_ROUTES;

const {
  HOW_WILL_YOU_GET_PAID: { PAYMENT_TERMS_DESCRIPTION: FIELD_ID },
} = FIELD_IDS;

const {
  INSURANCE: {
    EXPORT_CONTRACT: { HOW_WILL_YOU_GET_PAID: ERRORS },
  },
} = ERROR_MESSAGES;

const field = howWillYouGetPaidPage[FIELD_ID];
const expectedErrorsCount = 1;

const baseUrl = Cypress.config('baseUrl');

context(
  'Insurance - Export contract - How will you get paid page - As an exporter, I want to provide information on how I will be paid for my export, So that UKEF can have clarity on the payment terms I have with the buyer',
  () => {
    let referenceNumber;
    let url;

    before(() => {
      cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
        referenceNumber = refNumber;

        // go to the page we want to test.
        cy.startInsuranceExportContractSection({});
        cy.completeAndSubmitHowWasTheContractAwardedForm();
        cy.completeAndSubmitAboutGoodsOrServicesForm({});

        url = `${baseUrl}${ROOT}/${referenceNumber}${HOW_WILL_YOU_GET_PAID}`;
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
        currentHref: `${ROOT}/${referenceNumber}${HOW_WILL_YOU_GET_PAID}`,
        backLink: `${ROOT}/${referenceNumber}${ABOUT_GOODS_OR_SERVICES}`,
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
        const { HINT } = FIELD_STRINGS.HOW_WILL_YOU_GET_PAID[FIELD_ID];

        cy.checkText(field.hint.intro(), HINT.INTRO);

        cy.checkText(field.hint.list.item1(), HINT.LIST[0]);
        cy.checkText(field.hint.list.item2(), HINT.LIST[1]);
        cy.checkText(field.hint.list.item3(), HINT.LIST[2]);

        cy.checkText(field.hint.outro(), HINT.OUTRO);

        cy.assertTextareaRendering({
          fieldId: FIELD_ID,
          maximumCharacters: MAXIMUM_CHARACTERS.PAYMENT_TERMS_DESCRIPTION,
        });
      });

      it('renders a `save and back` button', () => {
        cy.assertSaveAndBackButton();
      });
    });

    describe('form validation', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it(`should display validation errors if ${FIELD_ID} is left empty`, () => {
        cy.submitAndAssertFieldErrors({
          field,
          expectedErrorsCount,
          expectedErrorMessage: ERRORS[FIELD_ID].IS_EMPTY,
        });
      });

      describe(`when ${FIELD_ID} is over ${MAXIMUM_CHARACTERS.PAYMENT_TERMS_DESCRIPTION} characters`, () => {
        it('should display validation errors and retain the submitted value', () => {
          const submittedValue = 'a'.repeat(MAXIMUM_CHARACTERS.PAYMENT_TERMS_DESCRIPTION + 1);

          cy.submitAndAssertFieldErrors({
            field,
            value: submittedValue,
            expectedErrorsCount,
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
      it(`should redirect to ${AGENT}`, () => {
        cy.navigateToUrl(url);

        cy.completeAndSubmitHowYouWillGetPaidForm({});

        const expectedUrl = `${baseUrl}${ROOT}/${referenceNumber}${AGENT}`;
        cy.assertUrl(expectedUrl);
      });

      it('should retain the status of task `export contract` as `in progress`', () => {
        cy.navigateToAllSectionsUrl(referenceNumber);

        cy.checkTaskExportContractStatusIsInProgress();
      });

      describe('when going back to the page', () => {
        it('should have the submitted values', () => {
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
