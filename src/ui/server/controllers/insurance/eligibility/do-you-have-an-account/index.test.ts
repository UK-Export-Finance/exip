import { FIELD_ID, PAGE_VARIABLES, TEMPLATE, get, post } from '.';
import { PAGES, ERROR_MESSAGES } from '../../../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../constants';
import singleInputPageVariables from '../../../../helpers/page-variables/single-input/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import constructPayload from '../../../../helpers/construct-payload';
import generateValidationErrors from '../../../../shared-validation/yes-no-radios-form';
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes } from '../../../../test-mocks';

const {
  ACCOUNT: { CREATE, SIGN_IN },
} = ROUTES.INSURANCE;

describe('controllers/insurance/eligibility/do-you-have-an-account', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  describe('FIELD_ID', () => {
    it('should have the correct ID', () => {
      const expected = FIELD_IDS.INSURANCE.ELIGIBILITY.HAVE_AN_ACCOUNT;

      expect(FIELD_ID).toEqual(expected);
    });
  });

  describe('PAGE_VARIABLES', () => {
    it('should have correct properties', () => {
      const expected = {
        FIELD_ID: FIELD_IDS.INSURANCE.ELIGIBILITY.HAVE_AN_ACCOUNT,
        PAGE_CONTENT_STRINGS: PAGES.INSURANCE.ELIGIBILITY.HAVE_AN_ACCOUNT,
      };

      expect(PAGE_VARIABLES).toEqual(expected);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.ELIGIBILITY.HAVE_AN_ACCOUNT);
    });
  });

  describe('get', () => {
    it('should render template', () => {
      get(req, res);

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, singleInputPageVariables({ ...PAGE_VARIABLES, BACK_LINK: req.headers.referer }));
    });
  });

  describe('post', () => {
    describe('when there are validation errors', () => {
      it('should render template with validation errors from constructPayload function ', () => {
        post(req, res);

        const payload = constructPayload(req.body, [FIELD_ID]);

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
          ...singleInputPageVariables({ ...PAGE_VARIABLES, BACK_LINK: req.headers.referer }),
          userName: getUserNameFromSession(req.session.user),
          validationErrors: generateValidationErrors(payload, PAGE_VARIABLES.FIELD_ID, ERROR_MESSAGES.INSURANCE.ELIGIBILITY[PAGE_VARIABLES.FIELD_ID].IS_EMPTY),
        });
      });
    });

    describe('when submitted answer is true', () => {
      beforeEach(() => {
        req.body = {
          [PAGE_VARIABLES.FIELD_ID]: 'true',
        };
      });

      it(`should redirect to ${SIGN_IN.ROOT}`, () => {
        post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(SIGN_IN.ROOT);
      });
    });

    describe('when submitted answer is false', () => {
      beforeEach(() => {
        req.body = {
          [PAGE_VARIABLES.FIELD_ID]: 'false',
        };
      });

      it(`should redirect to ${CREATE.YOUR_DETAILS}`, () => {
        post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(CREATE.YOUR_DETAILS);
      });
    });
  });
});
