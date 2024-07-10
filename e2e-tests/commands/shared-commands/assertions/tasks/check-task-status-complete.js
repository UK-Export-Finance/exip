import { ATTRIBUTES } from '../../../../constants';
import { TASKS } from '../../../../content-strings';

const { CLASSES } = ATTRIBUTES;
const { STATUS: { COMPLETED } } = TASKS;

/**
 * checkCompletedTaskStatus
 * Check a task has a "completed" status
 * @param {Function} selector: Cypress selector
 */
const checkCompletedTaskStatus = (selector) => {
  cy.checkText(selector(), COMPLETED);

  cy.checkClassName(
    selector(),
    `${CLASSES.TAGS.ROOT} ${CLASSES.TAGS.TURQUOISE}`,
  );
};

export default checkCompletedTaskStatus;
