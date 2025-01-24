import brokerDetailsDataChangeFlags from '.';
import POLICY_FIELD_IDS from '../../constants/field-ids/insurance/policy';
import { mockApplication } from '../../test-mocks';

const {
  BROKER_DETAILS: { IS_BASED_IN_UK, POSTCODE, BUILDING_NUMBER_OR_NAME },
} = POLICY_FIELD_IDS;

const { broker } = mockApplication;

const mockBroker = broker;

describe('server/helpers/broker-details-data-change-flags', () => {
  describe(`when form body has a ${IS_BASED_IN_UK} value of 'true'`, () => {
    describe(`when ${BUILDING_NUMBER_OR_NAME} matches, but ${POSTCODE} does not`, () => {
      it('should return postcodeOrBuildingNumberNameHasChanged as true', () => {
        const mockFormBody = {
          [IS_BASED_IN_UK]: 'true',
          [BUILDING_NUMBER_OR_NAME]: mockBroker[BUILDING_NUMBER_OR_NAME],
          [POSTCODE]: 'Form body postcode',
        };

        const mockBrokerData = {
          ...mockBroker,
          [BUILDING_NUMBER_OR_NAME]: mockBroker[BUILDING_NUMBER_OR_NAME],
          [POSTCODE]: 'Broker data postcode',
        };

        const result = brokerDetailsDataChangeFlags(mockFormBody, mockBrokerData);

        expect(result.postcodeOrBuildingNumberNameHasChanged).toEqual(true);
      });
    });

    describe(`when ${POSTCODE} matches, but ${BUILDING_NUMBER_OR_NAME} does not`, () => {
      it('should return postcodeOrBuildingNumberNameHasChanged as true', () => {
        const mockFormBody = {
          [IS_BASED_IN_UK]: 'true',
          [POSTCODE]: mockBroker[POSTCODE],
          [BUILDING_NUMBER_OR_NAME]: 'Form body building number/name',
        };

        const mockBrokerData = {
          ...mockBroker,
          [POSTCODE]: mockBroker[POSTCODE],
          [BUILDING_NUMBER_OR_NAME]: 'Broker data building number/name',
        };

        const result = brokerDetailsDataChangeFlags(mockFormBody, mockBrokerData);

        expect(result.postcodeOrBuildingNumberNameHasChanged).toEqual(true);
      });
    });

    describe(`when both ${POSTCODE} and ${BUILDING_NUMBER_OR_NAME} do not match`, () => {
      it('should return postcodeOrBuildingNumberNameHasChanged as true', () => {
        const mockFormBody = {
          [IS_BASED_IN_UK]: 'true',
          [POSTCODE]: 'Form body postcode',
          [BUILDING_NUMBER_OR_NAME]: 'Form body building number/name',
        };

        const mockBrokerData = {
          ...mockBroker,
          [POSTCODE]: 'Broker data postcode',
          [BUILDING_NUMBER_OR_NAME]: 'Broker data building number/name',
        };

        const result = brokerDetailsDataChangeFlags(mockFormBody, mockBrokerData);

        expect(result.postcodeOrBuildingNumberNameHasChanged).toEqual(true);
      });
    });

    describe(`when both ${POSTCODE} and ${BUILDING_NUMBER_OR_NAME} match`, () => {
      it('should return postcodeOrBuildingNumberNameHasChanged as false', () => {
        const mockFormBody = {
          [IS_BASED_IN_UK]: 'true',
          [POSTCODE]: mockBroker[POSTCODE],
          [BUILDING_NUMBER_OR_NAME]: mockBroker[BUILDING_NUMBER_OR_NAME],
        };

        const mockBrokerData = {
          ...mockBroker,
          [POSTCODE]: mockBroker[POSTCODE],
          [BUILDING_NUMBER_OR_NAME]: mockBroker[BUILDING_NUMBER_OR_NAME],
        };

        const result = brokerDetailsDataChangeFlags(mockFormBody, mockBrokerData);

        expect(result.postcodeOrBuildingNumberNameHasChanged).toEqual(false);
      });
    });
  });

  describe(`when form body has a ${IS_BASED_IN_UK} value of 'false'`, () => {
    describe(`when the broker data's ${POSTCODE} is an empty string`, () => {
      it('should return manualAddressRequired as true', () => {
        const mockFormBody = {
          [IS_BASED_IN_UK]: 'false',
        };

        const mockBrokerData = {
          ...mockBroker,
          [POSTCODE]: '',
        };

        const result = brokerDetailsDataChangeFlags(mockFormBody, mockBrokerData);

        expect(result.manualAddressRequired).toEqual(true);
      });
    });

    describe(`when the broker data's ${POSTCODE} is an empty string`, () => {
      it('should return manualAddressRequired as false', () => {
        const mockFormBody = {
          [IS_BASED_IN_UK]: 'false',
          [POSTCODE]: '',
        };

        const mockBrokerData = {
          ...mockBroker,
          [POSTCODE]: 'Not an empty string',
        };

        const result = brokerDetailsDataChangeFlags(mockFormBody, mockBrokerData);

        expect(result.manualAddressRequired).toEqual(false);
      });
    });
  });
});
