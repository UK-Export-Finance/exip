import validation from '.';
import validationRules from './rules';
import { FIELD_IDS } from '../../../../../../constants';
import combineValidationRules from '../../../../../../helpers/combine-validation-rules';

const { COMPANY_HOUSE } = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

describe('controllers/insurance/business/company-details/validation/companies-house', () => {
  it('should return an array of results from rule functions', () => {
    const mockFormBody = {
      [COMPANY_HOUSE.INPUT]: '123',
    };

    const result = validation(mockFormBody);

    const expected = combineValidationRules(validationRules, mockFormBody);

    expect(result).toEqual(expected);
  });
});
