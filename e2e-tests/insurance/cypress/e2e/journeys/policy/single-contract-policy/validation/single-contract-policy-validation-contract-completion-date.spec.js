import { field as fieldSelector, submitButton } from '../../../../../../../pages/shared';
import partials from '../../../../../../../partials';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { FIELD_VALUES, ELIGIBILITY } from '../../../../../../../constants';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';

const {
  POLICY: {
    CONTRACT_POLICY: {
      REQUESTED_START_DATE,
      SINGLE: { CONTRACT_COMPLETION_DATE },
    },
  },
} = INSURANCE_FIELD_IDS;

const {
  ROOT,
  POLICY: { SINGLE_CONTRACT_POLICY },
} = INSURANCE_ROUTES;

const {
  INSURANCE: {
    POLICY: {
      CONTRACT_POLICY: CONTRACT_ERROR_MESSAGES,
    },
  },
} = ERROR_MESSAGES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Single contract policy page - form validation - contract completion date', () => {
  let referenceNumber;
  let url;

  let date = new Date();
  let day = date.getDate();
  let year = new Date(date).getFullYear();

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsurancePolicySection({});
      cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.SINGLE);

      url = `${baseUrl}${ROOT}/${referenceNumber}${SINGLE_CONTRACT_POLICY}`;

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

  const field = fieldSelector(CONTRACT_COMPLETION_DATE);

  it('should render a validation error when day is not provided', () => {
    cy.keyboardInput(field.monthInput(), '1');
    cy.keyboardInput(field.yearInput(), year);
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
    cy.keyboardInput(field.yearInput(), year);
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
    const yesterday = new Date(date.setDate(day - 1));
    const month = yesterday.getMonth() + 1;

    cy.keyboardInput(field.dayInput(), yesterday.getDate());
    cy.keyboardInput(field.monthInput(), month);
    cy.keyboardInput(field.yearInput(), year);

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
    date = new Date();

    cy.keyboardInput(field.dayInput(), new Date(date).getDate());
    cy.keyboardInput(field.monthInput(), '24');
    cy.keyboardInput(field.yearInput(), new Date(date).getFullYear());
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
    date = new Date();
    day = date.getDate();
    year = date.getFullYear();

    const startDate = new Date(date.setFullYear(year + 1));
    const month = startDate.getMonth() + 1;

    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.keyboardInput(fieldSelector(REQUESTED_START_DATE).dayInput(), day);
      cy.keyboardInput(fieldSelector(REQUESTED_START_DATE).monthInput(), month);
      cy.keyboardInput(fieldSelector(REQUESTED_START_DATE).yearInput(), startDate.getFullYear());
    });

    it(`should render a validation error when the date is the same as ${REQUESTED_START_DATE}`, () => {
      cy.keyboardInput(field.dayInput(), day);
      cy.keyboardInput(field.monthInput(), month);
      cy.keyboardInput(field.yearInput(), startDate.getFullYear());
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
      cy.keyboardInput(field.dayInput(), day - 1);
      cy.keyboardInput(field.monthInput(), month);
      cy.keyboardInput(field.yearInput(), startDate.getFullYear());
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
      const endDateUnformatted = date.setFullYear(startDate.getFullYear() + ELIGIBILITY.MAX_COVER_PERIOD_YEARS);
      const endDate = new Date(endDateUnformatted);
      const endDateMonth = endDate.getMonth() + 1;

      cy.keyboardInput(field.dayInput(), endDate.getDate() + 1);
      cy.keyboardInput(field.monthInput(), endDateMonth);
      cy.keyboardInput(field.yearInput(), endDate.getFullYear());
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
