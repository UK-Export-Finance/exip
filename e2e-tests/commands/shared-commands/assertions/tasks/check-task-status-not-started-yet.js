import { TASKS } from '../../../../content-strings';

const { STATUS: { NOT_STARTED_YET } } = TASKS;

/**
 * checkNotStartedYetTaskStatus
 * Check a task has a "cannot start yet" status
 * @param {Function} selector: Cypress selector
 */
const checkNotStartedYetTaskStatus = (selector) => {
  selector.invoke('text').then((text) => {
    expect(text.trim()).equal(NOT_STARTED_YET);
  });
};

export default checkNotStartedYetTaskStatus;
