import getSicCodeIDsFromApplication from '.';
import { mockApplication, mockSicCodes } from '../../test-mocks';

describe('server/helpers/get-sic-code-ids-from-application', () => {
  describe('when there is one sic code in company', () => {
    it('should return a populated array array', () => {
      const response = getSicCodeIDsFromApplication(mockApplication);

      const expected = [{ id: mockApplication.company.sicCodes[0].id }];
      expect(response).toEqual(expected);
    });
  });

  describe('when there are multiple sic codes in company', () => {
    it('should return a populated array array', () => {
      const applicationWithMultipleSicCodes = { ...mockApplication };
      applicationWithMultipleSicCodes.company.sicCodes.push(mockSicCodes[1]);

      const response = getSicCodeIDsFromApplication(applicationWithMultipleSicCodes);

      const { company } = applicationWithMultipleSicCodes;

      const expected = [{ id: company.sicCodes[0].id }, { id: company.sicCodes[1].id }];

      expect(response).toEqual(expected);
    });
  });

  describe('when there are no sic codes in company', () => {
    it('should return an empty array', () => {
      const applicationWithoutSicCodes = { ...mockApplication };
      applicationWithoutSicCodes.company.sicCodes = [];

      const response = getSicCodeIDsFromApplication(applicationWithoutSicCodes);

      expect(response).toEqual([]);
    });
  });
});
