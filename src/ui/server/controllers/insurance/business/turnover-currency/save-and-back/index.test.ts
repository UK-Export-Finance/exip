import { FIELD_IDS } from '..';
import { post } from '.';
import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';
import INSURANCE_FIELD_IDS from '../../../../../constants/field-ids/insurance';
import constructPayload from '../../../../../helpers/construct-payload';
import generateValidationErrors from '../validation';
import mapAndSave from '../../map-and-save/turnover';
import { Request, ResponseInsurance } from '../../../../../../types';
import { EUR, mockReq, mockResInsurance, mockSpyPromiseRejection, referenceNumber } from '../../../../../test-mocks';

const {
  CURRENCY: { CURRENCY_CODE },
} = INSURANCE_FIELD_IDS;

const { INSURANCE_ROOT, ALL_SECTIONS, PROBLEM_WITH_SERVICE } = INSURANCE_ROUTES;

describe('controllers/insurance/business/turnover-currency/save-and-back', () => {
  let req: Request;
  let res: ResponseInsurance;

  jest.mock('../../map-and-save/turnover');

  let mapAndSaveSpy = jest.fn(() => Promise.resolve(true));

  const mockFormBody = {
    [CURRENCY_CODE]: EUR.isoCode,
  };

  beforeEach(() => {
    req = mockReq();
    res = mockResInsurance();

    req.body = mockFormBody;

    mapAndSave.turnover = mapAndSaveSpy;
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('when the form has data', () => {
    beforeEach(() => {
      jest.resetAllMocks();

      mapAndSaveSpy = jest.fn(() => Promise.resolve(true));
      mapAndSave.turnover = mapAndSaveSpy;
    });

    it('should call mapAndSave.turnover with data from constructPayload function, application and validationErrors', async () => {
      await post(req, res);

      const payload = constructPayload(req.body, FIELD_IDS);

      const validationErrors = generateValidationErrors(payload);

      expect(mapAndSave.turnover).toHaveBeenCalledTimes(1);
      expect(mapAndSave.turnover).toHaveBeenCalledWith(payload, res.locals.application, validationErrors);
    });

    it(`should redirect to ${ALL_SECTIONS}`, async () => {
      mapAndSave.turnover = mapAndSaveSpy;

      await post(req, res);

      const expected = `${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      expect(res.redirect).toHaveBeenCalledWith(expected);
    });
  });

  describe('when the form does not have any data', () => {
    it(`should redirect to ${ALL_SECTIONS}`, async () => {
      req.body = { _csrf: '1234' };

      await post(req, res);

      const expected = `${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      expect(res.redirect).toHaveBeenCalledWith(expected);
    });
  });

  describe('api error handling', () => {
    describe('when mapAndSave.turnover returns false', () => {
      beforeEach(() => {
        mapAndSaveSpy = jest.fn(() => Promise.resolve(false));
        mapAndSave.turnover = mapAndSaveSpy;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });

    describe('when mapAndSave.turnover fails', () => {
      beforeEach(() => {
        mapAndSaveSpy = mockSpyPromiseRejection;
        mapAndSave.turnover = mapAndSaveSpy;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });
  });
});
