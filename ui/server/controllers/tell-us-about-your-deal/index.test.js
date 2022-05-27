const controller = require('.');
const CONTENT_STRINGS = require('../../content-strings');
const { FIELDS, ROUTES, TEMPLATES } = require('../../constants');
const generateValidationErrors = require('./validation');
const updateSubmittedData = require('../../helpers/update-submitted-data');
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
        CONTENT_STRINGS: {
          PRODUCT: CONTENT_STRINGS.PRODUCT,
          FOOTER: CONTENT_STRINGS.FOOTER,
          BUTTONS: CONTENT_STRINGS.BUTTONS,
          ...CONTENT_STRINGS.TELL_US_ABOUT_YOUR_DEAL_PAGE,
        },
        BACK_LINK: ROUTES.UK_CONTENT_PERCENTAGE,
        FIELDS: {
          CREDIT_LIMIT_GROUP: {
            ID: FIELDS.CREDIT_LIMIT_GROUP,
            ...CONTENT_STRINGS.FIELDS[FIELDS.CREDIT_LIMIT_GROUP],
          },
          CREDIT_LIMIT_CURRENCY: {
            ID: FIELDS.CREDIT_LIMIT_CURRENCY,
            ...CONTENT_STRINGS.FIELDS[FIELDS.CREDIT_LIMIT_CURRENCY],
          },
          CREDIT_LIMIT: {
            ID: FIELDS.CREDIT_LIMIT,
            ...CONTENT_STRINGS.FIELDS[FIELDS.CREDIT_LIMIT],
          },
          PRE_CREDIT_PERIOD: {
            ID: FIELDS.PRE_CREDIT_PERIOD,
            ...CONTENT_STRINGS.FIELDS[FIELDS.PRE_CREDIT_PERIOD],
          },
          CREDIT_PERIOD: {
            ID: FIELDS.CREDIT_PERIOD,
            ...CONTENT_STRINGS.FIELDS[FIELDS.CREDIT_PERIOD],
          },
          POLICY_LENGTH: {
            ID: FIELDS.POLICY_LENGTH,
            ...CONTENT_STRINGS.FIELDS[FIELDS.POLICY_LENGTH],
          },
          POLICY_TYPE: {
            ID: FIELDS.POLICY_TYPE,
            ...CONTENT_STRINGS.FIELDS[FIELDS.POLICY_TYPE],
          },
        },
      };

      expect(controller.PAGE_VARIABLES).toEqual(expected);
    });
  });

  describe('get', () => {
    it('should render template', () => {
      controller.get(req, res);

      expect(res.render).toHaveBeenCalledWith(TEMPLATES.TELL_US_ABOUT_YOUR_DEAL, controller.PAGE_VARIABLES);
    });
  });

  describe('post', () => {
    describe('when there are validation errors', () => {
      it('should render template with validation errors and submitted values', () => {
        controller.post(req, res);

        expect(res.render).toHaveBeenCalledWith(TEMPLATES.TELL_US_ABOUT_YOUR_DEAL, {
          ...controller.PAGE_VARIABLES,
          validationErrors: generateValidationErrors(req.body),
          submittedValues: req.body,
        });
      });
    });

    describe('when there are no validation errors', () => {
      const validBody = {
        [FIELDS.CREDIT_LIMIT_CURRENCY]: 'GBP',
        [FIELDS.CREDIT_LIMIT]: '10',
        [FIELDS.PRE_CREDIT_PERIOD]: '20',
        [FIELDS.CREDIT_PERIOD]: '30',
        [FIELDS.POLICY_LENGTH]: '40',
        [FIELDS.POLICY_TYPE]: 'mock',
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

      it(`should redirect to ${ROUTES.CHECK_YOUR_ANSWERS}`, () => {
        controller.post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.CHECK_YOUR_ANSWERS);
      });
    });
  });
});
