import { generateRequiredData, requiredInsuranceEligibilityDataProvided } from '.';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import { mockReq, mockRes, mockSession } from '../../../../test-mocks';
import { Request, Response } from '../../../../../types';

const { APPLY_OFFLINE, SPEAK_TO_UKEF_EFM, ELIGIBILITY, ACCOUNT } = INSURANCE_ROUTES;

const {
  ACCOUNT_TO_APPLY_ONLINE,
  CANNOT_APPLY,
  CHECK_IF_ELIGIBLE,
  NEED_TO_START_AGAIN,
  BUYER_COUNTRY,
  EXPORTER_LOCATION,
  UK_GOODS_OR_SERVICES,
  INSURED_AMOUNT,
  INSURED_PERIOD,
  COMPANIES_HOUSE_NUMBER,
  ENTER_COMPANIES_HOUSE_NUMBER,
  COMPANIES_HOUSE_UNAVAILABLE,
  COMPANY_DETAILS,
  ELIGIBLE_TO_APPLY_ONLINE,
} = ELIGIBILITY;

const {
  ELIGIBILITY: {
    VALID_EXPORTER_LOCATION,
    HAS_COMPANIES_HOUSE_NUMBER,
    BUYER_COUNTRY: BUYER_COUNTRY_FIELD_ID,
    WANT_COVER_OVER_MAX_AMOUNT,
    WANT_COVER_OVER_MAX_PERIOD,
    HAS_MINIMUM_UK_GOODS_OR_SERVICES,
  },
  COMPANY,
} = INSURANCE_FIELD_IDS;

