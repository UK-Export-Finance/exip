import { generateRequiredData, requiredInsuranceEligibilityDataProvided } from '.';
import { FIELD_IDS, ROUTES } from '../../../../constants';
import { mockReq, mockRes, mockSession } from '../../../../test-mocks';
import { Request, Response } from '../../../../../types';

const { APPLY_OFFLINE, SPEAK_TO_UKEF_EFM, ELIGIBILITY, ACCOUNT } = ROUTES.INSURANCE;

const {
  CANNOT_APPLY,
  CHECK_IF_ELIGIBLE,
  NEED_TO_START_AGAIN,
  ACCOUNT_TO_APPLY_ONLINE,
  BUYER_COUNTRY,
  EXPORTER_LOCATION,
  UK_GOODS_OR_SERVICES,
  INSURED_AMOUNT,
  INSURED_PERIOD,
  OTHER_PARTIES_INVOLVED,
  LETTER_OF_CREDIT,
  PRE_CREDIT_PERIOD,
  COMPANIES_HOUSE_NUMBER,
  ELIGIBLE_TO_APPLY_ONLINE,
} = ELIGIBILITY;

const {
  ELIGIBILITY: { VALID_EXPORTER_LOCATION, HAS_MINIMUM_UK_GOODS_OR_SERVICES },
} = FIELD_IDS;

describe('middleware/required-data-provided/insurance/eligibility', () => {
  let req: Request;
  let res: Response;

  describe('generateRequiredDataState', () => {
    it('should return an object of all required fields for each page', () => {
      const result = generateRequiredData();

      const expected = {};

      expected[BUYER_COUNTRY] = [];

      expected[EXPORTER_LOCATION] = [FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY];

      expected[UK_GOODS_OR_SERVICES] = [...expected[EXPORTER_LOCATION], VALID_EXPORTER_LOCATION];

      expected[INSURED_AMOUNT] = [...expected[UK_GOODS_OR_SERVICES], HAS_MINIMUM_UK_GOODS_OR_SERVICES];

      expected[INSURED_PERIOD] = [...expected[INSURED_AMOUNT], FIELD_IDS.INSURANCE.ELIGIBILITY.WANT_COVER_OVER_MAX_AMOUNT];

      expected[OTHER_PARTIES_INVOLVED] = [...expected[INSURED_PERIOD], FIELD_IDS.INSURANCE.ELIGIBILITY.WANT_COVER_OVER_MAX_PERIOD];

      expected[LETTER_OF_CREDIT] = [...expected[OTHER_PARTIES_INVOLVED], FIELD_IDS.INSURANCE.ELIGIBILITY.OTHER_PARTIES_INVOLVED];

      expected[PRE_CREDIT_PERIOD] = [...expected[LETTER_OF_CREDIT], FIELD_IDS.INSURANCE.ELIGIBILITY.LETTER_OF_CREDIT];

      expected[COMPANIES_HOUSE_NUMBER] = [...expected[PRE_CREDIT_PERIOD]];

      expected[ELIGIBLE_TO_APPLY_ONLINE] = [...expected[COMPANIES_HOUSE_NUMBER], FIELD_IDS.INSURANCE.ELIGIBILITY.COMPANIES_HOUSE_NUMBER];

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

    describe(`when req.originalUrl is ${BUYER_COUNTRY}`, () => {
      it('should call req.next', () => {
        req.originalUrl = BUYER_COUNTRY;
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
        req.originalUrl = PRE_CREDIT_PERIOD;
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
        req.originalUrl = PRE_CREDIT_PERIOD;
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

    it('should call req.next', () => {
      req.originalUrl = PRE_CREDIT_PERIOD;
      req.session = mockSession;

      requiredInsuranceEligibilityDataProvided(req, res, nextSpy);

      expect(nextSpy).toHaveBeenCalled();
    });
  });
});
