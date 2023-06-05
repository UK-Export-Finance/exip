import notFound from './notFound';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { FIELD_IDS } from '../../../../../../../constants';
import generateValidationErrors from '../../../../../../../helpers/validation';
import { CompanyHouseResponse } from '../../../../../../../../types';

const {
  COMPANY_HOUSE: { INPUT },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const { EXPORTER_BUSINESS } = ERROR_MESSAGES.INSURANCE;

describe('controllers/insurance/business/company-details/validation/companies-house-response/rules/notFound', () => {
  const mockErrors = {
    summary: [],
    errorList: {},
  };

  const mockBody = {
    success: false,
  } as CompanyHouseResponse;

  it('should return validation error when success is false', () => {
    const result = notFound(mockBody, mockErrors);

    const errorMessage = EXPORTER_BUSINESS[INPUT].NOT_FOUND;
    const expected = generateValidationErrors(INPUT, errorMessage, mockErrors);

    expect(result).toEqual(expected);
  });

  it('should not return validation error when success is true', () => {
    mockBody.success = true;
    const result = notFound(mockBody, mockErrors);

    expect(result).toEqual(mockErrors);
  });

  it('should not return validation error when apiError is null', () => {
    const mockBodyEmpty = {} as CompanyHouseResponse;
    const result = notFound(mockBodyEmpty, mockErrors);

    expect(result).toEqual(mockErrors);
  });

  it('should not return validation error when apiError is true', () => {
    mockBody.apiError = true;
    const result = notFound(mockBody, mockErrors);

    expect(result).toEqual(mockErrors);
  });
});
