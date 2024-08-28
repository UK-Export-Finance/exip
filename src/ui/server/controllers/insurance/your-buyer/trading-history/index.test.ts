import { get, post, pageVariables, TEMPLATE, FIELD_ID, PAGE_CONTENT_STRINGS, HTML_FLAGS } from '.';
import { PAGES } from '../../../../content-strings';
import { FIELD_VALUES, TEMPLATES } from '../../../../constants';
import { YOUR_BUYER_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import BUYER_FIELD_IDS from '../../../../constants/field-ids/insurance/your-buyer';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import tradingHistoryValidation from './validation';
import constructPayload from '../../../../helpers/construct-payload';
import mapAndSave from '../map-and-save/buyer-trading-history';
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes, mockApplication, mockSpyPromiseRejection, referenceNumber } from '../../../../test-mocks';

const {
  INSURANCE_ROOT,
  YOUR_BUYER: {
    TRADING_HISTORY_SAVE_AND_BACK: SAVE_AND_BACK,
    CHECK_YOUR_ANSWERS,
    CURRENCY_OF_LATE_PAYMENTS,
    FAILED_TO_PAY,
    TRADING_HISTORY_CHANGE,
    TRADING_HISTORY_CHECK_AND_CHANGE,
    CREDIT_INSURANCE_COVER,
    CURRENCY_OF_LATE_PAYMENTS_CHANGE,
    CURRENCY_OF_LATE_PAYMENTS_CHECK_AND_CHANGE,
  },
  CHECK_YOUR_ANSWERS: { YOUR_BUYER: CHECK_AND_CHANGE_ROUTE },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

const { OUTSTANDING_PAYMENTS } = BUYER_FIELD_IDS;

describe('controllers/insurance/your-buyer/trading-history', () => {
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
      const result = pageVariables(referenceNumber);

      const expected = {
        FIELD_ID,
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${SAVE_AND_BACK}`,
        FIELD_HINT: FIELDS[OUTSTANDING_PAYMENTS].HINT,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('FIELD_ID', () => {
    it('should have the correct FIELD_IDS', () => {
      expect(FIELD_ID).toEqual(OUTSTANDING_PAYMENTS);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.SHARED_PAGES.SINGLE_RADIO);
    });
  });

  describe('PAGE_CONTENT_STRINGS', () => {
    it('should have the correct strings', () => {
      expect(PAGE_CONTENT_STRINGS).toEqual(PAGES.INSURANCE.YOUR_BUYER.TRADING_HISTORY);
    });
  });

  describe('HTML_FLAGS', () => {
    it('should have the correct flags defined', () => {
      const expected = {
        HORIZONTAL_RADIOS: true,
        NO_RADIO_AS_FIRST_OPTION: true,
      };

      expect(HTML_FLAGS).toEqual(expected);
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
      [OUTSTANDING_PAYMENTS]: FIELD_VALUES.NO,
    };

    beforeEach(() => {
      mapAndSave.buyerTradingHistory = jest.fn(() => Promise.resolve(true));
    });

    describe('when there are no validation errors', () => {
      beforeEach(() => {
        req.body = validBody;
      });

      it('should call mapAndSave.buyerTradingHistory once with data from constructPayload function and application', async () => {
        await post(req, res);

        expect(mapAndSave.buyerTradingHistory).toHaveBeenCalledTimes(1);

        const payload = constructPayload(req.body, [FIELD_ID]);

        expect(mapAndSave.buyerTradingHistory).toHaveBeenCalledWith(payload, mockApplication);
      });

      it(`should redirect to ${FAILED_TO_PAY}`, async () => {
        await post(req, res);

        const expected = `${INSURANCE_ROOT}/${referenceNumber}${FAILED_TO_PAY}`;

        expect(res.redirect).toHaveBeenCalledWith(expected);
      });

      describe(`when${OUTSTANDING_PAYMENTS} is yes`, () => {
        it(`should redirect to ${CURRENCY_OF_LATE_PAYMENTS}`, async () => {
          validBody[OUTSTANDING_PAYMENTS] = 'true';

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${referenceNumber}${CURRENCY_OF_LATE_PAYMENTS}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe(`when the url's last substring is "change" and ${OUTSTANDING_PAYMENTS} is true`, () => {
        it(`should redirect to ${CURRENCY_OF_LATE_PAYMENTS_CHANGE}`, async () => {
          req.originalUrl = TRADING_HISTORY_CHANGE;

          validBody[OUTSTANDING_PAYMENTS] = 'true';

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${referenceNumber}${CURRENCY_OF_LATE_PAYMENTS_CHANGE}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe(`when the url's last substring is "check-and-change" and ${OUTSTANDING_PAYMENTS} is true`, () => {
        it(`should redirect to ${CURRENCY_OF_LATE_PAYMENTS_CHECK_AND_CHANGE}`, async () => {
          req.originalUrl = TRADING_HISTORY_CHECK_AND_CHANGE;

          validBody[OUTSTANDING_PAYMENTS] = 'true';

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${referenceNumber}${CURRENCY_OF_LATE_PAYMENTS_CHECK_AND_CHANGE}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe(`when the url's last substring is "change" and ${OUTSTANDING_PAYMENTS} is false`, () => {
        it(`should redirect to ${CHECK_YOUR_ANSWERS}`, async () => {
          req.originalUrl = TRADING_HISTORY_CHANGE;

          validBody[OUTSTANDING_PAYMENTS] = 'false';

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe(`when the url's last substring is "check-and-change" and ${OUTSTANDING_PAYMENTS} is false`, () => {
        it(`should redirect to ${CHECK_AND_CHANGE_ROUTE}`, async () => {
          req.originalUrl = TRADING_HISTORY_CHECK_AND_CHANGE;

          validBody[OUTSTANDING_PAYMENTS] = 'false';

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${referenceNumber}${CHECK_AND_CHANGE_ROUTE}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe(`when the totalContractValueOverThreshold is true and ${OUTSTANDING_PAYMENTS} is false`, () => {
        it(`should redirect to ${CREDIT_INSURANCE_COVER}`, async () => {
          req.body = {
            [OUTSTANDING_PAYMENTS]: 'false',
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

        const validationErrors = tradingHistoryValidation(payload);

        const expectedVariables = {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS,
            BACK_LINK: req.headers.referer,
            HTML_FLAGS,
          }),
          userName: getUserNameFromSession(req.session.user),
          ...pageVariables(referenceNumber),
          submittedValues: payload,
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
