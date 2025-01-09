import mapBrokerAddress from '.';
import { POLICY as FIELD_IDS } from '../../../../../constants/field-ids/insurance/policy';
import { XLSX } from '../../../../../content-strings';
import mapBrokerAddressBasedInTheUk from './based-in-the-uk';
import xlsxRow from '../../../helpers/xlsx-row';
import { mockApplication } from '../../../../../test-mocks';

const {
  BROKER_DETAILS: { IS_BASED_IN_UK },
  BROKER_MANUAL_ADDRESS: { FULL_ADDRESS },
} = FIELD_IDS;

const { FIELDS } = XLSX;

describe('api/generate-xlsx/map-application-to-xlsx/map-policy/map-broker/map-broker-address', () => {
  describe(`when ${IS_BASED_IN_UK} is true`, () => {
    const mockBroker = {
      ...mockApplication.broker,
      [IS_BASED_IN_UK]: true,
    };

    it('should return xlsxRow with the value via mapBrokerAddressBasedInTheUk', () => {
      const result = mapBrokerAddress(mockBroker);

      const expectedValue = mapBrokerAddressBasedInTheUk(mockBroker);

      const expected = xlsxRow(String(FIELDS[FULL_ADDRESS]), expectedValue);

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${IS_BASED_IN_UK} is false`, () => {
    const mockBroker = {
      ...mockApplication.broker,
      [IS_BASED_IN_UK]: false,
    };

    it(`should return xlsxRow with the value as ${FULL_ADDRESS}`, () => {
      const result = mapBrokerAddress(mockBroker);

      const expectedValue = mockBroker[FULL_ADDRESS];

      const expected = xlsxRow(String(FIELDS[FULL_ADDRESS]), expectedValue);

      expect(result).toEqual(expected);
    });
  });
});
