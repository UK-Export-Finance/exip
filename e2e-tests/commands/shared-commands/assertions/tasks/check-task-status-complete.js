import { TASKS } from '../../../../content-strings';

const { STATUS: { COMPLETED } } = TASKS;

/**
 * checkCompletedTaskStatus
 * Check a task has a "completed" status
 * @param {Function} selector: Cypress selector
 */
const checkCompletedTaskStatus = (selector) => {
  cy.checkText(selector, COMPLETED);
};

export default checkCompletedTaskStatus;
