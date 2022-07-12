const controller = require('.');
const CONTENT_STRINGS = require('../../content-strings');
const { FIELD_IDS, ROUTES, TEMPLATES } = require('../../constants');
const generateValidationErrors = require('./validation');
const { updateSubmittedData } = require('../../helpers/update-submitted-data');
const { mockReq, mockRes, mockAnswers } = require('../../test-mocks');

describe('controllers/policy-type', () => {
  let req;
  let res;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('PAGE_VARIABLES', () => {
    it('should have correct properties', () => {
      const expected = {
        CONTENT_STRINGS: {
          PRODUCT: CONTENT_STRINGS.PRODUCT,
          FOOTER: CONTENT_STRINGS.FOOTER,
          BUTTONS: CONTENT_STRINGS.BUTTONS,
          ...CONTENT_STRINGS.PAGES.POLICY_TYPE_PAGE,
        },
        FIELDS: {
          POLICY_TYPE: {
            ID: FIELD_IDS.POLICY_TYPE,
            ...CONTENT_STRINGS.FIELDS[FIELD_IDS.POLICY_TYPE],
          },
          SINGLE_POLICY_TYPE: {
            ID: FIELD_IDS.SINGLE_POLICY_TYPE,
            ...CONTENT_STRINGS.FIELDS[FIELD_IDS.POLICY_TYPE],
          },
          SINGLE_POLICY_LENGTH: {
            ID: FIELD_IDS.SINGLE_POLICY_LENGTH,
            ...CONTENT_STRINGS.FIELDS[FIELD_IDS.SINGLE_POLICY_LENGTH],
          },
          MULTI_POLICY_LENGTH: {
            ID: FIELD_IDS.MULTI_POLICY_LENGTH,
            ...CONTENT_STRINGS.FIELDS[FIELD_IDS.MULTI_POLICY_LENGTH],
          },
        },
      };

      expect(controller.PAGE_VARIABLES).toEqual(expected);
    });
  });

  describe('get', () => {
    it('should render template', () => {
      controller.get(req, res);

      expect(res.render).toHaveBeenCalledWith(TEMPLATES.POLICY_TYPE, {
        ...controller.PAGE_VARIABLES,
        BACK_LINK: req.headers.referer,
        submittedValues: req.session.submittedData,
      });
    });
  });

  describe('post', () => {
    describe('when there are validation errors', () => {
      it('should render template with validation errors and submitted values', () => {
        controller.post(req, res);

        expect(res.render).toHaveBeenCalledWith(TEMPLATES.POLICY_TYPE, {
          ...controller.PAGE_VARIABLES,
          BACK_LINK: req.headers.referer,
          validationErrors: generateValidationErrors(req.body),
          submittedValues: req.body,
        });
      });

      describe('when a currency code has been submitted', () => {
        it('should render template with mapped submitted currency', () => {
          req.body[FIELD_IDS.CURRENCY] = mockAnswers[FIELD_IDS.CURRENCY];
          controller.post(req, res);

          expect(res.render).toHaveBeenCalledWith(TEMPLATES.POLICY_TYPE, {
            ...controller.PAGE_VARIABLES,
            BACK_LINK: req.headers.referer,
            validationErrors: generateValidationErrors(req.body),
            submittedValues: req.body,
          });
        });
      });
    });

    describe('when there are no validation errors', () => {
      const validBody = {
        [FIELD_IDS.POLICY_LENGTH]: '40',
        [FIELD_IDS.POLICY_TYPE]: 'mock',
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

      it(`should redirect to ${ROUTES.TELL_US_ABOUT_YOUR_POLICY}`, () => {
        controller.post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.TELL_US_ABOUT_YOUR_POLICY);
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
