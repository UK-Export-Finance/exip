const controller = require('.');
const CONTENT_STRINGS = require('../../content-strings');
const { FIELDS, ROUTES } = require('../../constants');
const singleInputPageVariables = require('../../helpers/single-input-page-variables');
const generateValidationErrors = require('./validation');
const { mockReq, mockRes } = require('../../test-mocks');

describe('controllers/buyer-based', () => {
  let req;
  let res;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  describe('PAGE_VARIABLES', () => {
    it('should have correct properties', () => {
      const expected = {
        FIELD_NAME: FIELDS.VALID_BUYER_BASE,
        PAGE_CONTENT_STRINGS: CONTENT_STRINGS.BUYER_BASED_PAGE,
        BACK_LINK: ROUTES.COMPANY_BASED,
      };

      expect(controller.PAGE_VARIABLES).toEqual(expected);
    });
  });

  describe('get', () => {
    it('should render template', () => {
      controller.get(req, res);

      expect(res.render).toHaveBeenCalledWith('buyer-based.njk', singleInputPageVariables(controller.PAGE_VARIABLES));
    });
  });

  describe('post', () => {
    describe('when there are validation errors', () => {
      it('should render template with validation errors', () => {
        controller.post(req, res);

        expect(res.render).toHaveBeenCalledWith('buyer-based.njk', {
          ...singleInputPageVariables(controller.PAGE_VARIABLES),
          validationErrors: generateValidationErrors(req.body),
        });
      });
    });

    describe('when submitted answer is false', () => {
      it(`should redirect to ${ROUTES.BUYER_BASED_UNAVAILABLE}`, () => {
        req.body = {
          [FIELDS.VALID_BUYER_BASE]: 'false',
        };

        controller.post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.BUYER_BASED_UNAVAILABLE);
      });
    });

    describe('when there are no validation errors', () => {
      it(`should redirect to ${ROUTES.TRIED_TO_OBTAIN_COVER}`, () => {
        req.body = {
          [FIELDS.VALID_BUYER_BASE]: 'true',
        };

        controller.post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.TRIED_TO_OBTAIN_COVER);
      });
    });
  });
});
