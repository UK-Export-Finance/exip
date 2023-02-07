import createInitialChecksTasks from './initial-checks';
import { TASKS } from '../../../content-strings';
import { FIELD_IDS, TASK_IDS } from '../../../constants';

const { INITIAL_CHECKS } = TASKS.LIST;

const { ACCOUNT_TO_APPLY_ONLINE } = FIELD_IDS.INSURANCE.ELIGIBILITY;

describe('server/helpers/task-list/initial-checks', () => {
  it('should return EXIP `initial checks` tasks', () => {
    const result = createInitialChecksTasks();

    const expected = [
      {
        href: '#',
        title: INITIAL_CHECKS.TASKS.ELIGIBILITY,
        id: TASK_IDS.INITIAL_CHECKS.ELIGIBILITY,
        fields: Object.values(FIELD_IDS.INSURANCE.ELIGIBILITY).filter((fieldId) => fieldId !== ACCOUNT_TO_APPLY_ONLINE),
        dependencies: [],
      },
    ];

    expect(result).toEqual(expected);
  });
});
