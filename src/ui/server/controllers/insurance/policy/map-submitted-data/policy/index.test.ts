import mapSubmittedData from '.';
import POLICY_FIELD_IDS from '../../../../../constants/field-ids/insurance/policy';
import createTimestampFromNumbers from '../../../../../helpers/date/create-timestamp-from-numbers';
import { mockApplication, mockApplicationMultiplePolicy } from '../../../../../test-mocks';

const {
  POLICY_TYPE,
  CONTRACT_POLICY: {
    REQUESTED_START_DATE,
    SINGLE: { CONTRACT_COMPLETION_DATE, TOTAL_CONTRACT_VALUE },
    MULTIPLE: { TOTAL_MONTHS_OF_COVER },
  },
  EXPORT_VALUE: {
    MULTIPLE: { TOTAL_SALES_TO_BUYER, MAXIMUM_BUYER_WILL_OWE },
  },
  NEED_PRE_CREDIT_PERIOD,
  CREDIT_PERIOD_WITH_BUYER,
} = POLICY_FIELD_IDS;

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

  describe(`when ${POLICY_TYPE} is single`, () => {
    it('should return an object with wiped multiple policy specific fields', () => {
      const mockBody = {
        ...mockApplication.policy,
        [MAXIMUM_BUYER_WILL_OWE]: mockApplicationMultiplePolicy.policy[MAXIMUM_BUYER_WILL_OWE],
        [TOTAL_MONTHS_OF_COVER]: mockApplicationMultiplePolicy.policy[TOTAL_MONTHS_OF_COVER],
        [TOTAL_SALES_TO_BUYER]: mockApplicationMultiplePolicy.policy[TOTAL_SALES_TO_BUYER],
      };

      const result = mapSubmittedData(mockBody);

      const expected = {
        ...mockBody,
        [MAXIMUM_BUYER_WILL_OWE]: '',
        [TOTAL_MONTHS_OF_COVER]: '',
        [TOTAL_SALES_TO_BUYER]: '',
      };

      expect(result).toEqual(expected);
    });
  });

  describe(`when ${POLICY_TYPE} is multiple`, () => {
    it('should return an object with wiped single policy specific fields', () => {
      const mockBody = {
        ...mockApplicationMultiplePolicy.policy,
        [CONTRACT_COMPLETION_DATE]: mockApplication.policy[CONTRACT_COMPLETION_DATE],
        [TOTAL_CONTRACT_VALUE]: mockApplication.policy[TOTAL_CONTRACT_VALUE],
      };

      const result = mapSubmittedData(mockBody);

      const expected = {
        ...mockBody,
        [CONTRACT_COMPLETION_DATE]: null,
        [TOTAL_CONTRACT_VALUE]: '',
      };

      expect(result).toEqual(expected);
    });
  });
});
