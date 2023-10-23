import validation from '.';
import validationRules from './rules';
import INSURANCE_FIELD_IDS from '../../../constants/field-ids/insurance';
import combineValidationRules from '../../combine-validation-rules';

const {
  ELIGIBILITY: {
    COMPANY_HOUSE: { COMPANY_NUMBER },
  },
} = INSURANCE_FIELD_IDS;

describe('controllers/insurance/business/companies-house-number/validation/companies-house', () => {
  it('should return an array of results from rule functions', () => {
    const mockFormBody = {
      [COMPANY_NUMBER]: '123',
    };

    const result = validation(mockFormBody);

    const expected = combineValidationRules(validationRules, mockFormBody);

    expect(result).toEqual(expected);
  });
});
