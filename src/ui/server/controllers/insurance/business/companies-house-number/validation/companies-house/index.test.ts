import validation from '.';
import validationRules from './rules';
import { FIELD_IDS } from '../../../../../../constants';
import combineValidationRules from '../../../../../../helpers/combine-validation-rules';

const { COMPANIES_HOUSE_NUMBER } = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

describe('controllers/insurance/business/companies-house-number/validation/companies-house', () => {
  it('should return an array of results from rule functions', () => {
    const mockFormBody = {
      [COMPANIES_HOUSE_NUMBER]: '123',
    };

    const result = validation(mockFormBody);

    const expected = combineValidationRules(validationRules, mockFormBody);

    expect(result).toEqual(expected);
  });
});
