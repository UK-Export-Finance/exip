const controller = require('.');
const CONTENT_STRINGS = require('../../content-strings');
const { TEMPLATES } = require('../../constants');
const { mockReq, mockRes } = require('../../test-mocks');

describe('controllers/problem-with-service', () => {
  let req;
  let res;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  describe('get', () => {
    it('should render template', () => {
      controller(req, res);

      expect(res.render).toHaveBeenCalledWith(TEMPLATES.PROBLEM_WITH_SERVICE, {
        CONTENT_STRINGS: {
          PRODUCT: CONTENT_STRINGS.PRODUCT,
          ...CONTENT_STRINGS.PROBLEM_WITH_SERVICE_PAGE,
        },
      });
    });
  });
});
