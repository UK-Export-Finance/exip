import { submitButton } from '../../../../../../../pages/shared';
import { multipleContractPolicyPage } from '../../../../../../../pages/insurance/policy-and-export';
import partials from '../../../../../../../partials';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { FIELD_IDS, FIELD_VALUES, ROUTES } from '../../../../../../../constants';

const { taskList } = partials.insurancePartials;

const { INSURANCE } = ROUTES;

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      CONTRACT_POLICY: {
        MULTIPLE: { TOTAL_MONTHS_OF_COVER },
      },
    },
  },
} = FIELD_IDS;

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      CONTRACT_POLICY: {
        MULTIPLE: CONTRACT_ERROR_MESSAGES,
      },
    },
  },
} = ERROR_MESSAGES;

context('Insurance - Policy and exports - Multiple contract policy page - form validation - total months of cover', () => {
  let referenceNumber;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      taskList.prepareApplication.tasks.policyTypeAndExports.link().click();

      cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.MULTIPLE);
      const expectedUrl = `${Cypress.config('baseUrl')}${INSURANCE.ROOT}/${referenceNumber}${INSURANCE.POLICY_AND_EXPORTS.MULTIPLE_CONTRACT_POLICY}`;

      cy.assertUrl(expectedUrl);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  const field = multipleContractPolicyPage[TOTAL_MONTHS_OF_COVER];

  describe('when total months of cover is not provided', () => {
    it('should render a validation error', () => {
      submitButton().click();

      cy.checkText(
        partials.errorSummaryListItems().eq(1),
        CONTRACT_ERROR_MESSAGES[TOTAL_MONTHS_OF_COVER].IS_EMPTY,
      );

      cy.checkText(
        field.errorMessage(),
        `Error: ${CONTRACT_ERROR_MESSAGES[TOTAL_MONTHS_OF_COVER].IS_EMPTY}`,
      );
    });
  });
});
