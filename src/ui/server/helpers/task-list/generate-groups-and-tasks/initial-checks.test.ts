import createInitialChecksTasks from './initial-checks';
import { TASKS } from '../../../content-strings';
import { TASK_IDS } from '../../../constants';
import requiredFields from '../../required-fields/eligibility';
import { mockApplication } from '../../../test-mocks';

const { INITIAL_CHECKS } = TASKS.LIST;

describe('server/helpers/task-list/initial-checks', () => {
  it('should return EXIP `initial checks` tasks', () => {
    const result = createInitialChecksTasks(mockApplication.migratedV1toV2);

    const expected = [
      {
        title: INITIAL_CHECKS.TASKS.ELIGIBILITY,
        id: TASK_IDS.INITIAL_CHECKS.ELIGIBILITY,
        fields: requiredFields(mockApplication.migratedV1toV2),
        dependencies: [],
      },
    ];

    expect(result).toEqual(expected);
  });
});
