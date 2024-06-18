import { post } from '.';
import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';
import { ERROR_MESSAGE, FIELD_ID } from '..';
import constructPayload from '../../../../../helpers/construct-payload';
import mapAndSave from '../../map-and-save/export-contract-agent';
import generateValidationErrors from '../../../../../shared-validation/yes-no-radios-form';
import { Request, Response } from '../../../../../../types';
import { referenceNumber, mockCountries, mockReq, mockRes } from '../../../../../test-mocks';

const { INSURANCE_ROOT, ALL_SECTIONS, PROBLEM_WITH_SERVICE } = INSURANCE_ROUTES;

describe('controllers/insurance/export-contract/agent/save-and-back', () => {
  let req: Request;
  let res: Response;

  jest.mock('../../map-and-save/export-contract-agent');

  let mapAndSaveSpy = jest.fn(() => Promise.resolve(true));

  const mockFormBody = {
    _csrf: '1234',
    [FIELD_ID]: 'Mock description',
  };

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    req.body = mockFormBody;

    mapAndSave.exportContractAgent = mapAndSaveSpy;
  });

  describe('when the form has data', () => {
    beforeEach(() => {
      mapAndSave.exportContractAgent = mapAndSaveSpy;
    });

    describe(`when the form has ${FIELD_ID}`, () => {
      beforeEach(() => {
        req.body[FIELD_ID] = mockCountries[0].isoCode;
      });

      it('should call mapAndSave.exportContractAgent with data from constructPayload function, application and validationErrors', async () => {
        await post(req, res);

        const payload = constructPayload(req.body, [FIELD_ID]);

        const validationErrors = generateValidationErrors(payload, FIELD_ID, ERROR_MESSAGE);

        expect(mapAndSave.exportContractAgent).toHaveBeenCalledTimes(1);
        expect(mapAndSave.exportContractAgent).toHaveBeenCalledWith(payload, res.locals.application, validationErrors);
      });

      it(`should redirect to ${ALL_SECTIONS}`, async () => {
        await post(req, res);

        const expected = `${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`;

        expect(res.redirect).toHaveBeenCalledWith(expected);
      });
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

      mapAndSave.exportContractAgent = mapAndSaveSpy;
    });

    it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
      await post(req, res);

      expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
    });
  });
});
