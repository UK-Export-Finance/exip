import { ATTRIBUTES } from '../../../../constants';
import { TASKS } from '../../../../content-strings';

const { CLASSES } = ATTRIBUTES;
const { STATUS: { CANNOT_START } } = TASKS;

/**
 * checkCannotStartTaskStatus
 * Check a task has a "cannot start" status
 * @param {Function} selector: Cypress selector
 */
const checkCannotStartTaskStatus = (selector) => {
  cy.checkText(selector(), CANNOT_START);

  cy.checkClassName(
    selector(),
    `${CLASSES.TAGS.ROOT} ${CLASSES.TAGS.GREY}`,
  );
};

export default checkCannotStartTaskStatus;
