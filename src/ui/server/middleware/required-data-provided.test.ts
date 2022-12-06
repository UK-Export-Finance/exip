import { getRoutesAsArray, routeIsKnown, allRequiredData, generateRequiredDataState, hasRequiredData, requiredDataProvided } from './required-data-provided';
import { FIELD_IDS, FIELD_VALUES, ROUTES } from '../constants';
import { mockReq, mockRes, mockSession } from '../test-mocks';
import { Request, Response } from '../../types';

const { ROOT, COOKIES, PROBLEM_WITH_SERVICE, QUOTE } = ROUTES;

const {
  BUYER_BODY,
  BUYER_COUNTRY,
  BUYER_COUNTRY_CHANGE,
  CHECK_YOUR_ANSWERS,
  COMPANY_BASED,
  COMPANY_BASED_CHANGE,
  CANNOT_OBTAIN_COVER,
  GET_A_QUOTE_BY_EMAIL,
  HAS_MINIMUM_UK_GOODS_OR_SERVICES,
  HAS_MINIMUM_UK_GOODS_OR_SERVICES_CHANGE,
  NEED_TO_START_AGAIN,
  POLICY_TYPE,
  POLICY_TYPE_CHANGE,
  TELL_US_ABOUT_YOUR_POLICY,
  TELL_US_ABOUT_YOUR_POLICY_CHANGE,
  YOUR_QUOTE,
} = QUOTE;

