import createInitialChecksTasks from './initial-checks';
import { TASKS } from '../../../content-strings';
import { TASK_IDS } from '../../../constants';

describe('server/helpers/task-list/initial-checks', () => {
  it('should return EXIP `initial checks` tasks', () => {
    const result = createInitialChecksTasks();

    const expected = [
      {
        href: '#',
        title: TASKS.LIST.INITIAL_CHECKS.TASKS.ELIGIBILITY,
        id: TASK_IDS.INITIAL_CHECKS.ELIGIBILITY,
        fields: ['a'],
        dependencies: [],
      },
      {
        href: '#',
        title: TASKS.LIST.INITIAL_CHECKS.TASKS.CONTACT_DETAILS,
        id: TASK_IDS.INITIAL_CHECKS.CONTACT_DETAILS,
        fields: ['b', 'c'],
        dependencies: [],
      },
    ];

    expect(result).toEqual(expected);
  });
});
