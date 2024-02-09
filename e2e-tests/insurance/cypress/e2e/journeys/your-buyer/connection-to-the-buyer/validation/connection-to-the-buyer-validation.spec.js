import { field, yesRadioInput } from '../../../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { YOUR_BUYER as FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/your-buyer';
import { YOUR_BUYER_FIELDS } from '../../../../../../../content-strings/fields/insurance/your-buyer';

const {
  CONNECTION_WITH_BUYER,
  CONNECTION_WITH_BUYER_DESCRIPTION,
} = FIELD_IDS;

const {
  INSURANCE: {
    YOUR_BUYER: ERRORS,
  },
} = ERROR_MESSAGES;

const {
  ROOT: INSURANCE_ROOT,
  YOUR_BUYER: { CONNECTION_WITH_BUYER: CONNECTION_WITH_BUYER_ROUTE },
} = INSURANCE_ROUTES;

const { MAXIMUM } = YOUR_BUYER_FIELDS[CONNECTION_WITH_BUYER_DESCRIPTION];

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Your Buyer - Connection to the buyer page - form validation', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsuranceYourBuyerSection({});
      cy.completeAndSubmitCompanyOrOrganisationForm({});

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${CONNECTION_WITH_BUYER_ROUTE}`;

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
  const errorMessage = ERRORS[CONNECTION_WITH_BUYER].IS_EMPTY;

  describe(`${CONNECTION_WITH_BUYER} not selected`, () => {
    it('should display validation errors', () => {
      cy.navigateToUrl(url);

      const radioField = {
        ...field(CONNECTION_WITH_BUYER),
        input: yesRadioInput,
      };

      cy.submitAndAssertRadioErrors(radioField, errorIndex, expectedErrorsCount, errorMessage);
    });
  });

  describe(`${CONNECTION_WITH_BUYER} yes selected`, () => {
    const fieldId = CONNECTION_WITH_BUYER_DESCRIPTION;
    const textareaField = { ...field(fieldId), input: field(fieldId).textarea };

    beforeEach(() => {
      cy.clickYesRadioInput();
    });

    it(`should render a validation error and retain the submitted value when ${fieldId} is empty`, () => {
      cy.submitAndAssertFieldErrors(
        textareaField,
        null,
        0,
        expectedErrorsCount,
        ERRORS[fieldId].IS_EMPTY,
      );
    });

    it(`should render a validation error and retain the submitted value when ${fieldId} is above the maximum`, () => {
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
