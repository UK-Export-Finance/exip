import { autoCompleteField, field as fieldSelector } from '../../../../../../../pages/shared';
import { MAXIMUM_CHARACTERS } from '../../../../../../../constants';
import FIELD_IDS from '../../../../../../../constants/field-ids/insurance/export-contract';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';

const {
  ROOT: INSURANCE_ROOT,
  EXPORT_CONTRACT: { AGENT_DETAILS },
} = INSURANCE_ROUTES;

const {
  AGENT_DETAILS: { NAME, FULL_ADDRESS, COUNTRY_CODE },
} = FIELD_IDS;

const {
  INSURANCE: {
    EXPORT_CONTRACT: {
      AGENT_DETAILS: AGENT_DETAILS_ERROR_MESSAGES,
    },
  },
} = ERROR_MESSAGES;

const expectedErrorsCount = 3;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Export contract - Agent details page - form validation', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      // go to the page we want to test.
      cy.startInsuranceExportContractSection({});
      cy.completeAndSubmitAboutGoodsOrServicesForm({});
      cy.completeAndSubmitHowYouWillGetPaidForm({});
      cy.completeAndSubmitAgentForm({ isUsingAgent: true });

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${AGENT_DETAILS}`;
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe(NAME, () => {
    const assertions = {
      field: fieldSelector(NAME),
      errorIndex: 0,
      expectedErrorsCount,
    };

    const ERROR_MESSAGES_OBJECT = AGENT_DETAILS_ERROR_MESSAGES[NAME];

    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it(`should render validation errors when ${NAME} is over ${MAXIMUM_CHARACTERS.AGENT_NAME} characters`, () => {
      const value = 'a'.repeat(MAXIMUM_CHARACTERS.AGENT_NAME + 1);

      cy.submitAndAssertFieldErrors({ ...assertions, value, expectedErrorMessage: ERROR_MESSAGES_OBJECT.ABOVE_MAXIMUM });
    });

    it(`should render validation errors when ${NAME} contains a special character`, () => {
      const value = 'a!';

      cy.submitAndAssertFieldErrors({ ...assertions, value, expectedErrorMessage: ERROR_MESSAGES_OBJECT.INCORRECT_FORMAT });
    });

    it(`should render validation errors when ${NAME} contains a number`, () => {
      const value = 'a1';

      cy.submitAndAssertFieldErrors({ ...assertions, value, expectedErrorMessage: ERROR_MESSAGES_OBJECT.INCORRECT_FORMAT });
    });

    it(`should render validation errors when ${NAME} contains a number and special character`, () => {
      const value = 'a1!';

      cy.submitAndAssertFieldErrors({ ...assertions, value, expectedErrorMessage: ERROR_MESSAGES_OBJECT.INCORRECT_FORMAT });
    });

    it('should retain all submitted values', () => {
      cy.completeAndSubmitAgentDetailsForm({
        name: null,
      });

      cy.assertAgentDetailsFieldValues({
        expectedName: null,
      });
    });
  });

  describe(FULL_ADDRESS, () => {
    const field = fieldSelector(FULL_ADDRESS);

    const textareaField = {
      ...field,
      input: field.textarea,
    };

    const errorIndex = 1;
    const ERROR_MESSAGES_OBJECT = AGENT_DETAILS_ERROR_MESSAGES[FULL_ADDRESS];

    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it(`should render validation errors when ${FULL_ADDRESS} is left empty`, () => {
      cy.submitAndAssertFieldErrors({
        field: textareaField,
        errorIndex,
        expectedErrorsCount,
        expectedErrorMessage: ERROR_MESSAGES_OBJECT.IS_EMPTY,
      });
    });

    it(`should render validation errors when ${FULL_ADDRESS} is over ${MAXIMUM_CHARACTERS.FULL_ADDRESS} characters`, () => {
      cy.submitAndAssertFieldErrors({
        field: textareaField,
        value: 'a'.repeat(MAXIMUM_CHARACTERS.FULL_ADDRESS + 1),
        errorIndex,
        expectedErrorsCount,
        expectedErrorMessage: ERROR_MESSAGES_OBJECT.ABOVE_MAXIMUM,
      });
    });

    it('should retain all submitted values', () => {
      cy.completeAndSubmitAgentDetailsForm({
        fullAddress: null,
      });

      cy.assertAgentDetailsFieldValues({
        expectedFullAddress: null,
      });
    });
  });

  describe(COUNTRY_CODE, () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it(`should render validation errors when ${COUNTRY_CODE} is left empty`, () => {
      cy.submitAndAssertFieldErrors({
        field: autoCompleteField(COUNTRY_CODE),
        errorIndex: 2,
        expectedErrorsCount,
        expectedErrorMessage: AGENT_DETAILS_ERROR_MESSAGES[COUNTRY_CODE].IS_EMPTY,
      });
    });

    it('should retain all submitted values', () => {
      cy.completeAndSubmitAgentDetailsForm({
        countryCode: null,
      });

      cy.assertAgentDetailsFieldValues({
        expectedCountryCode: null,
      });
    });

    describe(`when ${COUNTRY_CODE} is provided, but there are other validation errors`, () => {
      it(`should retain the submitted ${COUNTRY_CODE}`, () => {
        cy.completeAndSubmitAgentDetailsForm({
          name: null,
          fullAddress: null,
        });

        cy.assertAgentDetailsFieldValues({
          expectedName: null,
          expectedFullAddress: null,
        });
      });
    });
  });
});
