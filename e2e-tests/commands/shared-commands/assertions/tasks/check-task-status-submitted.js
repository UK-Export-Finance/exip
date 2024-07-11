import { ATTRIBUTES, APPLICATION } from '../../../../constants';

const { CLASSES } = ATTRIBUTES;
const { STATUS: { SUBMITTED } } = APPLICATION;

/**
 * checkSubmittedTaskStatus
 * Check a task has a "submitted" status
 * @param {Function} selector: Cypress selector
 */
const checkSubmittedTaskStatus = (selector) => {
  cy.checkText(selector(), SUBMITTED);

  cy.checkClassName(
    selector(),
    `${CLASSES.TAGS.ROOT} ${CLASSES.TAGS.GREEN}`,
  );
};

export default checkSubmittedTaskStatus;
