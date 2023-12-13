import partials from '../../partials';
import { field as fieldSelector, submitButton } from '../../pages/shared';
import { ERROR_MESSAGES } from '../../content-strings';
import { FIELD_IDS } from '../../constants';

const {
  INSURANCE: {
    POLICY: {
      CONTRACT_POLICY: {
        REQUESTED_START_DATE,
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

const field = fieldSelector(REQUESTED_START_DATE);

const checkValidation = {
  day: {
    notProvided: () => {
      cy.keyboardInput(field.monthInput(), '1');
      cy.keyboardInput(field.yearInput(), '2023');
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
      cy.keyboardInput(field.dayInput().clear(), 'Test');
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
      cy.keyboardInput(field.dayInput(), '1');
      field.monthInput().clear();
      cy.keyboardInput(field.yearInput(), '2023');
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
      cy.keyboardInput(field.monthInput(), 'Test');
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
      cy.keyboardInput(field.dayInput(), '1');
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
      cy.keyboardInput(field.yearInput(), 'Test');
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
    const now = new Date();
    const day = now.getDate();

    const yesterday = new Date(now.setDate(day - 1));

    cy.keyboardInput(field.dayInput(), yesterday.getDate());
    cy.keyboardInput(field.monthInput(), yesterday.getMonth());
    cy.keyboardInput(field.yearInput(), yesterday.getFullYear());
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
    const now = new Date();
    const day = now.getDate();

    const futureDate = new Date(now.setDate(day + 1));

    cy.keyboardInput(field.dayInput(), futureDate.getDate());
    cy.keyboardInput(field.monthInput(), '24');
    cy.keyboardInput(field.yearInput(), futureDate.getFullYear());
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
    const now = new Date();

    cy.keyboardInput(field.dayInput(), now.getDate());
    cy.keyboardInput(field.monthInput(), now.getMonth() + 1);
    cy.keyboardInput(field.yearInput(), now.getFullYear());

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
