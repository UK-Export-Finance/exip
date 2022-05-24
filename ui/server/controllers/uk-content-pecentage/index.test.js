const controller = require('.');
const CONTENT_STRINGS = require('../../content-strings');
const { FIELDS, ROUTES, TEMPLATES } = require('../../constants');
const singleInputPageVariables = require('../../helpers/single-input-page-variables');
const { validation: generateValidationErrors } = require('./validation');
const { mockReq, mockRes } = require('../../test-mocks');

describe('controllers/uk-content-percentage', () => {
  let req;
  let res;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  describe('PAGE_VARIABLES', () => {
    it('should have correct properties', () => {
      const expected = {
        FIELD_NAME: FIELDS.UK_CONTENT_PERCENTAGE,
        PAGE_CONTENT_STRINGS: CONTENT_STRINGS.UK_CONTENT_PERCENTAGE_PAGE,
        BACK_LINK: ROUTES.FINAL_DESTINATION,
      };

      expect(controller.PAGE_VARIABLES).toEqual(expected);
    });
  });

  describe('get', () => {
    it('should render template', () => {
      controller.get(req, res);

      expect(res.render).toHaveBeenCalledWith(TEMPLATES.UK_CONTENT_PERCENTAGE, singleInputPageVariables(controller.PAGE_VARIABLES));
    });
  });

  describe('post', () => {
    describe('when there are validation errors', () => {
      it('should render template with validation errors', () => {
        controller.post(req, res);

        expect(res.render).toHaveBeenCalledWith(TEMPLATES.UK_CONTENT_PERCENTAGE, {
          ...singleInputPageVariables(controller.PAGE_VARIABLES),
          validationErrors: generateValidationErrors(req.body),
        });
      });
    });

    describe('when there are no validation errors', () => {
      it(`should redirect to ${ROUTES.TELL_US_ABOUT_YOUR_DEAL}`, () => {
        req.body = {
          [FIELDS.UK_CONTENT_PERCENTAGE]: '50',
        };

        controller.post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.TELL_US_ABOUT_YOUR_DEAL);
      });
    });
  });
});
