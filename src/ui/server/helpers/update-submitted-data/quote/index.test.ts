import { mapSubmittedData, updateSubmittedData } from '.';
import { FIELD_IDS, FIELD_VALUES } from '../../../constants';
import { sanitiseData } from '../../sanitise-data';
import { RequestBody, SubmittedDataQuoteEligibility } from '../../../../types';

const {
  ELIGIBILITY: { CREDIT_PERIOD, CONTRACT_VALUE, MAX_AMOUNT_OWED },
  POLICY_LENGTH,
  POLICY_TYPE,
} = FIELD_IDS;

const {
  POLICY_TYPE: { SINGLE, MULTIPLE },
} = FIELD_VALUES;

describe('server/helpers/update-submitted-data/quote', () => {
  describe('mapSubmittedData', () => {
    describe(`when ${POLICY_TYPE} is '${SINGLE}'`, () => {
      it('should return policy length field with single specific fields', () => {
        const mockFormData = {
          mock: '1',
          [POLICY_TYPE]: SINGLE,
          [POLICY_LENGTH]: '10',
        } as SubmittedDataQuoteEligibility;

        const result = mapSubmittedData(mockFormData);

        const expected = {
          mock: '1',
          [POLICY_TYPE]: SINGLE,
          [POLICY_LENGTH]: '10',
        };

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${POLICY_TYPE} is '${MULTIPLE}'`, () => {
      it('should return policy length field with multiple specific fields', () => {
        const mockFormData = {
          mock: '1',
          [POLICY_TYPE]: MULTIPLE,
        } as SubmittedDataQuoteEligibility;

        const result = mapSubmittedData(mockFormData);

        const expected = {
          mock: '1',
          [POLICY_TYPE]: MULTIPLE,
          [POLICY_LENGTH]: FIELD_VALUES.POLICY_LENGTH.MULTIPLE,
        };

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${POLICY_TYPE} of '${SINGLE}' is submitted  and '${MULTIPLE}' fields were previously provided`, () => {
      it('should return policy length field with only single specific fields', () => {
        const mockFormData = {
          [POLICY_TYPE]: SINGLE,
          [POLICY_LENGTH]: '10',
          [CONTRACT_VALUE]: 100,
        } as SubmittedDataQuoteEligibility;

        const mockExistingData = {
          [POLICY_TYPE]: MULTIPLE,
          [MAX_AMOUNT_OWED]: 200,
        } as SubmittedDataQuoteEligibility;

        const result = mapSubmittedData({ ...mockExistingData, ...mockFormData });

        const expected = {
          [POLICY_TYPE]: SINGLE,
          [POLICY_LENGTH]: '10',
          [CONTRACT_VALUE]: 100,
        };

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${POLICY_TYPE} of '${MULTIPLE}' is submitted  and '${SINGLE}' fields were previously provided`, () => {
      it('should return policy length field with only multiple specific fields and default multiple policy length', () => {
        const mockFormData = {
          [POLICY_TYPE]: MULTIPLE,
          [POLICY_LENGTH]: FIELD_VALUES.POLICY_LENGTH.MULTIPLE,
          [MAX_AMOUNT_OWED]: 200,
        } as SubmittedDataQuoteEligibility;

        const mockExistingData = {
          [POLICY_TYPE]: SINGLE,
          [POLICY_LENGTH]: '5',
          [CONTRACT_VALUE]: 100,
        };

        const result = mapSubmittedData({ ...mockExistingData, ...mockFormData });

        const expected = {
          [POLICY_TYPE]: MULTIPLE,
          [POLICY_LENGTH]: FIELD_VALUES.POLICY_LENGTH.MULTIPLE,
          [MAX_AMOUNT_OWED]: 200,
        };

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${POLICY_TYPE} of '${SINGLE}' is submitted  and 'credit period' field was previously provided`, () => {
      it('should delete the credit period', () => {
        const mockFormData = {
          [POLICY_TYPE]: SINGLE,
          [POLICY_LENGTH]: '10',
        } as SubmittedDataQuoteEligibility;

        const mockExistingData = {
          [CREDIT_PERIOD]: 2,
        };

        const result = mapSubmittedData({ ...mockExistingData, ...mockFormData });

        const expected = {
          [POLICY_TYPE]: SINGLE,
          [POLICY_LENGTH]: '10',
        };

        expect(result).toEqual(expected);
      });
    });

    describe('when no policy type fields are provided', () => {
      it('should return all fields', () => {
        const mockFormData = {
          mock: '1',
        } as SubmittedDataQuoteEligibility;

        const result = mapSubmittedData(mockFormData);

        const expected = {
          mock: '1',
        };

        expect(result).toEqual(expected);
      });
    });
  });

  describe('updateSubmittedData', () => {
    describe('when there is existing data', () => {
      it('should return an object with existing and new, sanitised form data', () => {
        const mockFormData = {
          a: true,
        } as RequestBody;

        const mockExistingData = {
          mock: true,
        } as SubmittedDataQuoteEligibility;

        const result = updateSubmittedData(mockFormData, mockExistingData);

        const expectedSanitisedData = sanitiseData({
          ...mockExistingData,
          ...mockFormData,
        });

        const expected = mapSubmittedData(expectedSanitisedData);

        expect(result).toEqual(expected);
      });
    });

    describe('when there is no existing data', () => {
      it('should return an object with new, sanitised form data', () => {
        const mockFormData = {
          a: true,
        } as RequestBody;

        const mockExistingData = {};

        const result = updateSubmittedData(mockFormData, mockExistingData);

        const expectedSanitisedData = sanitiseData({
          ...mockExistingData,
          ...mockFormData,
        });

        const expected = mapSubmittedData(expectedSanitisedData);

        expect(result).toEqual(expected);
      });
    });

    it('should not return _csrf from provided form data', () => {
      const mockFormData = {
        _csrf: '123',
        a: true,
      } as RequestBody;

      const mockExistingData = {};

      const result = updateSubmittedData(mockFormData, mockExistingData);

      const expectedSanitisedData = sanitiseData(mockFormData);

      const expected = mapSubmittedData(expectedSanitisedData);

      expect(result).toEqual(expected);
    });

    describe('when there is no existing or provided data', () => {
      it('should return empty object', () => {
        const mockFormData = {
          _csrf: '123',
        } as RequestBody;

        const result = updateSubmittedData(mockFormData, {});

        expect(result).toEqual({});
      });
    });
  });
});
