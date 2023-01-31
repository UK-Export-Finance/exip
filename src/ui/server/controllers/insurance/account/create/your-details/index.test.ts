import { PAGE_VARIABLES, TEMPLATE, get, post } from '.';
import { PAGES } from '../../../../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../../constants';
import { ACCOUNT_FIELDS as FIELDS } from '../../../../../content-strings/fields/insurance/account';
import insuranceCorePageVariables from '../../../../../helpers/page-variables/core/insurance';
import generateValidationErrors from './validation';
import { Request, Response } from '../../../../../../types';
import { mockReq, mockRes } from '../../../../../test-mocks';

const {
  ACCOUNT: { FIRST_NAME, LAST_NAME, EMAIL, PASSWORD },
} = FIELD_IDS.INSURANCE;

const {
  INSURANCE: {
    ACCOUNT: {
      CREATE: { CONFIRM_EMAIL },
      SIGN_IN,
    },
  },
} = ROUTES;

describe('controllers/insurance/account/create/your-details', () => {
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
          FIRST_NAME: {
            ID: FIRST_NAME,
            ...FIELDS.CREATE.YOUR_DETAILS[FIRST_NAME],
          },
          LAST_NAME: {
            ID: LAST_NAME,
            ...FIELDS.CREATE.YOUR_DETAILS[LAST_NAME],
          },
          EMAIL: {
            ID: EMAIL,
            ...FIELDS.CREATE.YOUR_DETAILS[EMAIL],
          },
          PASSWORD: {
            ID: PASSWORD,
            ...FIELDS.CREATE.YOUR_DETAILS[PASSWORD],
          },
        },
        PAGE_CONTENT_STRINGS: PAGES.INSURANCE.ACCOUNT.CREATE.YOUR_DETAILS,
        SIGN_IN_LINK: SIGN_IN.ROOT,
      };

      expect(PAGE_VARIABLES).toEqual(expected);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.ACCOUNT.CREATE.YOUR_DETAILS);
    });
  });

  describe('get', () => {
    it('should render template', () => {
      get(req, res);

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
        ...insuranceCorePageVariables({ ...PAGE_VARIABLES, BACK_LINK: req.headers.referer }),
        ...PAGE_VARIABLES,
      });
    });
  });

  describe('post', () => {
    describe('when there are validation errors', () => {
      it('should render template with validation errors and submitted values', () => {
        post(req, res);

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
          ...insuranceCorePageVariables({ ...PAGE_VARIABLES, BACK_LINK: req.headers.referer }),
          ...PAGE_VARIABLES,
          submittedValues: req.body,
          validationErrors: generateValidationErrors(req.body),
        });
      });
    });

    describe('when there are no validation errors', () => {
      beforeEach(() => {
        req.body = { [FIRST_NAME]: 'First' };
      });

      it(`should redirect to ${CONFIRM_EMAIL}`, () => {
        post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(CONFIRM_EMAIL);
      });
    });
  });
});
