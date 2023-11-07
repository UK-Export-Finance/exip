import { allRequiredData, generateRequiredDataState, requiredQuoteEligibilityDataProvided } from '.';
import { FIELD_IDS, FIELD_VALUES, ROUTES } from '../../../constants';
import { mockReq, mockRes, mockSession } from '../../../test-mocks';
import { Request, Response } from '../../../../types';

const {
  BUYER_BODY,
  BUYER_COUNTRY,
  BUYER_COUNTRY_CHANGE,
  CHECK_YOUR_ANSWERS,
  EXPORTER_LOCATION,
  EXPORTER_LOCATION_CHANGE,
  CANNOT_APPLY,
  GET_A_QUOTE_BY_EMAIL,
  UK_GOODS_OR_SERVICES,
  UK_GOODS_OR_SERVICES_CHANGE,
  NEED_TO_START_AGAIN,
  POLICY_TYPE,
  POLICY_TYPE_CHANGE,
  TELL_US_ABOUT_YOUR_POLICY,
  TELL_US_ABOUT_YOUR_POLICY_CHANGE,
  YOUR_QUOTE,
  START,
} = ROUTES.QUOTE;

const {
  ELIGIBILITY: {
    VALID_BUYER_BODY,
    VALID_EXPORTER_LOCATION,
    HAS_MINIMUM_UK_GOODS_OR_SERVICES,
    CURRENCY,
    PERCENTAGE_OF_COVER,
    CONTRACT_VALUE,
    CREDIT_PERIOD,
    MAX_AMOUNT_OWED,
  },
} = FIELD_IDS;

