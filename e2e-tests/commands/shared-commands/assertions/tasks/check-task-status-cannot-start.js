import { TASKS } from '../../../../content-strings';

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
    'govuk-tag govuk-tag--grey',
  );
};

export default checkCannotStartTaskStatus;
