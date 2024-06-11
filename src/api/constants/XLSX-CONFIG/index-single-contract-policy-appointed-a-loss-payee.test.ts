import { XLSX_ROW_INDEXES } from '.';
import { INDEXES } from './INDEXES';
import { POLICY as POLICY_FIELD_IDS } from '../field-ids/insurance/policy';
import { APPLICATION } from '../application';
import { mockApplication } from '../../test-mocks';

const {
  LOSS_PAYEE: { IS_APPOINTED },
} = POLICY_FIELD_IDS;

const application = mockApplication;

application.nominatedLossPayee[IS_APPOINTED] = true;

describe(`api/constants/XLSX-CONFIG - XLSX_ROW_INDEXES - ${APPLICATION.POLICY_TYPE.SINGLE} - appointed a loss payee`, () => {
  it('should return the correct row indexes', () => {
    const result = XLSX_ROW_INDEXES(application);

    const indexes = INDEXES();

    const expected = {
      ...indexes,
      BROKER_ADDRESS: 48,
      BUYER_ADDRESS: indexes.BUYER_ADDRESS + 5,
      TITLES: {
        ...indexes.TITLES,
        POLICY: indexes.TITLES.POLICY + 3,
        BUYER: indexes.TITLES.BUYER + 5,
        DECLARATIONS: indexes.TITLES.DECLARATIONS + 11,
      },
    };

    expect(result).toEqual(expected);
  });
});
