import { TASKS } from '../../../../content-strings';

const { STATUS: { IN_PROGRESS } } = TASKS;

/**
 * checkInProgressTaskStatus
 * Check a task has an "in progress" status
 * @param {Function} selector: Cypress selector
 */
const checkInProgressTaskStatus = (selector) => {
  cy.checkText(selector(), IN_PROGRESS);

  cy.checkClassName(
    selector(),
    'govuk-tag govuk-tag--blue',
  );
};

export default checkInProgressTaskStatus;
