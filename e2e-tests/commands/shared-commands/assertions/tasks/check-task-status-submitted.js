import { APPLICATION } from '../../../../constants';

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
    'govuk-tag govuk-tag--green',
  );
};

export default checkSubmittedTaskStatus;
