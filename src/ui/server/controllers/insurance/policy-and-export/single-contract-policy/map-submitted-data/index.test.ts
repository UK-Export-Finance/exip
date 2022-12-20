import { add, getMonth, getYear } from 'date-fns';
import mapSubmittedData from '.';
import { FIELD_IDS } from '../../../../../constants';
import createTimestampFromNumbers from '../../../../../helpers/date/create-timestamp-from-numbers';

const {
  POLICY_AND_EXPORTS: { CONTRACT_POLICY },
} = FIELD_IDS.INSURANCE;

const { REQUESTED_START_DATE } = CONTRACT_POLICY;

describe('controllers/insurance/policy-and-export/single-contract-policy/map-submitted-data', () => {
  describe(`when ${REQUESTED_START_DATE} day, month and year fields are provided`, () => {
    const date = new Date();

    const mockBody = {
      [`${REQUESTED_START_DATE}-day`]: '1',
      [`${REQUESTED_START_DATE}-month`]: getMonth(date),
      [`${REQUESTED_START_DATE}-year`]: getYear(add(date, { years: 1 })),
    };

    it(`should return an object with single ${REQUESTED_START_DATE} field`, () => {
      const result = mapSubmittedData(mockBody);

      const day = Number(mockBody[`${REQUESTED_START_DATE}-day`]);
      const month = Number(mockBody[`${REQUESTED_START_DATE}-month`]);
      const year = Number(mockBody[`${REQUESTED_START_DATE}-year`]);

      const expected = {
        [REQUESTED_START_DATE]: createTimestampFromNumbers(day, month, year),
      };

      expect(result).toEqual(expected);
    });
  });

  describe(`when form body does not have a ${REQUESTED_START_DATE}-day field`, () => {
    it('should return an empty object', () => {
      const mockBody = {
        [`${REQUESTED_START_DATE}-month`]: '2',
        [`${REQUESTED_START_DATE}-year`]: '2022',
      };

      const result = mapSubmittedData(mockBody);

      expect(result).toEqual({});
    });
  });

  describe(`when form body does not have a ${REQUESTED_START_DATE}-month field`, () => {
    it('should return an empty object', () => {
      const mockBody = {
        [`${REQUESTED_START_DATE}-day`]: '1',
        [`${REQUESTED_START_DATE}-year`]: '2022',
      };

      const result = mapSubmittedData(mockBody);

      expect(result).toEqual({});
    });
  });

  describe(`when form body does not have a ${REQUESTED_START_DATE}-year field`, () => {
    it('should return an empty object', () => {
      const mockBody = {
        [`${REQUESTED_START_DATE}-day`]: '1',
        [`${REQUESTED_START_DATE}-month`]: '2',
      };

      const result = mapSubmittedData(mockBody);

      expect(result).toEqual({});
    });
  });

  describe('when form body is not provided', () => {
    it('should return an empty object', () => {
      // @ts-ignore
      const result = mapSubmittedData();

      expect(result).toEqual({});
    });
  });
});
