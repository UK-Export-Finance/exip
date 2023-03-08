import createPrepareApplicationTasks, { getContractPolicyTasks, getBrokerTasks } from './prepare-application';
import { TaskListData } from '../../../../types';
import createInitialChecksTasks from './initial-checks';
import { FIELD_IDS, FIELD_VALUES, GROUP_IDS, TASK_IDS, ROUTES } from '../../../constants';
import { SHARED_CONTRACT_POLICY } from '../../../constants/field-ids/insurance/policy-and-exports';
import { TASKS } from '../../../content-strings';
import { getAllTasksFieldsInAGroup } from '../task-helpers';
import { mockApplication } from '../../../test-mocks';

const { INSURANCE } = ROUTES;
const { INSURANCE_ROOT, POLICY_AND_EXPORTS, EXPORTER_BUSINESS: EXPORTER_BUSINESS_ROUTES, YOUR_BUYER: YOUR_BUYER_ROUTES } = INSURANCE;

const { PREPARE_APPLICATION } = TASKS.LIST;

describe('server/helpers/task-list/prepare-application', () => {
  const { referenceNumber, policyAndExport } = mockApplication;
  const { policyType } = policyAndExport;

  describe('getContractPolicyTasks', () => {
    describe(`when the policy type is ${FIELD_VALUES.POLICY_TYPE.SINGLE}`, () => {
      it('should return single contract policy specific fields that need to be completed', () => {
        const result = getContractPolicyTasks(FIELD_VALUES.POLICY_TYPE.SINGLE);

        const expected = FIELD_IDS.INSURANCE.POLICY_AND_EXPORTS.CONTRACT_POLICY.SINGLE;

        expect(result).toEqual(expected);
      });
    });

    describe(`when the policy type is ${FIELD_VALUES.POLICY_TYPE.MULTIPLE}`, () => {
      it('should return single contract policy specific fields that need to be completed', () => {
        const result = getContractPolicyTasks(FIELD_VALUES.POLICY_TYPE.MULTIPLE);

        const expected = FIELD_IDS.INSURANCE.POLICY_AND_EXPORTS.CONTRACT_POLICY.MULTIPLE;

        expect(result).toEqual(expected);
      });
    });

    describe('when there is no policy type', () => {
      it('should return type of policy specific fields that need to be completed', () => {
        const result = getContractPolicyTasks();

        const expected = FIELD_IDS.INSURANCE.POLICY_AND_EXPORTS.TYPE_OF_POLICY;

        expect(result).toEqual(expected);
      });
    });
  });

  describe('getBrokerTasks', () => {
    const { USING_BROKER, NAME, ADDRESS_LINE_1, TOWN, POSTCODE, EMAIL } = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.BROKER;

    describe('when isUsingBroker is "Yes"', () => {
      it('should return multiple field ids in an array', () => {
        const result = getBrokerTasks('Yes');

        const expected = [USING_BROKER, NAME, ADDRESS_LINE_1, TOWN, POSTCODE, EMAIL];

        expect(result).toEqual(expected);
      });
    });

    describe('when isUsingBroker is "No"', () => {
      it('should return a single field id in an array', () => {
        const result = getBrokerTasks('No');

        const expected = [USING_BROKER];

        expect(result).toEqual(expected);
      });
    });

    describe('when isUsingBroker is undefined', () => {
      it('should return a single field id in an array', () => {
        const result = getBrokerTasks();

        const expected = [USING_BROKER];

        expect(result).toEqual(expected);
      });
    });
  });

  describe('createPrepareApplicationTasks', () => {
    const initialChecksTasks = createInitialChecksTasks();
    const isUsingBroker = 'Yes';

    const previousGroups = [
      {
        title: TASKS.LIST.INITIAL_CHECKS.HEADING,
        id: GROUP_IDS.INITIAL_CHECKS,
        tasks: initialChecksTasks,
      },
    ] as TaskListData;

    it('should return EXIP `prepare application` tasks', () => {
      const result = createPrepareApplicationTasks(referenceNumber, previousGroups, policyType, isUsingBroker);

      const expectedDependencies = getAllTasksFieldsInAGroup(previousGroups[0]);

      const POLICY_TYPE_AND_EXPORTS = {
        href: `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${POLICY_AND_EXPORTS.TYPE_OF_POLICY}`,
        title: TASKS.LIST.PREPARE_APPLICATION.TASKS.POLICY_TYPE_AND_EXPORTS,
        id: TASK_IDS.PREPARE_APPLICATION.POLICY_TYPE_AND_EXPORTS,
        fields: Object.values({
          ...FIELD_IDS.INSURANCE.POLICY_AND_EXPORTS.TYPE_OF_POLICY,
          ...SHARED_CONTRACT_POLICY,
          ...getContractPolicyTasks(policyType),
          ...FIELD_IDS.INSURANCE.POLICY_AND_EXPORTS.ABOUT_GOODS_OR_SERVICES,
        }),
        dependencies: expectedDependencies,
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
        href: `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${EXPORTER_BUSINESS_ROUTES.COMPANY_DETAILS}`,
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

      const { REGISTRATION_NUMBER, WEBSITE: BUYER_WEBSITE, ...COMPANY_OR_ORGANISATION_FIELDS } = FIELD_IDS.INSURANCE.YOUR_BUYER.COMPANY_OR_ORGANISATION;
      const YOUR_BUYER = {
        href: `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${YOUR_BUYER_ROUTES.COMPANY_OR_ORGANISATION}`,
        title: PREPARE_APPLICATION.TASKS.BUYER,
        id: TASK_IDS.PREPARE_APPLICATION.BUYER,
        fields: Object.values({
          ...COMPANY_OR_ORGANISATION_FIELDS,
          ...FIELD_IDS.INSURANCE.YOUR_BUYER.WORKING_WITH_BUYER,
        }),
        dependencies: [...POLICY_TYPE_AND_EXPORTS.dependencies],
      };

      const expected = [POLICY_TYPE_AND_EXPORTS, EXPORTER_BUSINESS, YOUR_BUYER];

      expect(result).toEqual(expected);
    });
  });
});
