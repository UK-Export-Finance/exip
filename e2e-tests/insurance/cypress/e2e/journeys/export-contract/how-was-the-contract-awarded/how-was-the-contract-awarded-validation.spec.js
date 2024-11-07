import { field as fieldSelector, radios } from '../../../../../../pages/shared';
import { MAXIMUM_CHARACTERS } from '../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { EXPORT_CONTRACT as EXPORT_CONTRACT_FIELD_IDS } from '../../../../../../constants/field-ids/insurance/export-contract';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import { EXPORT_CONTRACT_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance';

const {
  ROOT,
  EXPORT_CONTRACT: { HOW_WAS_THE_CONTRACT_AWARDED },
} = INSURANCE_ROUTES;

const {
  HOW_WAS_THE_CONTRACT_AWARDED: { AWARD_METHOD, OTHER_AWARD_METHOD },
} = EXPORT_CONTRACT_FIELD_IDS;

const AWARD_METHOD_OPTIONS = FIELDS.HOW_WAS_THE_CONTRACT_AWARDED[AWARD_METHOD].OPTIONS;

const {
  INSURANCE: {
    EXPORT_CONTRACT: { HOW_WAS_THE_CONTRACT_AWARDED: ERROR_MESSAGES_OBJECT },
  },
} = ERROR_MESSAGES;

const OTHER_AWARD_METHOD_MAXIMUM_CHARACTERS = MAXIMUM_CHARACTERS.EXPORT_CONTRACT.OTHER_AWARD_METHOD;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Export contract - How was the contract awarded page - form validation', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      // go to the page we want to test.
      cy.startInsuranceExportContractSection({});

      url = `${baseUrl}${ROOT}/${referenceNumber}${HOW_WAS_THE_CONTRACT_AWARDED}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe('when no radios are selected', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('should render validation error', () => {
      const expectedErrorMessage = ERROR_MESSAGES_OBJECT[AWARD_METHOD].IS_EMPTY;

      const radioField = {
        ...fieldSelector(AWARD_METHOD),
        input: fieldSelector(AWARD_METHOD_OPTIONS.OPEN_TENDER.VALUE).input,
      };

      cy.submitAndAssertRadioErrors({
        field: radioField,
        expectedErrorsCount: 1,
        expectedErrorMessage,
      });
    });
  });

  describe(`when ${AWARD_METHOD_OPTIONS.OTHER.TEXT} is selected`, () => {
    const selector = radios(AWARD_METHOD_OPTIONS.OTHER.VALUE).option;

    const assertions = {
      field: fieldSelector(OTHER_AWARD_METHOD),
      errorIndex: 0,
      expectedErrorsCount: 1,
    };

    beforeEach(() => {
      cy.navigateToUrl(url);

      radios(AWARD_METHOD_OPTIONS.OTHER.VALUE).option.label().click();
    });

    it(`should pre-select the method option and render validation errors when ${OTHER_AWARD_METHOD} is empty`, () => {
      const expectedErrorMessage = ERROR_MESSAGES_OBJECT[OTHER_AWARD_METHOD].IS_EMPTY;

      cy.submitAndAssertFieldErrors({ ...assertions, expectedErrorMessage });
    });

    it(`should pre-select the method option and render validation errors when ${OTHER_AWARD_METHOD} is over ${OTHER_AWARD_METHOD_MAXIMUM_CHARACTERS} characters`, () => {
      const value = 'a'.repeat(OTHER_AWARD_METHOD_MAXIMUM_CHARACTERS + 1);

      const expectedErrorMessage = ERROR_MESSAGES_OBJECT[OTHER_AWARD_METHOD].ABOVE_MAXIMUM;

      cy.submitAndAssertFieldErrors({ ...assertions, value, expectedErrorMessage });

      cy.assertRadioOptionIsChecked(selector.input());
    });
  });
});
