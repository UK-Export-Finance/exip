import { submitButton } from '../../../../../../../pages/shared';
import partials from '../../../../../../../partials';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { FIELD_IDS, FIELD_VALUES, ROUTES } from '../../../../../../../constants';
import application from '../../../../../../../fixtures/application';

const { policyCurrencyCodeFormField } = partials.insurancePartials;

const { INSURANCE } = ROUTES;

const {
  INSURANCE: {
    POLICY: {
      CONTRACT_POLICY: {
        REQUESTED_START_DATE,
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
    POLICY: {
      CONTRACT_POLICY: CONTRACT_ERROR_MESSAGES,
    },
  },
} = ERROR_MESSAGES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Multiple contract policy page - form validation', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsurancePolicySection();
      cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.MULTIPLE);

      url = `${baseUrl}${INSURANCE.ROOT}/${referenceNumber}${INSURANCE.POLICY.MULTIPLE_CONTRACT_POLICY}`;

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

  it('should render validation errors for all required fields', () => {
    submitButton().click();

    cy.checkErrorSummaryListHeading();

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
      CONTRACT_ERROR_MESSAGES[POLICY_CURRENCY_CODE].IS_EMPTY,
    );
  });

  describe(`when ${POLICY_CURRENCY_CODE} is submitted but there are other validation errors`, () => {
    it(`should retain the submitted ${POLICY_CURRENCY_CODE}`, () => {
      cy.navigateToUrl(url);

      const currencyCode = application.POLICY[POLICY_CURRENCY_CODE];

      policyCurrencyCodeFormField.input().select(currencyCode);

      policyCurrencyCodeFormField.inputOptionSelected().contains(currencyCode);
    });
  });
});