describe('middleware/required-data-provided/quote', () => {
  let req: Request;
  let res: Response;

  describe('allRequiredData', () => {
    describe('when policy type is single', () => {
      it('should return an array of all required fields with single policy specific fields', () => {
        const mockSubmittedData = {
          quoteEligibility: {
            [FIELD_IDS.POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.SINGLE,
          },
          insuranceEligibility: {},
        };

        const result = allRequiredData(mockSubmittedData.quoteEligibility);

        const expected = {
          [BUYER_COUNTRY]: [],
          [BUYER_BODY]: [FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY],
          [EXPORTER_LOCATION]: [FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY, VALID_BUYER_BODY],
          [UK_GOODS_OR_SERVICES]: [FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY, VALID_BUYER_BODY, VALID_EXPORTER_LOCATION],
          [POLICY_TYPE]: [FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY, VALID_BUYER_BODY, VALID_EXPORTER_LOCATION, HAS_MINIMUM_UK_GOODS_OR_SERVICES],
          [TELL_US_ABOUT_YOUR_POLICY]: [
            FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY,
            VALID_BUYER_BODY,
            VALID_EXPORTER_LOCATION,
            HAS_MINIMUM_UK_GOODS_OR_SERVICES,
            FIELD_IDS.POLICY_TYPE,
          ],
          [CHECK_YOUR_ANSWERS]: [
            FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY,
            VALID_BUYER_BODY,
            VALID_EXPORTER_LOCATION,
            HAS_MINIMUM_UK_GOODS_OR_SERVICES,
            FIELD_IDS.POLICY_TYPE,
            FIELD_IDS.POLICY_LENGTH,
            CURRENCY,
            PERCENTAGE_OF_COVER,
            CONTRACT_VALUE,
          ],
          [YOUR_QUOTE]: [
            FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY,
            VALID_BUYER_BODY,
            VALID_EXPORTER_LOCATION,
            HAS_MINIMUM_UK_GOODS_OR_SERVICES,
            FIELD_IDS.POLICY_TYPE,
            FIELD_IDS.POLICY_LENGTH,
            CURRENCY,
            PERCENTAGE_OF_COVER,
            CONTRACT_VALUE,
          ],
        };

        expect(result).toEqual(expected);
      });
    });

    describe('when policy type is multiple', () => {
      it('should return an array of all required fields with single policy specific fields', () => {
        const mockSubmittedData = {
          quoteEligibility: {
            [FIELD_IDS.POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.MULTIPLE,
          },
          insuranceEligibility: {},
        };

        const result = allRequiredData(mockSubmittedData.quoteEligibility);

        const expected = {
          [BUYER_COUNTRY]: [],
          [BUYER_BODY]: [FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY],
          [EXPORTER_LOCATION]: [FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY, VALID_BUYER_BODY],
          [UK_GOODS_OR_SERVICES]: [FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY, VALID_BUYER_BODY, VALID_EXPORTER_LOCATION],
          [POLICY_TYPE]: [FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY, VALID_BUYER_BODY, VALID_EXPORTER_LOCATION, HAS_MINIMUM_UK_GOODS_OR_SERVICES],
          [TELL_US_ABOUT_YOUR_POLICY]: [
            FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY,
            VALID_BUYER_BODY,
            VALID_EXPORTER_LOCATION,
            HAS_MINIMUM_UK_GOODS_OR_SERVICES,
            FIELD_IDS.POLICY_TYPE,
          ],
          [CHECK_YOUR_ANSWERS]: [
            FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY,
            VALID_BUYER_BODY,
            VALID_EXPORTER_LOCATION,
            HAS_MINIMUM_UK_GOODS_OR_SERVICES,
            FIELD_IDS.POLICY_TYPE,
            FIELD_IDS.POLICY_LENGTH,
            CURRENCY,
            PERCENTAGE_OF_COVER,
            CREDIT_PERIOD,
            MAX_AMOUNT_OWED,
          ],
          [YOUR_QUOTE]: [
            FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY,
            VALID_BUYER_BODY,
            VALID_EXPORTER_LOCATION,
            HAS_MINIMUM_UK_GOODS_OR_SERVICES,
            FIELD_IDS.POLICY_TYPE,
            FIELD_IDS.POLICY_LENGTH,
            CURRENCY,
            PERCENTAGE_OF_COVER,
            CREDIT_PERIOD,
            MAX_AMOUNT_OWED,
          ],
        };

        expect(result).toEqual(expected);
      });
    });
  });

  describe('generateRequiredDataState', () => {
    it('should return the result of allRequiredData and add additional `change` routes', () => {
      const result = generateRequiredDataState({});

      const expected = {
        [BUYER_COUNTRY]: allRequiredData({})[BUYER_COUNTRY],
        [BUYER_COUNTRY_CHANGE]: allRequiredData({})[BUYER_COUNTRY],
        [BUYER_BODY]: allRequiredData({})[BUYER_BODY],
        [EXPORTER_LOCATION]: allRequiredData({})[EXPORTER_LOCATION],
        [EXPORTER_LOCATION_CHANGE]: allRequiredData({})[EXPORTER_LOCATION],
        [UK_GOODS_OR_SERVICES]: allRequiredData({})[UK_GOODS_OR_SERVICES],
        [UK_GOODS_OR_SERVICES_CHANGE]: allRequiredData({})[UK_GOODS_OR_SERVICES],
        [POLICY_TYPE]: allRequiredData({})[POLICY_TYPE],
        [POLICY_TYPE_CHANGE]: allRequiredData({})[POLICY_TYPE],
        [TELL_US_ABOUT_YOUR_POLICY]: allRequiredData({})[TELL_US_ABOUT_YOUR_POLICY],
        [TELL_US_ABOUT_YOUR_POLICY_CHANGE]: allRequiredData({})[TELL_US_ABOUT_YOUR_POLICY],
        [CHECK_YOUR_ANSWERS]: allRequiredData({})[CHECK_YOUR_ANSWERS],
        [YOUR_QUOTE]: allRequiredData({})[YOUR_QUOTE],
      };

      expect(result).toEqual(expected);
    });
  });

  describe('requiredQuoteEligibilityDataProvided', () => {
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
        requiredQuoteEligibilityDataProvided(req, res, nextSpy);

        expect(nextSpy).toHaveBeenCalled();
      });
    });

    describe(`when req.originalUrl is ${START}`, () => {
      it('should call req.next', () => {
        req.originalUrl = START;
        requiredQuoteEligibilityDataProvided(req, res, nextSpy);

        expect(nextSpy).toHaveBeenCalled();
      });
    });

    describe(`when req.originalUrl is ${BUYER_COUNTRY}`, () => {
      it('should call req.next', () => {
        req.originalUrl = BUYER_COUNTRY;
        requiredQuoteEligibilityDataProvided(req, res, nextSpy);

        expect(nextSpy).toHaveBeenCalled();
      });
    });

    describe(`when req.originalUrl is ${NEED_TO_START_AGAIN}`, () => {
      it('should call req.next', () => {
        req.originalUrl = NEED_TO_START_AGAIN;
        requiredQuoteEligibilityDataProvided(req, res, nextSpy);

        expect(nextSpy).toHaveBeenCalled();
      });
    });

    describe(`when req.originalUrl is ${CANNOT_APPLY}`, () => {
      it('should call req.next', () => {
        req.originalUrl = CANNOT_APPLY;
        requiredQuoteEligibilityDataProvided(req, res, nextSpy);

        expect(nextSpy).toHaveBeenCalled();
      });
    });

    describe(`when req.originalUrl is ${GET_A_QUOTE_BY_EMAIL}`, () => {
      it('should call req.next', () => {
        req.originalUrl = GET_A_QUOTE_BY_EMAIL;
        requiredQuoteEligibilityDataProvided(req, res, nextSpy);

        expect(nextSpy).toHaveBeenCalled();
      });
    });

    describe('when req.method is not `GET`', () => {
      it('should call req.next', () => {
        req.method = 'POST';
        requiredQuoteEligibilityDataProvided(req, res, nextSpy);

        expect(nextSpy).toHaveBeenCalled();
      });
    });

    describe('when there is submittedData in session and the required data for the provided url/route is not in the session', () => {
      it(`should redirect to ${NEED_TO_START_AGAIN}`, () => {
        req.originalUrl = TELL_US_ABOUT_YOUR_POLICY;
        req.session = {
          submittedData: {
            quoteEligibility: {
              [VALID_EXPORTER_LOCATION]: true,
            },
            insuranceEligibility: {},
          },
        };

        requiredQuoteEligibilityDataProvided(req, res, nextSpy);

        expect(redirectSpy).toHaveBeenCalled();
        expect(redirectSpy).toHaveBeenCalledWith(NEED_TO_START_AGAIN);
      });
    });

    describe('when there is no submittedData in session', () => {
      it(`should redirect to ${NEED_TO_START_AGAIN}`, () => {
        req.originalUrl = TELL_US_ABOUT_YOUR_POLICY;
        req.session = {
          submittedData: {
            quoteEligibility: {},
            insuranceEligibility: {},
          },
        };

        requiredQuoteEligibilityDataProvided(req, res, nextSpy);

        expect(redirectSpy).toHaveBeenCalled();
        expect(redirectSpy).toHaveBeenCalledWith(NEED_TO_START_AGAIN);
      });
    });

    it('should call req.next', () => {
      req.originalUrl = YOUR_QUOTE;
      req.session = mockSession;

      requiredQuoteEligibilityDataProvided(req, res, nextSpy);

      expect(nextSpy).toHaveBeenCalled();
    });
  });
});
