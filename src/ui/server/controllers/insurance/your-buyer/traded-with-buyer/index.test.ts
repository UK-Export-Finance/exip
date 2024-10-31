import { get, post, pageVariables, HTML_FLAGS, TEMPLATE, FIELD_ID, PAGE_CONTENT_STRINGS } from '.';
import { PAGES } from '../../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../../constants';
import BUYER_FIELD_IDS from '../../../../constants/field-ids/insurance/your-buyer';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import tradedWithBuyerValidation from './validation';
import constructPayload from '../../../../helpers/construct-payload';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import mapAndSave from '../map-and-save/buyer-trading-history';
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes, mockApplication, mockSpyPromiseRejection, referenceNumber } from '../../../../test-mocks';

const {
  INSURANCE_ROOT,
  YOUR_BUYER: {
    TRADED_WITH_BUYER_SAVE_AND_BACK,
    CHECK_YOUR_ANSWERS,
    TRADED_WITH_BUYER_CHECK_AND_CHANGE,
    TRADED_WITH_BUYER_CHANGE,
    TRADING_HISTORY,
    TRADING_HISTORY_CHANGE,
    TRADING_HISTORY_CHECK_AND_CHANGE,
    CREDIT_INSURANCE_COVER,
    BUYER_FINANCIAL_INFORMATION,
  },
  CHECK_YOUR_ANSWERS: { YOUR_BUYER: CHECK_AND_CHANGE_ROUTE },
  PROBLEM_WITH_SERVICE,
} = ROUTES.INSURANCE;

const { TRADED_WITH_BUYER } = BUYER_FIELD_IDS;

