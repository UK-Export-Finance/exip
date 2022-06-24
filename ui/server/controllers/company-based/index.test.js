const controller = require('.');
const CONTENT_STRINGS = require('../../content-strings');
const { FIELD_IDS, ROUTES, TEMPLATES } = require('../../constants');
const singleInputPageVariables = require('../../helpers/single-input-page-variables');
const generateValidationErrors = require('./validation');
const { updateSubmittedData } = require('../../helpers/update-submitted-data');
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
        FIELD_NAME: FIELD_IDS.VALID_COMPANY_BASE,
        PAGE_CONTENT_STRINGS: CONTENT_STRINGS.PAGES.COMPANY_BASED_PAGE,
      };

      expect(controller.PAGE_VARIABLES).toEqual(expected);
    });
  });

  describe('get', () => {
    it('should render template', () => {
      controller.get(req, res);

      expect(res.render).toHaveBeenCalledWith(TEMPLATES.COMPANY_BASED, {
        ...singleInputPageVariables(controller.PAGE_VARIABLES),
        BACK_LINK: req.headers.referer,
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
          BACK_LINK: req.headers.referer,
          validationErrors: generateValidationErrors(req.body),
        });
      });
    });

    describe('when submitted answer is false', () => {
      beforeEach(() => {
        req.body = {
          [FIELD_IDS.VALID_COMPANY_BASE]: 'false',
        };
      });

      it(`should redirect to ${ROUTES.CANNOT_OBTAIN_COVER}`, async () => {
        await controller.post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.CANNOT_OBTAIN_COVER);
      });

      it('should add previousRoute and exitReason to req.flash', async () => {
        await controller.post(req, res);

        expect(req.flash).toHaveBeenCalledWith('previousRoute', ROUTES.BUYVALID_COMPANY_BASEER_BASED);

        const expectedReason = CONTENT_STRINGS.PAGES.CANNOT_OBTAIN_COVER_PAGE.REASON.UNSUPPORTED_COMPANY_COUNTRY;
        expect(req.flash).toHaveBeenCalledWith('exitReason', expectedReason);
      });
    });

    describe('when there are no validation errors', () => {
      const validBody = {
        [FIELD_IDS.VALID_COMPANY_BASE]: 'true',
      };

      beforeEach(() => {
        req.body = validBody;
      });

      it('should update the session with submitted data', () => {
        controller.post(req, res);

        const expected = updateSubmittedData(
          req.body,
          req.session.submittedData,
        );

        expect(req.session.submittedData).toEqual(expected);
      });

      it(`should redirect to ${ROUTES.TRIED_TO_OBTAIN_COVER}`, () => {
        controller.post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.TRIED_TO_OBTAIN_COVER);
      });

      describe('when the url\'s last substring is `change`', () => {
        it(`should redirect to ${ROUTES.CHECK_YOUR_ANSWERS}`, () => {
          req.originalUrl = 'mock/change';

          controller.post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(ROUTES.CHECK_YOUR_ANSWERS);
        });
      });
    });
  });
});
