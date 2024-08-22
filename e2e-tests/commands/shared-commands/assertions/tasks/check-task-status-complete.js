import { ATTRIBUTES } from '../../../../constants';
import { TASKS } from '../../../../content-strings';

const { CLASSES } = ATTRIBUTES;
const {
  STATUS: { COMPLETED },
} = TASKS;

/**
 * checkTaskStatusCompleted
 * Check a task has a "completed" status
 * @param {Function} selector: Cypress selector
 */
const checkTaskStatusCompleted = (selector) => {
  cy.checkText(selector(), COMPLETED);

  cy.checkClassName(selector(), `${CLASSES.TAGS.ROOT} ${CLASSES.TAGS.TURQUOISE}`);
};

export default checkTaskStatusCompleted;
