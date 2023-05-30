import { PAGE_VARIABLES, TEMPLATE, get, post } from '.';
import { FIELDS, PAGES } from '../../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../constants';
import corePageVariables from '../../../helpers/page-variables/core/quote';
import getUserNameFromSession from '../../../helpers/get-user-name-from-session';
import generateValidationErrors from './validation';
import { updateSubmittedData } from '../../../helpers/update-submitted-data/quote';
import { mockReq, mockRes, mockAnswers } from '../../../test-mocks';
import { Request, Response } from '../../../../types';

const {
  ELIGIBILITY: { CURRENCY },
} = FIELD_IDS;

describe('controllers/quote/policy-type', () => {
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
        FIELDS: {
          MULTIPLE_POLICY_TYPE: {
            ID: FIELD_IDS.MULTIPLE_POLICY_TYPE,
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

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.QUOTE.POLICY_TYPE);
    });
  });

  describe('get', () => {
    it('should render template', () => {
      get(req, res);

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
        ...corePageVariables({ PAGE_CONTENT_STRINGS: PAGES.QUOTE.POLICY_TYPE, BACK_LINK: req.headers.referer }),
        userName: getUserNameFromSession(req.session.user),
        ...PAGE_VARIABLES,
        submittedValues: req.session.submittedData.quoteEligibility,
      });
    });
  });

  describe('post', () => {
    describe('when there are validation errors', () => {
      it('should render template with validation errors and submitted values', () => {
        post(req, res);

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
          ...corePageVariables({ PAGE_CONTENT_STRINGS: PAGES.QUOTE.POLICY_TYPE, BACK_LINK: req.headers.referer }),
          userName: getUserNameFromSession(req.session.user),
          ...PAGE_VARIABLES,
          validationErrors: generateValidationErrors(req.body),
          submittedValues: req.body,
        });
      });

      describe('when a currency code has been submitted', () => {
        it('should render template with mapped submitted currency', () => {
          req.body[CURRENCY] = mockAnswers[CURRENCY];
          post(req, res);

          expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
            ...corePageVariables({ PAGE_CONTENT_STRINGS: PAGES.QUOTE.POLICY_TYPE, BACK_LINK: req.headers.referer }),
            userName: getUserNameFromSession(req.session.user),
            ...PAGE_VARIABLES,
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

        const expected = updateSubmittedData(req.body, req.session.submittedData.quoteEligibility);

        expect(req.session.submittedData.quoteEligibility).toEqual(expected);
      });

      it(`should redirect to ${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY}`, () => {
        post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY);
      });
    });
  });
});
