const controller = require('.');
const CONTENT_STRINGS = require('../../content-strings');
const { FIELDS, ROUTES, TEMPLATES } = require('../../constants');
const singleInputPageVariables = require('../../helpers/single-input-page-variables');
const generateValidationErrors = require('./validation');
const updateSubmittedData = require('../../helpers/update-submitted-data');
const { mockReq, mockRes } = require('../../test-mocks');

describe('controllers/company-based', () => {
  let req;
  let res;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  describe('PAGE_VARIABLES', () => {
    it('should have correct properties', () => {
      const expected = {
        FIELD_NAME: FIELDS.VALID_COMPANY_BASE,
        PAGE_CONTENT_STRINGS: CONTENT_STRINGS.COMPANY_BASED_PAGE,
        BACK_LINK: ROUTES.BEFORE_YOU_START,
      };

      expect(controller.PAGE_VARIABLES).toEqual(expected);
    });
  });

  describe('get', () => {
    it('should render template', () => {
      controller.get(req, res);

      expect(res.render).toHaveBeenCalledWith(TEMPLATES.COMPANY_BASED, {
        ...singleInputPageVariables(controller.PAGE_VARIABLES),
        submittedValues: req.session.submittedData,
      });
    });
  });

  describe('post', () => {
    describe('when there are validation errors', () => {
      it('should render template with validation errors', () => {
        controller.post(req, res);

        expect(res.render).toHaveBeenCalledWith(TEMPLATES.COMPANY_BASED, {
          ...singleInputPageVariables(controller.PAGE_VARIABLES),
          validationErrors: generateValidationErrors(req.body),
        });
      });
    });

    describe('when submitted answer is false', () => {
      it(`should redirect to ${ROUTES.COMPANY_BASED_UNAVAILABLE}`, () => {
        req.body = {
          [FIELDS.VALID_COMPANY_BASE]: 'false',
        };

        controller.post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.COMPANY_BASED_UNAVAILABLE);
      });
    });

    describe('when there are no validation errors', () => {
      it('should update the session with submitted data', () => {
        req.body = {
          [FIELDS.VALID_COMPANY_BASE]: 'true',
        };

        controller.post(req, res);

        const expected = updateSubmittedData(
          req.body,
          req.session.submittedData,
        );

        expect(req.session.submittedData).toEqual(expected);
      });

      it(`should redirect to ${ROUTES.BUYER_BASED}`, () => {
        req.body = {
          [FIELDS.VALID_COMPANY_BASE]: 'true',
        };

        controller.post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.BUYER_BASED);
      });
    });
  });
});
