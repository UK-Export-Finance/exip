import { mapSicCodes } from '.';
import { CompanyResponse } from '../../types';
import mockSectors from '../../test-mocks/mock-sectors';

describe('mapSicCodes', () => {
  let mockSicCodes = [] as Array<string>;
  let mockCompanyResponse = {} as CompanyResponse;

  it('should map sic codes into correct format if array is not empty', () => {
    mockSicCodes = ['12345', '98765'];
    mockCompanyResponse = {
      id: '123',
      applicationId: '321',
    };
    const sicCodeDescriptions = [mockSectors[0].ukefIndustryName, mockSectors[1].ukefIndustryName];

    const response = mapSicCodes(mockCompanyResponse, mockSicCodes, sicCodeDescriptions);

    const expected = [
      {
        sicCode: mockSicCodes[0],
        industrySectorName: sicCodeDescriptions[0],
        exporterCompany: {
          connect: {
            id: mockCompanyResponse.id,
          },
        },
      },
      {
        sicCode: mockSicCodes[1],
        industrySectorName: sicCodeDescriptions[1],
        exporterCompany: {
          connect: {
            id: mockCompanyResponse.id,
          },
        },
      },
    ];

    expect(response).toEqual(expected);
  });

  it('should return empty array if sicCodes are empty', () => {
    mockSicCodes = [];
    mockCompanyResponse = {
      id: '123',
      applicationId: '321',
    };

    const response = mapSicCodes(mockCompanyResponse, mockSicCodes);

    expect(response).toEqual([]);
  });

  it('should return empty array if sicCodes is null', () => {
    mockCompanyResponse = {
      id: '123',
      applicationId: '321',
    };

    const response = mapSicCodes(mockCompanyResponse);

    expect(response).toEqual([]);
  });
});
