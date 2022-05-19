const controller = require('.');
const { mockReq, mockRes } = require('../../test-mocks');
const CONTENT_STRINGS = require('../../content-strings');
const { TEMPLATES, ROUTES } = require('../../constants');

describe('controllers/index', () => {
  let req;
  let res;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  it('should render before-you-start template', () => {
    controller(req, res);

    expect(res.render).toHaveBeenCalledWith(TEMPLATES.BEFORE_YOU_START, {
      CONTENT_STRINGS: CONTENT_STRINGS.LANDING_PAGE,
      SUBMIT_URL: ROUTES.COMPANY_BASED,
    });
  });
});
