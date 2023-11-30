import { field as fieldSelector, submitButton } from '../../../../../../../pages/shared';
import { typeOfPolicyPage } from '../../../../../../../pages/insurance/policy';
import partials from '../../../../../../../partials';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';

const multiplePolicyFieldId = INSURANCE_FIELD_IDS.POLICY.POLICY_TYPE;
const multiplePolicyField = typeOfPolicyPage[multiplePolicyFieldId].multiple;

const {
  POLICY: {
    CONTRACT_POLICY: {
      CREDIT_PERIOD_WITH_BUYER,
    },
  },
} = INSURANCE_FIELD_IDS;

const {
  ROOT,
  POLICY: { MULTIPLE_CONTRACT_POLICY },
} = INSURANCE_ROUTES;

const {
  INSURANCE: {
    POLICY: {
      CONTRACT_POLICY: CONTRACT_ERROR_MESSAGES,
    },
  },
} = ERROR_MESSAGES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Multiple contract policy page - form validation - credit period with buyer', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsurancePolicySection();

      multiplePolicyField.input().click();
      submitButton().click();

      url = `${baseUrl}${ROOT}/${referenceNumber}${MULTIPLE_CONTRACT_POLICY}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  const field = fieldSelector(CREDIT_PERIOD_WITH_BUYER);

  describe('when credit period with buyer is not provided', () => {
    it('should render a validation error', () => {
      cy.navigateToUrl(url);

      submitButton().click();

      cy.checkText(
        partials.errorSummaryListItems().eq(4),
        CONTRACT_ERROR_MESSAGES[CREDIT_PERIOD_WITH_BUYER].IS_EMPTY,
      );

      cy.checkText(
        field.errorMessage(),
        `Error: ${CONTRACT_ERROR_MESSAGES[CREDIT_PERIOD_WITH_BUYER].IS_EMPTY}`,
      );
    });
  });

  describe('when credit period with buyer is above the maximum', () => {
    const submittedValue = 'a'.repeat(1001);

    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.keyboardInput(field.input(), submittedValue);
      submitButton().click();
    });

    it('should render a validation error', () => {
      cy.checkText(
        partials.errorSummaryListItems().eq(4),
        CONTRACT_ERROR_MESSAGES[CREDIT_PERIOD_WITH_BUYER].ABOVE_MAXIMUM,
      );

      cy.checkText(
        field.errorMessage(),
        `Error: ${CONTRACT_ERROR_MESSAGES[CREDIT_PERIOD_WITH_BUYER].ABOVE_MAXIMUM}`,
      );
    });

    it('should retain the submitted value', () => {
      field.input().should('have.value', submittedValue);
    });
  });
});
