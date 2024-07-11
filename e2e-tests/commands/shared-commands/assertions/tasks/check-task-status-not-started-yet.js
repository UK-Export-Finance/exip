import { ATTRIBUTES } from '../../../../constants';
import { TASKS } from '../../../../content-strings';

const { CLASSES } = ATTRIBUTES;
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
    `${CLASSES.TAGS.ROOT} ${CLASSES.TAGS.GREY}`,
  );
};

export default checkNotStartedYetTaskStatus;
