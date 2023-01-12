import {
  add,
  getDate,
  getMonth,
  getYear,
  sub,
} from 'date-fns';
import { submitButton } from '../../../../../pages/shared';
import { singleContractPolicyPage } from '../../../../../pages/insurance/policy-and-export';
import partials from '../../../../../partials';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import {
  FIELD_IDS,
  FIELD_VALUES,
  PRODUCT,
  ROUTES,
} from '../../../../../../../constants';
import getReferenceNumber from '../../../../../helpers/get-reference-number';
import checkText from '../../../../../helpers/check-text';

const { taskList } = partials.insurancePartials;

const { INSURANCE } = ROUTES;

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      CONTRACT_POLICY: {
        REQUESTED_START_DATE,
        SINGLE: { CONTRACT_COMPLETION_DATE },
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

context('Insurance - Policy and exports - Single contract policy page - form validation - contract completion date', () => {
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

    cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.SINGLE);

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

  const field = singleContractPolicyPage[CONTRACT_COMPLETION_DATE];

  describe('when day is not provided', () => {
    it('should render a validation error', () => {
      field.monthInput().type('1');
      field.yearInput().type('2023');
      submitButton().click();

      checkText(
        partials.errorSummaryListItems().eq(1),
        CONTRACT_ERROR_MESSAGES.SINGLE[CONTRACT_COMPLETION_DATE].IS_EMPTY,
      );

      checkText(
        field.errorMessage(),
        `Error: ${CONTRACT_ERROR_MESSAGES.SINGLE[CONTRACT_COMPLETION_DATE].IS_EMPTY}`,
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
        partials.errorSummaryListItems().eq(1),
        CONTRACT_ERROR_MESSAGES.SINGLE[CONTRACT_COMPLETION_DATE].IS_EMPTY,
      );

      checkText(
        field.errorMessage(),
        `Error: ${CONTRACT_ERROR_MESSAGES.SINGLE[CONTRACT_COMPLETION_DATE].IS_EMPTY}`,
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
        partials.errorSummaryListItems().eq(1),
        CONTRACT_ERROR_MESSAGES.SINGLE[CONTRACT_COMPLETION_DATE].IS_EMPTY,
      );

      checkText(
        field.errorMessage(),
        `Error: ${CONTRACT_ERROR_MESSAGES.SINGLE[CONTRACT_COMPLETION_DATE].IS_EMPTY}`,
      );
    });
  });

  describe('when day is not a number', () => {
    it('should render a validation error', () => {
      field.dayInput().clear().type('Test');
      submitButton().click();

      checkText(
        partials.errorSummaryListItems().eq(1),
        CONTRACT_ERROR_MESSAGES.SINGLE[CONTRACT_COMPLETION_DATE].NOT_A_NUMBER,
      );

      checkText(
        field.errorMessage(),
        `Error: ${CONTRACT_ERROR_MESSAGES.SINGLE[CONTRACT_COMPLETION_DATE].NOT_A_NUMBER}`,
      );
    });
  });

  describe('when month is not a number', () => {
    it('should render a validation error', () => {
      field.dayInput().clear();
      field.monthInput().clear().type('Test');
      submitButton().click();

      checkText(
        partials.errorSummaryListItems().eq(1),
        CONTRACT_ERROR_MESSAGES.SINGLE[CONTRACT_COMPLETION_DATE].NOT_A_NUMBER,
      );

      checkText(
        field.errorMessage(),
        `Error: ${CONTRACT_ERROR_MESSAGES.SINGLE[CONTRACT_COMPLETION_DATE].NOT_A_NUMBER}`,
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
        partials.errorSummaryListItems().eq(1),
        CONTRACT_ERROR_MESSAGES.SINGLE[CONTRACT_COMPLETION_DATE].NOT_A_NUMBER,
      );

      checkText(
        field.errorMessage(),
        `Error: ${CONTRACT_ERROR_MESSAGES.SINGLE[CONTRACT_COMPLETION_DATE].NOT_A_NUMBER}`,
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
        partials.errorSummaryListItems().eq(1),
        CONTRACT_ERROR_MESSAGES.SINGLE[CONTRACT_COMPLETION_DATE].BEFORE_EARLIEST,
      );

      checkText(
        field.errorMessage(),
        `Error: ${CONTRACT_ERROR_MESSAGES.SINGLE[CONTRACT_COMPLETION_DATE].BEFORE_EARLIEST}`,
      );
    });
  });

  describe(`when ${REQUESTED_START_DATE} is also provided`, () => {
    const date = new Date();
    const startDate = add(date, { months: 3 });

    beforeEach(() => {
      singleContractPolicyPage[REQUESTED_START_DATE].dayInput().clear().type('2');
      singleContractPolicyPage[REQUESTED_START_DATE].monthInput().clear().type(getMonth(startDate));
      singleContractPolicyPage[REQUESTED_START_DATE].yearInput().clear().type(getYear(startDate));
    });

    describe(`when the date is the same as ${REQUESTED_START_DATE}`, () => {
      it('should render a validation error', () => {
        field.dayInput().clear().type('2');
        field.monthInput().clear().type(getMonth(startDate));
        field.yearInput().clear().type(getYear(startDate));
        submitButton().click();

        checkText(
          partials.errorSummaryListItems().eq(0),
          CONTRACT_ERROR_MESSAGES.SINGLE[CONTRACT_COMPLETION_DATE].CANNOT_BE_THE_SAME,
        );

        checkText(
          field.errorMessage(),
          `Error: ${CONTRACT_ERROR_MESSAGES.SINGLE[CONTRACT_COMPLETION_DATE].CANNOT_BE_THE_SAME}`,
        );
      });
    });

    describe(`when the date is before the ${REQUESTED_START_DATE}`, () => {
      it('should render a validation error', () => {
        field.dayInput().clear().type('1');
        field.monthInput().clear().type(getMonth(startDate));
        field.yearInput().clear().type(getYear(startDate));
        submitButton().click();

        checkText(
          partials.errorSummaryListItems().eq(0),
          CONTRACT_ERROR_MESSAGES.SINGLE[CONTRACT_COMPLETION_DATE].CANNOT_BE_BEFORE,
        );

        checkText(
          field.errorMessage(),
          `Error: ${CONTRACT_ERROR_MESSAGES.SINGLE[CONTRACT_COMPLETION_DATE].CANNOT_BE_BEFORE}`,
        );
      });
    });

    describe(`when the date is over the maximum years allowed after ${REQUESTED_START_DATE}`, () => {
      it('should render a validation error', () => {
        const endDate = add(new Date(startDate), { years: PRODUCT.MAX_COVER_PERIOD_YEARS });

        field.dayInput().clear().type('3');
        field.monthInput().clear().type(getMonth(endDate));
        field.yearInput().clear().type(getYear(endDate));
        submitButton().click();

        checkText(
          partials.errorSummaryListItems().eq(0),
          CONTRACT_ERROR_MESSAGES.SINGLE[CONTRACT_COMPLETION_DATE].AFTER_LATEST,
        );

        checkText(
          field.errorMessage(),
          `Error: ${CONTRACT_ERROR_MESSAGES.SINGLE[CONTRACT_COMPLETION_DATE].AFTER_LATEST}`,
        );
      });
    });
  });
});
