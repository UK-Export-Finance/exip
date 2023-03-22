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
          const result = hasSubmittedField(mockApplicationFlat, 'wantCoverOverMaxAmount');

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

    describe('when submitted data or fieldId is not provided', () => {
      it('should return false', () => {
        // @ts-ignore
        const result = hasSubmittedField();

        expect(result).toEqual(false);
      });

      it('should return false when array is empty', () => {
        const mockApplicationNoSic = {
          ...mockApplication,
        };

        mockApplicationNoSic.exporterCompany.sicCodes = [];
        const mockApplicationNoSicFlat = flattenApplicationData(mockApplicationNoSic);

        const result = hasSubmittedField(mockApplicationNoSicFlat, 'sicCodes');

        expect(result).toEqual(false);
      });
    });
  });

  describe('getSubmittedFields', () => {
    it('should return fields that are provided and also in provided submitted fields', () => {
      const mockFields = ['wantCoverOverMaxAmount', 'wantCoverOverMaxPeriod', 'mockField'];

      const result = getSubmittedFields(mockFields, mockApplicationFlat);

      const expected = ['wantCoverOverMaxAmount', 'wantCoverOverMaxPeriod'];

      expect(result).toEqual(expected);
    });

    describe('when no fields are provided', () => {
      it('should return empty array', () => {
        const result = getSubmittedFields([], mockApplicationFlat);

        expect(result).toEqual([]);
      });
    });
  });
});
