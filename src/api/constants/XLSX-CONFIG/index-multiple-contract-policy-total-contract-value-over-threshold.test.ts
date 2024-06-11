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
      BUYER_ADDRESS: indexes.BUYER_ADDRESS + 1,
      BUYER_CONTACT_DETAILS: indexes.BUYER_CONTACT_DETAILS + 1,
      TITLES: {
        ...indexes.TITLES,
        BUYER: indexes.TITLES.BUYER + 1,
        DECLARATIONS: indexes.TITLES.DECLARATIONS + 3,
      },
    };

    expect(result).toEqual(expected);
  });
});
