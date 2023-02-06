import { submitButton } from '../../../../../pages/shared';
import partials from '../../../../../partials';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { FIELD_IDS, FIELD_VALUES, ROUTES } from '../../../../../../../constants';
import getReferenceNumber from '../../../../../helpers/get-reference-number';
import application from '../../../../../../fixtures/application';

const { taskList, policyCurrencyCodeFormField } = partials.insurancePartials;

const { INSURANCE } = ROUTES;

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      CONTRACT_POLICY: {
        REQUESTED_START_DATE,
        CREDIT_PERIOD_WITH_BUYER,
        POLICY_CURRENCY_CODE,
        MULTIPLE: {
          TOTAL_MONTHS_OF_COVER,
          TOTAL_SALES_TO_BUYER,
          MAXIMUM_BUYER_WILL_OWE,
        },
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

context('Insurance - Policy and exports - Multiple contract policy page - form validation', () => {
  let referenceNumber;

  before(() => {
    cy.navigateToUrl(INSURANCE.START);

    cy.submitInsuranceEligibilityAndStartApplication();

    taskList.prepareApplication.tasks.policyTypeAndExports.link().click();

    cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.MULTIPLE);

    getReferenceNumber().then((id) => {
      referenceNumber = id;
      const expectedUrl = `${Cypress.config('baseUrl')}${INSURANCE.ROOT}/${referenceNumber}${INSURANCE.POLICY_AND_EXPORTS.MULTIPLE_CONTRACT_POLICY}`;

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

    const TOTAL_REQUIRED_FIELDS = 6;
    partials.errorSummaryListItems().should('have.length', TOTAL_REQUIRED_FIELDS);

    cy.checkText(
      partials.errorSummaryListItems().eq(0),
      CONTRACT_ERROR_MESSAGES[REQUESTED_START_DATE].INCORRECT_FORMAT,
    );

    cy.checkText(
      partials.errorSummaryListItems().eq(1),
      CONTRACT_ERROR_MESSAGES.MULTIPLE[TOTAL_MONTHS_OF_COVER].IS_EMPTY,
    );

    cy.checkText(
      partials.errorSummaryListItems().eq(2),
      CONTRACT_ERROR_MESSAGES.MULTIPLE[TOTAL_SALES_TO_BUYER].INCORRECT_FORMAT,
    );

    cy.checkText(
      partials.errorSummaryListItems().eq(3),
      CONTRACT_ERROR_MESSAGES.MULTIPLE[MAXIMUM_BUYER_WILL_OWE].INCORRECT_FORMAT,
    );

    cy.checkText(
      partials.errorSummaryListItems().eq(4),
      CONTRACT_ERROR_MESSAGES[CREDIT_PERIOD_WITH_BUYER].IS_EMPTY,
    );

    cy.checkText(
      partials.errorSummaryListItems().eq(5),
      CONTRACT_ERROR_MESSAGES[POLICY_CURRENCY_CODE].IS_EMPTY,
    );
  });

  describe(`when ${POLICY_CURRENCY_CODE} is submitted but there are other validation errors`, () => {
    it(`should retain the submitted ${POLICY_CURRENCY_CODE}`, () => {
      const currencyCode = application.POLICY_AND_EXPORTS[POLICY_CURRENCY_CODE];

      policyCurrencyCodeFormField.input().select(currencyCode);

      policyCurrencyCodeFormField.inputOptionSelected().contains(currencyCode);
    });
  });
});
