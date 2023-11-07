import companiesHouseSearch from './companies-house-search.helper';
import { ERROR_MESSAGES } from '../../../../../content-strings';
import { FIELD_IDS } from '../../../../../constants';
import generateValidationErrors from '../../../../../helpers/validation';
import api from '../../../../../api';
import { RequestBody } from '../../../../../../types';
import { mockCompany } from '../../../../../test-mocks';

const {
  EXPORTER_BUSINESS: { COMPANIES_HOUSE_NUMBER },
} = FIELD_IDS.INSURANCE;

const { EXPORTER_BUSINESS: EXPORTER_BUSINESS_ERROR } = ERROR_MESSAGES.INSURANCE;

describe('controllers/insurance/business/companies-house-number/helpers/companies-house-search', () => {
  let formBody: RequestBody;

  it('should return object with validationErrors and companiesHouseNumber if companiesHouseNumber is an empty string', async () => {
    formBody = {
      [COMPANIES_HOUSE_NUMBER]: '',
    };

    const response = await companiesHouseSearch(formBody);

    const errorMessage = EXPORTER_BUSINESS_ERROR[COMPANIES_HOUSE_NUMBER].INCORRECT_FORMAT;

    const expected = {
      validationErrors: generateValidationErrors(COMPANIES_HOUSE_NUMBER, errorMessage, {}),
      [COMPANIES_HOUSE_NUMBER]: formBody[COMPANIES_HOUSE_NUMBER],
    };

    expect(response).toEqual(expected);
  });

  it('should return object with validationErrors and companiesHouseNumber if companiesHouseNumber is null', async () => {
    formBody = {
      [COMPANIES_HOUSE_NUMBER]: null,
    };

    const response = await companiesHouseSearch(formBody);

    const errorMessage = EXPORTER_BUSINESS_ERROR[COMPANIES_HOUSE_NUMBER].INCORRECT_FORMAT;

    const expected = {
      validationErrors: generateValidationErrors(COMPANIES_HOUSE_NUMBER, errorMessage, {}),
      [COMPANIES_HOUSE_NUMBER]: formBody[COMPANIES_HOUSE_NUMBER],
    };

    expect(response).toEqual(expected);
  });

  it('should return object with validationErrors and companiesHouseNumber if companiesHouseNumber has special characters', async () => {
    formBody = {
      [COMPANIES_HOUSE_NUMBER]: '12345 !',
    };

    const response = await companiesHouseSearch(formBody);

    const errorMessage = EXPORTER_BUSINESS_ERROR[COMPANIES_HOUSE_NUMBER].INCORRECT_FORMAT;

    const expected = {
      validationErrors: generateValidationErrors(COMPANIES_HOUSE_NUMBER, errorMessage, {}),
      [COMPANIES_HOUSE_NUMBER]: formBody[COMPANIES_HOUSE_NUMBER],
    };

    expect(response).toEqual(expected);
  });

  it('should return object with companiesHouseNumber and error set to true if api call has an error', async () => {
    formBody = {
      [COMPANIES_HOUSE_NUMBER]: '123456',
    };

    const getCompaniesHouseResponse = jest.fn(() => Promise.reject(new Error('mock')));
    api.keystone.getCompaniesHouseInformation = getCompaniesHouseResponse;

    const response = await companiesHouseSearch(formBody);

    const expected = {
      validationErrors: {},
      [COMPANIES_HOUSE_NUMBER]: formBody[COMPANIES_HOUSE_NUMBER],
      apiError: true,
    };

    expect(response).toEqual(expected);
  });

  it('should return object with companiesHouseNumber and error set to true if api response is null', async () => {
    formBody = {
      [COMPANIES_HOUSE_NUMBER]: '123456',
    };

    const getCompaniesHouseResponse = jest.fn(() => Promise.resolve(null));
    api.keystone.getCompaniesHouseInformation = getCompaniesHouseResponse;

    const response = await companiesHouseSearch(formBody);

    const expected = {
      validationErrors: {},
      [COMPANIES_HOUSE_NUMBER]: formBody[COMPANIES_HOUSE_NUMBER],
      apiError: true,
    };

    expect(response).toEqual(expected);
  });

  it('should return object with validationErrors, companiesHouseNumber if api response has success as false', async () => {
    formBody = {
      [COMPANIES_HOUSE_NUMBER]: '123456',
    };

    const getCompaniesHouseResponse = jest.fn(() => Promise.resolve({ success: false }));
    api.keystone.getCompaniesHouseInformation = getCompaniesHouseResponse;

    const response = await companiesHouseSearch(formBody);

    const errorMessage = EXPORTER_BUSINESS_ERROR[COMPANIES_HOUSE_NUMBER].NOT_FOUND;

    const expected = {
      validationErrors: generateValidationErrors(COMPANIES_HOUSE_NUMBER, errorMessage, {}),
      [COMPANIES_HOUSE_NUMBER]: formBody[COMPANIES_HOUSE_NUMBER],
    };

    expect(response).toEqual(expected);
  });

  it('should return object with apiError set to true and companiesHouseNumber if api response has apiError as true', async () => {
    formBody = {
      [COMPANIES_HOUSE_NUMBER]: '123456',
    };

    const getCompaniesHouseResponse = jest.fn(() => Promise.resolve({ apiError: true, success: false }));
    api.keystone.getCompaniesHouseInformation = getCompaniesHouseResponse;

    const response = await companiesHouseSearch(formBody);

    const expected = {
      apiError: true,
      [COMPANIES_HOUSE_NUMBER]: formBody[COMPANIES_HOUSE_NUMBER],
      validationErrors: {},
    };

    expect(response).toEqual(expected);
  });

  it('should return object with company and companiesHouseNumber if company found', async () => {
    formBody = {
      [COMPANIES_HOUSE_NUMBER]: '123456',
    };

    const getCompaniesHouseResponse = jest.fn(() => Promise.resolve(mockCompany));
    api.keystone.getCompaniesHouseInformation = getCompaniesHouseResponse;

    const response = await companiesHouseSearch(formBody);

    const expected = {
      validationErrors: {},
      [COMPANIES_HOUSE_NUMBER]: formBody[COMPANIES_HOUSE_NUMBER],
      company: mockCompany,
    };

    expect(response).toEqual(expected);
  });
});
