import { post } from '.';
import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';
import { FIELD_ID } from '..';
import constructPayload from '../../../../../helpers/construct-payload';
import mapAndSave from '../../map-and-save/export-contract-agent-service-charge';
import generateValidationErrors from '../validation';
import { Request, ResponseInsurance } from '../../../../../../types';
import { mockApplication, mockReq, mockResInsurance, mockSpyPromiseRejection } from '../../../../../test-mocks';

const { INSURANCE_ROOT, ALL_SECTIONS, PROBLEM_WITH_SERVICE } = INSURANCE_ROUTES;

describe('controllers/insurance/export-contract/how-much-the-agent-is-charging/save-and-back', () => {
  let req: Request;
  let res: ResponseInsurance;

  jest.mock('../../map-and-save/export-contract-agent-service-charge');

  let mapAndSaveSpy = jest.fn(() => Promise.resolve(true));

  const refNumber = Number(mockApplication.referenceNumber);

  const mockFormBody = {
    _csrf: '1234',
    [FIELD_ID]: 'mock',
  };

  beforeEach(() => {
    req = mockReq();
    res = mockResInsurance();

    req.params.referenceNumber = String(mockApplication.referenceNumber);

    req.body = mockFormBody;

    mapAndSave.exportContractAgentServiceCharge = mapAndSaveSpy;
  });

  describe('when the form has data', () => {
    beforeEach(() => {
      mapAndSave.exportContractAgentServiceCharge = mapAndSaveSpy;
    });

    it('should call mapAndSave.exportContractAgentServiceCharge with data from constructPayload function, application and validationErrors', async () => {
      await post(req, res);

      const payload = constructPayload(req.body, [FIELD_ID]);

      const validationErrors = generateValidationErrors(payload);

      expect(mapAndSave.exportContractAgentServiceCharge).toHaveBeenCalledTimes(1);
      expect(mapAndSave.exportContractAgentServiceCharge).toHaveBeenCalledWith(payload, res.locals.application, validationErrors);
    });

    it(`should redirect to ${ALL_SECTIONS}`, async () => {
      await post(req, res);

      const expected = `${INSURANCE_ROOT}/${refNumber}${ALL_SECTIONS}`;

      expect(res.redirect).toHaveBeenCalledWith(expected);
    });
  });

  describe('when the form does not have any data', () => {
    it(`should redirect to ${ALL_SECTIONS}`, async () => {
      req.body = { _csrf: '1234' };

      await post(req, res);

      const expected = `${INSURANCE_ROOT}/${refNumber}${ALL_SECTIONS}`;

      expect(res.redirect).toHaveBeenCalledWith(expected);
    });
  });

  describe('when there is an error calling the API', () => {
    beforeAll(() => {
      mapAndSaveSpy = mockSpyPromiseRejection;

      mapAndSave.exportContractAgentServiceCharge = mapAndSaveSpy;
    });

    it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
      await post(req, res);

      expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
    });
  });
});
