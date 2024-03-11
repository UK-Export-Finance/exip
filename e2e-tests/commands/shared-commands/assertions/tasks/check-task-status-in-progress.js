import { ATTRIBUTES } from '../../../../constants';
import { TASKS } from '../../../../content-strings';

const { CLASSES } = ATTRIBUTES;
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
    `${CLASSES.TAGS.ROOT} ${CLASSES.TAGS.BLUE}`,
  );
};

export default checkInProgressTaskStatus;
