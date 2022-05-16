const controller = require('.');
const CONTENT_STRINGS = require('../../../content-strings');
const { mockReq, mockRes } = require('../test-mocks');

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
    });
  });
});
