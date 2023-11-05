import { submitButton } from '../../../../../../../pages/shared';
import { multipleContractPolicyPage } from '../../../../../../../pages/insurance/policy';
import partials from '../../../../../../../partials';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import {
  APPLICATION,
  FIELD_IDS,
  FIELD_VALUES,
  ROUTES,
} from '../../../../../../../constants';

const { taskList } = partials.insurancePartials;

const {
  INSURANCE: {
    ROOT: INSURANCE_ROOT,
    POLICY: {
      MULTIPLE_CONTRACT_POLICY,
      ABOUT_GOODS_OR_SERVICES,
    },
  },
} = ROUTES;

const {
  INSURANCE: {
    POLICY: {
      CONTRACT_POLICY: {
        MULTIPLE: { MAXIMUM_BUYER_WILL_OWE },
      },
    },
  },
} = FIELD_IDS;

const {
  INSURANCE: {
    POLICY: {
      CONTRACT_POLICY: {
        MULTIPLE: CONTRACT_ERROR_MESSAGES,
      },
    },
  },
} = ERROR_MESSAGES;

context('Insurance - Policy - Multiple contract policy page - form validation - maximum buyer will owe', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      taskList.prepareApplication.tasks.policy.link().click();

      cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.MULTIPLE);

      url = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${MULTIPLE_CONTRACT_POLICY}`;

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

  const field = multipleContractPolicyPage[MAXIMUM_BUYER_WILL_OWE];

  it('should render a validation error when maximum buyer will owe is not provided', () => {
    submitButton().click();

    cy.checkText(
      partials.errorSummaryListItems().eq(3),
      CONTRACT_ERROR_MESSAGES[MAXIMUM_BUYER_WILL_OWE].INCORRECT_FORMAT,
    );

    cy.checkText(
      field.errorMessage(),
      `Error: ${CONTRACT_ERROR_MESSAGES[MAXIMUM_BUYER_WILL_OWE].INCORRECT_FORMAT}`,
    );
  });

  it('should render a validation error when maximum buyer will owe is not a number', () => {
    cy.keyboardInput(multipleContractPolicyPage[MAXIMUM_BUYER_WILL_OWE].input(), 'ten!');
    submitButton().click();

    cy.checkText(
      partials.errorSummaryListItems().eq(3),
      CONTRACT_ERROR_MESSAGES[MAXIMUM_BUYER_WILL_OWE].INCORRECT_FORMAT,
    );

    cy.checkText(
      field.errorMessage(),
      `Error: ${CONTRACT_ERROR_MESSAGES[MAXIMUM_BUYER_WILL_OWE].INCORRECT_FORMAT}`,
    );
  });

  it('should render a validation error when maximum buyer will owe contains a decimal', () => {
    cy.keyboardInput(multipleContractPolicyPage[MAXIMUM_BUYER_WILL_OWE].input(), '1.2');
    submitButton().click();

    cy.checkText(
      partials.errorSummaryListItems().eq(3),
      CONTRACT_ERROR_MESSAGES[MAXIMUM_BUYER_WILL_OWE].INCORRECT_FORMAT,
    );

    cy.checkText(
      field.errorMessage(),
      `Error: ${CONTRACT_ERROR_MESSAGES[MAXIMUM_BUYER_WILL_OWE].INCORRECT_FORMAT}`,
    );
  });

  it('should render a validation error when maximum buyer will owe contains a comma and decimal', () => {
    cy.keyboardInput(multipleContractPolicyPage[MAXIMUM_BUYER_WILL_OWE].input(), '1,234.56');
    submitButton().click();

    cy.checkText(
      partials.errorSummaryListItems().eq(3),
      CONTRACT_ERROR_MESSAGES[MAXIMUM_BUYER_WILL_OWE].INCORRECT_FORMAT,
    );

    cy.checkText(
      field.errorMessage(),
      `Error: ${CONTRACT_ERROR_MESSAGES[MAXIMUM_BUYER_WILL_OWE].INCORRECT_FORMAT}`,
    );
  });

  it('should render a validation error when maximum buyer will owe is below the minimum', () => {
    cy.keyboardInput(multipleContractPolicyPage[MAXIMUM_BUYER_WILL_OWE].input(), '0');
    submitButton().click();

    cy.checkText(
      partials.errorSummaryListItems().eq(3),
      CONTRACT_ERROR_MESSAGES[MAXIMUM_BUYER_WILL_OWE].BELOW_MINIMUM,
    );

    cy.checkText(
      field.errorMessage(),
      `Error: ${CONTRACT_ERROR_MESSAGES[MAXIMUM_BUYER_WILL_OWE].BELOW_MINIMUM}`,
    );
  });

  it('should render a validation error when maximum buyer will owe is above the maximum', () => {
    const MAXIMUM = APPLICATION.POLICY.MAXIMUM_BUYER_CAN_OWE;

    cy.keyboardInput(multipleContractPolicyPage[MAXIMUM_BUYER_WILL_OWE].input(), MAXIMUM + 1);
    submitButton().click();

    cy.checkText(
      partials.errorSummaryListItems().eq(3),
      CONTRACT_ERROR_MESSAGES[MAXIMUM_BUYER_WILL_OWE].ABOVE_MAXIMUM,
    );

    cy.checkText(
      field.errorMessage(),
      `Error: ${CONTRACT_ERROR_MESSAGES[MAXIMUM_BUYER_WILL_OWE].ABOVE_MAXIMUM}`,
    );
  });

  it('should redirect to the next page when maximum buyer will owe is valid and contains a comma as all fields are valid', () => {
    cy.completeAndSubmitMultipleContractPolicyForm({});
    cy.clickBackLink();

    cy.keyboardInput(multipleContractPolicyPage[MAXIMUM_BUYER_WILL_OWE].input(), '1,234');
    submitButton().click();

    const expectedUrl = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${ABOUT_GOODS_OR_SERVICES}`;
    cy.assertUrl(expectedUrl);
  });
});
