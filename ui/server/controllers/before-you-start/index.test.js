const {
  PAGE_VARIABLES,
  get,
  post,
} = require('.');
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

  describe('PAGE_VARIABLES', () => {
    it('should have correct properties', () => {
      const expected = {
        CONTENT_STRINGS: {
          PRODUCT: CONTENT_STRINGS.PRODUCT,
          FOOTER: CONTENT_STRINGS.FOOTER,
          LINKS: CONTENT_STRINGS.LINKS,
          ...CONTENT_STRINGS.PAGES.BEFORE_YOU_START,
        },
      };

      expect(PAGE_VARIABLES).toEqual(expected);
    });
  });

  describe('get', () => {
    it('should render template', () => {
      get(req, res);

      expect(res.render).toHaveBeenCalledWith(TEMPLATES.BEFORE_YOU_START, {
        ...PAGE_VARIABLES,
        BACK_LINK: req.headers.referer,
      });
    });
  });

  describe('post', () => {
    it('should add an empty submittedData object to the session', () => {
      req.session = {
        submittedData: {
          test: true,
        },
      };

      post(req, res);

      expect(req.session.submittedData).toEqual({});
    });

    it(`should redirect to ${ROUTES.BUYER_COUNTRY}`, () => {
      post(req, res);

      expect(res.redirect).toHaveBeenCalledWith(ROUTES.BUYER_COUNTRY);
    });
  });
});
