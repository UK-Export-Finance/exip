import validation from '.';
import validationRules from './rules';
import { FIELD_IDS } from '../../../../../constants';
import combineValidationRules from '../../../../../helpers/combine-validation-rules';

const {
  TURNOVER: { ESTIMATED_ANNUAL_TURNOVER },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

describe('controllers/insurance/business/turnover/validation', () => {
  it('should return an array of results from rule functions', () => {
    const mockFormBody = {
      [ESTIMATED_ANNUAL_TURNOVER]: '',
    };

    const result = validation(mockFormBody);

    const expected = combineValidationRules(validationRules, mockFormBody);

    expect(result).toEqual(expected);
  });
});
