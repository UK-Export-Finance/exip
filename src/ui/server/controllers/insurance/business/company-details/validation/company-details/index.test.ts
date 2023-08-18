import validation from '.';
import tradingName from './rules/trading-name';
import tradingAddress from './rules/trading-address';
import { RequestBody } from '../../../../../../../types';

describe('controllers/insurance/business/company-details/validation/company-details', () => {
  it('should return an object with results from all rule functions', () => {
    const mockFormData = {} as RequestBody;
    const mockErrors = tradingName(mockFormData, {});

    const result = validation(mockFormData);

    const expected = tradingAddress(mockFormData, mockErrors);

    expect(result).toEqual(expected);
  });
});
