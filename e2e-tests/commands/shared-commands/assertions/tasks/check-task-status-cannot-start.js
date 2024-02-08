import { TASKS } from '../../../../content-strings';

const { STATUS: { CANNOT_START } } = TASKS;

/**
 * checkCannotStartTaskStatus
 * Check a task has a "cannot start" status
 * @param {Function} selector: Cypress selector
 */
const checkCannotStartTaskStatus = (selector) => {
  selector.invoke('text').then((text) => {
    expect(text.trim()).equal(CANNOT_START);
  });
};

export default checkCannotStartTaskStatus;
