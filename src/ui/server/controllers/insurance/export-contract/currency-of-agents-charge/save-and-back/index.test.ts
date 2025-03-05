import { post } from '.';
import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';
import INSURANCE_FIELD_IDS from '../../../../../constants/field-ids/insurance';
import { FIELD_IDS } from '..';
import constructPayload from '../../../../../helpers/construct-payload';
import mapAndSave from '../../map-and-save/export-contract-agent-service-charge';
import generateValidationErrors from '../validation';
import { Request, ResponseInsurance } from '../../../../../../types';
import { EUR, mockReq, mockResInsurance, mockSpyPromiseRejection, referenceNumber } from '../../../../../test-mocks';

const { INSURANCE_ROOT, ALL_SECTIONS, PROBLEM_WITH_SERVICE } = INSURANCE_ROUTES;

const {
  CURRENCY: { CURRENCY_CODE },
} = INSURANCE_FIELD_IDS;

describe('controllers/insurance/export-contract/currency-of-agents-charge/save-and-back', () => {
  let req: Request;
  let res: ResponseInsurance;

  jest.mock('../../map-and-save/export-contract-agent-service-charge');

  let mapAndSaveSpy = jest.fn(() => Promise.resolve(true));

  const mockFormBody = {
    _csrf: '1234',
    [CURRENCY_CODE]: EUR.isoCode,
  };

  beforeEach(() => {
    req = mockReq();
    res = mockResInsurance();

    req.body = mockFormBody;

    mapAndSave.exportContractAgentServiceCharge = mapAndSaveSpy;
  });

  describe('when the form has data', () => {
    beforeEach(() => {
      jest.resetAllMocks();

      mapAndSaveSpy = jest.fn(() => Promise.resolve(true));
      mapAndSave.exportContractAgentServiceCharge = mapAndSaveSpy;
    });

    it('should call mapAndSave.exportContractAgentServiceCharge with data from constructPayload function, application and validationErrors', async () => {
      await post(req, res);

      const payload = constructPayload(req.body, FIELD_IDS);

      const validationErrors = generateValidationErrors(payload);

      expect(mapAndSave.exportContractAgentServiceCharge).toHaveBeenCalledTimes(1);
      expect(mapAndSave.exportContractAgentServiceCharge).toHaveBeenCalledWith(payload, res.locals.application, validationErrors);
    });

    it(`should redirect to ${ALL_SECTIONS}`, async () => {
      mapAndSave.exportContractAgentServiceCharge = mapAndSaveSpy;

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
    describe('when the mapAndSave call does not return anything', () => {
      beforeEach(() => {
        mapAndSaveSpy = jest.fn(() => Promise.resolve(false));
        mapAndSave.exportContractAgentServiceCharge = mapAndSaveSpy;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });

    describe('when the mapAndSave call fails', () => {
      beforeEach(() => {
        mapAndSaveSpy = mockSpyPromiseRejection;

        mapAndSave.exportContractAgentServiceCharge = mapAndSaveSpy;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });
  });
});
