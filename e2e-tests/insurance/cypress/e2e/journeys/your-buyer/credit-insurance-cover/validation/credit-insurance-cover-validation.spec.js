import { field, noRadioInput } from '../../../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { YOUR_BUYER as FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/your-buyer';
import { YOUR_BUYER_FIELDS } from '../../../../../../../content-strings/fields/insurance/your-buyer';

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

const { MAXIMUM } = YOUR_BUYER_FIELDS[PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER];

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

  const submittedValue = 'a'.repeat(MAXIMUM + 1);

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  const expectedErrorsCount = 1;
  const errorIndex = 0;
  const errorMessage = ERRORS[HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER].IS_EMPTY;

  describe(`${HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER} not selected`, () => {
    it('should display validation errors', () => {
      cy.navigateToUrl(url);

      const radioField = {
        ...field(HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER),
        input: noRadioInput,
      };

      cy.submitAndAssertRadioErrors(radioField, errorIndex, expectedErrorsCount, errorMessage);
    });
  });

  describe(`${HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER} yes selected`, () => {
    const fieldId = PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER;
    const textareaField = { ...field(fieldId), input: field(fieldId).textarea };

    beforeEach(() => {
      cy.clickYesRadioInput();
    });

    it(`should render a validation error when ${fieldId} is empty`, () => {
      cy.submitAndAssertFieldErrors(
        textareaField,
        null,
        0,
        expectedErrorsCount,
        ERRORS[fieldId].IS_EMPTY,
      );
    });

    it(`should render a validation error when ${fieldId} is above the maximum`, () => {
      cy.submitAndAssertFieldErrors(
        textareaField,
        submittedValue,
        0,
        expectedErrorsCount,
        ERRORS[fieldId].ABOVE_MAXIMUM,
      );
    });
  });
});
