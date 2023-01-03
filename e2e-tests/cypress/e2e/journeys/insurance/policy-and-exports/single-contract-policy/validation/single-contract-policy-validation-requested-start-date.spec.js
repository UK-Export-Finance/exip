import {
  add,
  getDate,
  getMonth,
  getYear,
  sub,
} from 'date-fns';
import { submitButton } from '../../../../../pages/shared';
import { typeOfPolicyPage, singleContractPolicyPage } from '../../../../../pages/insurance/policy-and-export';
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
      CONTRACT_POLICY: {
        REQUESTED_START_DATE,
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

context('Insurance - Policy and exports - Single contract policy page - form validation - requested start date', () => {
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

    getReferenceNumber().then((id) => {
      referenceNumber = id;
      const expectedUrl = `${Cypress.config('baseUrl')}${INSURANCE.ROOT}/${referenceNumber}${INSURANCE.POLICY_AND_EXPORTS.SINGLE_CONTRACT_POLICY}`;

      cy.url().should('eq', expectedUrl);
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  const field = singleContractPolicyPage[REQUESTED_START_DATE];

  describe('when day is not provided', () => {
    it('should render a validation error', () => {
      field.monthInput().type('1');
      field.yearInput().type('2023');
      submitButton().click();

      checkText(
        partials.errorSummaryListItems().eq(0),
        CONTRACT_ERROR_MESSAGES.SINGLE[REQUESTED_START_DATE].IS_EMPTY,
      );

      checkText(
        field.errorMessage(),
        `Error: ${CONTRACT_ERROR_MESSAGES.SINGLE[REQUESTED_START_DATE].IS_EMPTY}`,
      );
    });
  });

  describe('when month is not provided', () => {
    it('should render a validation error', () => {
      field.dayInput().clear().type('1');
      field.monthInput().clear();
      field.yearInput().clear().type('2023');
      submitButton().click();

      checkText(
        partials.errorSummaryListItems().eq(0),
        CONTRACT_ERROR_MESSAGES.SINGLE[REQUESTED_START_DATE].IS_EMPTY,
      );

      checkText(
        field.errorMessage(),
        `Error: ${CONTRACT_ERROR_MESSAGES.SINGLE[REQUESTED_START_DATE].IS_EMPTY}`,
      );
    });
  });

  describe('when year is not provided', () => {
    it('should render a validation error', () => {
      field.dayInput().clear().type('1');
      field.monthInput().clear('2');
      field.yearInput().clear();
      submitButton().click();

      checkText(
        partials.errorSummaryListItems().eq(0),
        CONTRACT_ERROR_MESSAGES.SINGLE[REQUESTED_START_DATE].IS_EMPTY,
      );

      checkText(
        field.errorMessage(),
        `Error: ${CONTRACT_ERROR_MESSAGES.SINGLE[REQUESTED_START_DATE].IS_EMPTY}`,
      );
    });
  });

  describe('when day is not a number', () => {
    it('should render a validation error', () => {
      field.dayInput().clear().type('Test');
      submitButton().click();

      checkText(
        partials.errorSummaryListItems().eq(0),
        CONTRACT_ERROR_MESSAGES.SINGLE[REQUESTED_START_DATE].NOT_A_NUMBER,
      );

      checkText(
        field.errorMessage(),
        `Error: ${CONTRACT_ERROR_MESSAGES.SINGLE[REQUESTED_START_DATE].NOT_A_NUMBER}`,
      );
    });
  });

  describe('when month is not a number', () => {
    it('should render a validation error', () => {
      field.dayInput().clear();
      field.monthInput().clear().type('Test');
      submitButton().click();

      checkText(
        partials.errorSummaryListItems().eq(0),
        CONTRACT_ERROR_MESSAGES.SINGLE[REQUESTED_START_DATE].NOT_A_NUMBER,
      );

      checkText(
        field.errorMessage(),
        `Error: ${CONTRACT_ERROR_MESSAGES.SINGLE[REQUESTED_START_DATE].NOT_A_NUMBER}`,
      );
    });
  });

  describe('when year is not a number', () => {
    it('should render a validation error', () => {
      field.dayInput().clear();
      field.monthInput().clear();
      field.yearInput().clear().type('Test');
      submitButton().click();

      checkText(
        partials.errorSummaryListItems().eq(0),
        CONTRACT_ERROR_MESSAGES.SINGLE[REQUESTED_START_DATE].NOT_A_NUMBER,
      );

      checkText(
        field.errorMessage(),
        `Error: ${CONTRACT_ERROR_MESSAGES.SINGLE[REQUESTED_START_DATE].NOT_A_NUMBER}`,
      );
    });
  });

  describe('when the date is not in the future', () => {
    it('should render a validation error', () => {
      const date = new Date();
      const yesterday = sub(date, { days: 1 });

      field.dayInput().clear().type(getDate(yesterday));
      field.monthInput().clear().type(getMonth(add(yesterday, { months: 1 })));
      field.yearInput().clear().type(getYear(yesterday));
      submitButton().click();

      checkText(
        partials.errorSummaryListItems().eq(0),
        CONTRACT_ERROR_MESSAGES.SINGLE[REQUESTED_START_DATE].BEFORE_EARLIEST,
      );

      checkText(
        field.errorMessage(),
        `Error: ${CONTRACT_ERROR_MESSAGES.SINGLE[REQUESTED_START_DATE].BEFORE_EARLIEST}`,
      );
    });
  });
});
