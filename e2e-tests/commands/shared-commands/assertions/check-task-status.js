/**
 * checkTaskStatus
 * Check an tasks's statuts
 * @param {Object} task: Task field
 * @param {String} status: Expected status
 */
const checkTaskStatus = (task, status) => {
  cy.checkText(task.status(), status);
};

export default checkTaskStatus;
