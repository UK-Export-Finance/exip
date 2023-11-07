import { FIELD_ID, PAGE_VARIABLES, TEMPLATE, get, post } from '.';
import { ERROR_MESSAGES, FIELDS, PAGES } from '../../../content-strings';
import { FIELD_IDS, FIELD_VALUES, ROUTES, TEMPLATES } from '../../../constants';
import singleInputPageVariables from '../../../helpers/page-variables/single-input';
import constructPayload from '../../../helpers/construct-payload';
import getUserNameFromSession from '../../../helpers/get-user-name-from-session';
import generateValidationErrors from '../../../shared-validation/yes-no-radios-form';
import { Request, Response } from '../../../../types';
import { mockReq, mockRes } from '../../../test-mocks';

const { COOKIES_SAVED, INSURANCE } = ROUTES;

describe('controllers/root/cookies', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  describe('FIELD_ID', () => {
    it('should have the correct ID', () => {
      const expected = FIELD_IDS.OPTIONAL_COOKIES;

      expect(FIELD_ID).toEqual(expected);
    });
  });

  describe('PAGE_VARIABLES', () => {
    it('should have correct properties', () => {
      const expected = {
        FIELD_ID: FIELD_IDS.OPTIONAL_COOKIES,
        PAGE_CONTENT_STRINGS: PAGES.COOKIES_PAGE,
      };

      expect(PAGE_VARIABLES).toEqual(expected);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.COOKIES);
    });
  });

  describe('get', () => {
    it('should add req.headers.referer to req.session.returnToServiceUrl', () => {
      get(req, res);

      expect(req.session.returnToServiceUrl).toEqual(req.headers.referer);
    });

    it('should render template', () => {
      get(req, res);

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
        userName: getUserNameFromSession(req.session.user),
        ...singleInputPageVariables({ ...PAGE_VARIABLES, BACK_LINK: req.headers.referer, ORIGINAL_URL: req.originalUrl }),
        FIELD: FIELDS[FIELD_IDS.OPTIONAL_COOKIES],
        submittedValue: req.cookies.optionalCookies,
      });
    });
  });

  describe('post', () => {
    describe('when there are validation errors', () => {
      it('should render template with validation errors and submittedValue from constructPayload function', () => {
        post(req, res);

        const payload = constructPayload(req.body, [FIELD_ID]);

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
          userName: getUserNameFromSession(req.session.user),
          ...singleInputPageVariables({ ...PAGE_VARIABLES, BACK_LINK: req.headers.referer, ORIGINAL_URL: req.originalUrl }),
          FIELD: FIELDS[FIELD_IDS.OPTIONAL_COOKIES],
          validationErrors: generateValidationErrors(payload, PAGE_VARIABLES.FIELD_ID, ERROR_MESSAGES[PAGE_VARIABLES.FIELD_ID]),
        });
      });
    });

    describe('when there are no validation errors', () => {
      beforeEach(() => {
        req.body[FIELD_IDS.OPTIONAL_COOKIES] = FIELD_VALUES.OPTIONAL_COOKIES.ACCEPT;
        req.cookies.optionalCookies = 'true';
      });

      it(`should redirect to ${COOKIES_SAVED}`, () => {
        post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(COOKIES_SAVED);
      });

      describe('when req.originalUrl is an insurance route', () => {
        it(`should redirect to ${INSURANCE.COOKIES_SAVED}`, () => {
          req.originalUrl = INSURANCE.CONTACT_US;

          post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(INSURANCE.COOKIES_SAVED);
        });
      });
    });
  });
});
