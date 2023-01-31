import { PAGE_VARIABLES, TEMPLATE, get, post } from '.';
import { PAGES, ERROR_MESSAGES } from '../../../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../constants';
import singleInputPageVariables from '../../../../helpers/page-variables/single-input/insurance';
import generateValidationErrors from '../../../../shared-validation/yes-no-radios-form';
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes } from '../../../../test-mocks';

const {
  ACCOUNT: { CREATE, SIGN_IN },
} = ROUTES.INSURANCE;

describe('controllers/insurance/eligibility/already-have-account', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  describe('PAGE_VARIABLES', () => {
    it('should have correct properties', () => {
      const expected = {
        FIELD_ID: FIELD_IDS.INSURANCE.ELIGIBILITY.ALREADY_HAVE_ACCOUNT,
        PAGE_CONTENT_STRINGS: PAGES.INSURANCE.ELIGIBILITY.ALREADY_HAVE_ACCOUNT,
      };

      expect(PAGE_VARIABLES).toEqual(expected);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.ELIGIBILITY.ALREADY_HAVE_ACCOUNT);
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
      it('should render template with validation errors', () => {
        post(req, res);

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
          ...singleInputPageVariables({ ...PAGE_VARIABLES, BACK_LINK: req.headers.referer }),
          validationErrors: generateValidationErrors(req.body, PAGE_VARIABLES.FIELD_ID, ERROR_MESSAGES.INSURANCE.ELIGIBILITY[PAGE_VARIABLES.FIELD_ID].IS_EMPTY),
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
