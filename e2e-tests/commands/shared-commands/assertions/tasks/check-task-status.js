/**
 * checkTaskStatus
 * Check a task's status
 * @param {Function} selector: Cypress selector
 */
const checkTaskStatus = (task, status) => {
  task.status().invoke('text').then((text) => {
    expect(text.trim()).equal(status);
  });
};

export default checkTaskStatus;
