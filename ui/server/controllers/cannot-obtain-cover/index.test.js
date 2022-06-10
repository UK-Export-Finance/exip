const controller = require('.');
const CONTENT_STRINGS = require('../../content-strings');
const { TEMPLATES } = require('../../constants');
const { mockReq, mockRes } = require('../../test-mocks');

describe('controllers/cannot-obtain-cover', () => {
  let req;
  let res;
  const mockExitReason = 'mock';
  const mockPreviousRoute = '/test';

  beforeEach(() => {
    req = mockReq();

    req.flash = (property) => {
      const obj = {
        exitReason: mockExitReason,
        previousRoute: mockPreviousRoute,
      };

      return obj[property];
    };

    res = mockRes();
  });

  it('should render template with values from req.flash', () => {
    controller(req, res);

    expect(res.render).toHaveBeenCalledWith(TEMPLATES.CANNOT_OBTAIN_COVER, {
      CONTENT_STRINGS: {
        PRODUCT: CONTENT_STRINGS.PRODUCT,
        FOOTER: CONTENT_STRINGS.FOOTER,
        LINKS: CONTENT_STRINGS.LINKS,
        ...CONTENT_STRINGS.PAGES.CANNOT_OBTAIN_COVER_PAGE,
      },
      BACK_LINK: mockPreviousRoute,
      EXIT_REASON: mockExitReason,
    });
  });
});
