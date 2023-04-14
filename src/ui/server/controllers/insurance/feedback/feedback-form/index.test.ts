import { TEMPLATE, pageVariables, MAXIMUM, get, post } from '.';
import { PAGES, FIELDS } from '../../../../content-strings';
import { TEMPLATES, ROUTES, FIELD_IDS } from '../../../../constants';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import { mockReq, mockRes } from '../../../../test-mocks';
import { Request, Response } from '../../../../../types';
import api from '../../../../api';
import generateValidationErrors from './validation';

const { SATISFACTION, IMPROVEMENT, OTHER_COMMENTS, VERY_SATISFIED, SATISFIED, NEITHER, DISSATISFIED, VERY_DISSATISIFED } = FIELD_IDS.FEEDBACK;

const { FEEDBACK_PAGE } = PAGES;
const { FEEDBACK: FEEDBACK_TEMPLATE } = TEMPLATES.INSURANCE;

const { FEEDBACK_SENT } = ROUTES.INSURANCE;

describe('controllers/insurance/feedback/feedback-confirmation', () => {
  let req: Request;
  let res: Response;

  const mockFlash = jest.fn();

  beforeEach(() => {
    req = mockReq();
    req.flash = mockFlash;

    res = mockRes();
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
            VALUE_ID: { VERY_SATISFIED, SATISFIED, NEITHER, DISSATISFIED, VERY_DISSATISIFED },
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
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
    });

    it('should add feedbackFrom to req.flash', async () => {
      get(req, res);

      expect(req.flash).toHaveBeenCalledWith('feedbackFrom', req.headers.referer);
    });
  });

  describe('post', () => {
    api.keystone.feedbackEmails.insurance = jest.fn(() => Promise.resolve({ success: true }));

    describe('when there are no validation errors', () => {
      describe('when the form body contains data', () => {
        const body = {
          [SATISFACTION]: '',
          [IMPROVEMENT]: 'test',
          [OTHER_COMMENTS]: '',
        };

        it('should redirect to next page', async () => {
          req.body = body;

          await post(req, res);

          const expected = FEEDBACK_SENT;
          expect(res.redirect).toHaveBeenCalledWith(expected);
        });

        it('should call api.keystone.feedbackEmails.insurance once with relevant fields', async () => {
          req.body = body;

          await post(req, res);

          const emailVariables = {
            [SATISFACTION]: '',
            [IMPROVEMENT]: body[IMPROVEMENT],
            otherComments: '',
          };

          expect(api.keystone.feedbackEmails.insurance).toHaveBeenCalledTimes(1);

          expect(api.keystone.feedbackEmails.insurance).toHaveBeenCalledWith(emailVariables);
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

        it('should not call api.keystone.feedbackEmails.insurance', async () => {
          req.body = body;

          await post(req, res);

          expect(api.keystone.feedbackEmails.insurance).toHaveBeenCalledTimes(0);
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

        await post(req, res);

        const validationErrors = generateValidationErrors(req.body);

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS: FEEDBACK_PAGE,
            BACK_LINK: req.headers.referer,
          }),
          ...pageVariables(),
          validationErrors,
          submittedValues: body,
        });
      });
    });
  });
});
