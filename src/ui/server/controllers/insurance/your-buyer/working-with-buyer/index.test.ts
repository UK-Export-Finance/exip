import { get, post, pageVariables, TEMPLATE } from '.';
import { PAGES } from '../../../../content-strings';
import { YOUR_BUYER_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import { FIELD_IDS, FIELD_VALUES, ROUTES, TEMPLATES } from '../../../../constants';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import workingWithBuyerValidation from './validation';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import mapAndSave from '../map-and-save';
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes, mockApplication } from '../../../../test-mocks';

const {
  YOUR_BUYER: { WORKING_WITH_BUYER },
} = FIELD_IDS.INSURANCE;

const {
  INSURANCE_ROOT,
  YOUR_BUYER: YOUR_BUYER_ROUTES,
  CHECK_YOUR_ANSWERS: { YOUR_BUYER: CHECK_AND_CHANGE_ROUTE },
} = ROUTES.INSURANCE;

const { WORKING_WITH_BUYER_SAVE_AND_BACK, CHECK_YOUR_ANSWERS, WORKING_WITH_BUYER_CHECK_AND_CHANGE } = YOUR_BUYER_ROUTES;

const { TRADED_WITH_BUYER, CONNECTED_WITH_BUYER } = WORKING_WITH_BUYER;

describe('controllers/insurance/your-buyer/working-with-buyer', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    res.locals.application = mockApplication;
    req.params.referenceNumber = String(mockApplication.referenceNumber);
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const expected = {
        FIELDS: {
          CONNECTED_WITH_BUYER: {
            ID: CONNECTED_WITH_BUYER,
            ...FIELDS.WORKING_WITH_BUYER[CONNECTED_WITH_BUYER],
          },
          TRADED_WITH_BUYER: {
            ID: TRADED_WITH_BUYER,
            ...FIELDS.WORKING_WITH_BUYER[TRADED_WITH_BUYER],
          },
        },
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${WORKING_WITH_BUYER_SAVE_AND_BACK}`,
      };

      expect(pageVariables(mockApplication.referenceNumber)).toEqual(expected);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.YOUR_BUYER.WORKING_WITH_BUYER);
    });
  });

  describe('get', () => {
    it('should render template', async () => {
      await get(req, res);

      const expectedVariables = {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: PAGES.INSURANCE.YOUR_BUYER.WORKING_WITH_BUYER,
          BACK_LINK: req.headers.referer,
        }),
        userName: getUserNameFromSession(req.session.user),
        application: mapApplicationToFormFields(mockApplication),
        ...pageVariables(mockApplication.referenceNumber),
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
    });

    describe('when there is no application', () => {
      beforeEach(() => {
        res.locals = { csrfToken: '1234' };
      });

      it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, () => {
        get(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
      });
    });
  });

  describe('post', () => {
    beforeEach(() => {
      mapAndSave.yourBuyer = jest.fn(() => Promise.resolve(true));
    });

    describe('when there are no validation errors', () => {
      beforeEach(() => {
        req.body = {
          [CONNECTED_WITH_BUYER]: FIELD_VALUES.YES,
          [TRADED_WITH_BUYER]: FIELD_VALUES.YES,
        };
      });

      it('should redirect to the next page', async () => {
        await post(req, res);
        const expected = `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${CHECK_YOUR_ANSWERS}`;

        expect(res.redirect).toHaveBeenCalledWith(expected);
      });

      it('should call mapAndSave.buyer once with buyer and application', async () => {
        await post(req, res);

        expect(mapAndSave.yourBuyer).toHaveBeenCalledTimes(1);

        expect(mapAndSave.yourBuyer).toHaveBeenCalledWith(req.body, mockApplication);
      });

      describe("when the url's last substring is `check-and-change`", () => {
        it(`should redirect to ${CHECK_AND_CHANGE_ROUTE}`, async () => {
          req.body = {
            [CONNECTED_WITH_BUYER]: FIELD_VALUES.YES,
            [TRADED_WITH_BUYER]: FIELD_VALUES.YES,
          };

          req.originalUrl = WORKING_WITH_BUYER_CHECK_AND_CHANGE;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${CHECK_AND_CHANGE_ROUTE}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });
    });

    describe('when there are validation errors', () => {
      it('should render template with validation errors', async () => {
        await post(req, res);

        const validationErrors = workingWithBuyerValidation(req.body);

        const expectedVariables = {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS: PAGES.INSURANCE.YOUR_BUYER.WORKING_WITH_BUYER,
            BACK_LINK: req.headers.referer,
          }),
          ...pageVariables(mockApplication.referenceNumber),
          userName: getUserNameFromSession(req.session.user),
          application: mapApplicationToFormFields(mockApplication),
          submittedValues: req.body,
          validationErrors,
        };
        expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
      });
    });

    describe('api error handling', () => {
      describe('when application does not exist', () => {
        beforeEach(() => {
          res.locals = { csrfToken: '1234' };
        });

        it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, () => {
          post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
        });
      });

      describe('when saveResponse returns false', () => {
        beforeEach(() => {
          res.locals = { csrfToken: '1234' };
          mapAndSave.yourBuyer = jest.fn(() => Promise.resolve(false));
        });

        it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, () => {
          post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
        });
      });

      describe('when there is an error', () => {
        beforeEach(() => {
          res.locals = { csrfToken: '1234' };
          mapAndSave.yourBuyer = jest.fn(() => Promise.reject());
        });

        it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, () => {
          post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
        });
      });
    });
  });
});
