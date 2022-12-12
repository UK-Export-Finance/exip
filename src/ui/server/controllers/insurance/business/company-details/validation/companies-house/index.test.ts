import validation from '.';
import validationRules from './rules';
import { FIELD_IDS } from '../../../../../../constants';

const { COMPANY_HOUSE } = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

describe('controllers/insurance/business/company-details/validation/companies-house', () => {
  it('should return an array of results from rule functions', () => {
    const mockSubmittedData = {
      [COMPANY_HOUSE.INPUT]: '123',
    };

    const result = validation(mockSubmittedData);

    let expectedErrorsObj!: object;

    for (let i = 0; i < validationRules.length; i += 1) {
      expectedErrorsObj = validationRules[i](mockSubmittedData, expectedErrorsObj);
    }

    expect(result).toEqual(expectedErrorsObj);
  });
});
