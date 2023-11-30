import { field as fieldSelector, submitButton } from '../../../../../../../pages/shared';
import partials from '../../../../../../../partials';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { FIELD_IDS, FIELD_VALUES, ROUTES } from '../../../../../../../constants';

const { INSURANCE } = ROUTES;

const {
  INSURANCE: {
    POLICY: {
      CONTRACT_POLICY: {
        CREDIT_PERIOD_WITH_BUYER,
      },
    },
  },
} = FIELD_IDS;

const {
  INSURANCE: {
    POLICY: {
      CONTRACT_POLICY: CONTRACT_ERROR_MESSAGES,
    },
  },
} = ERROR_MESSAGES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Single contract policy page - form validation - credit period with buyer', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsurancePolicySection();
      cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.SINGLE);

      url = `${baseUrl}${INSURANCE.ROOT}/${referenceNumber}${INSURANCE.POLICY.SINGLE_CONTRACT_POLICY}`;

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
        partials.errorSummaryListItems().eq(3),
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
        partials.errorSummaryListItems().eq(3),
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
