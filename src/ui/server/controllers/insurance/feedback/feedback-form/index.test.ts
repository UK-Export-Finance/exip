import { FIELD_IDS, TEMPLATE, pageVariables, MAXIMUM, get, post } from '.';
import { PAGES, FIELDS } from '../../../../content-strings';
import { TEMPLATES, ROUTES, INSURANCE, SERVICE_NAME } from '../../../../constants';
import { FEEDBACK_FIELD_IDS } from '../../../../constants/field-ids/feedback';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import constructPayload from '../../../../helpers/construct-payload';
import api from '../../../../api';
import generateValidationErrors from './validation';
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes, mockInsuranceFeedback } from '../../../../test-mocks';

const { SATISFACTION, IMPROVEMENT, OTHER_COMMENTS, VERY_SATISFIED, SATISFIED, NEITHER, DISSATISFIED, VERY_DISSATISIFED } = FEEDBACK_FIELD_IDS;

const { REFERRAL_URL, SERVICE, PRODUCT } = FEEDBACK_FIELD_IDS;

const { FEEDBACK_PAGE } = PAGES;
const { FEEDBACK: FEEDBACK_TEMPLATE } = TEMPLATES.INSURANCE;

const { FEEDBACK_SENT, PROBLEM_WITH_SERVICE } = ROUTES.INSURANCE;

describe('controllers/insurance/feedback/feedback-confirmation', () => {
  let req: Request;
  let res: Response;

  const mockFlash = jest.fn();

  beforeEach(() => {
    req = mockReq();
    req.flash = mockFlash;

    res = mockRes();
  });

  describe('FIELD_IDS', () => {
    it('should have the correct FIELD_IDS', () => {
      const expected = [SATISFACTION, IMPROVEMENT, OTHER_COMMENTS];

      expect(FIELD_IDS).toEqual(expected);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(FEEDBACK_TEMPLATE);
    });
  });

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const result = pageVariables();

      const expected = {
        FIELDS: {
          SATISFACTION: {
            ID: SATISFACTION,
            OPTIONS: { VERY_SATISFIED, SATISFIED, NEITHER, DISSATISFIED, VERY_DISSATISIFED },
            ...FIELDS[SATISFACTION],
          },
          IMPROVEMENT: {
            ID: IMPROVEMENT,
            ...FIELDS[IMPROVEMENT],
          },
          OTHER_COMMENTS: {
            ID: OTHER_COMMENTS,
            ...FIELDS[OTHER_COMMENTS],
          },
        },
        MAXIMUM,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('get', () => {
    it('should render template', () => {
      get(req, res);

      const expectedVariables = {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: FEEDBACK_PAGE,
          BACK_LINK: req.headers.referer,
        }),
        ...pageVariables(),
        userName: getUserNameFromSession(req.session.user),
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
    });

    it('should add serviceOriginUrl to req.flash', async () => {
      get(req, res);

      expect(req.flash).toHaveBeenCalledWith('serviceOriginUrl', req.headers.referer);
    });
  });

  describe('post', () => {
    beforeEach(() => {
      req.flash = (property: string) => {
        const obj = {
          serviceOriginUrl: req.headers.referer,
        };

        return obj[property];
      };

      api.keystone.feedback.create = jest.fn(() => Promise.resolve({ ...mockInsuranceFeedback, success: true }));
    });

    describe('when there are no validation errors', () => {
      describe('when the form body contains data', () => {
        const body = mockInsuranceFeedback;

        it('should redirect to next page', async () => {
          req.body = body;

          await post(req, res);

          const expected = FEEDBACK_SENT;
          expect(res.redirect).toHaveBeenCalledWith(expected);
        });

        it('should call api.keystone.feedback.create once with data from constructPayload function and additional flags', async () => {
          req.body = body;

          await post(req, res);

          const { _csrf, ...submittedFeedback } = body;

          const payload = constructPayload(submittedFeedback, FIELD_IDS);

          const saveVariables = {
            ...payload,
            [REFERRAL_URL]: req.headers.referer,
            [SERVICE]: INSURANCE,
            [PRODUCT]: SERVICE_NAME,
          };

          expect(api.keystone.feedback.create).toHaveBeenCalledTimes(1);

          expect(api.keystone.feedback.create).toHaveBeenCalledWith(saveVariables);
        });
      });

      describe('when the form body is empty', () => {
        const body = {
          [IMPROVEMENT]: '',
          [OTHER_COMMENTS]: '',
        };

        it('should redirect to next page', async () => {
          req.body = body;

          await post(req, res);

          const expected = FEEDBACK_SENT;
          expect(res.redirect).toHaveBeenCalledWith(expected);
        });

        it('should not call api.keystone.feedback.create', async () => {
          req.body = body;

          await post(req, res);

          expect(api.keystone.feedback.create).toHaveBeenCalledTimes(0);
        });
      });
    });

    describe('when there are validation errors', () => {
      const body = {
        [SATISFACTION]: '',
        [IMPROVEMENT]: 'a'.repeat(MAXIMUM + 1),
        [OTHER_COMMENTS]: '',
      };

      it('should redirect to next page', async () => {
        req.body = body;

        await post(req, res);

        const { _csrf, ...submittedFeedback } = body;

        const payload = constructPayload(submittedFeedback, FIELD_IDS);

        const validationErrors = generateValidationErrors(payload);

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS: FEEDBACK_PAGE,
            BACK_LINK: req.headers.referer,
          }),
          ...pageVariables(),
          validationErrors,
          submittedValues: payload,
          userName: getUserNameFromSession(req.session.user),
        });
      });
    });

    describe('when api.keystone.feedback.create does not return a response', () => {
      beforeEach(() => {
        api.keystone.feedback.create = jest.fn(() => Promise.resolve(null));
      });

      const body = mockInsuranceFeedback;

      it('should redirect to problem with service page', async () => {
        req.body = body;

        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });
  });
});
