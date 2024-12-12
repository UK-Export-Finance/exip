import getCompaniesHouseInformation from '.';
import sanitiseCompaniesHouseNumber from '../../../helpers/sanitise-companies-house-number';
import companiesHouse from '../../../integrations/companies-house';
import { mapCompaniesHouseFields } from '../../../helpers/map-companies-house-fields';
import industrySectorNames from '../../../integrations/industry-sector';
import { mockSpyPromiseRejection } from '../../../test-mocks';
import mockCompanyAPIResponse from '../../../test-mocks/mock-companies-house-api-response';
import mockIndustrySectors from '../../../test-mocks/mock-industry-sectors';

describe('custom-resolvers/get-companies-house-information', () => {
  jest.mock('../../../integrations/companies-house');
  jest.mock('../../../integrations/industry-sector');

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should call companiesHouse.get with a sanitised companies house number', async () => {
    companiesHouse.get = jest.fn();

    const mockNumber = ' 12345 ';

    await getCompaniesHouseInformation({}, { companiesHouseNumber: mockNumber });

    expect(companiesHouse.get).toHaveBeenCalledTimes(1);

    const expected = sanitiseCompaniesHouseNumber(mockNumber);

    expect(companiesHouse.get).toHaveBeenCalledWith(expected);
  });

  describe('when companies house API returns success=false', () => {
    beforeEach(() => {
      companiesHouse.get = jest.fn(() => Promise.resolve({ success: false, notFound: true }));
    });

    it('should return an object containing success=false', async () => {
      const response = await getCompaniesHouseInformation({}, { companiesHouseNumber: '12345' });

      const expected = {
        success: false,
        notFound: true,
      };

      expect(response).toEqual(expected);
    });
  });

  describe('when companies house API returns empty data object', () => {
    beforeEach(() => {
      companiesHouse.get = jest.fn(() => Promise.resolve({ success: true, data: undefined }));
    });

    it('should return an object containing success=false', async () => {
      const response = await getCompaniesHouseInformation({}, { companiesHouseNumber: '12345' });

      const expected = { success: false };

      expect(response).toEqual(expected);
    });
  });

  describe('when companies house API is down', () => {
    beforeEach(() => {
      companiesHouse.get = mockSpyPromiseRejection;
    });

    it('should return an object containing success=false and apiError as true', async () => {
      const response = await getCompaniesHouseInformation({}, { companiesHouseNumber: '12345' });

      const expected = { success: false, apiError: true };

      expect(response).toEqual(expected);
    });
  });

  describe('when companies house returns a response but industry sector returns a success = false', () => {
    beforeEach(() => {
      companiesHouse.get = jest.fn(() => Promise.resolve({ success: true, data: mockCompanyAPIResponse }));
      industrySectorNames.get = jest.fn(() => Promise.resolve({ success: false }));
    });

    it('should return an object containing success=false and apiError as true', async () => {
      const response = await getCompaniesHouseInformation({}, { companiesHouseNumber: '12345' });

      const expected = { success: false, apiError: true };

      expect(response).toEqual(expected);
    });
  });

  describe('when companies house returns a response but industry sector returns an apiError', () => {
    beforeEach(() => {
      companiesHouse.get = jest.fn(() => Promise.resolve({ success: true, data: mockCompanyAPIResponse }));
      industrySectorNames.get = jest.fn(() => Promise.resolve({ success: false, apiError: true }));
    });

    it('should return an object containing success=false and apiError as true', async () => {
      const response = await getCompaniesHouseInformation({}, { companiesHouseNumber: '12345' });

      const expected = { success: false, apiError: true };

      expect(response).toEqual(expected);
    });
  });

  describe('when companies house returns a response but industry sector errors', () => {
    beforeEach(() => {
      companiesHouse.get = jest.fn(() => Promise.resolve({ success: true, data: mockCompanyAPIResponse }));
      industrySectorNames.get = mockSpyPromiseRejection;
    });

    it('should return an object containing success=false and apiError as true', async () => {
      const response = await getCompaniesHouseInformation({}, { companiesHouseNumber: '12345' });

      const expected = { success: false, apiError: true };

      expect(response).toEqual(expected);
    });
  });

  describe('when companies house returns a response but industry sector returns a response', () => {
    beforeEach(() => {
      companiesHouse.get = jest.fn(() => Promise.resolve({ success: true, data: mockCompanyAPIResponse }));
      industrySectorNames.get = jest.fn(() => Promise.resolve({ success: true, data: mockIndustrySectors }));
    });

    it('should return an object containing success=true and the mapped companies house fields', async () => {
      const response = await getCompaniesHouseInformation({}, { companiesHouseNumber: '12345' });

      const expected = { success: true, ...mapCompaniesHouseFields(mockCompanyAPIResponse, mockIndustrySectors) };

      expect(response).toEqual(expected);
    });
  });
});
