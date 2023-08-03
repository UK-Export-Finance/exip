import { FIELD_IDS, PAGE_VARIABLES, TEMPLATE, get, post } from '.';
import { FIELDS, PAGES } from '../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../constants';
import SHARED_FIELD_IDS from '../../../constants/field-ids/shared';
import corePageVariables from '../../../helpers/page-variables/core/quote';
import getUserNameFromSession from '../../../helpers/get-user-name-from-session';
import constructPayload from '../../../helpers/construct-payload';
import generateValidationErrors from './validation';
import { updateSubmittedData } from '../../../helpers/update-submitted-data/quote';
import { mockReq, mockRes } from '../../../test-mocks';
import { Request, Response } from '../../../../types';

const { MULTIPLE_POLICY_TYPE, POLICY_LENGTH, POLICY_TYPE, SINGLE_POLICY_LENGTH, SINGLE_POLICY_TYPE } = SHARED_FIELD_IDS;

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

  describe('FIELD_IDS', () => {
    it('should have the correct FIELD_IDS', () => {
      const expected = [POLICY_TYPE, SINGLE_POLICY_LENGTH, MULTIPLE_POLICY_TYPE];

      expect(FIELD_IDS).toEqual(expected);
    });
  });

  describe('PAGE_VARIABLES', () => {
    it('should have correct properties', () => {
      const expected = {
        FIELDS: {
          MULTIPLE_POLICY_TYPE: {
            ID: MULTIPLE_POLICY_TYPE,
            ...FIELDS[POLICY_TYPE],
          },
          POLICY_LENGTH: {
            ID: POLICY_LENGTH,
            ...FIELDS[POLICY_LENGTH],
          },
          POLICY_TYPE: {
            ID: POLICY_TYPE,
            ...FIELDS[POLICY_TYPE],
          },
          SINGLE_POLICY_TYPE: {
            ID: SINGLE_POLICY_TYPE,
            ...FIELDS[POLICY_TYPE],
          },
          SINGLE_POLICY_LENGTH: {
            ID: SINGLE_POLICY_LENGTH,
            ...FIELDS[SINGLE_POLICY_LENGTH],
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
        ...corePageVariables({ PAGE_CONTENT_STRINGS: PAGES.QUOTE.POLICY_TYPE, BACK_LINK: req.headers.referer, ORIGINAL_URL: req.originalUrl }),
        userName: getUserNameFromSession(req.session.user),
        ...PAGE_VARIABLES,
        submittedValues: req.session.submittedData.quoteEligibility,
      });
    });
  });

  describe('post', () => {
    describe('when there are validation errors', () => {
      it('should render template with validation errors and submitted values from constructPayload function', () => {
        post(req, res);

        const payload = constructPayload(req.body, FIELD_IDS);

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
          ...corePageVariables({ PAGE_CONTENT_STRINGS: PAGES.QUOTE.POLICY_TYPE, BACK_LINK: req.headers.referer, ORIGINAL_URL: req.originalUrl }),
          userName: getUserNameFromSession(req.session.user),
          ...PAGE_VARIABLES,
          validationErrors: generateValidationErrors(payload),
          submittedValues: payload,
        });
      });
    });

    describe('when there are no validation errors', () => {
      const validBody = {
        [POLICY_LENGTH]: '40',
        [POLICY_TYPE]: 'mock',
      };

      beforeEach(() => {
        req.body = validBody;
      });

      it('should update the session with submitted data', () => {
        post(req, res);

        const payload = constructPayload(req.body, FIELD_IDS);

        const expected = updateSubmittedData(payload, req.session.submittedData.quoteEligibility);

        expect(req.session.submittedData.quoteEligibility).toEqual(expected);
      });

      it(`should redirect to ${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY}`, () => {
        post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY);
      });
    });
  });
});
