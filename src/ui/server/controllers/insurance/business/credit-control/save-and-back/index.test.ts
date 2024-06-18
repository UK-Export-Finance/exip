import { post } from '.';
import constructPayload from '../../../../../helpers/construct-payload';
import { FIELD_ID } from '..';
import { ROUTES } from '../../../../../constants';
import { mockReq, mockRes, mockApplication } from '../../../../../test-mocks';
import mapAndSave from '../../map-and-save/business';
import { Request, Response } from '../../../../../../types';

const { INSURANCE_ROOT, ALL_SECTIONS, PROBLEM_WITH_SERVICE } = ROUTES.INSURANCE;

describe('controllers/insurance/business/credit-control/save-and-back', () => {
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

  const validBody = {
    [FIELD_ID]: 'true',
  };

  describe('when there are no validation errors', () => {
    beforeEach(() => {
      req.body = validBody;
    });

    it('should redirect to all sections page', async () => {
      await post(req, res);

      expect(res.redirect).toHaveBeenCalledWith(`${INSURANCE_ROOT}/${req.params.referenceNumber}${ALL_SECTIONS}`);
    });

    it('should call mapAndSave.business once with data from constructPayload', async () => {
      await post(req, res);

      const payload = constructPayload(req.body, [FIELD_ID]);

      expect(updateMapAndSave).toHaveBeenCalledTimes(1);

      expect(updateMapAndSave).toHaveBeenCalledWith(payload, mockApplication);
    });
  });

  describe('when there are validation errors', () => {
    beforeEach(() => {
      req.body = {
        [FIELD_ID]: '',
      };
    });

    it('should redirect to all sections page', async () => {
      await post(req, res);

      expect(res.redirect).toHaveBeenCalledWith(`${INSURANCE_ROOT}/${req.params.referenceNumber}${ALL_SECTIONS}`);
    });

    it('should NOT call mapAndSave.business', async () => {
      await post(req, res);

      expect(updateMapAndSave).toHaveBeenCalledTimes(0);
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
        req.body = validBody;
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
