import { get, post, pageVariables, HTML_FLAGS, TEMPLATE, FIELD_IDS, PAGE_CONTENT_STRINGS } from '.';
import { PAGES } from '../../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../../constants';
import BUYER_FIELD_IDS from '../../../../constants/field-ids/insurance/your-buyer';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import buyerFinancialInformationValidation from './validation';
import constructPayload from '../../../../helpers/construct-payload';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import mapAndSave from '../map-and-save/buyer-relationship';
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes, mockApplication } from '../../../../test-mocks';

const {
  INSURANCE_ROOT,
  YOUR_BUYER: {
    BUYER_FINANCIAL_INFORMATION_SAVE_AND_BACK,
    CHECK_YOUR_ANSWERS,
    BUYER_FINANCIAL_INFORMATION_CHANGE,
    BUYER_FINANCIAL_INFORMATION_CHECK_AND_CHANGE,
  },
  CHECK_YOUR_ANSWERS: { YOUR_BUYER: CHECK_AND_CHANGE_ROUTE },
  PROBLEM_WITH_SERVICE,
} = ROUTES.INSURANCE;

const {
  SHARED_PAGES,
  PARTIALS: {
    INSURANCE: {
      BUYER: { BUYER_FINANCIAL_INFORMATION: BUYER_FINANCIAL_INFORMATION_PARTIAL },
    },
  },
} = TEMPLATES;

const { HAS_BUYER_FINANCIAL_ACCOUNTS } = BUYER_FIELD_IDS;

describe('controllers/insurance/your-buyer/buyer-financial-information', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    req.params.referenceNumber = String(mockApplication.referenceNumber);
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const expected = {
        FIELD_ID: HAS_BUYER_FINANCIAL_ACCOUNTS,
        FIELDS: {
          HAS_BUYER_FINANCIAL_ACCOUNTS: {
            ID: HAS_BUYER_FINANCIAL_ACCOUNTS,
            HINT: PAGE_CONTENT_STRINGS.HINT,
          },
        },
        PAGE_CONTENT_STRINGS,
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${BUYER_FINANCIAL_INFORMATION_SAVE_AND_BACK}`,
      };

      expect(pageVariables(mockApplication.referenceNumber)).toEqual(expected);
    });
  });

  describe('HTML_FLAGS', () => {
    it('should have correct properties', () => {
      const expected = {
        CUSTOM_CONTENT_HTML: BUYER_FINANCIAL_INFORMATION_PARTIAL.CUSTOM_CONTENT_HTML,
        HORIZONTAL_RADIOS: true,
        NO_RADIO_AS_FIRST_OPTION: true,
      };

      expect(HTML_FLAGS).toEqual(expected);
    });
  });

  describe('FIELD_IDS', () => {
    it('should have the correct FIELD_IDS', () => {
      const EXPECTED_FIELD_IDS = [HAS_BUYER_FINANCIAL_ACCOUNTS];

      expect(FIELD_IDS).toEqual(EXPECTED_FIELD_IDS);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(SHARED_PAGES.SINGLE_RADIO);
    });
  });

  describe('PAGE_CONTENT_STRINGS', () => {
    it('should have the correct template defined', () => {
      expect(PAGE_CONTENT_STRINGS).toEqual(PAGES.INSURANCE.YOUR_BUYER.BUYER_FINANCIAL_INFORMATION);
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
        ...pageVariables(mockApplication.referenceNumber),
        userName: getUserNameFromSession(req.session.user),
        application: mapApplicationToFormFields(mockApplication),
        FIELD_HINT: PAGE_CONTENT_STRINGS.HINT,
        applicationAnswer: mockApplication.buyer.relationship[HAS_BUYER_FINANCIAL_ACCOUNTS],
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
      [HAS_BUYER_FINANCIAL_ACCOUNTS]: 'true',
    };

    beforeEach(() => {
      mapAndSave.buyerRelationship = jest.fn(() => Promise.resolve(true));
    });

    describe('when there are no validation errors', () => {
      beforeEach(() => {
        req.body = validBody;
      });

      it(`should redirect to the next page when ${HAS_BUYER_FINANCIAL_ACCOUNTS} is true`, async () => {
        await post(req, res);
        const expected = `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${CHECK_YOUR_ANSWERS}`;

        expect(res.redirect).toHaveBeenCalledWith(expected);
      });

      it('should call mapAndSave.buyerRelationship once with data from constructPayload function and application', async () => {
        await post(req, res);

        expect(mapAndSave.buyerRelationship).toHaveBeenCalledTimes(1);

        const payload = constructPayload(req.body, FIELD_IDS);

        expect(mapAndSave.buyerRelationship).toHaveBeenCalledWith(payload, mockApplication);
      });

      describe("when the url's last substring is `change`", () => {
        it(`should redirect to ${CHECK_YOUR_ANSWERS}`, async () => {
          req.originalUrl = BUYER_FINANCIAL_INFORMATION_CHANGE;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${CHECK_YOUR_ANSWERS}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe("when the url's last substring is `check-and-change`", () => {
        it(`should redirect to ${CHECK_AND_CHANGE_ROUTE}`, async () => {
          req.originalUrl = BUYER_FINANCIAL_INFORMATION_CHECK_AND_CHANGE;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${CHECK_AND_CHANGE_ROUTE}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });
    });

    describe('when there are validation errors', () => {
      it('should render template with validation errors', async () => {
        await post(req, res);

        const payload = constructPayload(req.body, FIELD_IDS);

        const validationErrors = buyerFinancialInformationValidation(payload);

        const expectedVariables = {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS,
            BACK_LINK: req.headers.referer,
            HTML_FLAGS,
          }),
          userName: getUserNameFromSession(req.session.user),
          FIELD_HINT: PAGE_CONTENT_STRINGS.HINT,
          ...pageVariables(mockApplication.referenceNumber),
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
  });
});
