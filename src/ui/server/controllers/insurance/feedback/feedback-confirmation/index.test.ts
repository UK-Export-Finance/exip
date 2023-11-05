import { TEMPLATE, get } from '.';
import { PAGES } from '../../../../content-strings';
import { TEMPLATES, ROUTES } from '../../../../constants';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import { mockReq, mockRes } from '../../../../test-mocks';
import { Request, Response } from '../../../../../types';

const { FEEDBACK_SENT_PAGE } = PAGES;
const { FEEDBACK_SENT: FEEDBACK_TEMPLATE } = TEMPLATES.INSURANCE;

const startRoute = ROUTES.INSURANCE.START;

describe('controllers/insurance/feedback/feedback-confirmation', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();
    req.flash = (property: string) => {
      const obj = {
        serviceOriginUrl: startRoute,
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
          PAGE_CONTENT_STRINGS: FEEDBACK_SENT_PAGE,
          BACK_LINK: req.headers.referer,
        }),
        BACK_TO_SERVICE_URL: startRoute,
        userName: getUserNameFromSession(req.session.user),
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
    });
  });
});
