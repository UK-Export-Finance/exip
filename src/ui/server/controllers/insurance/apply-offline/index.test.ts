import { TEMPLATE, get } from '.';
import { PAGES, LINKS } from '../../../content-strings';
import { TEMPLATES } from '../../../constants';
import insuranceCorePageVariables from '../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../helpers/get-user-name-from-session';
import { mockReq, mockRes } from '../../../test-mocks';
import { Request, Response } from '../../../../types';

const { NO_COMPANIES_HOUSE_NUMBER } = PAGES.INSURANCE.APPLY_OFFLINE.REASON;

describe('controllers/insurance/apply-offline', () => {
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
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.APPLY_OFFLINE);
    });
  });

  describe('get', () => {
    it('should render template', () => {
      get(req, res);

      const expectedVariables = {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: PAGES.INSURANCE.APPLY_OFFLINE,
          BACK_LINK: req.headers.referer,
        }),
        userName: getUserNameFromSession(req.session.user),
        EXIT_REASON: mockExitReason,
        DOWNLOAD_FORM_LINK: LINKS.EXTERNAL.NBI_FORM,
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
    });

    describe(`when req.flash('exitReason') includes ${NO_COMPANIES_HOUSE_NUMBER}`, () => {
      it('should render template with link to proposal form', () => {
        req.flash = (property: string) => {
          const obj = {
            exitReason: NO_COMPANIES_HOUSE_NUMBER,
          };

          return obj[property];
        };

        get(req, res);

        const expectedVariables = {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS: PAGES.INSURANCE.APPLY_OFFLINE,
            BACK_LINK: req.headers.referer,
          }),
          userName: getUserNameFromSession(req.session.user),
          EXIT_REASON: NO_COMPANIES_HOUSE_NUMBER,
          DOWNLOAD_FORM_LINK: LINKS.EXTERNAL.PROPOSAL_FORM,
        };

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
      });
    });
  });
});
