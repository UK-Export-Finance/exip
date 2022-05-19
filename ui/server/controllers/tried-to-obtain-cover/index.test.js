const controller = require('.');
const CONTENT_STRINGS = require('../../content-strings');
const { FIELDS, ROUTES, TEMPLATES } = require('../../constants');
const singleInputPageVariables = require('../../helpers/single-input-page-variables');
const generateValidationErrors = require('./validation');
const { mockReq, mockRes } = require('../../test-mocks');

describe('controllers/tried-to-obtain-cover', () => {
  let req;
  let res;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  describe('PAGE_VARIABLES', () => {
    it('should have correct properties', () => {
      const expected = {
        FIELD_NAME: FIELDS.TRIED_PRIVATE_COVER,
        PAGE_CONTENT_STRINGS: CONTENT_STRINGS.TRIED_TO_OBTAIN_COVER_PAGE,
        BACK_LINK: ROUTES.BUYER_BASED,
      };

      expect(controller.PAGE_VARIABLES).toEqual(expected);
    });
  });

  describe('get', () => {
    it('should render template', () => {
      controller.get(req, res);

      expect(res.render).toHaveBeenCalledWith(TEMPLATES.TRIED_TO_OBTAIN_COVER, singleInputPageVariables(controller.PAGE_VARIABLES));
    });
  });

  describe('post', () => {
    describe('when there are validation errors', () => {
      it('should render template with validation errors', () => {
        controller.post(req, res);

        expect(res.render).toHaveBeenCalledWith(TEMPLATES.TRIED_TO_OBTAIN_COVER, {
          ...singleInputPageVariables(controller.PAGE_VARIABLES),
          validationErrors: generateValidationErrors(req.body),
        });
      });
    });

    describe('when there are no validation errors', () => {
      it(`should redirect to ${ROUTES.FINAL_DESTINATION}`, () => {
        req.body = {
          [FIELDS.TRIED_PRIVATE_COVER]: 'true',
        };

        controller.post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.FINAL_DESTINATION);
      });
    });
  });
});