describe('middleware/required-data-provided', () => {
  let req: Request;
  let res: Response;

  describe('getRoutesAsArray', () => {
    it('should return all routes as an array of strings', () => {
      const result = getRoutesAsArray();

      const expected = Object.values({
        ROOT,
        COOKIES,
        PROBLEM_WITH_SERVICE,
        ...QUOTE,
      });

      expect(result).toEqual(expected);
    });
  });

  describe('routeIsKnown', () => {
    describe('when a route is in the list of routes', () => {
      it('should return true', () => {
        const routes = getRoutesAsArray();
        const route = TELL_US_ABOUT_YOUR_POLICY;

        const result = routeIsKnown(routes, route);

        expect(result).toEqual(true);
      });
    });

    describe('when a route is NOT in the list of routes', () => {
      it('should return false', () => {
        const routes = getRoutesAsArray();
        const route = '/unknown-404-page';

        const result = routeIsKnown(routes, route);

        expect(result).toEqual(false);
      });
    });
  });

  describe('allRequiredData', () => {
    describe('when policy type is single', () => {
      it('should return an array of all required fields with single policy specific fields', () => {
        const mockSubmittedData = {
          [FIELD_IDS.POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.SINGLE,
        };

        const result = allRequiredData(mockSubmittedData);

        const expected = {
          [BUYER_COUNTRY]: [],
          [BUYER_BODY]: [FIELD_IDS.BUYER_COUNTRY],
          [COMPANY_BASED]: [FIELD_IDS.BUYER_COUNTRY, FIELD_IDS.VALID_BUYER_BODY],
          [HAS_MINIMUM_UK_GOODS_OR_SERVICES]: [FIELD_IDS.BUYER_COUNTRY, FIELD_IDS.VALID_BUYER_BODY, FIELD_IDS.VALID_COMPANY_BASE],
          [POLICY_TYPE]: [FIELD_IDS.BUYER_COUNTRY, FIELD_IDS.VALID_BUYER_BODY, FIELD_IDS.VALID_COMPANY_BASE, FIELD_IDS.HAS_MINIMUM_UK_GOODS_OR_SERVICES],
          [TELL_US_ABOUT_YOUR_POLICY]: [
            FIELD_IDS.BUYER_COUNTRY,
            FIELD_IDS.VALID_BUYER_BODY,
            FIELD_IDS.VALID_COMPANY_BASE,
            FIELD_IDS.HAS_MINIMUM_UK_GOODS_OR_SERVICES,
            FIELD_IDS.POLICY_TYPE,
            FIELD_IDS.POLICY_LENGTH,
          ],
          [CHECK_YOUR_ANSWERS]: [
            FIELD_IDS.BUYER_COUNTRY,
            FIELD_IDS.VALID_BUYER_BODY,
            FIELD_IDS.VALID_COMPANY_BASE,
            FIELD_IDS.HAS_MINIMUM_UK_GOODS_OR_SERVICES,
            FIELD_IDS.POLICY_TYPE,
            FIELD_IDS.POLICY_LENGTH,
            FIELD_IDS.CURRENCY,
            FIELD_IDS.PERCENTAGE_OF_COVER,
            FIELD_IDS.CONTRACT_VALUE,
          ],
          [YOUR_QUOTE]: [
            FIELD_IDS.BUYER_COUNTRY,
            FIELD_IDS.VALID_BUYER_BODY,
            FIELD_IDS.VALID_COMPANY_BASE,
            FIELD_IDS.HAS_MINIMUM_UK_GOODS_OR_SERVICES,
            FIELD_IDS.POLICY_TYPE,
            FIELD_IDS.POLICY_LENGTH,
            FIELD_IDS.CURRENCY,
            FIELD_IDS.PERCENTAGE_OF_COVER,
            FIELD_IDS.CONTRACT_VALUE,
          ],
        };

        expect(result).toEqual(expected);
      });
    });

    describe('when policy type is multi', () => {
      it('should return an array of all required fields with single policy specific fields', () => {
        const mockSubmittedData = {
          [FIELD_IDS.POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.MULTI,
        };

        const result = allRequiredData(mockSubmittedData);

        const expected = {
          [BUYER_COUNTRY]: [],
          [BUYER_BODY]: [FIELD_IDS.BUYER_COUNTRY],
          [COMPANY_BASED]: [FIELD_IDS.BUYER_COUNTRY, FIELD_IDS.VALID_BUYER_BODY],
          [HAS_MINIMUM_UK_GOODS_OR_SERVICES]: [FIELD_IDS.BUYER_COUNTRY, FIELD_IDS.VALID_BUYER_BODY, FIELD_IDS.VALID_COMPANY_BASE],
          [POLICY_TYPE]: [FIELD_IDS.BUYER_COUNTRY, FIELD_IDS.VALID_BUYER_BODY, FIELD_IDS.VALID_COMPANY_BASE, FIELD_IDS.HAS_MINIMUM_UK_GOODS_OR_SERVICES],
          [TELL_US_ABOUT_YOUR_POLICY]: [
            FIELD_IDS.BUYER_COUNTRY,
            FIELD_IDS.VALID_BUYER_BODY,
            FIELD_IDS.VALID_COMPANY_BASE,
            FIELD_IDS.HAS_MINIMUM_UK_GOODS_OR_SERVICES,
            FIELD_IDS.POLICY_TYPE,
          ],
          [CHECK_YOUR_ANSWERS]: [
            FIELD_IDS.BUYER_COUNTRY,
            FIELD_IDS.VALID_BUYER_BODY,
            FIELD_IDS.VALID_COMPANY_BASE,
            FIELD_IDS.HAS_MINIMUM_UK_GOODS_OR_SERVICES,
            FIELD_IDS.POLICY_TYPE,
            FIELD_IDS.CURRENCY,
            FIELD_IDS.PERCENTAGE_OF_COVER,
            FIELD_IDS.CREDIT_PERIOD,
            FIELD_IDS.MAX_AMOUNT_OWED,
          ],
          [YOUR_QUOTE]: [
            FIELD_IDS.BUYER_COUNTRY,
            FIELD_IDS.VALID_BUYER_BODY,
            FIELD_IDS.VALID_COMPANY_BASE,
            FIELD_IDS.HAS_MINIMUM_UK_GOODS_OR_SERVICES,
            FIELD_IDS.POLICY_TYPE,
            FIELD_IDS.CURRENCY,
            FIELD_IDS.PERCENTAGE_OF_COVER,
            FIELD_IDS.CREDIT_PERIOD,
            FIELD_IDS.MAX_AMOUNT_OWED,
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
        [COMPANY_BASED]: allRequiredData({})[COMPANY_BASED],
        [COMPANY_BASED_CHANGE]: allRequiredData({})[COMPANY_BASED],
        [HAS_MINIMUM_UK_GOODS_OR_SERVICES]: allRequiredData({})[HAS_MINIMUM_UK_GOODS_OR_SERVICES],
        [HAS_MINIMUM_UK_GOODS_OR_SERVICES_CHANGE]: allRequiredData({})[HAS_MINIMUM_UK_GOODS_OR_SERVICES],
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

  describe('hasRequiredData', () => {
    describe('when total amount of submitted fields matches the total of required fields', () => {
      it('should return true', () => {
        const result = hasRequiredData(COMPANY_BASED_CHANGE, mockSession.submittedData);

        expect(result).toEqual(true);
      });
    });

    describe('when total amount of submitted fields does NOT match the total of required fields', () => {
      it('should return false', () => {
        const result = hasRequiredData(COMPANY_BASED_CHANGE, {});

        expect(result).toEqual(false);
      });
    });
  });

  describe('requiredDataProvided', () => {
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
        requiredDataProvided(req, res, nextSpy);

        expect(nextSpy).toHaveBeenCalled();
      });
    });

    describe(`when req.originalUrl is ${BUYER_COUNTRY}`, () => {
      it('should call req.next', () => {
        req.originalUrl = BUYER_COUNTRY;
        requiredDataProvided(req, res, nextSpy);

        expect(nextSpy).toHaveBeenCalled();
      });
    });

    describe(`when req.originalUrl is ${NEED_TO_START_AGAIN}`, () => {
      it('should call req.next', () => {
        req.originalUrl = NEED_TO_START_AGAIN;
        requiredDataProvided(req, res, nextSpy);

        expect(nextSpy).toHaveBeenCalled();
      });
    });

    describe(`when req.originalUrl is ${CANNOT_OBTAIN_COVER}`, () => {
      it('should call req.next', () => {
        req.originalUrl = CANNOT_OBTAIN_COVER;
        requiredDataProvided(req, res, nextSpy);

        expect(nextSpy).toHaveBeenCalled();
      });
    });

    describe(`when req.originalUrl is ${GET_A_QUOTE_BY_EMAIL}`, () => {
      it('should call req.next', () => {
        req.originalUrl = GET_A_QUOTE_BY_EMAIL;
        requiredDataProvided(req, res, nextSpy);

        expect(nextSpy).toHaveBeenCalled();
      });
    });

    describe(`when req.originalUrl is ${COOKIES}`, () => {
      it('should call req.next', () => {
        req.originalUrl = COOKIES;
        requiredDataProvided(req, res, nextSpy);

        expect(nextSpy).toHaveBeenCalled();
      });
    });

    describe(`when req.originalUrl is ${PROBLEM_WITH_SERVICE}`, () => {
      it('should call req.next', () => {
        req.originalUrl = PROBLEM_WITH_SERVICE;
        requiredDataProvided(req, res, nextSpy);

        expect(nextSpy).toHaveBeenCalled();
      });
    });

    describe('when req.originalUrl contains `assets`', () => {
      it('should call req.next', () => {
        req.originalUrl = '/assets/styles.css';
        requiredDataProvided(req, res, nextSpy);

        expect(nextSpy).toHaveBeenCalled();
      });
    });

    describe('when req.originalUrl is an unknown/404 page', () => {
      it('should call req.next', () => {
        req.originalUrl = '/page-that-does-not-exist';
        requiredDataProvided(req, res, nextSpy);

        expect(nextSpy).toHaveBeenCalled();
      });
    });

    describe('when req.method is not `GET`', () => {
      it('should call req.next', () => {
        req.method = 'POST';
        requiredDataProvided(req, res, nextSpy);

        expect(nextSpy).toHaveBeenCalled();
      });
    });

    describe('when there is submittedData in session and the required data for the provided url/route is not in the session', () => {
      it(`should redirect to ${NEED_TO_START_AGAIN}`, () => {
        req.originalUrl = TELL_US_ABOUT_YOUR_POLICY;
        req.session = {
          submittedData: {
            [FIELD_IDS.VALID_COMPANY_BASE]: true,
          },
        };

        requiredDataProvided(req, res, nextSpy);

        expect(redirectSpy).toHaveBeenCalled();
        expect(redirectSpy).toHaveBeenCalledWith(NEED_TO_START_AGAIN);
      });
    });

    describe('when there is no submittedData in session', () => {
      it(`should redirect to ${NEED_TO_START_AGAIN}`, () => {
        req.originalUrl = TELL_US_ABOUT_YOUR_POLICY;
        req.session = { submittedData: {} };

        requiredDataProvided(req, res, nextSpy);

        expect(redirectSpy).toHaveBeenCalled();
        expect(redirectSpy).toHaveBeenCalledWith(NEED_TO_START_AGAIN);
      });
    });

    it(`should call req.next to ${NEED_TO_START_AGAIN}`, () => {
      req.originalUrl = YOUR_QUOTE;
      req.session = mockSession;

      requiredDataProvided(req, res, nextSpy);

      expect(nextSpy).toHaveBeenCalled();
    });
  });
});
