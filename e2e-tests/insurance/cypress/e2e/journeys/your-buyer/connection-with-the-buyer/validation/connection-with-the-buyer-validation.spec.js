import { field, noRadioInput } from '../../../../../../../pages/shared';
import { MAXIMUM_CHARACTERS } from '../../../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { YOUR_BUYER as FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/your-buyer';

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

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Your buyer - Connection to the buyer page - form validation', () => {
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

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe(`${CONNECTION_WITH_BUYER} not selected`, () => {
    it('should display validation errors', () => {
      cy.navigateToUrl(url);

      const radioField = {
        ...field(CONNECTION_WITH_BUYER),
        input: noRadioInput,
      };

      cy.submitAndAssertRadioErrors({
        field: radioField,
        expectedErrorMessage: ERRORS[CONNECTION_WITH_BUYER].IS_EMPTY,
      });
    });
  });

  describe(`${CONNECTION_WITH_BUYER} yes selected`, () => {
    const fieldId = CONNECTION_WITH_BUYER_DESCRIPTION;
    const textareaField = { ...field(fieldId), input: field(fieldId).textarea };

    const assertions = {
      field: textareaField,
    };

    beforeEach(() => {
      cy.clickYesRadioInput();
    });

    it(`should render a validation error and retain the submitted value when ${fieldId} is empty`, () => {
      cy.submitAndAssertFieldErrors({
        ...assertions,
        expectedErrorMessage: ERRORS[fieldId].IS_EMPTY,
      });
    });

    it(`should render a validation error and retain the submitted value when ${fieldId} is above the maximum`, () => {
      cy.submitAndAssertFieldErrors({
        ...assertions,
        value: 'a'.repeat(MAXIMUM_CHARACTERS.CONNECTION_WITH_BUYER_DESCRIPTION + 1),
        expectedErrorMessage: ERRORS[fieldId].ABOVE_MAXIMUM,
      });
    });
  });
});
