import { hasSubmittedField, getSubmittedFields } from '.';
import { mockApplication } from '../../test-mocks';
import flattenApplicationData from '../flatten-application-data';

describe('server/helpers/get-submitted-fields', () => {
  const mockApplicationFlat = flattenApplicationData(mockApplication);

  describe('hasSubmittedField', () => {
    describe('when submitted data has the given field id', () => {
      it('should return true', () => {
        const result = hasSubmittedField(mockApplicationFlat, 'hasMinimumUkGoodsOrServices');

        expect(result).toEqual(true);
      });

      it('should return true when array is populated', () => {
        const result = hasSubmittedField(mockApplicationFlat, 'sicCodes');

        expect(result).toEqual(true);
      });

      describe('when the field value is false boolean', () => {
        it('should return true', () => {
          const result = hasSubmittedField(mockApplicationFlat, 'wantCoverOverMaxPeriod');

          expect(result).toEqual(true);
        });
      });
    });

    describe('when submitted data does NOT have the given field id', () => {
      it('should return false', () => {
        const result = hasSubmittedField(mockApplicationFlat, 'mockField');

        expect(result).toEqual(false);
      });
    });

    describe('when the submitted field is an unpopulated array', () => {
      it('should return false', () => {
        const mockApplicationNoSic = {
          ...mockApplication,
        };

        mockApplicationNoSic.company.sicCodes = [];
        const mockApplicationNoSicFlat = flattenApplicationData(mockApplicationNoSic);

        const result = hasSubmittedField(mockApplicationNoSicFlat, 'sicCodes');

        expect(result).toEqual(false);
      });
    });
  });

  describe('getSubmittedFields', () => {
    it('should return fields that are provided and also in provided submitted fields', () => {
      const mockFields = ['totalValueInsured', 'wantCoverOverMaxPeriod', 'mockField'];

      const result = getSubmittedFields(mockFields, mockApplicationFlat);

      const expected = ['totalValueInsured', 'wantCoverOverMaxPeriod'];

      expect(result).toEqual(expected);
    });

    describe('when fields is not populated', () => {
      it('should return empty array', () => {
        const result = getSubmittedFields([], mockApplicationFlat);

        expect(result).toEqual([]);
      });
    });
  });
});
