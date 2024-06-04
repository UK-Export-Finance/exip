import { XLSX_ROW_INDEXES } from '.';
import { INDEXES } from './INDEXES';
import { POLICY as POLICY_FIELD_IDS } from '../field-ids/insurance/policy';
import { APPLICATION } from '../application';
import { mockApplicationMinimalBrokerBuyerAndCompany } from '../../test-mocks';

const {
  TYPE_OF_POLICY: { POLICY_TYPE },
} = POLICY_FIELD_IDS;

const application = {
  ...mockApplicationMinimalBrokerBuyerAndCompany,
  policy: {
    ...mockApplicationMinimalBrokerBuyerAndCompany.policy,
    [POLICY_TYPE]: APPLICATION.POLICY_TYPE.SINGLE,
  },
};

describe(`api/constants/XLSX-CONFIG - XLSX_ROW_INDEXES - ${APPLICATION.POLICY_TYPE.SINGLE} - not using a broker, no broker conditions, no different trading details`, () => {
  it('should return default row indexes', () => {
    const result = XLSX_ROW_INDEXES(application);

    const indexes = INDEXES();

    const expected = indexes;

    expect(result).toEqual(expected);
  });
});
