const controller = require('.');
const CONTENT_STRINGS = require('../../content-strings');
const CONSTANTS = require('../../constants');
const generateValidationErrors = require('./validation');
const { mockReq, mockRes } = require('../../test-mocks');

describe('controllers/company-based', () => {
  let req;
  let res;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  describe('get', () => {
    it('should render template', () => {
      controller.get(req, res);

      expect(res.render).toHaveBeenCalledWith('company-based.njk', {
        CONTENT_STRINGS: {
          BUTTONS: CONTENT_STRINGS.BUTTONS,
          LINKS: CONTENT_STRINGS.LINKS,
          ...CONTENT_STRINGS.COMPANY_BASED_PAGE,
        },
        BACK_LINK: CONSTANTS.ROUTES.BEFORE_YOU_START,
        FIELD_NAME: CONSTANTS.FIELDS.VALID_COMPANY_BASE,
      });
    });
  });

  describe('post', () => {
    describe('when there are validation errors', () => {
      it('should render template with validation errors', () => {
        controller.post(req, res);

        expect(res.render).toHaveBeenCalledWith('company-based.njk', {
          CONTENT_STRINGS: {
            BUTTONS: CONTENT_STRINGS.BUTTONS,
            LINKS: CONTENT_STRINGS.LINKS,
            ...CONTENT_STRINGS.COMPANY_BASED_PAGE,
          },
          BACK_LINK: CONSTANTS.ROUTES.BEFORE_YOU_START,
          FIELD_NAME: CONSTANTS.FIELDS.VALID_COMPANY_BASE,
          validationErrors: generateValidationErrors(req.body),
        });
      });
    });

    describe('when submitted answer is false', () => {
      it(`should redirect to ${CONSTANTS.ROUTES.COMPANY_BASED_UNAVAILABLE}`, () => {
        req.body = {
          [CONSTANTS.FIELDS.VALID_COMPANY_BASE]: 'false',
        };

        controller.post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(CONSTANTS.ROUTES.COMPANY_BASED_UNAVAILABLE);
      });
    });

    describe('when there are no validation errors', () => {
      it(`should redirect to ${CONSTANTS.ROUTES.BUYER_BASED}`, () => {
        req.body = {
          [CONSTANTS.FIELDS.VALID_COMPANY_BASE]: 'true',
        };

        controller.post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(CONSTANTS.ROUTES.BUYER_BASED);
      });
    });
  });
});
