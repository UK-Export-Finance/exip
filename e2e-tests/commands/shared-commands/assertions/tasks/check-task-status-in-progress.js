import { TASKS } from '../../../../content-strings';

const { STATUS: { IN_PROGRESS } } = TASKS;

/**
 * checkInProgressTaskStatus
 * Check a task has an "in progress" status
 * @param {Function} selector: Cypress selector
 */
const checkInProgressTaskStatus = (selector) => {
  selector.invoke('text').then((text) => {
    expect(text.trim()).equal(IN_PROGRESS);
  });
};

export default checkInProgressTaskStatus;
