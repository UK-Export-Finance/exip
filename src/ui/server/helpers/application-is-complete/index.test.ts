import applicationIsComplete from '.';
import { mockApplication } from '../../test-mocks';

describe('server/helpers/application-is-complete', () => {
  it('should return true', () => {
    const result = applicationIsComplete(mockApplication);

    expect(result).toEqual(true);
  });

  describe('when an application is incomplete', () => {
    it('should return false', () => {
      const mockApplicationIncomplete = {
        ...mockApplication,
        declaration: {
          ...mockApplication.declaration,
          agreeToConfidentiality: undefined,
        },
      };

      const result = applicationIsComplete(mockApplicationIncomplete);

      expect(result).toEqual(false);
    });
  });
});
