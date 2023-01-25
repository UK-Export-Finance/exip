import {
  getDate,
  getMonth,
  getYear,
  sub,
} from 'date-fns';
import { multipleContractPolicyPage } from '../../e2e/pages/insurance/policy-and-export';
import partials from '../../e2e/partials';
import { submitButton } from '../../e2e/pages/shared';
import { ERROR_MESSAGES } from '../../../content-strings';
import { FIELD_IDS } from '../../../constants';

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

const field = multipleContractPolicyPage[REQUESTED_START_DATE];

const checkValidation = {
  day: {
    notProvided: () => {
      field.monthInput().type('1');
      field.yearInput().type('2023');
      submitButton().click();

      cy.checkText(
        partials.errorSummaryListItems().eq(0),
        CONTRACT_ERROR_MESSAGES[REQUESTED_START_DATE].IS_EMPTY,
      );

      cy.checkText(
        field.errorMessage(),
        `Error: ${CONTRACT_ERROR_MESSAGES[REQUESTED_START_DATE].IS_EMPTY}`,
      );
    },
    notANumber: () => {
      field.dayInput().clear().type('Test');
      submitButton().click();

      cy.checkText(
        partials.errorSummaryListItems().eq(0),
        CONTRACT_ERROR_MESSAGES[REQUESTED_START_DATE].NOT_A_NUMBER,
      );

      cy.checkText(
        field.errorMessage(),
        `Error: ${CONTRACT_ERROR_MESSAGES[REQUESTED_START_DATE].NOT_A_NUMBER}`,
      );
    },
  },
  month: {
    notProvided: () => {
      field.dayInput().clear().type('1');
      field.monthInput().clear();
      field.yearInput().clear().type('2023');
      submitButton().click();

      cy.checkText(
        partials.errorSummaryListItems().eq(0),
        CONTRACT_ERROR_MESSAGES[REQUESTED_START_DATE].IS_EMPTY,
      );

      cy.checkText(
        field.errorMessage(),
        `Error: ${CONTRACT_ERROR_MESSAGES[REQUESTED_START_DATE].IS_EMPTY}`,
      );
    },
    notANumber: () => {
      field.dayInput().clear();
      field.monthInput().clear().type('Test');
      submitButton().click();

      cy.checkText(
        partials.errorSummaryListItems().eq(0),
        CONTRACT_ERROR_MESSAGES[REQUESTED_START_DATE].NOT_A_NUMBER,
      );

      cy.checkText(
        field.errorMessage(),
        `Error: ${CONTRACT_ERROR_MESSAGES[REQUESTED_START_DATE].NOT_A_NUMBER}`,
      );
    },
  },
  year: {
    notProvided: () => {
      field.dayInput().clear().type('1');
      field.monthInput().clear('2');
      field.yearInput().clear();
      submitButton().click();

      cy.checkText(
        partials.errorSummaryListItems().eq(0),
        CONTRACT_ERROR_MESSAGES[REQUESTED_START_DATE].IS_EMPTY,
      );

      cy.checkText(
        field.errorMessage(),
        `Error: ${CONTRACT_ERROR_MESSAGES[REQUESTED_START_DATE].IS_EMPTY}`,
      );
    },
    notANumber: () => {
      field.dayInput().clear();
      field.monthInput().clear();
      field.yearInput().clear().type('Test');
      submitButton().click();

      cy.checkText(
        partials.errorSummaryListItems().eq(0),
        CONTRACT_ERROR_MESSAGES[REQUESTED_START_DATE].NOT_A_NUMBER,
      );

      cy.checkText(
        field.errorMessage(),
        `Error: ${CONTRACT_ERROR_MESSAGES[REQUESTED_START_DATE].NOT_A_NUMBER}`,
      );
    },
  },
  notInTheFuture: () => {
    const date = new Date();
    const yesterday = sub(date, { days: 1, months: 1 });

    field.dayInput().clear().type(getDate(yesterday));
    field.monthInput().clear().type(getMonth(yesterday));
    field.yearInput().clear().type(getYear(yesterday));
    submitButton().click();

    cy.checkText(
      partials.errorSummaryListItems().eq(0),
      CONTRACT_ERROR_MESSAGES[REQUESTED_START_DATE].BEFORE_EARLIEST,
    );

    cy.checkText(
      field.errorMessage(),
      `Error: ${CONTRACT_ERROR_MESSAGES[REQUESTED_START_DATE].BEFORE_EARLIEST}`,
    );
  },
  isToday: () => {
    const date = new Date();

    field.dayInput().clear().type(getDate(date));
    field.monthInput().clear().type(getMonth(date) + 1);
    field.yearInput().clear().type(getYear(date));

    submitButton().click();

    partials.errorSummaryListItems().eq(0).invoke('text').then((text) => {
      expect(text.trim()).not.equal(CONTRACT_ERROR_MESSAGES[REQUESTED_START_DATE].BEFORE_EARLIEST);
    });

    field.errorMessage().should('not.exist');
  },
};

const requestedCoverStartDate = {
  checkValidation,
};

export default requestedCoverStartDate;
