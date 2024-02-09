import { FIELD_ID, FIELD_IDS, PAGE_CONTENT_STRINGS, pageVariables, HTML_FLAGS, TEMPLATE, get, post } from '.';
import { PAGES } from '../../../../content-strings';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import YOUR_BUYER_FIELD_IDS from '../../../../constants/field-ids/insurance/your-buyer';
import { YOUR_BUYER_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes, mockApplication } from '../../../../test-mocks';
import constructPayload from '../../../../helpers/construct-payload';
import { sanitiseData } from '../../../../helpers/sanitise-data';
import generateValidationErrors from './validation';
import mapAndSave from '../map-and-save/buyer-relationship';

const { HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER, PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER } = YOUR_BUYER_FIELD_IDS;

const {
  INSURANCE_ROOT,
  PROBLEM_WITH_SERVICE,
  YOUR_BUYER: { CREDIT_INSURANCE_COVER_SAVE_AND_BACK, CREDIT_INSURANCE_COVER_CHANGE, CREDIT_INSURANCE_COVER_CHECK_AND_CHANGE, CHECK_YOUR_ANSWERS },
  CHECK_YOUR_ANSWERS: { YOUR_BUYER: CHECK_AND_CHANGE_ROUTE },
} = INSURANCE_ROUTES;

const {
  SHARED_PAGES,
  PARTIALS: {
    INSURANCE: { BUYER },
  },
} = TEMPLATES;

describe('controllers/insurance/your-buyer/credit-insurance-cover', () => {
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

  describe('FIELD_ID', () => {
    it('should have the correct ID', () => {
      const expected = HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER;

      expect(FIELD_ID).toEqual(expected);
    });
  });

  describe('FIELD_IDS', () => {
    it('should have the correct IDs', () => {
      const expected = [HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER, PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER];

      expect(FIELD_IDS).toEqual(expected);
    });
  });

  describe('PAGE_CONTENT_STRINGS', () => {
    it('should have the correct page content strings', () => {
      expect(PAGE_CONTENT_STRINGS).toEqual(PAGES.INSURANCE.YOUR_BUYER.CREDIT_INSURANCE_COVER);
    });
  });

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const result = pageVariables(mockApplication.referenceNumber);

      const expected = {
        FIELD_ID: HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER,
        FIELDS: {
          HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER: {
            ID: HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER,
            ...FIELDS[HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER],
          },
          PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER: {
            ID: PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER,
            ...FIELDS[PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER],
          },
        },
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${CREDIT_INSURANCE_COVER_SAVE_AND_BACK}`,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('HTML_FLAGS', () => {
    it('should have correct properties', () => {
      const expected = {
        HORIZONTAL_RADIOS: true,
        NO_RADIO_AS_FIRST_OPTION: true,
        CONDITIONAL_YES_HTML: BUYER.CREDIT_INSURANCE_COVER.CONDITIONAL_YES_HTML,
      };

      expect(HTML_FLAGS).toEqual(expected);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(SHARED_PAGES.SINGLE_RADIO);
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
        applicationAnswer: mockApplication.buyer.relationship[HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER],
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
    beforeEach(() => {
      mapAndSave.buyerRelationship = jest.fn(() => Promise.resolve(true));
    });

    const validBody = {
      [HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]: 'false',
    };

    describe('when there are no validation errors', () => {
      beforeEach(() => {
        req.body = validBody;
      });

      it('should redirect to the next page', async () => {
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
          req.body = validBody;

          req.originalUrl = CREDIT_INSURANCE_COVER_CHANGE;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${CHECK_YOUR_ANSWERS}`;
          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe("when the url's last substring is `check-and-change`", () => {
        it(`should redirect to ${CHECK_AND_CHANGE_ROUTE}`, async () => {
          req.body = validBody;
          req.originalUrl = CREDIT_INSURANCE_COVER_CHECK_AND_CHANGE;

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

        const validationErrors = generateValidationErrors(payload);

        const expectedVariables = {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS,
            BACK_LINK: req.headers.referer,
            HTML_FLAGS,
          }),
          ...pageVariables(mockApplication.referenceNumber),
          userName: getUserNameFromSession(req.session.user),
          submittedValues: sanitiseData(payload),
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
