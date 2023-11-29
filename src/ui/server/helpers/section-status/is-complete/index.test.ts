import sectionIsComplete from '.';
import { mockApplication } from '../../../test-mocks';
import flattenApplicationData from '../../flatten-application-data';

describe('server/helpers/section-status/is-complete', () => {
  const mockApplicationFlat = flattenApplicationData(mockApplication);

  describe('sectionIsComplete', () => {
    describe('when all relevant fields have been submitted', () => {
      it('should return true', () => {
        const mockFields = ['totalValueInsured', 'hasEndBuyer'];

        const result = sectionIsComplete(mockFields, mockApplicationFlat);

        expect(result).toEqual(true);
      });
    });

    describe('when all relevant fields have NOT been submitted', () => {
      it('should return false', () => {
        const mockFields = ['totalValueInsured', 'hasEndBuyer', 'mockField'];

        const result = sectionIsComplete(mockFields, mockApplicationFlat);

        expect(result).toEqual(false);
      });
    });
  });
});
