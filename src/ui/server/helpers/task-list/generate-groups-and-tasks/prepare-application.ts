import { TaskListDataTask, TaskListData, TaskListDataGroupTasksPrepareApplication } from '../../../../types';
import { FIELD_IDS, ROUTES } from '../../../constants';
import { TASKS } from '../../../content-strings';

const createPrepareApplicationTasks = (otherGroups: TaskListData): TaskListDataGroupTasksPrepareApplication => {
  const POLICY_TYPE = {
    href: ROUTES.QUOTE.POLICY_TYPE,
    title: TASKS.LIST.PREPARE_APPLICATION.TASKS.POLICY_TYPE,
    id: 'mock',
    fields: [FIELD_IDS.POLICY_TYPE, FIELD_IDS.POLICY_LENGTH],
    dependencies: [...otherGroups.INITIAL_CHECKS.tasks.ELIGIBILITY.fields, ...otherGroups.INITIAL_CHECKS.tasks.CONTACT_DETAILS.fields],
  } as TaskListDataTask;

  const EXPORTS_TO_INSURE = {
    href: '/mock',
    title: TASKS.LIST.PREPARE_APPLICATION.TASKS.EXPORTS_TO_INSURE,
    id: 'mock',
    fields: [],
    dependencies: POLICY_TYPE.fields,
  } as TaskListDataTask;

  const ABOUT_BUSINESS = {
    href: '/mock',
    title: TASKS.LIST.PREPARE_APPLICATION.TASKS.ABOUT_BUSINESS,
    id: 'mock',
    fields: [],
    dependencies: [...EXPORTS_TO_INSURE.dependencies!, ...EXPORTS_TO_INSURE.fields!],
  } as TaskListDataTask;

  const BUYER = {
    href: '/mock',
    title: TASKS.LIST.PREPARE_APPLICATION.TASKS.BUYER,
    id: 'mock',
    fields: [],
    dependencies: [],
  } as TaskListDataTask;

  const sections = {
    POLICY_TYPE,
    EXPORTS_TO_INSURE,
    ABOUT_BUSINESS,
    BUYER,
  };

  return sections;
};

export default createPrepareApplicationTasks;
