import mapBrokerAddressBasedInTheUk from '.';
import { POLICY as FIELD_IDS } from '../../../../../../constants/field-ids/insurance/policy';
import { ApplicationBroker } from '../../../../../../../types';
import { mockApplication } from '../../../../../../test-mocks';

const {
  BROKER_DETAILS: { BUILDING_NUMBER_OR_NAME, ADDRESS_LINE_1, ADDRESS_LINE_2, TOWN, COUNTY, POSTCODE },
} = FIELD_IDS;

const { broker } = mockApplication;

const { buildingNumberOrName, addressLine1, addressLine2, town, county, postcode } = broker;

describe('server/helpers/summary-lists/policy/broker-fields/map-broker-address-field/based-in-the-uk', () => {
  describe(`when a broker only has ${BUILDING_NUMBER_OR_NAME}, ${ADDRESS_LINE_1} and ${POSTCODE} generic fields`, () => {
    it('should return a single string containing only said fields', () => {
      const mockBroker: ApplicationBroker = {
        ...broker,
        [ADDRESS_LINE_2]: '',
        [TOWN]: '',
        [COUNTY]: '',
      };

      const result = mapBrokerAddressBasedInTheUk(mockBroker);

      const expected = `${buildingNumberOrName}\n${addressLine1}\n${postcode}`;

      expect(result).toEqual(expected);
    });
  });

  describe(`when a broker has generic fields and ${ADDRESS_LINE_2}`, () => {
    it('should return a single string containing only said fields', () => {
      const mockBroker: ApplicationBroker = {
        ...broker,
        [TOWN]: '',
        [COUNTY]: '',
      };

      const result = mapBrokerAddressBasedInTheUk(mockBroker);

      const expected = `${buildingNumberOrName}\n${addressLine1}\n${addressLine2}\n${postcode}`;

      expect(result).toEqual(expected);
    });
  });

  describe(`when a broker has generic fields and ${TOWN}`, () => {
    it('should return a single string containing only said fields', () => {
      const mockBroker: ApplicationBroker = {
        ...broker,
        [ADDRESS_LINE_2]: '',
        [COUNTY]: '',
      };

      const result = mapBrokerAddressBasedInTheUk(mockBroker);

      const expected = `${buildingNumberOrName}\n${addressLine1}\n${town}\n${postcode}`;

      expect(result).toEqual(expected);
    });
  });

  describe(`when a broker has generic fields and ${COUNTY}`, () => {
    it('should return a single string containing only said fields', () => {
      const mockBroker: ApplicationBroker = {
        ...broker,
        [ADDRESS_LINE_2]: '',
        [TOWN]: '',
      };

      const result = mapBrokerAddressBasedInTheUk(mockBroker);

      const expected = `${buildingNumberOrName}\n${addressLine1}\n${county}\n${postcode}`;

      expect(result).toEqual(expected);
    });
  });

  describe('when a broker has all possible fields', () => {
    it('should return a single string with all fields', () => {
      const result = mapBrokerAddressBasedInTheUk(broker);

      const expected = `${buildingNumberOrName}\n${addressLine1}\n${addressLine2}\n${town}\n${county}\n${postcode}`;

      expect(result).toEqual(expected);
    });
  });

  describe('when all broker fields are empty string', () => {
    it('should return a single string with all fields', () => {
      const mockBroker: ApplicationBroker = {
        ...broker,
        [BUILDING_NUMBER_OR_NAME]: '',
        [ADDRESS_LINE_1]: '',
        [ADDRESS_LINE_2]: '',
        [TOWN]: '',
        [COUNTY]: '',
        [POSTCODE]: '',
      };

      const result = mapBrokerAddressBasedInTheUk(mockBroker);

      expect(result).toEqual('');
    });
  });
});
