import { XLSX_ROW_INDEXES } from '.';
import { INDEXES } from './INDEXES';
import { POLICY as POLICY_FIELD_IDS } from '../field-ids/insurance/policy';
import { APPLICATION } from '../application';
import { mockApplicationMinimalBrokerBuyerAndCompany } from '../../test-mocks';

const {
  TYPE_OF_POLICY: { POLICY_TYPE },
  NEED_PRE_CREDIT_PERIOD,
  CREDIT_PERIOD_WITH_BUYER,
} = POLICY_FIELD_IDS;

const application = {
  ...mockApplicationMinimalBrokerBuyerAndCompany,
  policy: {
    ...mockApplicationMinimalBrokerBuyerAndCompany.policy,
    [POLICY_TYPE]: APPLICATION.POLICY_TYPE.SINGLE,
    [NEED_PRE_CREDIT_PERIOD]: true,
    [CREDIT_PERIOD_WITH_BUYER]: 'mock value',
  },
};

describe(`api/constants/XLSX-CONFIG - XLSX_ROW_INDEXES - ${APPLICATION.POLICY_TYPE.MULTIPLE} - ${NEED_PRE_CREDIT_PERIOD} true`, () => {
  it('should return default multiple contract policy row indexes', () => {
    const result = XLSX_ROW_INDEXES(application);

    const indexes = INDEXES();

    const expected = {
      ...indexes,
      BROKER_ADDRESS: indexes.BROKER_ADDRESS + 2,
      BUYER_ADDRESS: indexes.BUYER_ADDRESS + 1,
      LOSS_PAYEE_ADDRESS: indexes.LOSS_PAYEE_ADDRESS + 1,
      TITLES: {
        ...indexes.TITLES,
        BUYER: indexes.TITLES.BUYER + 1,
        DECLARATIONS: indexes.TITLES.DECLARATIONS + 1,
        EXPORT_CONTRACT: indexes.TITLES.EXPORT_CONTRACT + 1,
      },
    };

    expect(result).toEqual(expected);
  });
});
