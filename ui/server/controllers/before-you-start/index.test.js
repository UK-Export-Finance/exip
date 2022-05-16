const controller = require('.');
const { mockReq, mockRes } = require('../../test-mocks');
const CONTENT_STRINGS = require('../../content-strings');
const CONSTANTS = require('../../constants');

describe('controllers/index', () => {
  let req;
  let res;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  it('should render before-you-start template', () => {
    controller(req, res);

    expect(res.render).toHaveBeenCalledWith('before-you-start.njk', {
      CONTENT_STRINGS: CONTENT_STRINGS.LANDING_PAGE,
      SUBMIT_URL: CONSTANTS.ROUTES.COMPANY_BASED,
    });
  });
});
