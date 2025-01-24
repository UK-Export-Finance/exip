import mapBrokerAddress from '.';
import { POLICY as FIELD_IDS } from '../../../../../constants/field-ids/insurance/policy';
import { XLSX } from '../../../../../content-strings';
import mapBrokerAddressBasedInTheUk from './based-in-the-uk';
import xlsxRow from '../../../helpers/xlsx-row';
import { mockApplication } from '../../../../../test-mocks';

const {
  BROKER_MANUAL_ADDRESS: { FULL_ADDRESS },
} = FIELD_IDS;

const { FIELDS } = XLSX;

describe('api/generate-xlsx/map-application-to-xlsx/map-policy/map-broker/map-broker-address', () => {
  describe(`when ${FULL_ADDRESS} is populated`, () => {
    const mockBroker = {
      ...mockApplication.broker,
      [FULL_ADDRESS]: 'Mock full broker address',
    };

    it(`should return xlsxRow with the value as ${FULL_ADDRESS}`, () => {
      const result = mapBrokerAddress(mockBroker);

      const expected = xlsxRow(String(FIELDS[FULL_ADDRESS]), mockBroker[FULL_ADDRESS]);

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${FULL_ADDRESS} is an empty string`, () => {
    it('should return xlsxRow with the value via mapBrokerAddressBasedInTheUk', () => {
      const mockBroker = {
        ...mockApplication.broker,
        [FULL_ADDRESS]: '',
      };

      const result = mapBrokerAddress(mockBroker);

      const expectedValue = mapBrokerAddressBasedInTheUk(mockBroker);

      const expected = xlsxRow(String(FIELDS[FULL_ADDRESS]), expectedValue);

      expect(result).toEqual(expected);
    });
  });
});
