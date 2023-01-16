import { mapSicCodes } from './mapSicCodes';
import { CompanyResponse } from '../types';

describe('mapSicCodes', () => {
  let mockSicCodes = [] as Array<string>;
  let mockCompanyResponse = {} as CompanyResponse;

  it('should map sic codes into correct format if array is not empty', () => {
    mockSicCodes = ['12345', '98765'];
    mockCompanyResponse = {
      id: '123',
      applicationId: '321',
    };

    const response = mapSicCodes(mockCompanyResponse, mockSicCodes);

    const expected = [
      {
        sicCode: mockSicCodes[0],
        exporterCompany: {
          connect: {
            id: mockCompanyResponse.id,
          },
        },
      },
      {
        sicCode: mockSicCodes[1],
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

    const response = mapSicCodes(mockCompanyResponse, null);

    expect(response).toEqual([]);
  });
});
