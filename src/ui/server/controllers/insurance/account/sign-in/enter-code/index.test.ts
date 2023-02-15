import { PAGE_VARIABLES, TEMPLATE, PAGE_CONTENT_STRINGS, get, post } from '.';
import { PAGES } from '../../../../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../../constants';
import { ACCOUNT_FIELDS as FIELDS } from '../../../../../content-strings/fields/insurance/account';
import insuranceCorePageVariables from '../../../../../helpers/page-variables/core/insurance';
import { Request, Response } from '../../../../../../types';
import { mockReq, mockRes } from '../../../../../test-mocks';

const {
  ACCOUNT: { SECURITY_CODE },
} = FIELD_IDS.INSURANCE;

const {
  INSURANCE: { DASHBOARD },
} = ROUTES;

describe('controllers/insurance/account/sign-in/enter-code', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  describe('PAGE_VARIABLES', () => {
    it('should have correct properties', () => {
      const expected = {
        FIELDS: {
          SECURITY_CODE: {
            ID: SECURITY_CODE,
            ...FIELDS[SECURITY_CODE],
          },
        },
      };

      expect(PAGE_VARIABLES).toEqual(expected);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.ACCOUNT.SIGN_IN.ENTER_CODE);
    });
  });

  describe('PAGE_CONTENT_STRINGS', () => {
    it('should have the correct strings', () => {
      expect(PAGE_CONTENT_STRINGS).toEqual(PAGES.INSURANCE.ACCOUNT.SIGN_IN.ENTER_CODE);
    });
  });

  describe('get', () => {
    it('should render template', () => {
      get(req, res);

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS,
          BACK_LINK: req.headers.referer,
        }),
        ...PAGE_VARIABLES,
      });
    });
  });

  describe('post', () => {
    it(`should redirect to ${DASHBOARD}`, () => {
      post(req, res);

      expect(res.redirect).toHaveBeenCalledWith(DASHBOARD);
    });
  });
});
