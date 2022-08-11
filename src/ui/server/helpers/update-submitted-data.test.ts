import { mapSubmittedData, updateSubmittedData } from './update-submitted-data';
import { FIELD_IDS, FIELD_VALUES } from '../constants';
import { sanitiseData } from './sanitise-data';
import { RequestBody, SubmittedData } from '../../types';

const { CREDIT_PERIOD, CONTRACT_VALUE, MAX_AMOUNT_OWED, MULTI_POLICY_LENGTH, POLICY_LENGTH, POLICY_TYPE, SINGLE_POLICY_LENGTH } = FIELD_IDS;

describe('server/helpers/update-submitted-data', () => {
  describe('mapSubmittedData', () => {
    describe(`when ${POLICY_TYPE} is 'single'`, () => {
      it('should return policy length field with single specific fields', () => {
        const mockFormData = {
          mock: '1',
          [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.SINGLE,
          [SINGLE_POLICY_LENGTH]: '10',
        } as RequestBody;

        const result = mapSubmittedData(mockFormData);

        const expected = {
          mock: '1',
          [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.SINGLE,
          [POLICY_LENGTH]: '10',
          [SINGLE_POLICY_LENGTH]: '10',
        };

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${POLICY_TYPE} is 'multi'`, () => {
      it('should return policy length field with multi specific fields', () => {
        const mockFormData = {
          mock: '1',
          [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.MULTI,
          [POLICY_LENGTH]: '10',
          [MULTI_POLICY_LENGTH]: '10',
        } as RequestBody;

        const result = mapSubmittedData(mockFormData);

        const expected = {
          mock: '1',
          [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.MULTI,
          [POLICY_LENGTH]: '10',
          [MULTI_POLICY_LENGTH]: '10',
        };

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${POLICY_TYPE} of 'single' is submitted  and 'multi' fields were previously provided`, () => {
      it('should return policy length field with only single specific fields', () => {
        const mockFormData = {
          [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.SINGLE,
          [SINGLE_POLICY_LENGTH]: '10',
          [CONTRACT_VALUE]: 100,
        } as RequestBody;

        const mockExistingData = {
          [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.MULTI,
          [MULTI_POLICY_LENGTH]: '5',
          [MAX_AMOUNT_OWED]: 200,
        } as SubmittedData;

        const result = mapSubmittedData({ ...mockExistingData, ...mockFormData });

        const expected = {
          [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.SINGLE,
          [POLICY_LENGTH]: '10',
          [SINGLE_POLICY_LENGTH]: '10',
          [CONTRACT_VALUE]: 100,
        };

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${POLICY_TYPE} of 'multi' is submitted  and 'single' fields were previously provided`, () => {
      it('should return policy length field with only multi specific fields', () => {
        const mockFormData = {
          [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.MULTI,
          [MULTI_POLICY_LENGTH]: '10',
          [MAX_AMOUNT_OWED]: 200,
        } as RequestBody;

        const mockExistingData = {
          [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.SINGLE,
          [SINGLE_POLICY_LENGTH]: '5',
          [CONTRACT_VALUE]: 100,
        };

        const result = mapSubmittedData({ ...mockExistingData, ...mockFormData });

        const expected = {
          [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.MULTI,
          [POLICY_LENGTH]: '10',
          [MULTI_POLICY_LENGTH]: '10',
          [MAX_AMOUNT_OWED]: 200,
        };

        expect(result).toEqual(expected);
      });
    });

    describe(`when ${POLICY_TYPE} of 'single' is submitted  and 'credit period' field was previously provided`, () => {
      it('should delete the credit period', () => {
        const mockFormData = {
          [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.SINGLE,
          [SINGLE_POLICY_LENGTH]: '10',
        } as RequestBody;

        const mockExistingData = {
          [CREDIT_PERIOD]: 2,
        };

        const result = mapSubmittedData({ ...mockExistingData, ...mockFormData });

        const expected = {
          [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.SINGLE,
          [POLICY_LENGTH]: '10',
          [SINGLE_POLICY_LENGTH]: '10',
        };

        expect(result).toEqual(expected);
      });
    });

    describe('when no policy type fields are provided', () => {
      it('should return all fields', () => {
        const mockFormData = {
          mock: '1',
        } as RequestBody;

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
        } as SubmittedData;

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

      const expectedSanitisedData = sanitiseData({
        ...mockExistingData,
        a: true,
      });

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
