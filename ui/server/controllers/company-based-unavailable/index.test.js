const controller = require('.');
const CONTENT_STRINGS = require('../../content-strings');
const { mockReq, mockRes } = require('../../test-mocks');

describe('controllers/company-based-unavailable', () => {
  let req;
  let res;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  it('should render template', () => {
    controller(req, res);

    expect(res.render).toHaveBeenCalledWith('company-based-unavailable.njk', {
      CONTENT_STRINGS: CONTENT_STRINGS.EXIT_PAGES.COMPANY_BASED,
    });
  });
});
