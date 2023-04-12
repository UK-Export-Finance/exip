import { TEMPLATE, get, post } from '.';
import { PAGES } from '../../../../content-strings';
import { TEMPLATES, ROUTES } from '../../../../constants';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import { mockReq, mockRes } from '../../../../test-mocks';
import { Request, Response } from '../../../../../types';

const { FEEDBACK_CONFIRMATION_PAGE } = PAGES;
const { FEEDBACK_CONFIRMATION: FEEDBACK_TEMPLATE } = TEMPLATES.INSURANCE;

const startRoute = ROUTES.INSURANCE.START;

describe('controllers/insurance/feedback/feedback-confirmation', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();
    req.flash = (property: string) => {
      const obj = {
        feedbackFrom: startRoute,
      };

      return obj[property];
    };

    res = mockRes();
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(FEEDBACK_TEMPLATE);
    });
  });

  describe('get', () => {
    it('should render template', () => {
      get(req, res);

      const expectedVariables = {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: FEEDBACK_CONFIRMATION_PAGE,
          BACK_LINK: req.headers.referer,
        }),
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
    });
  });

  describe('post', () => {
    it('should redirect to route from "req.flash"', async () => {
      await post(req, res);

      expect(res.redirect).toHaveBeenCalledWith(startRoute);
    });
  });
});
