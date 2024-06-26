import { updateSubmittedData } from '.';
import { sanitiseData } from '../../sanitise-data';
import { RequestBody, SubmittedDataInsuranceEligibility } from '../../../../types';

describe('server/helpers/update-submitted-data/insurance', () => {
  describe('updateSubmittedData', () => {
    describe('when there is existing data', () => {
      it('should return an object with existing and new, sanitised form data', () => {
        const mockFormData = {
          a: true,
        } as RequestBody;

        const mockExistingData = {
          mock: true,
        } as SubmittedDataInsuranceEligibility;

        const result = updateSubmittedData(mockFormData, mockExistingData);

        const sanitisedFormData = sanitiseData(mockFormData);

        const expected = {
          ...mockExistingData,
          ...sanitisedFormData,
        };

        expect(result).toEqual(expected);
      });
    });

    describe('when there is existing data which has a special character', () => {
      it('should return an object with existing and new, sanitised form data and should not sanitise the existing data', () => {
        const mockFormData = {
          a: true,
        } as RequestBody;

        const mockExistingData = {
          mock: '&amp;',
        } as SubmittedDataInsuranceEligibility;

        const result = updateSubmittedData(mockFormData, mockExistingData);

        const sanitisedFormData = sanitiseData(mockFormData);

        const expected = {
          ...mockExistingData,
          ...sanitisedFormData,
        };

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

        const expected = sanitiseData({
          ...mockExistingData,
          ...mockFormData,
        });

        expect(result).toEqual(expected);
      });
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
