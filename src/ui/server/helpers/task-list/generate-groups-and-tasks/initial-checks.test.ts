import createInitialChecksTasks from './initial-checks';
import { TASKS } from '../../../content-strings';
import { TASK_IDS } from '../../../constants';
import requiredFields from '../../section-fields/eligibility';

const { INITIAL_CHECKS } = TASKS.LIST;

describe('server/helpers/task-list/initial-checks', () => {
  it('should return EXIP `initial checks` tasks', () => {
    const result = createInitialChecksTasks();

    const expected = [
      {
        href: '#',
        title: INITIAL_CHECKS.TASKS.ELIGIBILITY,
        id: TASK_IDS.INITIAL_CHECKS.ELIGIBILITY,
        fields: requiredFields(),
        dependencies: [],
      },
    ];

    expect(result).toEqual(expected);
  });
});
