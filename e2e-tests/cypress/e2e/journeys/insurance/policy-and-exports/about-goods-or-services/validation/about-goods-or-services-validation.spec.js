import { submitButton } from '../../../../../pages/shared';
import partials from '../../../../../partials';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { FIELD_IDS, FIELD_VALUES, ROUTES } from '../../../../../../../constants';
import getReferenceNumber from '../../../../../helpers/get-reference-number';
import checkText from '../../../../../helpers/check-text';

const { taskList } = partials.insurancePartials;

const { INSURANCE } = ROUTES;

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      ABOUT_GOODS_OR_SERVICES: { DESCRIPTION, FINAL_DESTINATION },
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

context('Insurance - Policy and exports - About goods or services page - form validation', () => {
  let referenceNumber;

  before(() => {
    cy.navigateToUrl(INSURANCE.START);

    cy.submitInsuranceEligibilityAndStartApplication();

    taskList.prepareApplication.tasks.policyTypeAndExports.link().click();

    cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.SINGLE);

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

  it('should render validation errors for all required fields', () => {
    submitButton().click();

    partials.errorSummaryListItems().should('exist');

    const TOTAL_REQUIRED_FIELDS = 2;
    partials.errorSummaryListItems().should('have.length', TOTAL_REQUIRED_FIELDS);

    checkText(
      partials.errorSummaryListItems().eq(0),
      ABOUT_ERROR_MESSAGES[DESCRIPTION].IS_EMPTY,
    );

    checkText(
      partials.errorSummaryListItems().eq(1),
      ABOUT_ERROR_MESSAGES[FINAL_DESTINATION].IS_EMPTY,
    );
  });
});
