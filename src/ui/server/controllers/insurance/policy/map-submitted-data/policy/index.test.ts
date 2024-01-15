import mapSubmittedData from '.';
import POLICY_FIELD_IDS from '../../../../../constants/field-ids/insurance/policy';
import createTimestampFromNumbers from '../../../../../helpers/date/create-timestamp-from-numbers';

const { CONTRACT_POLICY, NEED_PRE_CREDIT_PERIOD, CREDIT_PERIOD_WITH_BUYER } = POLICY_FIELD_IDS;

const {
  REQUESTED_START_DATE,
  SINGLE: { CONTRACT_COMPLETION_DATE },
} = CONTRACT_POLICY;

describe('controllers/insurance/policy/map-submitted-data/policy', () => {
  let date = new Date();
  let day: number;
  let month: number;
  let year: number;

  beforeEach(() => {
    date = new Date();

    day = date.getDate();
    month = date.getMonth() + 1;
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

  describe(`when form body does not have any day/month/year ${NEED_PRE_CREDIT_PERIOD} fields`, () => {
    it('should return the form body', () => {
      const mockBody = {
        anotherField: true,
      };

      const result = mapSubmittedData(mockBody);

      expect(result).toEqual(mockBody);
    });
  });

  describe(`when a ${NEED_PRE_CREDIT_PERIOD} field with a value of 'false' is provided`, () => {
    it(`should return an object with empty ${CREDIT_PERIOD_WITH_BUYER} field`, () => {
      const mockBody = {
        [NEED_PRE_CREDIT_PERIOD]: 'false',
        [CREDIT_PERIOD_WITH_BUYER]: 'mock',
      };

      const result = mapSubmittedData(mockBody);

      const expected = {
        ...mockBody,
        [CREDIT_PERIOD_WITH_BUYER]: '',
      };

      expect(result).toEqual(expected);
    });
  });
});
