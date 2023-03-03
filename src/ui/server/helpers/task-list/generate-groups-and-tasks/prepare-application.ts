import { TaskListDataTask, TaskListData } from '../../../../types';
import { FIELD_IDS, FIELD_VALUES, GROUP_IDS, TASK_IDS, ROUTES } from '../../../constants';
import { SHARED_CONTRACT_POLICY } from '../../../constants/field-ids/insurance/policy-and-exports';
import { TASKS } from '../../../content-strings';
import { getGroupById, getAllTasksFieldsInAGroup } from '../task-helpers';

const { INSURANCE } = ROUTES;
const { INSURANCE_ROOT, POLICY_AND_EXPORTS, EXPORTER_BUSINESS: EXPORTER_BUSINESS_ROUTES, YOUR_BUYER: YOUR_BUYER_ROUTES } = INSURANCE;

const { PREPARE_APPLICATION } = TASKS.LIST;

/**
 * getContractPolicyTasks
 * Get contract policy tasks depending on the type of policy
 * @param {String} Application policy type
 * @returns {Object} Contract policy tasks
 */
export const getContractPolicyTasks = (policyType?: string): object => {
  if (policyType === FIELD_VALUES.POLICY_TYPE.SINGLE) {
    return FIELD_IDS.INSURANCE.POLICY_AND_EXPORTS.CONTRACT_POLICY.SINGLE;
  }

  if (policyType === FIELD_VALUES.POLICY_TYPE.MULTIPLE) {
    return FIELD_IDS.INSURANCE.POLICY_AND_EXPORTS.CONTRACT_POLICY.MULTIPLE;
  }

  return FIELD_IDS.INSURANCE.POLICY_AND_EXPORTS.TYPE_OF_POLICY;
};

/**
 * getBrokerTasks
 * returns tasks required for broker section based on isUsingBroker field
 * @param {String} isUsingBroker
 * @returns {Array} Array of tasks
 */
export const getBrokerTasks = (isUsingBroker?: string) => {
  const { USING_BROKER, NAME, ADDRESS_LINE_1, TOWN, POSTCODE, EMAIL } = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.BROKER;

  if (isUsingBroker && isUsingBroker === 'Yes') {
    return [USING_BROKER, NAME, ADDRESS_LINE_1, TOWN, POSTCODE, EMAIL];
  }

  return [USING_BROKER];
};

/**
 * createPrepareApplicationTasks
 * @param {Number} Application reference number
 * @param {String} Application policy type
 * @param {Array} otherGroups Task list groups
 * @returns {Array} Tasks
 */
const createPrepareApplicationTasks = (
  referenceNumber: number,
  otherGroups: TaskListData,
  policyType?: string,
  isUsingBroker?: string,
): Array<TaskListDataTask> => {
  const initialChecksGroup = getGroupById(otherGroups, GROUP_IDS.INITIAL_CHECKS);

  const allInitialChecksFields = getAllTasksFieldsInAGroup(initialChecksGroup);

  const POLICY_TYPE_AND_EXPORTS = {
    href: `${INSURANCE_ROOT}/${referenceNumber}${POLICY_AND_EXPORTS.TYPE_OF_POLICY}`,
    title: TASKS.LIST.PREPARE_APPLICATION.TASKS.POLICY_TYPE_AND_EXPORTS,
    id: TASK_IDS.PREPARE_APPLICATION.POLICY_TYPE_AND_EXPORTS,
    fields: Object.values({
      ...FIELD_IDS.INSURANCE.POLICY_AND_EXPORTS.TYPE_OF_POLICY,
      ...SHARED_CONTRACT_POLICY,
      ...getContractPolicyTasks(policyType),
      ...FIELD_IDS.INSURANCE.POLICY_AND_EXPORTS.ABOUT_GOODS_OR_SERVICES,
    }),
    dependencies: allInitialChecksFields,
  };

  const {
    COMPANY_ADDRESS,
    SEARCH,
    INPUT,
    REGISTED_OFFICE_ADDRESS,
    COMPANY_SIC,
    COMPANY_INCORPORATED,
    FINANCIAL_YEAR_END_DATE: FINANCIAL_YEAR_END_DATE_COMPANY_HOUSE,
    ...COMPANIES_HOUSE_FIELDS
  } = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.COMPANY_HOUSE;
  const { PHONE_NUMBER, WEBSITE, YOUR_BUSINESS, ...YOUR_COMPANY_FIELDS } = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.YOUR_COMPANY;
  const { FINANCIAL_YEAR_END_DATE, ...TURNOVER_FIELDS } = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.TURNOVER;

  const EXPORTER_BUSINESS = {
    href: `${INSURANCE_ROOT}/${referenceNumber}${EXPORTER_BUSINESS_ROUTES.COMPANY_DETAILS}`,
    title: PREPARE_APPLICATION.TASKS.EXPORTER_BUSINESS,
    id: TASK_IDS.PREPARE_APPLICATION.EXPORTER_BUSINESS,
    fields: Object.values({
      ...YOUR_COMPANY_FIELDS,
      ...COMPANIES_HOUSE_FIELDS,
      ...FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.NATURE_OF_YOUR_BUSINESS,
      ...TURNOVER_FIELDS,
      ...getBrokerTasks(isUsingBroker),
    }),
    dependencies: [...POLICY_TYPE_AND_EXPORTS.dependencies],
  };

  const YOUR_BUYER = {
    href: `${INSURANCE_ROOT}/${referenceNumber}${YOUR_BUYER_ROUTES.COMPANY_OR_ORGANISATION}`,
    title: PREPARE_APPLICATION.TASKS.BUYER,
    id: TASK_IDS.PREPARE_APPLICATION.BUYER,
    fields: Object.values({
      ...FIELD_IDS.INSURANCE.YOUR_BUYER.COMPANY_OR_ORGANISATION,
    }),
    dependencies: [...POLICY_TYPE_AND_EXPORTS.dependencies],
  };

  const tasks = [POLICY_TYPE_AND_EXPORTS, EXPORTER_BUSINESS, YOUR_BUYER] as Array<TaskListDataTask>;

  return tasks;
};

export default createPrepareApplicationTasks;
