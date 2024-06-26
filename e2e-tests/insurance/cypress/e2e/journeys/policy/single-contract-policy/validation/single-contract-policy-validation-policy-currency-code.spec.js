import { submitButton } from '../../../../../../../pages/shared';
import partials from '../../../../../../../partials';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { FIELD_IDS, FIELD_VALUES, ROUTES } from '../../../../../../../constants';

const { taskList, policyCurrencyCodeFormField } = partials.insurancePartials;

const { INSURANCE } = ROUTES;

const {
  INSURANCE: {
    POLICY: {
      CONTRACT_POLICY: {
        POLICY_CURRENCY_CODE,
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

context('Insurance - Policy - Single contract policy page - form validation - policy currency code', () => {
  let referenceNumber;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      taskList.prepareApplication.tasks.policy.link().click();

      cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.SINGLE);

      const expectedUrl = `${Cypress.config('baseUrl')}${INSURANCE.ROOT}/${referenceNumber}${INSURANCE.POLICY.SINGLE_CONTRACT_POLICY}`;

      cy.assertUrl(expectedUrl);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe('when policy currency code is not provided', () => {
    it('should render a validation error', () => {
      submitButton().click();

      cy.checkText(
        partials.errorSummaryListItems().eq(4),
        CONTRACT_ERROR_MESSAGES[POLICY_CURRENCY_CODE].IS_EMPTY,
      );

      cy.checkText(
        policyCurrencyCodeFormField.errorMessage(),
        `Error: ${CONTRACT_ERROR_MESSAGES[POLICY_CURRENCY_CODE].IS_EMPTY}`,
      );
    });
  });
});
