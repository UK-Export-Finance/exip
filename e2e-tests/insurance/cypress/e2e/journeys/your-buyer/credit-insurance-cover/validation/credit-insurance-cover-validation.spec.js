import { field as fieldSelector, noRadioInput } from '../../../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { MAXIMUM_CHARACTERS } from '../../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { YOUR_BUYER as FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/your-buyer';

const {
  HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER,
  PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER,
} = FIELD_IDS;

const {
  INSURANCE: {
    YOUR_BUYER: ERRORS,
  },
} = ERROR_MESSAGES;

const {
  ROOT,
  YOUR_BUYER: { CREDIT_INSURANCE_COVER },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Your Buyer - Credit insurance cover - form validation', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({ totalContractValueOverThreshold: true }).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsuranceYourBuyerSection({});

      url = `${baseUrl}${ROOT}/${referenceNumber}${CREDIT_INSURANCE_COVER}`;

      cy.completeAndSubmitCompanyOrOrganisationForm({});
      cy.completeAndSubmitConnectionToTheBuyerForm({});
      cy.completeAndSubmitTradedWithBuyerForm({ exporterHasTradedWithBuyer: true });
      cy.completeAndSubmitTradingHistoryWithBuyerForm({});

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe(`${HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER} not selected`, () => {
    const FIELD_ID = HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER;

    it('should display validation errors', () => {
      cy.navigateToUrl(url);

      const radioField = {
        ...fieldSelector(FIELD_ID),
        input: noRadioInput,
      };

      cy.submitAndAssertRadioErrors({
        field: radioField,
        expectedErrorMessage: ERRORS[FIELD_ID].IS_EMPTY,
      });
    });
  });

  describe(`${HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER} yes selected`, () => {
    const FIELD_ID = PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER;

    const field = fieldSelector(FIELD_ID);
    const textareaField = { ...field, input: field.textarea };

    const assertions = { field: textareaField };

    beforeEach(() => {
      cy.clickYesRadioInput();
    });

    it(`should render a validation error when ${FIELD_ID} is empty`, () => {
      cy.submitAndAssertFieldErrors({
        ...assertions,
        expectedErrorMessage: ERRORS[FIELD_ID].IS_EMPTY,
      });
    });

    it(`should render a validation error when ${FIELD_ID} is above the maximum`, () => {
      cy.submitAndAssertFieldErrors({
        ...assertions,
        value: 'a'.repeat(MAXIMUM_CHARACTERS.BUYER_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER + 1),
        expectedErrorMessage: ERRORS[FIELD_ID].ABOVE_MAXIMUM,
      });
    });
  });
});
