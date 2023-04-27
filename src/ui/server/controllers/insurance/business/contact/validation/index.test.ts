import validation from '.';
import validationRules from './rules';
import { FIELD_IDS } from '../../../../../constants';
import combineValidationRules from '../../../../../helpers/combine-validation-rules';

const {
  CONTACT: { FIRST_NAME },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

describe('controllers/insurance/business/contact/validation', () => {
  it('should return an array of results from rule functions', () => {
    const mockFormBody = {
      [FIRST_NAME]: '',
    };

    const result = validation(mockFormBody);

    const expected = combineValidationRules(validationRules, mockFormBody);

    expect(result).toEqual(expected);
  });
});
