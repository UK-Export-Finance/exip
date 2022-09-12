import { PAGE_VARIABLES, get, post } from '.';
import { BUTTONS, FIELDS, FOOTER, PAGES, PRODUCT } from '../../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../constants';
import generateValidationErrors from './validation';
import { updateSubmittedData } from '../../../helpers/update-submitted-data';
import { mockReq, mockRes, mockAnswers } from '../../../test-mocks';
import { Request, Response } from '../../../../types';

describe('controllers/policy-type', () => {
  let req: Request;
  let res: Response;

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
          PRODUCT,
          FOOTER,
          BUTTONS,
          ...PAGES.POLICY_TYPE_PAGE,
        },
        FIELDS: {
          MULTI_POLICY_TYPE: {
            ID: FIELD_IDS.MULTI_POLICY_TYPE,
            ...FIELDS[FIELD_IDS.POLICY_TYPE],
          },
          POLICY_LENGTH: {
            ID: FIELD_IDS.POLICY_LENGTH,
            ...FIELDS[FIELD_IDS.POLICY_LENGTH],
          },
          POLICY_TYPE: {
            ID: FIELD_IDS.POLICY_TYPE,
            ...FIELDS[FIELD_IDS.POLICY_TYPE],
          },
          SINGLE_POLICY_TYPE: {
            ID: FIELD_IDS.SINGLE_POLICY_TYPE,
            ...FIELDS[FIELD_IDS.POLICY_TYPE],
          },
          SINGLE_POLICY_LENGTH: {
            ID: FIELD_IDS.SINGLE_POLICY_LENGTH,
            ...FIELDS[FIELD_IDS.SINGLE_POLICY_LENGTH],
          },
        },
      };

      expect(PAGE_VARIABLES).toEqual(expected);
    });
  });

  describe('get', () => {
    it('should render template', () => {
      get(req, res);

      expect(res.render).toHaveBeenCalledWith(TEMPLATES.QUOTE.POLICY_TYPE, {
        ...PAGE_VARIABLES,
        BACK_LINK: req.headers.referer,
        submittedValues: req.session.submittedData,
      });
    });
  });

  describe('post', () => {
    describe('when there are validation errors', () => {
      it('should render template with validation errors and submitted values', () => {
        post(req, res);

        expect(res.render).toHaveBeenCalledWith(TEMPLATES.QUOTE.POLICY_TYPE, {
          ...PAGE_VARIABLES,
          BACK_LINK: req.headers.referer,
          validationErrors: generateValidationErrors(req.body),
          submittedValues: req.body,
        });
      });

      describe('when a currency code has been submitted', () => {
        it('should render template with mapped submitted currency', () => {
          req.body[FIELD_IDS.CURRENCY] = mockAnswers[FIELD_IDS.CURRENCY];
          post(req, res);

          expect(res.render).toHaveBeenCalledWith(TEMPLATES.QUOTE.POLICY_TYPE, {
            ...PAGE_VARIABLES,
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
        post(req, res);

        const expected = updateSubmittedData(req.body, req.session.submittedData);

        expect(req.session.submittedData).toEqual(expected);
      });

      it(`should redirect to ${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY}`, () => {
        post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY);
      });
    });
  });
});
