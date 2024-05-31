import { XLSX_ROW_INDEXES } from '.';
import { INDEXES } from './INDEXES';
import { POLICY as POLICY_FIELD_IDS } from '../field-ids/insurance/policy';
import { APPLICATION } from '../application';
import { mockApplication, mockCompanyScenarios } from '../../test-mocks';

const {
  TYPE_OF_POLICY: { POLICY_TYPE },
} = POLICY_FIELD_IDS;

const application = {
  ...mockApplication,
  policy: {
    ...mockApplication.policy,
    [POLICY_TYPE]: APPLICATION.POLICY_TYPE.SINGLE,
  },
  broker: {
    ...mockApplication.broker,
    isUsingBroker: false,
  },
  company: mockCompanyScenarios.noDifferentTradingNameOrAddress,
};

describe(`api/constants/XLSX-CONFIG - XLSX_ROW_INDEXES - ${APPLICATION.POLICY_TYPE.SINGLE} - not using a broker, no different trading details`, () => {
  it('should return default row indexes', () => {
    const result = XLSX_ROW_INDEXES(application);

    const indexes = INDEXES();

    const expected = indexes;

    expect(result).toEqual(expected);
  });
});
