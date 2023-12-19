import { field, yesRadioInput } from '../../../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { YOUR_BUYER as FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/your-buyer';
import { YOUR_BUYER_FIELDS } from '../../../../../../../content-strings/fields/insurance/your-buyer';

const {
  WORKING_WITH_BUYER: {
    CONNECTED_WITH_BUYER,
    CONNECTION_WITH_BUYER_DESCRIPTION,
  },
} = FIELD_IDS;

const {
  INSURANCE: {
    YOUR_BUYER: {
      WORKING_WITH_BUYER: ERRORS,
    },
  },
} = ERROR_MESSAGES;

const {
  ROOT: INSURANCE_ROOT,
  YOUR_BUYER: { CONNECTION_TO_THE_BUYER },
} = INSURANCE_ROUTES;

const { MAXIMUM } = YOUR_BUYER_FIELDS.WORKING_WITH_BUYER[CONNECTION_WITH_BUYER_DESCRIPTION];

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Your Buyer - Connection to the buyer page - Page validation', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsuranceYourBuyerSection();
      cy.completeAndSubmitCompanyOrOrganisationForm({});

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${CONNECTION_TO_THE_BUYER}`;

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
  const errorMessage = ERRORS[CONNECTED_WITH_BUYER].IS_EMPTY;

  describe(`${CONNECTED_WITH_BUYER} not selected`, () => {
    it('should display validation errors', () => {
      cy.navigateToUrl(url);

      const radioField = {
        ...field(CONNECTED_WITH_BUYER),
        input: yesRadioInput,
      };

      cy.submitAndAssertRadioErrors(radioField, errorIndex, expectedErrorsCount, errorMessage);
    });
  });

  describe(`${CONNECTED_WITH_BUYER} yes selected`, () => {
    const fieldId = CONNECTION_WITH_BUYER_DESCRIPTION;
    const textareaField = { ...field(fieldId), input: field(fieldId).textarea };

    beforeEach(() => {
      yesRadioInput().click();
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
