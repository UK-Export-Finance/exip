import { generateFields, eligibilitySummaryList } from '.';
import generateSummaryListRows from '../generate-summary-list-rows';
import generateEligibilityFields from './eligibility-fields';
import mockApplication from '../../../test-mocks/mock-application';

describe('server/helpers/summary-lists/eligibility', () => {
  describe('generateFields', () => {
    it('should return fields and values from the submitted data/answers', () => {
      const result = generateFields(mockApplication.eligibility);

      const expected = [...generateEligibilityFields(mockApplication.eligibility)];

      expect(result).toEqual(expected);
    });
  });

  describe('eligibilitySummaryList', () => {
    it('should return an array of summary list rows', () => {
      const result = eligibilitySummaryList(mockApplication.eligibility);

      const fields = generateFields(mockApplication.eligibility);

      const expected = generateSummaryListRows(fields);

      expect(result).toEqual(expected);
    });
  });
});
