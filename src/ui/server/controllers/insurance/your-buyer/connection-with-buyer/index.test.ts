import { get, post, pageVariables, HTML_FLAGS, PAGE_CONTENT_STRINGS, TEMPLATE, FIELD_IDS } from '.';
import { PAGES } from '../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import { YOUR_BUYER_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import YOUR_BUYER_FIELD_IDS from '../../../../constants/field-ids/insurance/your-buyer';
import { TEMPLATES } from '../../../../constants';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import generateValidationErrors from './validation';
import constructPayload from '../../../../helpers/construct-payload';
import { sanitiseData } from '../../../../helpers/sanitise-data';
import mapAndSave from '../map-and-save/buyer-relationship';
import { Request, ResponseInsurance } from '../../../../../types';
import { mockReq, mockResInsurance, mockApplication, mockBuyer, mockSpyPromiseRejection, referenceNumber } from '../../../../test-mocks';

const {
  INSURANCE_ROOT,
  YOUR_BUYER: {
    TRADED_WITH_BUYER,
    CONNECTION_WITH_BUYER_SAVE_AND_BACK: SAVE_AND_BACK,
    CONNECTION_WITH_BUYER_CHANGE,
    CONNECTION_WITH_BUYER_CHECK_AND_CHANGE,
    CHECK_YOUR_ANSWERS,
  },
  CHECK_YOUR_ANSWERS: { YOUR_BUYER: CHECK_AND_CHANGE_ROUTE },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

const {
  SHARED_PAGES,
  PARTIALS: {
    INSURANCE: {
      BUYER: { CONNECTION_WITH_BUYER: CONNECTION_WITH_BUYER_PARTIALS },
    },
  },
} = TEMPLATES;

const { CONNECTION_WITH_BUYER, CONNECTION_WITH_BUYER_DESCRIPTION } = YOUR_BUYER_FIELD_IDS;

const { relationship } = mockBuyer;

describe('controllers/insurance/your-buyer/connection-with-buyer', () => {
  let req: Request;
  let res: ResponseInsurance;

  beforeEach(() => {
    req = mockReq();
    res = mockResInsurance();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('FIELD_IDS', () => {
    it('should have the correct FIELD_IDS', () => {
      const expected = [CONNECTION_WITH_BUYER, CONNECTION_WITH_BUYER_DESCRIPTION];

      expect(FIELD_IDS).toEqual(expected);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(SHARED_PAGES.SINGLE_RADIO);
    });
  });

  describe('PAGE_CONTENT_STRINGS', () => {
    it('should have the correct strings', () => {
      expect(PAGE_CONTENT_STRINGS).toEqual(PAGES.INSURANCE.YOUR_BUYER.CONNECTION_WITH_BUYER);
    });
  });

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const result = pageVariables(referenceNumber);

      const expected = {
        FIELD_ID: CONNECTION_WITH_BUYER,
        FIELDS: {
          CONNECTION_WITH_BUYER: {
            ID: CONNECTION_WITH_BUYER,
            ...FIELDS[CONNECTION_WITH_BUYER],
          },
          CONNECTION_WITH_BUYER_DESCRIPTION: {
            ID: CONNECTION_WITH_BUYER_DESCRIPTION,
            ...FIELDS[CONNECTION_WITH_BUYER_DESCRIPTION],
          },
        },
        PAGE_CONTENT_STRINGS,
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${SAVE_AND_BACK}`,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('HTML_FLAGS', () => {
    it('should have correct properties', () => {
      const expected = {
        HINT_HTML: TEMPLATES.PARTIALS.INSURANCE.BUYER.CONNECTION_WITH_BUYER.HINT_HTML,
        CONDITIONAL_YES_HTML: CONNECTION_WITH_BUYER_PARTIALS.CONDITIONAL_YES_HTML,
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
        ...pageVariables(referenceNumber),
        userName: getUserNameFromSession(req.session.user),
        application: mapApplicationToFormFields(mockApplication),
        applicationAnswer: mockApplication.buyer.relationship[CONNECTION_WITH_BUYER],
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
    });
  });

  describe('post', () => {
    const validBody = {
      ...relationship,
    };

    beforeEach(() => {
      mapAndSave.buyerRelationship = jest.fn(() => Promise.resolve(true));
    });

    describe('when there are no validation errors', () => {
      beforeEach(() => {
        req.body = validBody;
      });

      it('should redirect to the next page', async () => {
        await post(req, res);
        const expected = `${INSURANCE_ROOT}/${referenceNumber}${TRADED_WITH_BUYER}`;

        expect(res.redirect).toHaveBeenCalledWith(expected);
      });

      it('should call mapAndSave.yourBuyer once with data from constructPayload function and application', async () => {
        await post(req, res);

        expect(mapAndSave.buyerRelationship).toHaveBeenCalledTimes(1);

        const payload = constructPayload(req.body, FIELD_IDS);

        expect(mapAndSave.buyerRelationship).toHaveBeenCalledWith(payload, mockApplication);
      });

      describe("when the url's last substring is `change`", () => {
        it(`should redirect to ${CHECK_YOUR_ANSWERS}`, async () => {
          req.body = validBody;

          req.originalUrl = CONNECTION_WITH_BUYER_CHANGE;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe("when the url's last substring is `check-and-change`", () => {
        it(`should redirect to ${CHECK_AND_CHANGE_ROUTE}`, async () => {
          req.body = validBody;
          req.originalUrl = CONNECTION_WITH_BUYER_CHECK_AND_CHANGE;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${referenceNumber}${CHECK_AND_CHANGE_ROUTE}`;

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
          ...pageVariables(referenceNumber),
          userName: getUserNameFromSession(req.session.user),
          validationErrors,
          submittedValues: sanitiseData(payload),
        };
        expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
      });
    });

    describe('api error handling', () => {
      describe('when mapAndSave.yourBuyer returns false', () => {
        beforeEach(() => {
          req.body = validBody;
          mapAndSave.buyerRelationship = jest.fn(() => Promise.resolve(false));
        });

        it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
          await post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
        });
      });

      describe('when mapAndSave.yourBuyer fails', () => {
        beforeEach(() => {
          req.body = validBody;
          mapAndSave.buyerRelationship = mockSpyPromiseRejection;
        });

        it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
          await post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
        });
      });
    });
  });
});
