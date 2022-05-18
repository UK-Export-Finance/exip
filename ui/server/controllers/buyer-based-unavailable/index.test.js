const controller = require('.');
const CONTENT_STRINGS = require('../../content-strings');
const CONSTANTS = require('../../constants');
const { mockReq, mockRes } = require('../../test-mocks');

describe('controllers/buyer-based-unavailable', () => {
  let req;
  let res;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  it('should render template', () => {
    controller(req, res);

    expect(res.render).toHaveBeenCalledWith('buyer-based-unavailable.njk', {
      CONTENT_STRINGS: {
        LINKS: CONTENT_STRINGS.LINKS,
        ...CONTENT_STRINGS.EXIT_PAGES.BUYER_BASED,
      },
      BACK_LINK: CONSTANTS.ROUTES.BUYER_BASED,
    });
  });
});
