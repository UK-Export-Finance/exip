import notFound from './not-found';
import { ERROR_MESSAGES } from '../../../../../content-strings';
import INSURANCE_FIELD_IDS from '../../../../../constants/field-ids/insurance';
import generateValidationErrors from '../../../../validation';
import { CompaniesHouseResponse } from '../../../../../../types';

const {
  ELIGIBILITY: {
    COMPANIES_HOUSE: { COMPANY_NUMBER: FIELD_ID },
  },
} = INSURANCE_FIELD_IDS;

const { ELIGIBILITY } = ERROR_MESSAGES.INSURANCE;

describe('helpers/companies-house-search/validation/companies-house-response/rules/not-found', () => {
  const mockErrors = {
    summary: [],
    errorList: {},
  };

  const mockBody = {
    success: false,
  } as CompaniesHouseResponse;

  it('should return validation error when success is false', () => {
    const result = notFound(mockBody, mockErrors);

    const errorMessage = ELIGIBILITY[FIELD_ID].NOT_FOUND;
    const expected = generateValidationErrors(FIELD_ID, errorMessage, mockErrors);

    expect(result).toEqual(expected);
  });

  it('should not return validation error when success is true', () => {
    mockBody.success = true;
    const result = notFound(mockBody, mockErrors);

    expect(result).toEqual(mockErrors);
  });

  it('should not return validation error when apiError is null', () => {
    const mockBodyEmpty = {} as CompaniesHouseResponse;
    const result = notFound(mockBodyEmpty, mockErrors);

    expect(result).toEqual(mockErrors);
  });

  it('should not return validation error when apiError is true', () => {
    mockBody.apiError = true;
    const result = notFound(mockBody, mockErrors);

    expect(result).toEqual(mockErrors);
  });
});
