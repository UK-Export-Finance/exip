const controller = require('.');
const CONTENT_STRINGS = require('../../content-strings');
const {
  FIELD_IDS,
  ROUTES,
  TEMPLATES,
} = require('../../constants');
const generateValidationErrors = require('./validation');
const { updateSubmittedData } = require('../../helpers/update-submitted-data');
const { mockReq, mockRes } = require('../../test-mocks');

describe('controllers/can-get-private-insurance', () => {
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
          BUTTONS: CONTENT_STRINGS.BUTTONS,
          LINKS: CONTENT_STRINGS.LINKS,
          ...CONTENT_STRINGS.PAGES.CAN_GET_PRIVATE_INSURANCE_PAGE,
        },
        FIELDS: {
          CAN_GET_PRIVATE_INSURANCE: {
            ID: FIELD_IDS.CAN_GET_PRIVATE_INSURANCE,
            ...CONTENT_STRINGS.FIELDS[FIELD_IDS.CAN_GET_PRIVATE_INSURANCE],
          },
          CAN_GET_PRIVATE_INSURANCE_YES: {
            ID: FIELD_IDS.CAN_GET_PRIVATE_INSURANCE_YES,
            ...CONTENT_STRINGS.FIELDS[FIELD_IDS.CAN_GET_PRIVATE_INSURANCE_YES],
          },
        },
      };

      expect(controller.PAGE_VARIABLES).toEqual(expected);
    });
  });

  describe('get', () => {
    it('should render template', () => {
      controller.get(req, res);

      expect(res.render).toHaveBeenCalledWith(TEMPLATES.CAN_GET_PRIVATE_INSURANCE, {
        ...controller.PAGE_VARIABLES,
        BACK_LINK: req.headers.referer,
        submittedValues: req.session.submittedData,
      });
    });
  });

  describe('post', () => {
    describe('when there are validation errors', () => {
      it('should render template with validation errors', () => {
        controller.post(req, res);

        expect(res.render).toHaveBeenCalledWith(TEMPLATES.CAN_GET_PRIVATE_INSURANCE, {
          ...controller.PAGE_VARIABLES,
          BACK_LINK: req.headers.referer,
          validationErrors: generateValidationErrors(req.body),
        });
      });
    });

    describe('when the submitted answer is `yes`/true', () => {
      beforeEach(() => {
        req.body[FIELD_IDS.CAN_GET_PRIVATE_INSURANCE] = 'true';
      });

      it(`should redirect to ${ROUTES.CANNOT_OBTAIN_COVER}`, () => {
        controller.post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.CANNOT_OBTAIN_COVER);
      });

      it('should add previousRoute and exitReason to req.flash', () => {
        controller.post(req, res);

        expect(req.flash).toHaveBeenCalledWith('previousRoute', ROUTES.CAN_GET_PRIVATE_INSURANCE);

        const expectedReason = CONTENT_STRINGS.PAGES.CANNOT_OBTAIN_COVER_PAGE.REASON.CAN_GET_PRIVATE_INSURANCE;
        expect(req.flash).toHaveBeenCalledWith('exitReason', expectedReason);
      });
    });

    describe('when there are no validation errors', () => {
      const validBody = {
        [FIELD_IDS.CAN_GET_PRIVATE_INSURANCE]: 'false',
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

      it(`should redirect to ${ROUTES.UK_GOODS_OR_SERVICES}`, () => {
        controller.post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.UK_GOODS_OR_SERVICES);
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
