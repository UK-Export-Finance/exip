import {
  add,
  getDate,
  getMonth,
  getYear,
  sub,
} from 'date-fns';
import { submitButton } from '../../../../../../../pages/shared';
import { singleContractPolicyPage } from '../../../../../../../pages/insurance/policy-and-export';
import partials from '../../../../../../../partials';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import {
  FIELD_IDS,
  FIELD_VALUES,
  ELIGIBILITY,
  ROUTES,
} from '../../../../../../../constants';

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
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      taskList.prepareApplication.tasks.policyTypeAndExports.link().click();

      cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.SINGLE);

      url = `${Cypress.config('baseUrl')}${INSURANCE.ROOT}/${referenceNumber}${INSURANCE.POLICY_AND_EXPORTS.SINGLE_CONTRACT_POLICY}`;

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

  const field = singleContractPolicyPage[CONTRACT_COMPLETION_DATE];

  it('should render a validation error when day is not provided', () => {
    cy.keyboardInput(field.monthInput(), '1');
    cy.keyboardInput(field.yearInput(), '2023');
    submitButton().click();

    cy.checkText(
      partials.errorSummaryListItems().eq(1),
      CONTRACT_ERROR_MESSAGES.SINGLE[CONTRACT_COMPLETION_DATE].INCORRECT_FORMAT,
    );

    cy.checkText(
      field.errorMessage(),
      `Error: ${CONTRACT_ERROR_MESSAGES.SINGLE[CONTRACT_COMPLETION_DATE].INCORRECT_FORMAT}`,
    );
  });

  it('should render a validation error when month is not provided', () => {
    cy.keyboardInput(field.dayInput().clear(), '1');
    field.monthInput().clear();
    cy.keyboardInput(field.yearInput(), '2023');
    submitButton().click();

    cy.checkText(
      partials.errorSummaryListItems().eq(1),
      CONTRACT_ERROR_MESSAGES.SINGLE[CONTRACT_COMPLETION_DATE].INCORRECT_FORMAT,
    );

    cy.checkText(
      field.errorMessage(),
      `Error: ${CONTRACT_ERROR_MESSAGES.SINGLE[CONTRACT_COMPLETION_DATE].INCORRECT_FORMAT}`,
    );
  });

  it('should render a validation error when year is not provided', () => {
    cy.keyboardInput(field.dayInput(), '1');
    field.monthInput().clear('2');
    field.yearInput().clear();
    submitButton().click();

    cy.checkText(
      partials.errorSummaryListItems().eq(1),
      CONTRACT_ERROR_MESSAGES.SINGLE[CONTRACT_COMPLETION_DATE].INCORRECT_FORMAT,
    );

    cy.checkText(
      field.errorMessage(),
      `Error: ${CONTRACT_ERROR_MESSAGES.SINGLE[CONTRACT_COMPLETION_DATE].INCORRECT_FORMAT}`,
    );
  });

  it('should render a validation error when day is not a number', () => {
    cy.keyboardInput(field.dayInput(), 'Test');
    submitButton().click();

    cy.checkText(
      partials.errorSummaryListItems().eq(1),
      CONTRACT_ERROR_MESSAGES.SINGLE[CONTRACT_COMPLETION_DATE].NOT_A_NUMBER,
    );

    cy.checkText(
      field.errorMessage(),
      `Error: ${CONTRACT_ERROR_MESSAGES.SINGLE[CONTRACT_COMPLETION_DATE].NOT_A_NUMBER}`,
    );
  });

  it('should render a validation error when month is not a number', () => {
    field.dayInput().clear();
    cy.keyboardInput(field.monthInput(), 'Test');
    submitButton().click();

    cy.checkText(
      partials.errorSummaryListItems().eq(1),
      CONTRACT_ERROR_MESSAGES.SINGLE[CONTRACT_COMPLETION_DATE].NOT_A_NUMBER,
    );

    cy.checkText(
      field.errorMessage(),
      `Error: ${CONTRACT_ERROR_MESSAGES.SINGLE[CONTRACT_COMPLETION_DATE].NOT_A_NUMBER}`,
    );
  });

  it('should render a validation error when year is not a number', () => {
    field.dayInput().clear();
    field.monthInput().clear();
    cy.keyboardInput(field.yearInput(), 'Test');
    submitButton().click();

    cy.checkText(
      partials.errorSummaryListItems().eq(1),
      CONTRACT_ERROR_MESSAGES.SINGLE[CONTRACT_COMPLETION_DATE].NOT_A_NUMBER,
    );

    cy.checkText(
      field.errorMessage(),
      `Error: ${CONTRACT_ERROR_MESSAGES.SINGLE[CONTRACT_COMPLETION_DATE].NOT_A_NUMBER}`,
    );
  });

  it('should render a validation error when the date is not in the future', () => {
    const date = new Date();
    const yesterday = sub(date, { days: 1 });

    cy.keyboardInput(field.dayInput(), getDate(yesterday));
    cy.keyboardInput(field.monthInput(), getMonth(add(yesterday, { months: 1 })));
    cy.keyboardInput(field.yearInput(), getYear(yesterday));
    submitButton().click();

    cy.checkText(
      partials.errorSummaryListItems().eq(1),
      CONTRACT_ERROR_MESSAGES.SINGLE[CONTRACT_COMPLETION_DATE].BEFORE_EARLIEST,
    );

    cy.checkText(
      field.errorMessage(),
      `Error: ${CONTRACT_ERROR_MESSAGES.SINGLE[CONTRACT_COMPLETION_DATE].BEFORE_EARLIEST}`,
    );
  });

  it('should render a validation error when the date has an invalid format', () => {
    const date = new Date();
    const futureDate = add(date, { days: 1 });

    cy.keyboardInput(field.dayInput(), getDate(futureDate));
    cy.keyboardInput(field.monthInput(), '24');
    cy.keyboardInput(field.yearInput(), getYear(futureDate));
    submitButton().click();

    cy.checkText(
      partials.errorSummaryListItems().eq(1),
      CONTRACT_ERROR_MESSAGES.SINGLE[CONTRACT_COMPLETION_DATE].INCORRECT_FORMAT,
    );

    cy.checkText(
      field.errorMessage(),
      `Error: ${CONTRACT_ERROR_MESSAGES.SINGLE[CONTRACT_COMPLETION_DATE].INCORRECT_FORMAT}`,
    );
  });

  describe(`when ${REQUESTED_START_DATE} is also provided`, () => {
    const date = new Date();
    const startDate = add(date, { months: 3 });

    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.keyboardInput(singleContractPolicyPage[REQUESTED_START_DATE].dayInput(), '2');
      cy.keyboardInput(singleContractPolicyPage[REQUESTED_START_DATE].monthInput(), getMonth(startDate));
      cy.keyboardInput(singleContractPolicyPage[REQUESTED_START_DATE].yearInput(), getYear(startDate));
    });

    it(`should render a validation error when the date is the same as ${REQUESTED_START_DATE}`, () => {
      cy.keyboardInput(field.dayInput(), '2');
      cy.keyboardInput(field.monthInput(), getMonth(startDate));
      cy.keyboardInput(field.yearInput(), getYear(startDate));
      submitButton().click();

      cy.checkText(
        partials.errorSummaryListItems().eq(0),
        CONTRACT_ERROR_MESSAGES.SINGLE[CONTRACT_COMPLETION_DATE].CANNOT_BE_THE_SAME,
      );

      cy.checkText(
        field.errorMessage(),
        `Error: ${CONTRACT_ERROR_MESSAGES.SINGLE[CONTRACT_COMPLETION_DATE].CANNOT_BE_THE_SAME}`,
      );
    });

    it(`should render a validation error when the date is before the ${REQUESTED_START_DATE}`, () => {
      cy.keyboardInput(field.dayInput(), '1');
      cy.keyboardInput(field.monthInput(), getMonth(startDate));
      cy.keyboardInput(field.yearInput(), getYear(startDate));
      submitButton().click();

      cy.checkText(
        partials.errorSummaryListItems().eq(0),
        CONTRACT_ERROR_MESSAGES.SINGLE[CONTRACT_COMPLETION_DATE].CANNOT_BE_BEFORE,
      );

      cy.checkText(
        field.errorMessage(),
        `Error: ${CONTRACT_ERROR_MESSAGES.SINGLE[CONTRACT_COMPLETION_DATE].CANNOT_BE_BEFORE}`,
      );
    });

    it(`should render a validation error when the date is over the maximum years allowed after ${REQUESTED_START_DATE}`, () => {
      const endDate = add(new Date(startDate), { years: ELIGIBILITY.MAX_COVER_PERIOD_YEARS });

      cy.keyboardInput(field.dayInput(), '3');
      cy.keyboardInput(field.monthInput(), getMonth(endDate));
      cy.keyboardInput(field.yearInput(), getYear(endDate));
      submitButton().click();

      cy.checkText(
        partials.errorSummaryListItems().eq(0),
        CONTRACT_ERROR_MESSAGES.SINGLE[CONTRACT_COMPLETION_DATE].AFTER_LATEST,
      );

      cy.checkText(
        field.errorMessage(),
        `Error: ${CONTRACT_ERROR_MESSAGES.SINGLE[CONTRACT_COMPLETION_DATE].AFTER_LATEST}`,
      );
    });
  });
});
