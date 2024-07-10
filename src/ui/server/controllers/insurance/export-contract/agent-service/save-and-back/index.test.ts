import { post } from '.';
import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';
import { FIELD_IDS } from '..';
import constructPayload from '../../../../../helpers/construct-payload';
import mapAndSave from '../../map-and-save/export-contract-agent-service';
import generateValidationErrors from '../validation';
import { Request, Response } from '../../../../../../types';
import { mockApplication, mockReq, mockRes } from '../../../../../test-mocks';

const { INSURANCE_ROOT, ALL_SECTIONS, PROBLEM_WITH_SERVICE } = INSURANCE_ROUTES;

const [NAME] = FIELD_IDS;

describe('controllers/insurance/export-contract/agent-service/save-and-back', () => {
  let req: Request;
  let res: Response;

  jest.mock('../../map-and-save/export-contract-agent-service');

  let mapAndSaveSpy = jest.fn(() => Promise.resolve(true));

  const refNumber = Number(mockApplication.referenceNumber);

  const mockFormBody = {
    _csrf: '1234',
    [NAME]: 'Mock name',
  };

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    req.params.referenceNumber = String(mockApplication.referenceNumber);

    req.body = mockFormBody;

    mapAndSave.exportContractAgentService = mapAndSaveSpy;
  });

  describe('when the form has data', () => {
    beforeEach(() => {
      mapAndSave.exportContractAgentService = mapAndSaveSpy;
    });

    it('should call mapAndSave.exportContractAgentService with data from constructPayload function, application and validationErrors', async () => {
      await post(req, res);

      const payload = constructPayload(req.body, FIELD_IDS);

      const validationErrors = generateValidationErrors(payload);

      expect(mapAndSave.exportContractAgentService).toHaveBeenCalledTimes(1);
      expect(mapAndSave.exportContractAgentService).toHaveBeenCalledWith(payload, res.locals.application, validationErrors);
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

  describe('when there is no application', () => {
    beforeEach(() => {
      delete res.locals.application;
    });

    it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
      await post(req, res);

      expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
    });
  });

  describe('when there is an error calling the API', () => {
    beforeAll(() => {
      mapAndSaveSpy = jest.fn(() => Promise.reject(new Error('mock')));

      mapAndSave.exportContractAgentService = mapAndSaveSpy;
    });

    it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
      await post(req, res);

      expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
    });
  });
});
