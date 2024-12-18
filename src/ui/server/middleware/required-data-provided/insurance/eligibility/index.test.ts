import { generateRequiredData, requiredInsuranceEligibilityDataProvided } from '.';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import { mockReq, mockRes, mockSession } from '../../../../test-mocks';
import { Request, Response } from '../../../../../types';

const { ELIGIBILITY, ACCOUNT } = INSURANCE_ROUTES;

const {
  HAVE_AN_ACCOUNT,
  CANNOT_APPLY_EXIT,
  CHECK_IF_ELIGIBLE,
  NEED_TO_START_AGAIN,
  BUYER_COUNTRY,
  BUYER_COUNTRY_CHANGE,
  EXPORTER_LOCATION,
  EXPORTER_LOCATION_CHANGE,
  UK_GOODS_OR_SERVICES,
  UK_GOODS_OR_SERVICES_CHANGE,
  END_BUYER,
  END_BUYER_CHANGE,
  CHECK_YOUR_ANSWERS,
  TOTAL_VALUE_INSURED,
  TOTAL_VALUE_INSURED_CHANGE,
  COVER_PERIOD,
  COVER_PERIOD_CHANGE,
  LONG_TERM_COVER_EXIT,
  COMPANIES_HOUSE_NUMBER,
  COMPANIES_HOUSE_NUMBER_CHANGE,
  NO_COMPANIES_HOUSE_NUMBER_EXIT,
  ENTER_COMPANIES_HOUSE_NUMBER,
  ENTER_COMPANIES_HOUSE_NUMBER_CHANGE,
  COMPANIES_HOUSE_UNAVAILABLE_EXIT,
  COMPANY_NOT_ACTIVE_EXIT,
  COMPANY_DETAILS,
  COMPANY_DETAILS_CHANGE,
  CANNOT_APPLY_MULTIPLE_RISKS_EXIT,
  ELIGIBLE_TO_APPLY_ONLINE,
  TALK_TO_AN_EXPORT_FINANCE_MANAGER,
  PARTY_TO_CONSORTIUM,
  PARTY_TO_CONSORTIUM_CHANGE,
  MEMBER_OF_A_GROUP,
  MEMBER_OF_A_GROUP_CHANGE,
} = ELIGIBILITY;

