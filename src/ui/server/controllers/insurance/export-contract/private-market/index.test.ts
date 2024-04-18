import { pageVariables, FIELD_ID, ERROR_MESSAGE, PAGE_CONTENT_STRINGS, TEMPLATE, HTML_FLAGS, get, post } from '.';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import EXPORT_CONTRACT_FIELD_IDS from '../../../../constants/field-ids/insurance/export-contract';
import { ERROR_MESSAGES, PAGES, PRIVATE_MARKET_WHY_DESCRIPTION } from '../../../../content-strings';
import singleInputPageVariables from '../../../../helpers/page-variables/single-input/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import constructPayload from '../../../../helpers/construct-payload';
import generateValidationErrors from '../../../../shared-validation/yes-no-radios-form';
import mapAndSave from '../map-and-save/private-market';
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes, mockApplication, referenceNumber } from '../../../../test-mocks';

const {
  INSURANCE_ROOT,
  EXPORT_CONTRACT: {
    AGENT,
    CHECK_YOUR_ANSWERS,
    DECLINED_BY_PRIVATE_MARKET,
    DECLINED_BY_PRIVATE_MARKET_CHANGE,
    PRIVATE_MARKET_SAVE_AND_BACK,
    PRIVATE_MARKET_CHANGE,
  },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

const {
  PRIVATE_MARKET: { ATTEMPTED, DECLINED_DESCRIPTION },
} = EXPORT_CONTRACT_FIELD_IDS;

const {
  PARTIALS: {
    INSURANCE: { EXPORT_CONTRACT },
  },
} = TEMPLATES;

describe('controllers/insurance/export-contract/private-market', () => {
  let req: Request;
  let res: Response;

  jest.mock('../map-and-save/private-market');

  mapAndSave.privateMarket = jest.fn(() => Promise.resolve(true));

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('FIELD_ID', () => {
    it('should have the correct FIELD_ID', () => {
      expect(FIELD_ID).toEqual(ATTEMPTED);
    });
  });

  describe('ERROR_MESSAGE', () => {
    it('should have the correct error message', () => {
      const expected = ERROR_MESSAGES.INSURANCE.EXPORT_CONTRACT.PRIVATE_MARKET[FIELD_ID].IS_EMPTY;

      expect(ERROR_MESSAGE).toEqual(expected);
    });
  });

  describe('PAGE_CONTENT_STRINGS', () => {
    it('should have the correct strings', () => {
      const expected = {
        ...PAGES.INSURANCE.EXPORT_CONTRACT.PRIVATE_MARKET,
        PRIVATE_MARKET_WHY_DESCRIPTION,
      };

      expect(PAGE_CONTENT_STRINGS).toEqual(expected);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.SHARED_PAGES.SINGLE_RADIO);
    });
  });

  describe('HTML_FLAGS', () => {
    it('should have correct properties', () => {
      const expected = {
        HORIZONTAL_RADIOS: true,
        NO_RADIO_AS_FIRST_OPTION: true,
        CUSTOM_CONTENT_HTML: EXPORT_CONTRACT.PRIVATE_MARKET.CUSTOM_CONTENT_HTML,
      };

      expect(HTML_FLAGS).toEqual(expected);
    });
  });

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const result = pageVariables(referenceNumber);

      const expected = {
        FIELD_ID,
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${PRIVATE_MARKET_SAVE_AND_BACK}`,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('get', () => {
    it('should render template', () => {
      get(req, res);

      const expectedVariables = {
        ...singleInputPageVariables({ FIELD_ID, PAGE_CONTENT_STRINGS, BACK_LINK: req.headers.referer, HTML_FLAGS }),
        ...pageVariables(referenceNumber),
        userName: getUserNameFromSession(req.session.user),
        FIELD_HINT: PAGE_CONTENT_STRINGS.HINT,
        applicationAnswer: mockApplication.exportContract.privateMarket[FIELD_ID],
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
      [FIELD_ID]: 'false',
    };

    describe('when there are validation errors', () => {
      it('should render template with validation errors and submitted values', async () => {
        req.body = {};

        await post(req, res);

        const payload = constructPayload(req.body, [FIELD_ID]);

        const validationErrors = generateValidationErrors(payload, FIELD_ID, ERROR_MESSAGE);

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
          ...singleInputPageVariables({ FIELD_ID, PAGE_CONTENT_STRINGS, BACK_LINK: req.headers.referer, HTML_FLAGS }),
          ...pageVariables(referenceNumber),
          userName: getUserNameFromSession(req.session.user),
          FIELD_HINT: PAGE_CONTENT_STRINGS.HINT,
          submittedValues: payload,
          validationErrors,
        });
      });
    });

    describe('when there are no validation errors', () => {
      beforeEach(() => {
        req.body = validBody;
      });

      it('should call mapAndSave.exportContract with data from constructPayload function and application', async () => {
        await post(req, res);

        const payload = constructPayload(req.body, [FIELD_ID]);

        expect(mapAndSave.privateMarket).toHaveBeenCalledTimes(1);

        expect(mapAndSave.privateMarket).toHaveBeenCalledWith(payload, res.locals.application);
      });

      describe('when the answer is false', () => {
        it(`should redirect to ${AGENT}`, async () => {
          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${referenceNumber}${AGENT}`;
          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe('when the answer is true', () => {
        it(`should redirect to ${DECLINED_BY_PRIVATE_MARKET}`, async () => {
          req.body = {
            [FIELD_ID]: 'true',
          };

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${referenceNumber}${DECLINED_BY_PRIVATE_MARKET}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe("when the answer is false and the url's last substring is `change`", () => {
        it(`should redirect to ${CHECK_YOUR_ANSWERS}`, async () => {
          req.originalUrl = PRIVATE_MARKET_CHANGE;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe(`when the answer is true, no ${DECLINED_DESCRIPTION} available and the url's last substring is 'change'`, () => {
        it(`should redirect to ${DECLINED_BY_PRIVATE_MARKET_CHANGE}`, async () => {
          req.body = {
            [FIELD_ID]: 'true',
          };

          req.originalUrl = PRIVATE_MARKET_CHANGE;

          delete res.locals.application?.exportContract.privateMarket[DECLINED_DESCRIPTION];

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${referenceNumber}${DECLINED_BY_PRIVATE_MARKET_CHANGE}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
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
      describe('mapAndSave.privateMarket call', () => {
        beforeEach(() => {
          req.body = validBody;
        });

        describe('when a true boolean is not returned', () => {
          beforeEach(() => {
            const mapAndSaveSpy = jest.fn(() => Promise.resolve(false));

            mapAndSave.privateMarket = mapAndSaveSpy;
          });

          it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
            await post(req, res);

            expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
          });
        });

        describe('when there is an error', () => {
          beforeEach(() => {
            const mapAndSaveSpy = jest.fn(() => Promise.reject(new Error('mock')));

            mapAndSave.privateMarket = mapAndSaveSpy;
          });

          it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
            await post(req, res);

            expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
          });
        });
      });
    });
  });
});
