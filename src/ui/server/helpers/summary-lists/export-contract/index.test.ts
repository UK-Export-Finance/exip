import { generateFields, exportContractSummaryLists } from '.';
import generateAboutTheExportFields from './about-the-export-fields';
import generatePrivateMarketFields from './private-market-fields';
import generateAgentFields from './agent-fields';
import generateGroupsOfSummaryLists from '../generate-groups-of-summary-lists';
import { mockCountries, mockCurrencies } from '../../../test-mocks';
import { referenceNumber, mockExportContract } from '../../../test-mocks/mock-application';

describe('server/helpers/summary-lists/export-contract', () => {
  const mockAnswers = mockExportContract;
  const checkAndChange = true;

  const genericParams = {
    exportContract: mockAnswers,
    referenceNumber,
    countries: mockCountries,
    currencies: mockCurrencies,
    checkAndChange,
  };

  describe('generateFields', () => {
    describe('when totalContractValueOverThreshold=false', () => {
      it('should return all fields and values from the submitted data/answers', () => {
        const result = generateFields({
          ...genericParams,
          totalContractValueOverThreshold: false,
        });

        const expected = [
          generateAboutTheExportFields(mockAnswers, referenceNumber, mockCountries, checkAndChange),
          generateAgentFields(mockAnswers.agent, referenceNumber, mockCountries, mockCurrencies, checkAndChange),
        ];

        expect(result).toEqual(expected);
      });
    });

    describe('when totalContractValueOverThreshold=true', () => {
      it('should return all fields and values from the submitted data/answers', () => {
        const result = generateFields({
          ...genericParams,
          totalContractValueOverThreshold: true,
        });

        const expected = [
          generateAboutTheExportFields(mockAnswers, referenceNumber, mockCountries, checkAndChange),
          generatePrivateMarketFields(mockAnswers.privateMarket, referenceNumber, checkAndChange),
          generateAgentFields(mockAnswers.agent, referenceNumber, mockCountries, mockCurrencies, checkAndChange),
        ];

        expect(result).toEqual(expected);
      });
    });
  });

  describe('exportContractSummaryLists', () => {
    it('should return an array of summary list rows', () => {
      const params = {
        ...genericParams,
        totalContractValueOverThreshold: false,
      };

      const result = exportContractSummaryLists(params);

      const fields = generateFields(params);

      const expected = generateGroupsOfSummaryLists(fields);

      expect(result).toEqual(expected);
    });
  });
});
