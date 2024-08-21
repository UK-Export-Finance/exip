import { ATTRIBUTES } from '../../../../constants';
import { TASKS } from '../../../../content-strings';

const { CLASSES } = ATTRIBUTES;
const {
  STATUS: { CANNOT_START },
} = TASKS;

/**
 * checkTaskStatusCannotStart
 * Check a task has:
 * - A "cannot start" status.
 * - No link
 * @param {Object} selectors: Cypress selectors
 */
const checkTaskStatusCannotStart = (selectors) => {
  cy.checkText(selectors.status(), CANNOT_START);

  cy.checkClassName(selectors.status(), `${CLASSES.TAGS.ROOT} ${CLASSES.TAGS.GREY}`);

  selectors.link().should('not.exist');
};

export default checkTaskStatusCannotStart;
