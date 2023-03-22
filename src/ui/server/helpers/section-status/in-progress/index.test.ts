import sectionIsInProgress from '.';
import { mockApplication } from '../../../test-mocks';
import flattenApplicationData from '../../flatten-application-data';
import { ApplicationFlat } from '../../../../types';

describe('server/helpers/section-status/in-progress', () => {
  const mockApplicationFlat = flattenApplicationData(mockApplication);

  describe('sectionIsInProgress', () => {
    describe('when all relevant fields have NOT been submitted', () => {
      it('should return true', () => {
        const mockFields = ['wantCoverOverMaxAmount', 'wantCoverOverMaxPeriod'];

        const mockApplicationIncomplete = {
          wantCoverOverMaxAmount: mockApplicationFlat.wantCoverOverMaxAmount,
        } as ApplicationFlat;

        const result = sectionIsInProgress(mockFields, mockApplicationIncomplete);

        expect(result).toEqual(true);
      });
    });

    describe('when all relevant fields have been submitted', () => {
      it('should return false', () => {
        const mockFields = ['wantCoverOverMaxAmount', 'wantCoverOverMaxPeriod'];

        const result = sectionIsInProgress(mockFields, mockApplicationFlat);

        expect(result).toEqual(false);
      });
    });
  });
});
