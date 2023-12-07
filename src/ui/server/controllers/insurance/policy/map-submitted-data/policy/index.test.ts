import mapSubmittedData from '.';
import { FIELD_IDS } from '../../../../../constants';
import createTimestampFromNumbers from '../../../../../helpers/date/create-timestamp-from-numbers';

const {
  POLICY: { CONTRACT_POLICY },
} = FIELD_IDS.INSURANCE;

const {
  REQUESTED_START_DATE,
  SINGLE: { CONTRACT_COMPLETION_DATE },
} = CONTRACT_POLICY;

describe('controllers/insurance/policy/map-submitted-data/policy', () => {
  let date;
  let day: number;
  let month: number;
  let year: number;

  beforeEach(() => {
    date = new Date();

    day = date.getDate();
    month = date.getMonth();
    year = date.getFullYear();
  });

  describe(`when ${REQUESTED_START_DATE} day, month and year fields are provided`, () => {
    it(`should return an object with ${REQUESTED_START_DATE} as a timestamp`, () => {
      const mockBody = {
        [`${REQUESTED_START_DATE}-day`]: '1',
        [`${REQUESTED_START_DATE}-month`]: month,
        [`${REQUESTED_START_DATE}-year`]: year,
      };

      const result = mapSubmittedData(mockBody);

      day = Number(mockBody[`${REQUESTED_START_DATE}-day`]);
      month = Number(mockBody[`${REQUESTED_START_DATE}-month`]);
      year = Number(mockBody[`${REQUESTED_START_DATE}-year`]);

      const expected = createTimestampFromNumbers(day, month, year);

      expect(result[REQUESTED_START_DATE]).toEqual(expected);
    });
  });

  describe(`when ${CONTRACT_COMPLETION_DATE} day, month and year fields are provided`, () => {
    it(`should return an object with ${CONTRACT_COMPLETION_DATE} as a timestamp`, () => {
      const mockBody = {
        [`${CONTRACT_COMPLETION_DATE}-day`]: day,
        [`${CONTRACT_COMPLETION_DATE}-month`]: month,
        [`${CONTRACT_COMPLETION_DATE}-year`]: year,
      };

      const result = mapSubmittedData(mockBody);

      day = Number(mockBody[`${CONTRACT_COMPLETION_DATE}-day`]);
      month = Number(mockBody[`${CONTRACT_COMPLETION_DATE}-month`]);
      year = Number(mockBody[`${CONTRACT_COMPLETION_DATE}-year`]);

      const expected = createTimestampFromNumbers(day, month, year);

      expect(result[CONTRACT_COMPLETION_DATE]).toEqual(expected);
    });
  });

  describe(`when form body does not have a ${REQUESTED_START_DATE}-day field`, () => {
    it('should return the form body without a timestamp', () => {
      const mockBody = {
        [`${REQUESTED_START_DATE}-month`]: month,
        [`${REQUESTED_START_DATE}-year`]: year,
      };

      const result = mapSubmittedData(mockBody);

      expect(result).toEqual(mockBody);
    });
  });

  describe(`when form body does not have a ${REQUESTED_START_DATE}-month field`, () => {
    it('should return the form body without a timestamp', () => {
      const mockBody = {
        [`${REQUESTED_START_DATE}-day`]: day,
        [`${REQUESTED_START_DATE}-year`]: year,
      };

      const result = mapSubmittedData(mockBody);

      expect(result).toEqual(mockBody);
    });
  });

  describe(`when form body does not have a ${REQUESTED_START_DATE}-year field`, () => {
    it('should return the form body without a timestamp', () => {
      const mockBody = {
        [`${REQUESTED_START_DATE}-day`]: day,
        [`${REQUESTED_START_DATE}-month`]: month,
      };

      const result = mapSubmittedData(mockBody);

      expect(result).toEqual(mockBody);
    });
  });

  describe('when form body does not have any day/month/year fields', () => {
    it('should return the form body', () => {
      const mockBody = {
        anotherField: true,
      };

      const result = mapSubmittedData(mockBody);

      expect(result).toEqual(mockBody);
    });
  });
});
