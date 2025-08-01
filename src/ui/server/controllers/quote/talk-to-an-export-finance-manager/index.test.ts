import { TEMPLATE, get } from '.';
import { PAGES } from '../../../content-strings';
import { TEMPLATES } from '../../../constants';
import corePageVariables from '../../../helpers/page-variables/core/quote';
import getUserNameFromSession from '../../../helpers/get-user-name-from-session';
import { ObjectType, Request, Response } from '../../../../types';
import { mockReq, mockRes } from '../../../test-mocks';

describe('controllers/quote/talk-to-an-export-finance-manager', () => {
  let req: Request;
  let res: Response;
  const mockExitReason = 'mock';

  beforeEach(() => {
    req = mockReq();
    req.flash = (property: string) => {
      const obj = {
        exitReason: mockExitReason,
      } as ObjectType;

      return obj[property];
    };

    res = mockRes();
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      // Assert
      expect(TEMPLATE).toEqual(TEMPLATES.TALK_TO_AN_EXPORT_FINANCE_MANAGER_EXIT);
    });
  });

  describe('get', () => {
    it('should render template', () => {
      // Act
      get(req, res);

      // Assert
      expect(res.render).toHaveBeenCalledWith(TEMPLATES.TALK_TO_AN_EXPORT_FINANCE_MANAGER_EXIT, {
        ...corePageVariables({
          PAGE_CONTENT_STRINGS: PAGES.TALK_TO_AN_EXPORT_FINANCE_MANAGER_EXIT,
          BACK_LINK: req.headers.referer,
          ORIGINAL_URL: req.originalUrl,
        }),
        userName: getUserNameFromSession(req.session.user),
        EXIT_REASON: mockExitReason,
      });
    });
  });
});
