import { submitButton } from '../../../../../pages/shared';
import { typeOfPolicyPage, multipleContractPolicyPage } from '../../../../../pages/insurance/policy-and-export';
import partials from '../../../../../partials';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { FIELD_IDS, ROUTES } from '../../../../../../../constants';

const { taskList } = partials.insurancePartials;

const multipleePolicyFieldId = FIELD_IDS.INSURANCE.POLICY_AND_EXPORTS.POLICY_TYPE;
const multipleePolicyField = typeOfPolicyPage[multipleePolicyFieldId].multiple;

const { INSURANCE } = ROUTES;

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      CONTRACT_POLICY: {
        CREDIT_PERIOD_WITH_BUYER,
      },
    },
  },
} = FIELD_IDS;

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      CONTRACT_POLICY: CONTRACT_ERROR_MESSAGES,
    },
  },
} = ERROR_MESSAGES;

context('Insurance - Policy and exports - Multiple contract policy page - form validation - credit period with buyer', () => {
  before(() => {
    cy.completeSignInAndGoToApplication().then((referenceNumber) => {
      taskList.prepareApplication.tasks.policyTypeAndExports.link().click();

      multipleePolicyField.input().click();
      submitButton().click();

      const expectedUrl = `${Cypress.config('baseUrl')}${INSURANCE.ROOT}/${referenceNumber}${INSURANCE.POLICY_AND_EXPORTS.MULTIPLE_CONTRACT_POLICY}`;

      cy.url().should('eq', expectedUrl);
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('exip-session');
  });

  const field = multipleContractPolicyPage[CREDIT_PERIOD_WITH_BUYER];

  describe('when credit period with buyer is not provided', () => {
    it('should render a validation error', () => {
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

    before(() => {
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
