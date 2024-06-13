import { XLSX_ROW_INDEXES } from '.';
import { INDEXES } from './INDEXES';
import { POLICY as POLICY_FIELD_IDS } from '../field-ids/insurance/policy';
import { APPLICATION } from '../application';
import { mockApplicationMinimalBrokerBuyerAndCompany } from '../../test-mocks';

const {
  NAME_ON_POLICY: { IS_SAME_AS_OWNER },
} = POLICY_FIELD_IDS;

const application = mockApplicationMinimalBrokerBuyerAndCompany;

application.policyContact[IS_SAME_AS_OWNER] = false;

describe(`api/constants/XLSX-CONFIG - XLSX_ROW_INDEXES - ${APPLICATION.POLICY_TYPE.SINGLE} - different name on policy`, () => {
  it('should return the correct row indexes', () => {
    const result = XLSX_ROW_INDEXES(application);

    const indexes = INDEXES();

    const expected = {
      ...indexes,
      BROKER_ADDRESS: indexes.BROKER_ADDRESS + 2,
      BUYER_ADDRESS: indexes.BUYER_ADDRESS + 2,
      LOSS_PAYEE_ADDRESS: indexes.LOSS_PAYEE_ADDRESS + 2,
      TITLES: {
        ...indexes.TITLES,
        BUYER: indexes.TITLES.BUYER + 2,
        DECLARATIONS: indexes.TITLES.DECLARATIONS + 2,
      },
    };

    expect(result).toEqual(expected);
  });
});
