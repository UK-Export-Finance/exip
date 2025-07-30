import { ATTRIBUTES } from '../../../../constants';
import { TASKS } from '../../../../content-strings';

const { CLASSES } = ATTRIBUTES;
const {
  STATUS: { NOT_STARTED_YET },
} = TASKS;

/**
 * checkTaskStatusNotStartedYet
 * Check a task has:
 * - A "not started" status.
 * - No link
 * @param {object} selectors: Cypress selectors
 */
const checkTaskStatusNotStartedYet = (selectors) => {
  cy.checkText(selectors.status(), NOT_STARTED_YET);

  cy.checkClassName(selectors.status(), `${CLASSES.TAGS.ROOT} ${CLASSES.TAGS.GREY}`);

  selectors.link().should('exist');
};

export default checkTaskStatusNotStartedYet;
