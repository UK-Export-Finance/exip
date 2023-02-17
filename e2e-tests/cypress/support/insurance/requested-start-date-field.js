import {
  add,
  getDate,
  getMonth,
  getYear,
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
      cy.inputType(field.monthInput(), '1');
      cy.inputType(field.yearInput(), '2023');
      submitButton().click();

      cy.checkText(
        partials.errorSummaryListItems().eq(0),
        CONTRACT_ERROR_MESSAGES[REQUESTED_START_DATE].INCORRECT_FORMAT,
      );

      cy.checkText(
        field.errorMessage(),
        `Error: ${CONTRACT_ERROR_MESSAGES[REQUESTED_START_DATE].INCORRECT_FORMAT}`,
      );
    },
    notANumber: () => {
      cy.inputType(field.dayInput().clear(), 'Test');
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
      cy.inputType(field.dayInput(), '1');
      field.monthInput().clear();
      cy.inputType(field.yearInput(), '2023');
      submitButton().click();

      cy.checkText(
        partials.errorSummaryListItems().eq(0),
        CONTRACT_ERROR_MESSAGES[REQUESTED_START_DATE].INCORRECT_FORMAT,
      );

      cy.checkText(
        field.errorMessage(),
        `Error: ${CONTRACT_ERROR_MESSAGES[REQUESTED_START_DATE].INCORRECT_FORMAT}`,
      );
    },
    notANumber: () => {
      field.dayInput().clear();
      cy.inputType(field.monthInput(), 'Test');
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
      cy.inputType(field.dayInput(), '1');
      field.monthInput().clear('2');
      field.yearInput().clear();
      submitButton().click();

      cy.checkText(
        partials.errorSummaryListItems().eq(0),
        CONTRACT_ERROR_MESSAGES[REQUESTED_START_DATE].INCORRECT_FORMAT,
      );

      cy.checkText(
        field.errorMessage(),
        `Error: ${CONTRACT_ERROR_MESSAGES[REQUESTED_START_DATE].INCORRECT_FORMAT}`,
      );
    },
    notANumber: () => {
      field.dayInput().clear();
      field.monthInput().clear();
      cy.inputType(field.yearInput(), 'Test');
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
    const today = new Date();
    const yesterday = today.setDate(today.getDate() - 1);

    cy.inputType(field.dayInput(), getDate(yesterday));
    cy.inputType(field.monthInput(), getMonth(yesterday));
    cy.inputType(field.yearInput(), getYear(yesterday));
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
  invalidFormat: () => {
    const date = new Date();
    const futureDate = add(date, { days: 1 });

    cy.inputType(field.dayInput(), getDate(futureDate));
    cy.inputType(field.monthInput(), '24');
    cy.inputType(field.yearInput(), getYear(futureDate));
    submitButton().click();

    cy.checkText(
      partials.errorSummaryListItems().eq(0),
      CONTRACT_ERROR_MESSAGES[REQUESTED_START_DATE].INCORRECT_FORMAT,
    );

    cy.checkText(
      field.errorMessage(),
      `Error: ${CONTRACT_ERROR_MESSAGES[REQUESTED_START_DATE].INCORRECT_FORMAT}`,
    );
  },
  isToday: () => {
    const date = new Date();

    cy.inputType(field.dayInput(), getDate(date));
    cy.inputType(field.monthInput(), getMonth(date) + 1);
    cy.inputType(field.yearInput(), getYear(date));

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
