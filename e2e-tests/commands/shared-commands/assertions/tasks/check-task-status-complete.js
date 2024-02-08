import { TASKS } from '../../../../content-strings';

const { STATUS: { COMPLETED } } = TASKS;

/**
 * checkCompletedTaskStatus
 * Check a task has a "completed" status
 * @param {Function} selector: Cypress selector
 */
const checkCompletedTaskStatus = (selector) => {
  selector.invoke('text').then((text) => {
    expect(text.trim()).equal(COMPLETED);
  });
};

export default checkCompletedTaskStatus;
