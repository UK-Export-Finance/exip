import { PAGE_VARIABLES, TEMPLATE, PAGE_CONTENT_STRINGS, get, post } from '.';
import { PAGES } from '../../../../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../../constants';
import { ACCOUNT_FIELDS as FIELDS } from '../../../../../content-strings/fields/insurance/account';
import insuranceCorePageVariables from '../../../../../helpers/page-variables/core/insurance';
import generateValidationErrors from './validation';
import { Request, Response } from '../../../../../../types';
import { mockReq, mockRes, mockAccount } from '../../../../../test-mocks';

const {
  ACCOUNT: { PASSWORD: FIELD_ID },
} = FIELD_IDS.INSURANCE;

const {
  INSURANCE: {
    ACCOUNT: {
      PASSWORD_RESET: { SUCCESS },
    },
  },
} = ROUTES;

describe('controllers/insurance/account/password-reset/new-password', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  describe('get', () => {
    describe('PAGE_VARIABLES', () => {
      it('should have correct properties', () => {
        const expected = {
          FIELD: {
            ID: FIELD_ID,
            ...FIELDS.NEW_PASSWORD[FIELD_ID],
          },
        };

        expect(PAGE_VARIABLES).toEqual(expected);
      });
    });

    describe('TEMPLATE', () => {
      it('should have the correct template defined', () => {
        expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.ACCOUNT.PASSWORD_RESET.NEW_PASSWORD);
      });
    });

    describe('PAGE_CONTENT_STRINGS', () => {
      it('should have the correct strings', () => {
        expect(PAGE_CONTENT_STRINGS).toEqual(PAGES.INSURANCE.ACCOUNT.PASSWORD_RESET.NEW_PASSWORD);
      });
    });

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
    const validBody = {
      [FIELD_ID]: mockAccount.password,
    };

    describe('when there are validation errors', () => {
      it('should render template with validation errors and submitted values', async () => {
        await post(req, res);

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS,
            BACK_LINK: req.headers.referer,
          }),
          ...PAGE_VARIABLES,
          submittedValues: req.body,
          validationErrors: generateValidationErrors(req.body),
        });
      });
    });

    describe('when there are NO validation errors', () => {
      beforeEach(() => {
        req.body = validBody;
      });

      it(`should redirect to ${SUCCESS}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(SUCCESS);
      });
    });
  });
});
