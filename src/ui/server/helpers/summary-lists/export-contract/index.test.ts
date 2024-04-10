import { generateFields, exportContractSummaryLists } from '.';
import generateAboutTheExportFields from './about-the-export-fields';
import generatePrivateMarketFields from './private-market-fields';
import generateAgentFields from './agent-fields';
import generateGroupsOfSummaryLists from '../generate-groups-of-summary-lists';
import { mockCountries } from '../../../test-mocks';
import { referenceNumber, mockExportContract } from '../../../test-mocks/mock-application';

describe('server/helpers/summary-lists/export-contract', () => {
  const mockAnswers = mockExportContract;
  const checkAndChange = true;

  describe('generateFields', () => {
    describe('when totalContractValueOverThreshold is false', () => {
      const totalContractValueOverThreshold = false;

      it('should return some fields and values from the submitted data/answers', () => {
        const result = generateFields(mockAnswers, totalContractValueOverThreshold, referenceNumber, mockCountries, checkAndChange);

        const expected = [
          generateAboutTheExportFields(mockAnswers, referenceNumber, mockCountries, checkAndChange),
          generateAgentFields(mockAnswers.agent, referenceNumber, checkAndChange),
        ];

        expect(result).toEqual(expected);
      });
    });

    describe('when totalContractValueOverThreshold is true', () => {
      const totalContractValueOverThreshold = true;

      it('should return all fields and values from the submitted data/answers', () => {
        const result = generateFields(mockAnswers, totalContractValueOverThreshold, referenceNumber, mockCountries, checkAndChange);

        const expected = [
          generateAboutTheExportFields(mockAnswers, referenceNumber, mockCountries, checkAndChange),
          generatePrivateMarketFields(mockAnswers.privateMarket, referenceNumber, checkAndChange),
          generateAgentFields(mockAnswers.agent, referenceNumber, checkAndChange),
        ];

        expect(result).toEqual(expected);
      });
    });
  });

  describe('exportContractSummaryLists', () => {
    it('should return an array of summary list rows', () => {
      const totalContractValueOverThreshold = false;

      const result = exportContractSummaryLists(mockAnswers, totalContractValueOverThreshold, referenceNumber, mockCountries, checkAndChange);

      const fields = generateFields(mockAnswers, totalContractValueOverThreshold, referenceNumber, mockCountries, checkAndChange);

      const expected = generateGroupsOfSummaryLists(fields);

      expect(result).toEqual(expected);
    });
  });
});
