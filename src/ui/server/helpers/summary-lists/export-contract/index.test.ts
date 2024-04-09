import { generateFields, exportContractSummaryLists } from '.';
import generateAboutTheExportFields from './about-the-export-fields';
import generateGroupsOfSummaryLists from '../generate-groups-of-summary-lists';
import { mockCountries } from '../../../test-mocks';
import { referenceNumber, mockExportContract } from '../../../test-mocks/mock-application';

describe('server/helpers/summary-lists/export-contract', () => {
  const mockAnswers = mockExportContract;
  const checkAndChange = true;

  describe('generateFields', () => {
    it('should return fields and values from the submitted data/answers', () => {
      const result = generateFields(mockAnswers, referenceNumber, mockCountries, checkAndChange);

      const expected = [generateAboutTheExportFields(mockAnswers, referenceNumber, mockCountries, checkAndChange)];

      expect(result).toEqual(expected);
    });
  });

  describe('exportContractSummaryLists', () => {
    it('should return an array of summary list rows', () => {
      const result = exportContractSummaryLists(mockAnswers, referenceNumber, mockCountries, checkAndChange);

      const fields = generateFields(mockAnswers, referenceNumber, mockCountries, checkAndChange);

      const expected = generateGroupsOfSummaryLists(fields);

      expect(result).toEqual(expected);
    });
  });
});
