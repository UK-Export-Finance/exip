import { FIELD_IDS } from '..';
import { post } from '.';
import { ROUTES } from '../../../../../constants';
import INSURANCE_FIELD_IDS from '../../../../../constants/field-ids/insurance';
import constructPayload from '../../../../../helpers/construct-payload';
import generateValidationErrors from '../validation';
import mapAndSave from '../../map-and-save';
import { Request, Response } from '../../../../../../types';
import { mockReq, mockRes, mockApplication, mockBuyer } from '../../../../../test-mocks';

const {
  WORKING_WITH_BUYER: { CONNECTED_WITH_BUYER, TRADED_WITH_BUYER },
} = INSURANCE_FIELD_IDS.YOUR_BUYER;

const { INSURANCE_ROOT, ALL_SECTIONS, PROBLEM_WITH_SERVICE } = ROUTES.INSURANCE;

describe('controllers/insurance/your-buyer/working-with-buyer/save-and-back', () => {
  let req: Request;
  let res: Response;

  let updateMapAndSave = jest.fn(() => Promise.resolve(true));

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    res.locals.application = mockApplication;

    mapAndSave.yourBuyer = updateMapAndSave;
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('post - save and back', () => {
    const validBody = {
      [CONNECTED_WITH_BUYER]: mockBuyer[CONNECTED_WITH_BUYER],
      [TRADED_WITH_BUYER]: mockBuyer[TRADED_WITH_BUYER],
    };

    describe('when there are no validation errors', () => {
      it('should redirect to all sections page', async () => {
        req.body = validBody;

        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(`${INSURANCE_ROOT}/${req.params.referenceNumber}${ALL_SECTIONS}`);
      });

      it('should call mapAndSave.buyer once with data from constructPayload function', async () => {
        req.body = validBody;

        await post(req, res);

        expect(updateMapAndSave).toHaveBeenCalledTimes(1);

        const payload = constructPayload(req.body, FIELD_IDS);
        const validationErrors = generateValidationErrors(payload);

        expect(updateMapAndSave).toHaveBeenCalledWith(payload, res.locals.application, validationErrors);
      });
    });

    describe('when there are validation errors', () => {
      it('should redirect to all sections page', async () => {
        req.body = {
          [TRADED_WITH_BUYER]: mockBuyer[TRADED_WITH_BUYER],
        };

        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(`${INSURANCE_ROOT}/${req.params.referenceNumber}${ALL_SECTIONS}`);
      });

      it('should call mapAndSave.buyer once with data from constructPayload function', async () => {
        req.body = {
          [TRADED_WITH_BUYER]: mockBuyer[TRADED_WITH_BUYER],
        };

        await post(req, res);

        expect(updateMapAndSave).toHaveBeenCalledTimes(1);

        const payload = constructPayload(req.body, FIELD_IDS);
        const validationErrors = generateValidationErrors(payload);

        expect(updateMapAndSave).toHaveBeenCalledWith(payload, res.locals.application, validationErrors);
      });
    });

    describe('when there is no application', () => {
      beforeEach(() => {
        res.locals = { csrfToken: '1234' };
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, () => {
        post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });

    describe('when mapAndSave.buyer returns false', () => {
      beforeEach(() => {
        res.locals = { csrfToken: '1234' };
        updateMapAndSave = jest.fn(() => Promise.resolve(false));
        mapAndSave.yourBuyer = updateMapAndSave;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, () => {
        post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });

    describe('when mapAndSave.buyer fails', () => {
      beforeEach(() => {
        res.locals = { csrfToken: '1234' };
        updateMapAndSave = jest.fn(() => Promise.reject());
        mapAndSave.yourBuyer = updateMapAndSave;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, () => {
        post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });
  });
});
