import { XLSX_ROW_INDEXES } from '.';
import { INDEXES } from './INDEXES';
import { POLICY as POLICY_FIELD_IDS } from '../field-ids/insurance/policy';
import { APPLICATION } from '../application';
import { mockApplicationMinimalBrokerBuyerAndCompany } from '../../test-mocks';

const {
  LOSS_PAYEE: { IS_APPOINTED },
} = POLICY_FIELD_IDS;

const application = mockApplicationMinimalBrokerBuyerAndCompany;

application.nominatedLossPayee[IS_APPOINTED] = true;

describe(`api/constants/XLSX-CONFIG - XLSX_ROW_INDEXES - ${APPLICATION.POLICY_TYPE.SINGLE} - appointed a loss payee`, () => {
  it('should return the correct row indexes', () => {
    const result = XLSX_ROW_INDEXES(application);

    const indexes = INDEXES();

    const expected = {
      ...indexes,
      BUYER_ADDRESS: indexes.BUYER_ADDRESS + 5,
      TITLES: {
        ...indexes.TITLES,
        BUYER: indexes.TITLES.BUYER + 5,
        DECLARATIONS: indexes.TITLES.DECLARATIONS + 5,
      },
    };

    expect(result).toEqual(expected);
  });
});