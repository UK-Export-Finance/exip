import mapSicCodes from '.';
import mockSectors from '../../test-mocks/mock-industry-sectors';

describe('mapSicCodes', () => {
  const mockSicCodes = ['12345', '98765'];
  const mockIndustrySectorNames = [mockSectors[0].ukefIndustryName, mockSectors[1].ukefIndustryName];
  const mockCompanyId = '100';

  it('should map sic codes into correct format if array is not empty', () => {
    const response = mapSicCodes(mockSicCodes, mockIndustrySectorNames, mockCompanyId);

    const expected = [
      {
        sicCode: mockSicCodes[0],
        industrySectorName: mockIndustrySectorNames[0],
        company: {
          connect: {
            id: mockCompanyId,
          },
        },
      },
      {
        sicCode: mockSicCodes[1],
        industrySectorName: mockIndustrySectorNames[1],
        company: {
          connect: {
            id: mockCompanyId,
          },
        },
      },
    ];

    expect(response).toEqual(expected);
  });

  describe('when sicCodes are not populated', () => {
    it('should return an empty array', () => {
      const response = mapSicCodes([], mockIndustrySectorNames, mockCompanyId);

      expect(response).toEqual([]);
    });
  });

  describe('when industrySectorNames are not populated', () => {
    it('should return an array of sicCodes without industry sector names', () => {
      const response = mapSicCodes(mockSicCodes, [], mockCompanyId);

      const expected = [
        {
          sicCode: mockSicCodes[0],
          industrySectorName: '',
          company: {
            connect: {
              id: mockCompanyId,
            },
          },
        },
        {
          sicCode: mockSicCodes[1],
          industrySectorName: '',
          company: {
            connect: {
              id: mockCompanyId,
            },
          },
        },
      ];

      expect(response).toEqual(expected);
    });
  });
});
