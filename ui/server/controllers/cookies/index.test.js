const controller = require('.');
const CONTENT_STRINGS = require('../../content-strings');
const { TEMPLATES } = require('../../constants');
const { mockReq, mockRes } = require('../../test-mocks');

describe('controllers/cookies', () => {
  let req;
  let res;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  describe('get', () => {
    it('should render template', () => {
      controller(req, res);

      expect(res.render).toHaveBeenCalledWith(TEMPLATES.COOKIES, {
        CONTENT_STRINGS: {
          PRODUCT: CONTENT_STRINGS.PRODUCT,
          FOOTER: CONTENT_STRINGS.FOOTER,
          ...CONTENT_STRINGS.PAGES.COOKIES_PAGE,
        },
      });
    });
  });
});
