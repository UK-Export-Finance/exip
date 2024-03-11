import { TASKS } from '../../../../content-strings';

const { STATUS: { NOT_STARTED_YET } } = TASKS;

/**
 * checkNotStartedYetTaskStatus
 * Check a task has a "cannot start yet" status
 * @param {Function} selector: Cypress selector
 */
const checkNotStartedYetTaskStatus = (selector) => {
  cy.checkText(selector(), NOT_STARTED_YET);

  cy.checkClassName(
    selector(),
    'govuk-tag govuk-tag--grey',
  );
};

export default checkNotStartedYetTaskStatus;
