const { ROUTES } = require('../constants');
const previousPageUrl = require('./previous-page-url');

describe('sever/helpers/previous-page-url', () => {
  describe('when reqUrl is a change route', () => {
    it(`should return ${ROUTES.CHECK_YOUR_ANSWERS}`, () => {
      const mockrReqUrl = '/a-form/change';

      const result = previousPageUrl(mockrReqUrl);

      expect(result).toEqual(ROUTES.CHECK_YOUR_ANSWERS);
    });
  });

  describe('when reqUrl is NOT a change route', () => {
    it('should return the provided previousFormUrl', () => {
      const mockrReqUrl = '/a-form';
      const mockPreviousFormUrl = '/b-form';

      const result = previousPageUrl(mockrReqUrl, mockPreviousFormUrl);

      expect(result).toEqual(mockPreviousFormUrl);
    });
  });
});
