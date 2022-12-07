import apiError from './apiError';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { FIELD_IDS } from '../../../../../../../constants';
import generateValidationErrors from '../../../../../../../helpers/validation';
import { CompanyHouseResponse } from '../../../../../../../../types';
import { mockCompany } from '../../../../../../../test-mocks';

const {
  COMPANY_HOUSE: { INPUT },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const { EXPORTER_BUSINESS } = ERROR_MESSAGES.INSURANCE;

describe('controllers/insurance/business/company-details/validation/companies-house-response/rules/apiError', () => {
  const mockErrors = {
    summary: [],
    errorList: {},
  };

  const mockBody = {
    apiError: true,
  } as CompanyHouseResponse;

  it('should return validation error when apiError is true', () => {
    const result = apiError(mockBody, mockErrors);

    const errorMessage = EXPORTER_BUSINESS[INPUT].TECHNICAL_ISSUES;
    const expected = generateValidationErrors(INPUT, errorMessage, mockErrors);

    expect(result).toEqual(expected);
  });

  it('should return validation error when there is no responseBody', () => {
    const result = apiError({} as CompanyHouseResponse, mockErrors);

    const errorMessage = EXPORTER_BUSINESS[INPUT].TECHNICAL_ISSUES;
    const expected = generateValidationErrors(INPUT, errorMessage, mockErrors);

    expect(result).toEqual(expected);
  });

  it('should return validation error when the responseBody is null', () => {
    // @ts-ignore
    const result = apiError(null, mockErrors);

    const errorMessage = EXPORTER_BUSINESS[INPUT].TECHNICAL_ISSUES;
    const expected = generateValidationErrors(INPUT, errorMessage, mockErrors);

    expect(result).toEqual(expected);
  });

  it('should not return validation error when apiError is false', () => {
    mockBody.apiError = false;
    const result = apiError(mockBody, mockErrors);

    expect(result).toEqual(mockErrors);
  });

  it('should not return validation error when there is a response and apiError is null', () => {
    const result = apiError(mockCompany, mockErrors);

    expect(result).toEqual(mockErrors);
  });
});
