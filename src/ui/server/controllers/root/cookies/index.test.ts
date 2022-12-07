import { PAGE_VARIABLES, get, post } from '.';
import { ERROR_MESSAGES, FIELDS, PAGES, PRODUCT } from '../../../content-strings';
import { FIELD_IDS, FIELD_VALUES, ROUTES, TEMPLATES } from '../../../constants';
import { mockReq, mockRes } from '../../../test-mocks';
import { Request, Response } from '../../../../types';
import singleInputPageVariables from '../../../helpers/page-variables/single-input';
import generateValidationErrors from '../../../shared-validation/yes-no-radios-form';

const startRoute = ROUTES.QUOTE.START;

describe('controllers/root/cookies', () => {
  let req: Request;
  let res: Response;

  const mockFlash = jest.fn();

  beforeEach(() => {
    req = mockReq();
    req.flash = mockFlash;

    res = mockRes();
  });

  describe('get', () => {
    it('should have correct properties', () => {
      const expected = {
        FIELD_ID: FIELD_IDS.OPTIONAL_COOKIES,
        PAGE_CONTENT_STRINGS: PAGES.COOKIES_PAGE,
        PRODUCT: { DESCRIPTION: PRODUCT.DESCRIPTION.GENERIC },
      };

      expect(PAGE_VARIABLES).toEqual(expected);
    });
  });

  describe('get', () => {
    it('should render template', () => {
      get(req, res);

      expect(res.render).toHaveBeenCalledWith(TEMPLATES.COOKIES, {
        ...singleInputPageVariables({ ...PAGE_VARIABLES, BACK_LINK: req.headers.referer, START_ROUTE: startRoute }),
        FIELD: FIELDS[FIELD_IDS.OPTIONAL_COOKIES],
        submittedValue: req.cookies.optionalCookies,
      });
    });

    it('should store the previous URL in req.flash', () => {
      get(req, res);

      expect(mockFlash).toHaveBeenCalledTimes(1);

      expect(mockFlash.mock.calls[0]).toEqual(['previousUrl', req.headers.referer]);
    });
  });

  describe('post', () => {
    describe('when there are validation errors', () => {
      it('should render template with validation errors and submittedValue', () => {
        post(req, res);

        expect(res.render).toHaveBeenCalledWith(TEMPLATES.COOKIES, {
          ...singleInputPageVariables({ ...PAGE_VARIABLES, BACK_LINK: req.headers.referer, START_ROUTE: startRoute }),
          FIELD: FIELDS[FIELD_IDS.OPTIONAL_COOKIES],
          validationErrors: generateValidationErrors(req.body, PAGE_VARIABLES.FIELD_ID, ERROR_MESSAGES[PAGE_VARIABLES.FIELD_ID]),
        });
      });
    });

    describe('when there are no validation errors', () => {
      beforeEach(() => {
        req.body[FIELD_IDS.OPTIONAL_COOKIES] = FIELD_VALUES.OPTIONAL_COOKIES.ACCEPT;
        req.cookies.optionalCookies = 'true';
      });

      it('should render template with flags and submittedValue', () => {
        post(req, res);

        expect(res.render).toHaveBeenCalledWith(TEMPLATES.COOKIES, {
          ...singleInputPageVariables({ ...PAGE_VARIABLES, BACK_LINK: req.headers.referer, START_ROUTE: startRoute }),
          FIELD: FIELDS[FIELD_IDS.OPTIONAL_COOKIES],
          submittedValue: req.cookies.optionalCookies,
          showSuccessMessage: true,
          showSuccessMessageGoBackLink: undefined,
        });
      });

      describe(`when req.flash('previousUrl') does NOT include ${ROUTES.COOKIES}`, () => {
        const mockPreviousUrl = '/mock';

        beforeEach(() => {
          req.headers.referer = mockPreviousUrl;

          req.flash = (property: string) => {
            const obj = {
              previousUrl: [mockPreviousUrl],
            };

            return obj[property];
          };
        });

        it('should render template with showSuccessMessageGoBackLink flag as true', async () => {
          await post(req, res);

          expect(res.render).toHaveBeenCalledWith(TEMPLATES.COOKIES, {
            ...singleInputPageVariables({ ...PAGE_VARIABLES, BACK_LINK: mockPreviousUrl, START_ROUTE: startRoute }),
            FIELD: FIELDS[FIELD_IDS.OPTIONAL_COOKIES],
            submittedValue: req.cookies.optionalCookies,
            showSuccessMessage: true,
            showSuccessMessageGoBackLink: true,
          });
        });
      });

      describe(`when req.flash('previousUrl') includes ${ROUTES.COOKIES}`, () => {
        const mockPreviousUrl = ROUTES.COOKIES;

        beforeEach(() => {
          req.headers.referer = mockPreviousUrl;

          req.flash = (property: string) => {
            const obj = {
              previousUrl: [mockPreviousUrl],
            };

            return obj[property];
          };
        });

        it('should render template with showSuccessMessageGoBackLink flag as false', () => {
          req.flash('previousUrl', ROUTES.COOKIES);

          post(req, res);

          expect(res.render).toHaveBeenCalledWith(TEMPLATES.COOKIES, {
            ...singleInputPageVariables({ ...PAGE_VARIABLES, BACK_LINK: ROUTES.COOKIES, START_ROUTE: startRoute }),
            FIELD: FIELDS[FIELD_IDS.OPTIONAL_COOKIES],
            submittedValue: req.cookies.optionalCookies,
            showSuccessMessage: true,
            showSuccessMessageGoBackLink: false,
          });
        });
      });
    });
  });
});
