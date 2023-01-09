import { submitButton } from '../../../../../pages/shared';
import { typeOfPolicyPage, aboutGoodsOrServicesPage } from '../../../../../pages/insurance/policy-and-export';
import partials from '../../../../../partials';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { FIELD_IDS, ROUTES } from '../../../../../../../constants';
import getReferenceNumber from '../../../../../helpers/get-reference-number';
import checkText from '../../../../../helpers/check-text';

const { taskList } = partials.insurancePartials;

const singlePolicyFieldId = FIELD_IDS.INSURANCE.POLICY_AND_EXPORTS.POLICY_TYPE;
const singlePolicyField = typeOfPolicyPage[singlePolicyFieldId].single;

const { INSURANCE } = ROUTES;

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      ABOUT_GOODS_OR_SERVICES: { DESCRIPTION },
    },
  },
} = FIELD_IDS;

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      ABOUT_GOODS_OR_SERVICES: ABOUT_ERROR_MESSAGES,
    },
  },
} = ERROR_MESSAGES;

context('Insurance - Policy and exports - About goods or services - form validation - description', () => {
  let referenceNumber;

  before(() => {
    cy.visit(INSURANCE.START, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });

    cy.submitInsuranceEligibilityAndStartApplication();

    taskList.prepareApplication.tasks.policyTypeAndExports.link().click();

    singlePolicyField.input().click();
    submitButton().click();

    cy.completeAndSubmitSingleContractPolicyForm();

    getReferenceNumber().then((id) => {
      referenceNumber = id;
      const expectedUrl = `${Cypress.config('baseUrl')}${INSURANCE.ROOT}/${referenceNumber}${INSURANCE.POLICY_AND_EXPORTS.ABOUT_GOODS_OR_SERVICES}`;

      cy.url().should('eq', expectedUrl);
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  const field = aboutGoodsOrServicesPage[DESCRIPTION];

  describe('when description is not provided', () => {
    it('should render a validation error', () => {
      submitButton().click();

      checkText(
        partials.errorSummaryListItems().eq(0),
        ABOUT_ERROR_MESSAGES[DESCRIPTION].IS_EMPTY,
      );

      checkText(
        field.errorMessage(),
        `Error: ${ABOUT_ERROR_MESSAGES[DESCRIPTION].IS_EMPTY}`,
      );
    });
  });

  describe('when description is above the maximum', () => {
    it('should render a validation error', () => {
      field.input().type('a'.repeat(1001), { delay: 0 });
      submitButton().click();

      checkText(
        partials.errorSummaryListItems().eq(0),
        ABOUT_ERROR_MESSAGES[DESCRIPTION].ABOVE_MAXIMUM,
      );

      checkText(
        field.errorMessage(),
        `Error: ${ABOUT_ERROR_MESSAGES[DESCRIPTION].ABOVE_MAXIMUM}`,
      );
    });
  });
});
