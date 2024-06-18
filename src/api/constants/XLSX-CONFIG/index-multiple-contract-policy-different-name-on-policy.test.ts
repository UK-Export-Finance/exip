import { XLSX_ROW_INDEXES } from '.';
import { INDEXES } from './INDEXES';
import { POLICY as POLICY_FIELD_IDS } from '../field-ids/insurance/policy';
import { APPLICATION } from '../application';
import { mockApplicationMinimalBrokerBuyerAndCompany } from '../../test-mocks';

const {
  NAME_ON_POLICY: { IS_SAME_AS_OWNER },
  TYPE_OF_POLICY: { POLICY_TYPE },
} = POLICY_FIELD_IDS;

const application = {
  ...mockApplicationMinimalBrokerBuyerAndCompany,
  policy: {
    ...mockApplicationMinimalBrokerBuyerAndCompany.policy,
    [POLICY_TYPE]: APPLICATION.POLICY_TYPE.MULTIPLE,
  },
};

application.policyContact[IS_SAME_AS_OWNER] = false;

describe(`api/constants/XLSX-CONFIG - XLSX_ROW_INDEXES - ${APPLICATION.POLICY_TYPE.MULTIPLE} - different name on policy`, () => {
  it('should return the correct row indexes', () => {
    const result = XLSX_ROW_INDEXES(application);

    const indexes = INDEXES();

    const expected = {
      ...indexes,
      BROKER_ADDRESS: indexes.BROKER_ADDRESS + 3,
      BUYER_ADDRESS: indexes.BUYER_ADDRESS + 3,
      BUYER_CONTACT_DETAILS: indexes.BUYER_CONTACT_DETAILS + 1,
      LOSS_PAYEE_ADDRESS: indexes.LOSS_PAYEE_ADDRESS + 3,
      TITLES: {
        ...indexes.TITLES,
        BUYER: indexes.TITLES.BUYER + 3,
        DECLARATIONS: indexes.TITLES.DECLARATIONS + 3,
        EXPORT_CONTRACT: indexes.TITLES.EXPORT_CONTRACT + 3,
      },
    };

    expect(result).toEqual(expected);
  });
});