describe('middleware/required-data-provided/insurance/eligibility', () => {
  let req: Request;
  let res: Response;

  describe('generateRequiredDataState', () => {
    it('should return an object of all required fields for each page', () => {
      const result = generateRequiredData();

      const expected = {};

      expected[EXPORTER_LOCATION] = [];

      expected[COMPANIES_HOUSE_NUMBER] = [VALID_EXPORTER_LOCATION];

      expected[ENTER_COMPANIES_HOUSE_NUMBER] = [...expected[COMPANIES_HOUSE_NUMBER], HAS_COMPANIES_HOUSE_NUMBER];

      expected[COMPANY_DETAILS] = [...expected[ENTER_COMPANIES_HOUSE_NUMBER], COMPANY];

      expected[BUYER_COUNTRY] = [...expected[COMPANY_DETAILS]];

      expected[INSURED_AMOUNT] = [...expected[BUYER_COUNTRY], BUYER_COUNTRY_FIELD_ID];

      expected[INSURED_PERIOD] = [...expected[INSURED_AMOUNT], WANT_COVER_OVER_MAX_AMOUNT];

      expected[UK_GOODS_OR_SERVICES] = [...expected[INSURED_PERIOD], WANT_COVER_OVER_MAX_PERIOD];

      expected[ELIGIBLE_TO_APPLY_ONLINE] = [...expected[BUYER_COUNTRY], HAS_MINIMUM_UK_GOODS_OR_SERVICES];

      expect(result).toEqual(expected);
    });
  });

  describe('requiredInsuranceEligibilityDataProvided', () => {
    const nextSpy = jest.fn();
    const redirectSpy = jest.fn();

    beforeEach(() => {
      req = mockReq();
      res = mockRes();

      res.redirect = redirectSpy;
    });

    describe('when req.originalUrl is root URL', () => {
      it('should call req.next', () => {
        req.originalUrl = '/';
        requiredInsuranceEligibilityDataProvided(req, res, nextSpy);

        expect(nextSpy).toHaveBeenCalled();
      });
    });

    describe(`when req.originalUrl is ${NEED_TO_START_AGAIN}`, () => {
      it('should call req.next', () => {
        req.originalUrl = NEED_TO_START_AGAIN;
        requiredInsuranceEligibilityDataProvided(req, res, nextSpy);

        expect(nextSpy).toHaveBeenCalled();
      });
    });

    describe(`when req.originalUrl is ${CANNOT_APPLY}`, () => {
      it('should call req.next', () => {
        req.originalUrl = CANNOT_APPLY;
        requiredInsuranceEligibilityDataProvided(req, res, nextSpy);

        expect(nextSpy).toHaveBeenCalled();
      });
    });

    describe(`when req.originalUrl is ${APPLY_OFFLINE}`, () => {
      it('should call req.next', () => {
        req.originalUrl = APPLY_OFFLINE;
        requiredInsuranceEligibilityDataProvided(req, res, nextSpy);

        expect(nextSpy).toHaveBeenCalled();
      });
    });

    describe(`when req.originalUrl is ${SPEAK_TO_UKEF_EFM}`, () => {
      it('should call req.next', () => {
        req.originalUrl = SPEAK_TO_UKEF_EFM;
        requiredInsuranceEligibilityDataProvided(req, res, nextSpy);

        expect(nextSpy).toHaveBeenCalled();
      });
    });

    describe(`when req.originalUrl is ${CHECK_IF_ELIGIBLE}`, () => {
      it('should call req.next', () => {
        req.originalUrl = CHECK_IF_ELIGIBLE;
        requiredInsuranceEligibilityDataProvided(req, res, nextSpy);

        expect(nextSpy).toHaveBeenCalled();
      });
    });

    describe(`when req.originalUrl is ${COMPANIES_HOUSE_UNAVAILABLE}`, () => {
      it('should call req.next', () => {
        req.originalUrl = COMPANIES_HOUSE_UNAVAILABLE;
        requiredInsuranceEligibilityDataProvided(req, res, nextSpy);

        expect(nextSpy).toHaveBeenCalled();
      });
    });

    describe(`when req.originalUrl is ${NEED_TO_START_AGAIN}`, () => {
      it('should call req.next', () => {
        req.originalUrl = NEED_TO_START_AGAIN;
        requiredInsuranceEligibilityDataProvided(req, res, nextSpy);

        expect(nextSpy).toHaveBeenCalled();
      });
    });

    describe(`when req.originalUrl is ${ACCOUNT_TO_APPLY_ONLINE}`, () => {
      it('should call req.next', () => {
        req.originalUrl = ACCOUNT_TO_APPLY_ONLINE;
        requiredInsuranceEligibilityDataProvided(req, res, nextSpy);

        expect(nextSpy).toHaveBeenCalled();
      });
    });

    describe(`when req.originalUrl is ${ACCOUNT.CREATE.YOUR_DETAILS}`, () => {
      it('should call req.next', () => {
        req.originalUrl = ACCOUNT.CREATE.YOUR_DETAILS;
        requiredInsuranceEligibilityDataProvided(req, res, nextSpy);

        expect(nextSpy).toHaveBeenCalled();
      });
    });

    describe(`when req.originalUrl is ${ACCOUNT.SIGN_IN.ROOT}`, () => {
      it('should call req.next', () => {
        req.originalUrl = ACCOUNT.SIGN_IN.ROOT;
        requiredInsuranceEligibilityDataProvided(req, res, nextSpy);

        expect(nextSpy).toHaveBeenCalled();
      });
    });

    describe('when req.method is not `GET`', () => {
      it('should call req.next', () => {
        req.method = 'POST';
        requiredInsuranceEligibilityDataProvided(req, res, nextSpy);

        expect(nextSpy).toHaveBeenCalled();
      });
    });

    describe('when there is submittedData in session and the required data for the provided url/route is not in the session', () => {
      it(`should redirect to ${NEED_TO_START_AGAIN}`, () => {
        req.originalUrl = ELIGIBLE_TO_APPLY_ONLINE;
        req.session = {
          submittedData: {
            insuranceEligibility: {
              [VALID_EXPORTER_LOCATION]: true,
            },
            quoteEligibility: {},
          },
        };

        requiredInsuranceEligibilityDataProvided(req, res, nextSpy);

        expect(redirectSpy).toHaveBeenCalled();
        expect(redirectSpy).toHaveBeenCalledWith(NEED_TO_START_AGAIN);
      });
    });

    describe('when there is no submittedData in session', () => {
      it(`should redirect to ${NEED_TO_START_AGAIN}`, () => {
        req.originalUrl = ELIGIBLE_TO_APPLY_ONLINE;
        req.session = {
          submittedData: {
            insuranceEligibility: {},
            quoteEligibility: {},
          },
        };

        requiredInsuranceEligibilityDataProvided(req, res, nextSpy);

        expect(redirectSpy).toHaveBeenCalled();
        expect(redirectSpy).toHaveBeenCalledWith(NEED_TO_START_AGAIN);
      });
    });

    it('should call req.next when all required data is provided', () => {
      req.originalUrl = ELIGIBLE_TO_APPLY_ONLINE;
      req.session = mockSession;

      requiredInsuranceEligibilityDataProvided(req, res, nextSpy);

      expect(nextSpy).toHaveBeenCalled();
    });
  });
});
