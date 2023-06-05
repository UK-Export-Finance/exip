import companiesHouseSearch from './companies-house-search.helper';
import { ERROR_MESSAGES } from '../../../../../content-strings';
import { FIELD_IDS } from '../../../../../constants';
import generateValidationErrors from '../../../../../helpers/validation';
import api from '../../../../../api';
import { RequestBody } from '../../../../../../types';
import { mockCompany } from '../../../../../test-mocks';

const {
  EXPORTER_BUSINESS: { COMPANY_HOUSE },
} = FIELD_IDS.INSURANCE;

const { EXPORTER_BUSINESS: EXPORTER_BUSINESS_ERROR } = ERROR_MESSAGES.INSURANCE;

describe('controllers/insurance/business/companies-details/helpers/companies-house-search', () => {
  let formBody: RequestBody;

  it('should return object with validationErrors and companiesHouseNumber if companiesHouseNumber is an empty string', async () => {
    formBody = {
      [COMPANY_HOUSE.INPUT]: '',
    };

    const response = await companiesHouseSearch(formBody);

    const errorMessage = EXPORTER_BUSINESS_ERROR[COMPANY_HOUSE.INPUT].INCORRECT_FORMAT;

    const expected = {
      validationErrors: generateValidationErrors(COMPANY_HOUSE.INPUT, errorMessage, {}),
      [COMPANY_HOUSE.INPUT]: formBody[COMPANY_HOUSE.INPUT],
    };

    expect(response).toEqual(expected);
  });

  it('should return object with validationErrors and companiesHouseNumber if companiesHouseNumber is null', async () => {
    formBody = {
      [COMPANY_HOUSE.INPUT]: null,
    };

    const response = await companiesHouseSearch(formBody);

    const errorMessage = EXPORTER_BUSINESS_ERROR[COMPANY_HOUSE.INPUT].INCORRECT_FORMAT;

    const expected = {
      validationErrors: generateValidationErrors(COMPANY_HOUSE.INPUT, errorMessage, {}),
      [COMPANY_HOUSE.INPUT]: formBody[COMPANY_HOUSE.INPUT],
    };

    expect(response).toEqual(expected);
  });

  it('should return object with validationErrors and companiesHouseNumber if companiesHouseNumber has special characters', async () => {
    formBody = {
      [COMPANY_HOUSE.INPUT]: '12345 !',
    };

    const response = await companiesHouseSearch(formBody);

    const errorMessage = EXPORTER_BUSINESS_ERROR[COMPANY_HOUSE.INPUT].INCORRECT_FORMAT;

    const expected = {
      validationErrors: generateValidationErrors(COMPANY_HOUSE.INPUT, errorMessage, {}),
      [COMPANY_HOUSE.INPUT]: formBody[COMPANY_HOUSE.INPUT],
    };

    expect(response).toEqual(expected);
  });

  it('should return object with companiesHouseNumber and error set to true if api call has an error', async () => {
    formBody = {
      [COMPANY_HOUSE.INPUT]: '123456',
    };

    const getCompaniesHouseResponse = jest.fn(() => Promise.reject());
    api.keystone.getCompaniesHouseInformation = getCompaniesHouseResponse;

    const response = await companiesHouseSearch(formBody);

    const expected = {
      validationErrors: {},
      [COMPANY_HOUSE.INPUT]: formBody[COMPANY_HOUSE.INPUT],
      apiError: true,
    };

    expect(response).toEqual(expected);
  });

  it('should return object with companiesHouseNumber and error set to true if api response is null', async () => {
    formBody = {
      [COMPANY_HOUSE.INPUT]: '123456',
    };

    const getCompaniesHouseResponse = jest.fn(() => Promise.resolve(null));
    api.keystone.getCompaniesHouseInformation = getCompaniesHouseResponse;

    const response = await companiesHouseSearch(formBody);

    const expected = {
      validationErrors: {},
      [COMPANY_HOUSE.INPUT]: formBody[COMPANY_HOUSE.INPUT],
      apiError: true,
    };

    expect(response).toEqual(expected);
  });

  it('should return object with validationErrors, companiesHouseNumber if api response has success as false', async () => {
    formBody = {
      [COMPANY_HOUSE.INPUT]: '123456',
    };

    const getCompaniesHouseResponse = jest.fn(() => Promise.resolve({ success: false }));
    api.keystone.getCompaniesHouseInformation = getCompaniesHouseResponse;

    const response = await companiesHouseSearch(formBody);

    const errorMessage = EXPORTER_BUSINESS_ERROR[COMPANY_HOUSE.INPUT].NOT_FOUND;

    const expected = {
      validationErrors: generateValidationErrors(COMPANY_HOUSE.INPUT, errorMessage, {}),
      [COMPANY_HOUSE.INPUT]: formBody[COMPANY_HOUSE.INPUT],
    };

    expect(response).toEqual(expected);
  });

  it('should return object with apiError set to true and companiesHouseNumber if api response has apiError as true', async () => {
    formBody = {
      [COMPANY_HOUSE.INPUT]: '123456',
    };

    const getCompaniesHouseResponse = jest.fn(() => Promise.resolve({ apiError: true, success: false }));
    api.keystone.getCompaniesHouseInformation = getCompaniesHouseResponse;

    const response = await companiesHouseSearch(formBody);

    const expected = {
      apiError: true,
      [COMPANY_HOUSE.INPUT]: formBody[COMPANY_HOUSE.INPUT],
      validationErrors: {},
    };

    expect(response).toEqual(expected);
  });

  it('should return object with company and companiesHouseNumber if company found', async () => {
    formBody = {
      [COMPANY_HOUSE.INPUT]: '123456',
    };

    const getCompaniesHouseResponse = jest.fn(() => Promise.resolve(mockCompany));
    api.keystone.getCompaniesHouseInformation = getCompaniesHouseResponse;

    const response = await companiesHouseSearch(formBody);

    const expected = {
      validationErrors: {},
      [COMPANY_HOUSE.INPUT]: formBody[COMPANY_HOUSE.INPUT],
      company: mockCompany,
    };

    expect(response).toEqual(expected);
  });
});
