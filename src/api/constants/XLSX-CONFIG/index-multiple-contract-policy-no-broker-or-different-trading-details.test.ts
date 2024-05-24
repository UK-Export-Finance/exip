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
    [POLICY_TYPE]: APPLICATION.POLICY_TYPE.MULTIPLE,
  },
  broker: {
    ...mockApplication.broker,
    isUsingBroker: false,
  },
  company: mockCompanyScenarios.noDifferentTradingNameOrAddress,
};

describe(`api/constants/XLSX-CONFIG - XLSX_ROW_INDEXES - ${APPLICATION.POLICY_TYPE.MULTIPLE} - not using a broker, no different trading details`, () => {
  it('should return default multiple contract policy row indexes', () => {
    const result = XLSX_ROW_INDEXES(application);

    const indexes = INDEXES();

    const expected = {
      ...indexes,
      BUYER_ADDRESS: indexes.BUYER_ADDRESS + 1,
      BUYER_CONTACT_DETAILS: indexes.BUYER_CONTACT_DETAILS + 1,
      TITLES: {
        ...indexes.TITLES,
        BUYER: indexes.TITLES.BUYER + 1,
        DECLARATIONS: indexes.TITLES.DECLARATIONS + 1,
      },
    };

    expect(result).toEqual(expected);
  });
});
