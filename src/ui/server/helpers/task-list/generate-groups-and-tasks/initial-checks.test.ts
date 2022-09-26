import createInitialChecksTasks from './initial-checks';
import { TASKS } from '../../../content-strings';

describe('server/helpers/task-list/initial-checks', () => {
  it('should return EXIP `initial checks` tasks', () => {
    const result = createInitialChecksTasks();

    const expected = {
      ELIGIBILITY: {
        href: 'mock',
        title: TASKS.LIST.INITIAL_CHECKS.TASKS.ELIGIBILITY,
        id: 'mock',
        fields: [],
        dependencies: [],
      },
      CONTACT_DETAILS: {
        href: 'mock',
        title: TASKS.LIST.INITIAL_CHECKS.TASKS.CONTACT_DETAILS,
        id: 'mock',
        fields: [],
        dependencies: [],
      },
    };

    expect(result).toEqual(expected);
  });
});
