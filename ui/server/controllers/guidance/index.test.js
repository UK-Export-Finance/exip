const controller = require('.');
const CONTENT_STRINGS = require('../../content-strings');
const { TEMPLATES } = require('../../constants');
const { mockReq, mockRes } = require('../../test-mocks');

describe('controllers/guidance', () => {
  let req;
  let res;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  describe('get', () => {
    it('should render template', () => {
      controller(req, res);

      expect(res.render).toHaveBeenCalledWith(TEMPLATES.GUIDANCE, {
        CONTENT_STRINGS: {
          PRODUCT: CONTENT_STRINGS.PRODUCT,
          FOOTER: CONTENT_STRINGS.FOOTER,
        },
      });
    });
  });
});