const {
  ELIGIBILITY: {
    VALID_EXPORTER_LOCATION,
    HAS_COMPANIES_HOUSE_NUMBER,
    BUYER_COUNTRY: BUYER_COUNTRY_FIELD_ID,
    COVER_PERIOD: COVER_PERIOD_FIELD_ID,
    TOTAL_CONTRACT_VALUE,
    HAS_MINIMUM_UK_GOODS_OR_SERVICES,
    HAS_END_BUYER,
    IS_PARTY_TO_CONSORTIUM,
    IS_MEMBER_OF_A_GROUP,
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
      expected[EXPORTER_LOCATION_CHANGE] = [];

      expected[COMPANIES_HOUSE_NUMBER] = [VALID_EXPORTER_LOCATION];
      expected[COMPANIES_HOUSE_NUMBER_CHANGE] = [VALID_EXPORTER_LOCATION];

      expected[ENTER_COMPANIES_HOUSE_NUMBER] = [...expected[COMPANIES_HOUSE_NUMBER], HAS_COMPANIES_HOUSE_NUMBER];
      expected[ENTER_COMPANIES_HOUSE_NUMBER_CHANGE] = [...expected[COMPANIES_HOUSE_NUMBER], HAS_COMPANIES_HOUSE_NUMBER];

      expected[COMPANY_DETAILS] = [...expected[ENTER_COMPANIES_HOUSE_NUMBER], COMPANY];
      expected[COMPANY_DETAILS_CHANGE] = [...expected[ENTER_COMPANIES_HOUSE_NUMBER_CHANGE], COMPANY];

      expected[BUYER_COUNTRY] = [...expected[COMPANY_DETAILS]];
      expected[BUYER_COUNTRY_CHANGE] = [...expected[COMPANY_DETAILS_CHANGE]];

      expected[TOTAL_VALUE_INSURED] = [...expected[BUYER_COUNTRY], BUYER_COUNTRY_FIELD_ID];
      expected[TOTAL_VALUE_INSURED_CHANGE] = [...expected[BUYER_COUNTRY], BUYER_COUNTRY_FIELD_ID];

      expected[COVER_PERIOD] = [...expected[TOTAL_VALUE_INSURED], TOTAL_CONTRACT_VALUE];
      expected[COVER_PERIOD_CHANGE] = [...expected[TOTAL_VALUE_INSURED], TOTAL_CONTRACT_VALUE];

      expected[UK_GOODS_OR_SERVICES] = [...expected[COVER_PERIOD], COVER_PERIOD_FIELD_ID];
      expected[UK_GOODS_OR_SERVICES_CHANGE] = [...expected[COVER_PERIOD], COVER_PERIOD_FIELD_ID];

      expected[END_BUYER] = [...expected[UK_GOODS_OR_SERVICES], HAS_MINIMUM_UK_GOODS_OR_SERVICES];
      expected[END_BUYER_CHANGE] = [...expected[UK_GOODS_OR_SERVICES], HAS_MINIMUM_UK_GOODS_OR_SERVICES];

      expected[PARTY_TO_CONSORTIUM] = [...expected[END_BUYER], HAS_END_BUYER];
      expected[PARTY_TO_CONSORTIUM_CHANGE] = [...expected[END_BUYER], HAS_END_BUYER];

      expected[MEMBER_OF_A_GROUP] = [...expected[PARTY_TO_CONSORTIUM], IS_PARTY_TO_CONSORTIUM];
      expected[MEMBER_OF_A_GROUP_CHANGE] = [...expected[PARTY_TO_CONSORTIUM], IS_PARTY_TO_CONSORTIUM];

      expected[CHECK_YOUR_ANSWERS] = [...expected[MEMBER_OF_A_GROUP], IS_MEMBER_OF_A_GROUP];

      expected[ELIGIBLE_TO_APPLY_ONLINE] = [...expected[CHECK_YOUR_ANSWERS]];

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

    describe(`when req.originalUrl is ${LONG_TERM_COVER_EXIT}`, () => {
      it('should call req.next', () => {
        req.originalUrl = LONG_TERM_COVER_EXIT;
        requiredInsuranceEligibilityDataProvided(req, res, nextSpy);

        expect(nextSpy).toHaveBeenCalled();
      });
    });

    describe(`when req.originalUrl is ${CANNOT_APPLY_EXIT}`, () => {
      it('should call req.next', () => {
        req.originalUrl = CANNOT_APPLY_EXIT;
        requiredInsuranceEligibilityDataProvided(req, res, nextSpy);

        expect(nextSpy).toHaveBeenCalled();
      });
    });

    describe(`when req.originalUrl is ${TALK_TO_AN_EXPORT_FINANCE_MANAGER}`, () => {
      it('should call req.next', () => {
        req.originalUrl = TALK_TO_AN_EXPORT_FINANCE_MANAGER;
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

    describe(`when req.originalUrl is ${NO_COMPANIES_HOUSE_NUMBER_EXIT}`, () => {
      it('should call req.next', () => {
        req.originalUrl = NO_COMPANIES_HOUSE_NUMBER_EXIT;
        requiredInsuranceEligibilityDataProvided(req, res, nextSpy);

        expect(nextSpy).toHaveBeenCalled();
      });
    });

    describe(`when req.originalUrl is ${COMPANIES_HOUSE_UNAVAILABLE_EXIT}`, () => {
      it('should call req.next', () => {
        req.originalUrl = COMPANIES_HOUSE_UNAVAILABLE_EXIT;
        requiredInsuranceEligibilityDataProvided(req, res, nextSpy);

        expect(nextSpy).toHaveBeenCalled();
      });
    });

    describe(`when req.originalUrl is ${COMPANY_NOT_ACTIVE_EXIT}`, () => {
      it('should call req.next', () => {
        req.originalUrl = COMPANY_NOT_ACTIVE_EXIT;
        requiredInsuranceEligibilityDataProvided(req, res, nextSpy);

        expect(nextSpy).toHaveBeenCalled();
      });
    });

    describe(`when req.originalUrl is ${CANNOT_APPLY_MULTIPLE_RISKS_EXIT}`, () => {
      it('should call req.next', () => {
        req.originalUrl = CANNOT_APPLY_MULTIPLE_RISKS_EXIT;
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

    describe(`when req.originalUrl is ${HAVE_AN_ACCOUNT}`, () => {
      it('should call req.next', () => {
        req.originalUrl = HAVE_AN_ACCOUNT;
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
