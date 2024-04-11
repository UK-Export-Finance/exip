import { field as fieldSelector, noRadioInput } from '../../../../../../../pages/shared';
import { MAXIMUM_CHARACTERS } from '../../../../../../../constants';
import FIELD_IDS from '../../../../../../../constants/field-ids/insurance/export-contract';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';

const {
  ROOT: INSURANCE_ROOT,
  EXPORT_CONTRACT: { AGENT_SERVICE },
} = INSURANCE_ROUTES;

const {
  AGENT_SERVICE: { IS_CHARGING, SERVICE_DESCRIPTION },
} = FIELD_IDS;

const {
  INSURANCE: {
    EXPORT_CONTRACT: {
      AGENT_SERVICE: AGENT_SERVICE_ERROR_MESSAGES,
    },
  },
} = ERROR_MESSAGES;

const expectedErrorsCount = 2;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Export contract - Agent service page - form validation', () => {
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
      cy.completeAndSubmitAgentDetailsForm({});

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${AGENT_SERVICE}`;
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe(SERVICE_DESCRIPTION, () => {
    const field = fieldSelector(SERVICE_DESCRIPTION);

    const textareaField = {
      ...field,
      input: field.textarea,
    };

    const ERROR_MESSAGES_OBJECT = AGENT_SERVICE_ERROR_MESSAGES[SERVICE_DESCRIPTION];

    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it(`should render validation errors when ${SERVICE_DESCRIPTION} is left empty`, () => {
      cy.submitAndAssertFieldErrors({
        field: textareaField,
        expectedErrorsCount,
        expectedErrorMessage: ERROR_MESSAGES_OBJECT.IS_EMPTY,
      });
    });

    it(`should render validation errors when ${SERVICE_DESCRIPTION} is over ${MAXIMUM_CHARACTERS.AGENT_SERVICE_DESCRIPTION} characters`, () => {
      cy.submitAndAssertFieldErrors({
        field: textareaField,
        value: 'a'.repeat(MAXIMUM_CHARACTERS.AGENT_SERVICE_DESCRIPTION + 1),
        expectedErrorsCount,
        expectedErrorMessage: ERROR_MESSAGES_OBJECT.ABOVE_MAXIMUM,
      });
    });
  });

  describe(IS_CHARGING, () => {
    it(`should render validation errors when ${IS_CHARGING} is left empty`, () => {
      cy.navigateToUrl(url);

      const radioField = {
        ...fieldSelector(IS_CHARGING),
        input: noRadioInput,
      };

      cy.submitAndAssertRadioErrors({
        field: radioField,
        errorIndex: 1,
        expectedErrorsCount,
        expectedErrorMessage: AGENT_SERVICE_ERROR_MESSAGES[IS_CHARGING].IS_EMPTY,
      });
    });
  });
});
