import mapBroker from '.';
import { POLICY as POLICY_FIELD_IDS } from '../../../constants/field-ids/insurance/policy';
import { mockApplication } from '../../../test-mocks';

const {
  USING_BROKER,
  BROKER_DETAILS: {
    NAME,
    EMAIL,
    IS_BASED_IN_UK,
    BUILDING_NUMBER_OR_NAME,
    ADDRESS_LINE_1,
    ADDRESS_LINE_2,
    POSTCODE,
    BROKER_NAME,
    BROKER_EMAIL,
    BROKER_BUILDING_NUMBER_OR_NAME,
    BROKER_ADDRESS_LINE_1,
    BROKER_ADDRESS_LINE_2,
    BROKER_POSTCODE,
  },
  BROKER_MANUAL_ADDRESS: { BROKER_FULL_ADDRESS, FULL_ADDRESS },
} = POLICY_FIELD_IDS;

const { broker } = mockApplication;

describe('server/helpers/flatten-application-data/map-broker', () => {
  describe(`when ${USING_BROKER} is true`, () => {
    describe(`when ${IS_BASED_IN_UK} is true`, () => {
      const mockBroker = {
        ...broker,
        [USING_BROKER]: true,
        [IS_BASED_IN_UK]: true,
      };

      it('should return mapped broker IDs', () => {
        const result = mapBroker(mockBroker);

        const expected = {
          id: mockBroker.id,
          [USING_BROKER]: mockBroker[USING_BROKER],
          [IS_BASED_IN_UK]: mockBroker[IS_BASED_IN_UK],
          [BROKER_NAME]: mockBroker[NAME],
          [BROKER_EMAIL]: mockBroker[EMAIL],
          [BROKER_BUILDING_NUMBER_OR_NAME]: mockBroker[BUILDING_NUMBER_OR_NAME],
          [BROKER_ADDRESS_LINE_1]: mockBroker[ADDRESS_LINE_1],
          [BROKER_ADDRESS_LINE_2]: mockBroker[ADDRESS_LINE_2],
          [BROKER_POSTCODE]: mockBroker[POSTCODE],
        };

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${IS_BASED_IN_UK} is false`, () => {
      const mockBroker = {
        ...broker,
        [USING_BROKER]: true,
        [IS_BASED_IN_UK]: false,
      };

      it('should return mapped broker IDs', () => {
        const result = mapBroker(mockBroker);

        const expected = {
          id: mockBroker.id,
          [USING_BROKER]: mockBroker[USING_BROKER],
          [IS_BASED_IN_UK]: mockBroker[IS_BASED_IN_UK],
          [BROKER_NAME]: mockBroker[NAME],
          [BROKER_EMAIL]: mockBroker[EMAIL],
          [BROKER_FULL_ADDRESS]: mockBroker[FULL_ADDRESS],
        };

        expect(result).toEqual(expected);
      });
    });
  });

  describe(`when ${USING_BROKER} is false`, () => {
    it('should return mapped broker IDs', () => {
      const mockBroker = {
        ...broker,
        [USING_BROKER]: false,
      };

      const result = mapBroker(mockBroker);

      const expected = {
        id: mockBroker.id,
        [USING_BROKER]: mockBroker[USING_BROKER],
      };

      expect(result).toEqual(expected);
    });
  });
});
