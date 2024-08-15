import { generateFields, policySummaryLists } from '.';
import generatePolicyAndDateFields from './policy-and-date-fields';
import generatePolicyContactFields from './policy-contact-fields';
import { generateOtherCompanyFields } from './other-company-fields';
import { generateBrokerFields } from './broker-fields';
import { generateLossPayeeFields } from './loss-payee-fields';
import generateGroupsOfSummaryLists from '../generate-groups-of-summary-lists';
import { mockCurrencies, mockContact, mockCountries } from '../../../test-mocks';
import mockApplication, { mockBroker, mockNominatedLossPayee, referenceNumber } from '../../../test-mocks/mock-application';

describe('server/helpers/summary-lists/policy', () => {
  const mockAnswers = mockApplication.policy;
  const checkAndChange = false;

  describe('generateFields', () => {
    it('should return fields and values from the submitted data/answers', () => {
      const result = generateFields({
        policy: mockAnswers,
        policyContact: mockContact,
        broker: mockBroker,
        nominatedLossPayee: mockNominatedLossPayee,
        referenceNumber,
        currencies: mockCurrencies,
        countries: mockCountries,
        checkAndChange,
      });

      const expected = [
        generatePolicyAndDateFields(mockAnswers, referenceNumber, mockCurrencies, checkAndChange),
        generatePolicyContactFields(mockContact, referenceNumber, checkAndChange),
        generateOtherCompanyFields(mockAnswers.jointlyInsuredParty, referenceNumber, mockCountries, checkAndChange),
        generateBrokerFields(mockBroker, referenceNumber, checkAndChange),
        generateLossPayeeFields(mockNominatedLossPayee, referenceNumber, checkAndChange),
      ];

      expect(result).toEqual(expected);
    });
  });

  describe('policySummaryLists', () => {
    it('should return an array of summary list rows', () => {
      const result = policySummaryLists({
        policy: mockAnswers,
        policyContact: mockContact,
        broker: mockBroker,
        nominatedLossPayee: mockNominatedLossPayee,
        referenceNumber,
        currencies: mockCurrencies,
        countries: mockCountries,
      });

      const fields = generateFields({
        policy: mockAnswers,
        policyContact: mockContact,
        broker: mockBroker,
        nominatedLossPayee: mockNominatedLossPayee,
        referenceNumber,
        currencies: mockCurrencies,
        countries: mockCountries,
        checkAndChange,
      });

      const expected = generateGroupsOfSummaryLists(fields);

      expect(result).toEqual(expected);
    });
  });
});
