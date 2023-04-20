import applicationIsComplete from '.';
import flattenApplicationData from '../flatten-application-data';
import { mockApplication } from '../../test-mocks';

describe('server/helpers/application-is-complete', () => {
  it('should return true', () => {
    const flatApplicationData = flattenApplicationData(mockApplication);

    const result = applicationIsComplete(flatApplicationData);

    expect(result).toEqual(true);
  });

  describe('when an application is incomplete', () => {
    it('should return false', () => {
      const mockApplicationIncomplete = {
        ...mockApplication,
        declaration: { id: mockApplication.declaration.id },
      };

      const flatApplicationData = flattenApplicationData(mockApplicationIncomplete);

      const result = applicationIsComplete(flatApplicationData);

      expect(result).toEqual(false);
    });
  });
});
