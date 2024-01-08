import { generateFields, policySummaryLists } from '.';
import generatePolicyAndDateFields from './policy-and-date-fields';
import generatePolicyContactFields from './policy-contact-fields';
import { generateBrokerFields } from './broker-fields';
import generateGroupsOfSummaryLists from '../generate-groups-of-summary-lists';
import { mockCurrencies, mockContact } from '../../../test-mocks';
import mockApplication, { mockBroker } from '../../../test-mocks/mock-application';

describe('server/helpers/summary-lists/policy', () => {
  const { referenceNumber } = mockApplication;

  const mockAnswers = mockApplication.policy;
  const checkAndChange = false;

  it('should return fields and values from the submitted data/answers', () => {
    const result = generateFields(mockAnswers, mockContact, mockBroker, referenceNumber, mockCurrencies, checkAndChange);

    const expected = [
      generatePolicyAndDateFields(mockAnswers, referenceNumber, mockCurrencies, checkAndChange),
      generatePolicyContactFields(mockContact, referenceNumber, checkAndChange),
      generateBrokerFields(mockBroker, referenceNumber, checkAndChange),
    ];

    expect(result).toEqual(expected);
  });

  describe('policySummaryLists', () => {
    it('should return an array of summary list rows', () => {
      const result = policySummaryLists(mockAnswers, mockContact, mockBroker, referenceNumber, mockCurrencies);

      const fields = generateFields(mockAnswers, mockContact, mockBroker, referenceNumber, mockCurrencies, checkAndChange);

      const expected = generateGroupsOfSummaryLists(fields);

      expect(result).toEqual(expected);
    });
  });
});
