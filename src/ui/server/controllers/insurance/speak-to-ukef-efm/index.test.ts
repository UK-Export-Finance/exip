import { TEMPLATE, get } from '.';
import { PAGES } from '../../../content-strings';
import { TEMPLATES } from '../../../constants';
import corePageVariables from '../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../helpers/get-user-name-from-session';
import { Request, Response } from '../../../../types';
import { mockReq, mockRes } from '../../../test-mocks';

describe('controllers/insurance/speak-to-ukef-efm', () => {
  let req: Request;
  let res: Response;
  const mockExitReason = 'mock';

  beforeEach(() => {
    req = mockReq();
    req.flash = (property: string) => {
      const obj = {
        exitReason: mockExitReason,
      };

      return obj[property];
    };

    res = mockRes();
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.SPEAK_TO_UKEF_EFM);
    });
  });

  describe('get', () => {
    it('should render template', () => {
      get(req, res);

      const expectedVariables = {
        ...corePageVariables({
          PAGE_CONTENT_STRINGS: PAGES.INSURANCE.SPEAK_TO_UKEF_EFM,
          BACK_LINK: req.headers.referer,
        }),
        userName: getUserNameFromSession(req.session.user),
        EXIT_REASON: mockExitReason,
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATES.INSURANCE.SPEAK_TO_UKEF_EFM, expectedVariables);
    });
  });
});
