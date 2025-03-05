import generateBrokerAddressInsetTextHtml from '.';
import POLICY_FIELD_IDS from '../../constants/field-ids/insurance/policy';
import replaceNewLineWithLineBreak from '../replace-new-line-with-line-break';
import generateMultipleFieldHtml from '../generate-multiple-field-html';
import { mockApplication } from '../../test-mocks';

const {
  BROKER_MANUAL_ADDRESS: { FULL_ADDRESS },
} = POLICY_FIELD_IDS;

const { broker } = mockApplication;

describe('server/helpers/generate-broker-address-inset-text-html', () => {
  describe(`when ${FULL_ADDRESS} is populated`, () => {
    it('should return the result of replaceNewLineWithLineBreak', () => {
      const mockBroker = {
        ...broker,
        [FULL_ADDRESS]: 'Mock full address',
      };

      const result = generateBrokerAddressInsetTextHtml(mockBroker);

      const expected = replaceNewLineWithLineBreak(mockBroker[FULL_ADDRESS]);

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${FULL_ADDRESS} is NOT populated`, () => {
    it('should return the result of generateMultipleFieldHtml', () => {
      const mockBroker = {
        ...broker,
        [FULL_ADDRESS]: '',
      };

      const result = generateBrokerAddressInsetTextHtml(mockBroker);

      const { addressLine1, addressLine2, town, county, postcode } = broker;

      const expected = generateMultipleFieldHtml({
        addressLine1,
        addressLine2,
        town,
        county,
        postcode,
      });

      expect(result).toEqual(expected);
    });
  });
});
