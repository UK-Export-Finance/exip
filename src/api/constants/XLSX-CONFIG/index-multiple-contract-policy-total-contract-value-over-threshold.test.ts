import { XLSX_ROW_INDEXES } from '.';
import { INDEXES } from './INDEXES';
import { APPLICATION } from '../application';
import { mockApplicationMultiplePolicyTotalContractValueOverThreshold } from '../../test-mocks';

describe(`api/constants/XLSX-CONFIG - XLSX_ROW_INDEXES - ${APPLICATION.POLICY_TYPE.MULTIPLE} - total contract value over threshold`, () => {
  it('should return the correct row indexes', () => {
    const result = XLSX_ROW_INDEXES(mockApplicationMultiplePolicyTotalContractValueOverThreshold);

    const indexes = INDEXES();

    const expected = {
      ...indexes,
      BROKER_ADDRESS: indexes.BROKER_ADDRESS + 1,
      BUYER_ADDRESS: indexes.BUYER_ADDRESS + 1,
      BUYER_CONTACT_DETAILS: indexes.BUYER_CONTACT_DETAILS + 1,
      LOSS_PAYEE_ADDRESS: indexes.LOSS_PAYEE_ADDRESS + 1,
      TITLES: {
        ...indexes.TITLES,
        BUYER: indexes.TITLES.BUYER + 1,
        DECLARATIONS: indexes.TITLES.DECLARATIONS + 2,
        EXPORT_CONTRACT: indexes.TITLES.EXPORT_CONTRACT + 2,
      },
    };

    expect(result).toEqual(expected);
  });
});
