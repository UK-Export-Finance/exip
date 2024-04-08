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
  AGENT_DETAILS: { FULL_ADDRESS, COUNTRY_CODE },
} = FIELD_IDS;

const {
  INSURANCE: {
    EXPORT_CONTRACT: {
      AGENT_DETAILS: AGENT_DETAILS_ERROR_MESSAGES,
    },
  },
} = ERROR_MESSAGES;

const expectedErrorsCount = 2;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Export contract - Agent details page - As an Exporter, I want to give details about the agent that helped me win the export contract, So that UKEF can contact the appropriate parties to find out more about the working relationship', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      // go to the page we want to test.
      cy.startInsuranceExportContractSection({});
      cy.completeAndSubmitAboutGoodsOrServicesForm({});
      cy.completeAndSubmitHowYouWillGetPaidForm({});
      cy.completeAndSubmitAgentForm({ usingAgent: true });

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${AGENT_DETAILS}`;
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe(FULL_ADDRESS, () => {
    const field = fieldSelector(FULL_ADDRESS);

    const textareaField = {
      ...field,
      input: field.textarea,
    };

    const errorIndex = 0;

    const ERROR_MESSAGES_OBJECT = AGENT_DETAILS_ERROR_MESSAGES[FULL_ADDRESS];

    it(`should render validation errors when ${FULL_ADDRESS} is left empty`, () => {
      cy.navigateToUrl(url);

      cy.submitAndAssertFieldErrors({
        field: textareaField,
        errorIndex,
        expectedErrorsCount,
        expectedErrorMessage: ERROR_MESSAGES_OBJECT.IS_EMPTY,
      });
    });

    it(`should render validation errors when ${FULL_ADDRESS} is over ${MAXIMUM_CHARACTERS.FULL_ADDRESS} characters`, () => {
      cy.navigateToUrl(url);

      cy.submitAndAssertFieldErrors({
        field: textareaField,
        value: 'a'.repeat(MAXIMUM_CHARACTERS.FULL_ADDRESS + 1),
        errorIndex,
        expectedErrorsCount,
        expectedErrorMessage: ERROR_MESSAGES_OBJECT.ABOVE_MAXIMUM,
      });
    });
  });

  describe(COUNTRY_CODE, () => {
    it(`should render validation errors when ${COUNTRY_CODE} is left empty`, () => {
      cy.navigateToUrl(url);

      cy.submitAndAssertFieldErrors({
        field: autoCompleteField(COUNTRY_CODE),
        errorIndex: 1,
        expectedErrorsCount,
        expectedErrorMessage: AGENT_DETAILS_ERROR_MESSAGES[COUNTRY_CODE].IS_EMPTY,
      });
    });
  });
});
