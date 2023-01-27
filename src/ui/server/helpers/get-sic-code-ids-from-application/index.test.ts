import getSicCodeIDsFromApplication from '.';
import { mockApplication, mockSicCodes } from '../../test-mocks';

describe('server/helpers/get-sic-code-ids-from-application', () => {
  describe('when there is one sic code in exporterCompany', () => {
    it('should return a populated array array', () => {
      const response = getSicCodeIDsFromApplication(mockApplication);

      const expected = [{ id: mockApplication.exporterCompany.sicCodes[0].id }];
      expect(response).toEqual(expected);
    });
  });

  describe('when there are multiple sic codes in exporterCompany', () => {
    it('should return a populated array array', () => {
      const applicationWithMultipleSicCodes = { ...mockApplication };
      applicationWithMultipleSicCodes.exporterCompany.sicCodes.push(mockSicCodes[1]);

      const response = getSicCodeIDsFromApplication(applicationWithMultipleSicCodes);

      const expected = [
        { id: applicationWithMultipleSicCodes.exporterCompany.sicCodes[0].id },
        { id: applicationWithMultipleSicCodes.exporterCompany.sicCodes[1].id },
      ];
      expect(response).toEqual(expected);
    });
  });

  describe('when there are no sic codes in exporterCompany', () => {
    it('should return an empty array', () => {
      const applicationWithoutSicCodes = { ...mockApplication };
      applicationWithoutSicCodes.exporterCompany.sicCodes = [];

      const response = getSicCodeIDsFromApplication(applicationWithoutSicCodes);

      expect(response).toEqual([]);
    });
  });
});
