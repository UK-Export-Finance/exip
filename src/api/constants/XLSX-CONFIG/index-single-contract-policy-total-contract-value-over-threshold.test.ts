import { XLSX_ROW_INDEXES } from '.';
import { INDEXES } from './INDEXES';
import { APPLICATION } from '../application';
import { mockApplicationSinglePolicyTotalContractValueOverThreshold } from '../../test-mocks';

describe(`api/constants/XLSX-CONFIG - XLSX_ROW_INDEXES - ${APPLICATION.POLICY_TYPE.SINGLE} - total contract value over threshold`, () => {
  it('should return the correct row indexes', () => {
    const result = XLSX_ROW_INDEXES(mockApplicationSinglePolicyTotalContractValueOverThreshold);

    const indexes = INDEXES();

    const expected = {
      ...indexes,
      TITLES: {
        ...indexes.TITLES,
        DECLARATIONS: indexes.TITLES.DECLARATIONS + 1,
      },
    };

    expect(result).toEqual(expected);
  });
});
