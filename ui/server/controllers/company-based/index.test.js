const controller = require('.');
const CONTENT_STRINGS = require('../../../content-strings');
const { mockReq, mockRes } = require('../../test-mocks');

describe('controllers/company-based', () => {
  let req;
  let res;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  it('should render company-based template', () => {
    controller(req, res);

    expect(res.render).toHaveBeenCalledWith('company-based.njk', {
      CONTENT_STRINGS: CONTENT_STRINGS.COMPANY_BASED_PAGE,
    });
  });
});
