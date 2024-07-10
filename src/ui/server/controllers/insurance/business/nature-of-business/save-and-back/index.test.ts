import { post } from '.';
import constructPayload from '../../../../../helpers/construct-payload';
import { FIELD_IDS } from '..';
import { ROUTES } from '../../../../../constants';
import BUSINESS_FIELD_IDS from '../../../../../constants/field-ids/insurance/business';
import { mockReq, mockRes, mockApplication, mockBusinessNatureOfBusiness } from '../../../../../test-mocks';
import mapAndSave from '../../map-and-save/business';
import { Request, Response } from '../../../../../../types';

const {
  NATURE_OF_YOUR_BUSINESS: { YEARS_EXPORTING, EMPLOYEES_UK },
} = BUSINESS_FIELD_IDS;

const { INSURANCE_ROOT, ALL_SECTIONS, PROBLEM_WITH_SERVICE } = ROUTES.INSURANCE;

describe('controllers/insurance/business/nature-of-business/save-and-back', () => {
  let req: Request;
  let res: Response;

  let updateMapAndSave = jest.fn(() => Promise.resolve(true));

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    mapAndSave.business = updateMapAndSave;
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  const validBody = mockBusinessNatureOfBusiness;

  describe('when there are no validation errors', () => {
    it('should redirect to all sections page', async () => {
      req.body = validBody;

      await post(req, res);

      expect(res.redirect).toHaveBeenCalledWith(`${INSURANCE_ROOT}/${req.params.referenceNumber}${ALL_SECTIONS}`);
    });

    it('should call mapAndSave.business once with data from constructPayload', async () => {
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
        [YEARS_EXPORTING]: '5O',
        [EMPLOYEES_UK]: '2000',
      };

      await post(req, res);

      expect(res.redirect).toHaveBeenCalledWith(`${INSURANCE_ROOT}/${req.params.referenceNumber}${ALL_SECTIONS}`);
    });

    it('should call mapAndSave.business once', async () => {
      req.body = {
        [YEARS_EXPORTING]: '5O',
        [EMPLOYEES_UK]: '2000',
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

    it(`should redirect to ${PROBLEM_WITH_SERVICE}`, () => {
      post(req, res);

      expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
    });
  });

  describe('api error handling', () => {
    describe('when mapAndSave.business returns false', () => {
      beforeEach(() => {
        req.body = validBody;
        res.locals = mockRes().locals;
        mapAndSave.business = jest.fn(() => Promise.resolve(false));
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });

    describe('when mapAndSave.business fails', () => {
      beforeEach(() => {
        res.locals = mockRes().locals;
        updateMapAndSave = jest.fn(() => Promise.reject(new Error('mock')));
        mapAndSave.business = updateMapAndSave;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });
  });
});
