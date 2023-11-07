import validation from '.';
import validationRules from './rules';
import { FIELD_IDS } from '../../../../../constants';
import combineValidationRules from '../../../../../helpers/combine-validation-rules';

const {
  NATURE_OF_YOUR_BUSINESS: { GOODS_OR_SERVICES },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

describe('controllers/insurance/business/nature-of-business/validation', () => {
  it('should return an array of results from rule functions', () => {
    const mockFormBody = {
      [GOODS_OR_SERVICES]: '',
    };

    const result = validation(mockFormBody);

    const expected = combineValidationRules(validationRules, mockFormBody);

    expect(result).toEqual(expected);
  });
});