describe('controllers/insurance/your-buyer/traded-with-buyer', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const expected = {
        FIELD_ID: TRADED_WITH_BUYER,
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${TRADED_WITH_BUYER_SAVE_AND_BACK}`,
      };

      expect(pageVariables(referenceNumber)).toEqual(expected);
    });
  });

  describe('HTML_FLAGS', () => {
    it('should have correct properties', () => {
      const expected = {
        HORIZONTAL_RADIOS: true,
        NO_RADIO_AS_FIRST_OPTION: true,
      };

      expect(HTML_FLAGS).toEqual(expected);
    });
  });

  describe('FIELD_ID', () => {
    it('should have the correct ID', () => {
      expect(FIELD_ID).toEqual(TRADED_WITH_BUYER);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.SHARED_PAGES.SINGLE_RADIO);
    });
  });

  describe('PAGE_CONTENT_STRINGS', () => {
    it('should have the correct strings', () => {
      expect(PAGE_CONTENT_STRINGS).toEqual(PAGES.INSURANCE.YOUR_BUYER.TRADED_WITH_BUYER);
    });
  });

  describe('get', () => {
    it('should render template', async () => {
      await get(req, res);

      const expectedVariables = {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS,
          BACK_LINK: req.headers.referer,
          HTML_FLAGS,
        }),
        userName: getUserNameFromSession(req.session.user),
        ...pageVariables(referenceNumber),
        submittedValues: mockApplication.buyer.buyerTradingHistory,
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
    });

    describe('when there is no application', () => {
      beforeEach(() => {
        delete res.locals.application;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, () => {
        get(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });
  });

  describe('post', () => {
    const validBody = {
      [TRADED_WITH_BUYER]: 'true',
    };

    beforeEach(() => {
      mapAndSave.buyerTradingHistory = jest.fn(() => Promise.resolve(true));
    });

    describe('when there are no validation errors', () => {
      beforeEach(() => {
        req.body = validBody;
      });

      it(`should redirect to the next page when ${TRADED_WITH_BUYER} is true`, async () => {
        await post(req, res);
        const expected = `${INSURANCE_ROOT}/${referenceNumber}${TRADING_HISTORY}`;

        expect(res.redirect).toHaveBeenCalledWith(expected);
      });

      it('should call mapAndSave.buyerTradingHistory once with buyer and application', async () => {
        await post(req, res);

        expect(mapAndSave.buyerTradingHistory).toHaveBeenCalledTimes(1);

        expect(mapAndSave.buyerTradingHistory).toHaveBeenCalledWith(req.body, mockApplication);
      });

      it('should call mapAndSave.buyerTradingHistory once with data from constructPayload function and application', async () => {
        req.body = {
          ...validBody,
          injection: 1,
        };

        await post(req, res);

        expect(mapAndSave.buyerTradingHistory).toHaveBeenCalledTimes(1);

        const payload = constructPayload(req.body, [FIELD_ID]);

        expect(mapAndSave.buyerTradingHistory).toHaveBeenCalledWith(payload, mockApplication);
      });

      describe(`when ${TRADED_WITH_BUYER} is false`, () => {
        it(`should redirect to the ${BUYER_FINANCIAL_INFORMATION} when ${TRADED_WITH_BUYER} is false`, async () => {
          req.body = {
            [TRADED_WITH_BUYER]: 'false',
          };

          await post(req, res);
          const expected = `${INSURANCE_ROOT}/${referenceNumber}${BUYER_FINANCIAL_INFORMATION}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe(`when ${TRADED_WITH_BUYER} is true and the url's last substring is 'change'`, () => {
        it(`should redirect to ${TRADING_HISTORY_CHANGE}`, async () => {
          req.body = {
            [TRADED_WITH_BUYER]: 'true',
          };

          req.originalUrl = TRADED_WITH_BUYER_CHANGE;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${referenceNumber}${TRADING_HISTORY_CHANGE}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe(`when ${TRADED_WITH_BUYER} is false and the url's last substring is 'change'`, () => {
        it(`should redirect to ${CHECK_YOUR_ANSWERS}`, async () => {
          req.body = {
            [TRADED_WITH_BUYER]: 'false',
          };

          req.originalUrl = TRADED_WITH_BUYER_CHANGE;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe(`when ${TRADED_WITH_BUYER} is true and the url's last substring is 'check-and-change'`, () => {
        it(`should redirect to ${TRADING_HISTORY_CHECK_AND_CHANGE}`, async () => {
          req.body = {
            [TRADED_WITH_BUYER]: 'true',
          };

          req.originalUrl = TRADED_WITH_BUYER_CHECK_AND_CHANGE;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${referenceNumber}${TRADING_HISTORY_CHECK_AND_CHANGE}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe(`when ${TRADED_WITH_BUYER} is false and the url's last substring is 'check-and-change'`, () => {
        it(`should redirect to ${CHECK_AND_CHANGE_ROUTE}`, async () => {
          req.body = {
            [TRADED_WITH_BUYER]: 'false',
          };

          req.originalUrl = TRADED_WITH_BUYER_CHECK_AND_CHANGE;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${referenceNumber}${CHECK_AND_CHANGE_ROUTE}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe(`when totalContractValueOverThreshold=true and ${TRADED_WITH_BUYER} is false`, () => {
        it(`should redirect to ${CREDIT_INSURANCE_COVER}`, async () => {
          req.body = {
            [TRADED_WITH_BUYER]: 'false',
          };

          res.locals.application = {
            ...mockApplication,
            totalContractValueOverThreshold: true,
          };

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${referenceNumber}${CREDIT_INSURANCE_COVER}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });
    });

    describe('when there are validation errors', () => {
      it('should render template with validation errors', async () => {
        await post(req, res);

        const payload = constructPayload(req.body, [FIELD_ID]);

        const validationErrors = tradedWithBuyerValidation(payload);

        const expectedVariables = {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS,
            BACK_LINK: req.headers.referer,
            HTML_FLAGS,
          }),
          userName: getUserNameFromSession(req.session.user),
          ...pageVariables(referenceNumber),
          submittedValues: payload,
          application: mapApplicationToFormFields(mockApplication),
          validationErrors,
        };
        expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
      });
    });

    describe('when there is no application', () => {
      beforeEach(() => {
        delete res.locals.application;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });

    describe('api error handling', () => {
      describe('when mapAndSave.buyerTradingHistory returns false', () => {
        beforeEach(() => {
          req.body = validBody;
          res.locals = mockRes().locals;
          mapAndSave.buyerTradingHistory = jest.fn(() => Promise.resolve(false));
        });

        it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
          await post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
        });
      });

      describe('when mapAndSave.buyerTradingHistory fails', () => {
        beforeEach(() => {
          req.body = validBody;
          res.locals = mockRes().locals;
          mapAndSave.buyerTradingHistory = mockSpyPromiseRejection;
        });

        it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
          await post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
        });
      });
    });
  });
});
