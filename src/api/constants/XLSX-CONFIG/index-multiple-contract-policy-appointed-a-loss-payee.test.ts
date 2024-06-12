import { XLSX_ROW_INDEXES } from '.';
import { INDEXES } from './INDEXES';
import { POLICY as POLICY_FIELD_IDS } from '../field-ids/insurance/policy';
import { APPLICATION } from '../application';
import { mockApplicationMinimalBrokerBuyerAndCompany } from '../../test-mocks';

const {
  LOSS_PAYEE: { IS_APPOINTED },
  TYPE_OF_POLICY: { POLICY_TYPE },
} = POLICY_FIELD_IDS;

const application = {
  ...mockApplicationMinimalBrokerBuyerAndCompany,
  policy: {
    ...mockApplicationMinimalBrokerBuyerAndCompany.policy,
    [POLICY_TYPE]: APPLICATION.POLICY_TYPE.MULTIPLE,
  },
};

application.nominatedLossPayee[IS_APPOINTED] = true;

describe(`api/constants/XLSX-CONFIG - XLSX_ROW_INDEXES - ${APPLICATION.POLICY_TYPE.MULTIPLE} - appointed a loss payee`, () => {
  it('should return the correct row indexes', () => {
    const result = XLSX_ROW_INDEXES(application);

    const indexes = INDEXES();

    const expected = {
      ...indexes,
      BUYER_ADDRESS: indexes.BUYER_ADDRESS + 6,
      BUYER_CONTACT_DETAILS: indexes.BUYER_CONTACT_DETAILS + 1,
      TITLES: {
        ...indexes.TITLES,
        BUYER: indexes.TITLES.BUYER + 6,
        DECLARATIONS: indexes.TITLES.DECLARATIONS + 6,
      },
    };

    expect(result).toEqual(expected);
  });
});
