import { post } from '.';
import { FIELD_IDS } from '..';
import { ROUTES } from '../../../../../constants';
import BUSINESS_FIELD_IDS from '../../../../../constants/field-ids/insurance/business';
import constructPayload from '../../../../../helpers/construct-payload';
import mapAndSave from '../../map-and-save/turnover';
import { mockReq, mockRes, mockApplication, mockBusinessTurnover } from '../../../../../test-mocks';
import { Request, Response } from '../../../../../../types';

const {
  TURNOVER: { ESTIMATED_ANNUAL_TURNOVER, PERCENTAGE_TURNOVER },
} = BUSINESS_FIELD_IDS;

const { INSURANCE_ROOT, ALL_SECTIONS, PROBLEM_WITH_SERVICE } = ROUTES.INSURANCE;
describe('controllers/insurance/business/turnover/save-and-back', () => {
  let req: Request;
  let res: Response;

  let updateMapAndSave = jest.fn(() => Promise.resolve(true));

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    mapAndSave.turnover = updateMapAndSave;
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  const validBody = mockBusinessTurnover;

  describe('when there are no validation errors', () => {
    it('should redirect to all sections page', async () => {
      req.body = validBody;

      await post(req, res);

      expect(res.redirect).toHaveBeenCalledWith(`${INSURANCE_ROOT}/${req.params.referenceNumber}${ALL_SECTIONS}`);
    });

    it('should call mapAndSave.turnover once with the data from constructPayload function', async () => {
      req.body = {
        ...validBody,
        injection: 1,
      };

      await post(req, res);

      const payload = constructPayload(req.body, FIELD_IDS);

      expect(updateMapAndSave).toHaveBeenCalledTimes(1);

      expect(updateMapAndSave).toHaveBeenCalledWith(payload, mockApplication, false);
    });
  });

  describe('when there are validation errors', () => {
    it('should redirect to all sections page', async () => {
      req.body = {
        [ESTIMATED_ANNUAL_TURNOVER]: '5O',
        [PERCENTAGE_TURNOVER]: '101',
      };

      await post(req, res);

      expect(res.redirect).toHaveBeenCalledWith(`${INSURANCE_ROOT}/${req.params.referenceNumber}${ALL_SECTIONS}`);
    });

    it('should call mapAndSave.turnover once', async () => {
      req.body = {
        [ESTIMATED_ANNUAL_TURNOVER]: '5O',
        [PERCENTAGE_TURNOVER]: '101',
      };

      await post(req, res);

      expect(updateMapAndSave).toHaveBeenCalledTimes(1);
    });
  });

  describe('when there is no application', () => {
    beforeEach(() => {
      req.body = validBody;
      delete res.locals.application;
    });

    it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
      await post(req, res);

      expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
    });
  });

  describe('api error handling', () => {
    describe('when saveResponse returns false', () => {
      beforeEach(() => {
        req.body = validBody;
        res.locals = mockRes().locals;
        mapAndSave.turnover = jest.fn(() => Promise.resolve(false));
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });

    describe('when mapAndSave.turnover fails', () => {
      beforeEach(() => {
        req.body = validBody;
        res.locals = mockRes().locals;
        updateMapAndSave = jest.fn(() => Promise.reject());
        mapAndSave.turnover = updateMapAndSave;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });
  });
});
