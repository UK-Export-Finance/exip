import { post } from '.';
import { FIELD_IDS } from '..';
import { ROUTES } from '../../../../../constants/routes';
import constructPayload from '../../../../../helpers/construct-payload';
import mapAndSave from '../../map-and-save/jointly-insured-party';
import generateValidationErrors from '../validation';
import { mockReq, mockRes, mockApplication } from '../../../../../test-mocks';
import { Request, Response } from '../../../../../../types';

const { INSURANCE_ROOT, ALL_SECTIONS, PROBLEM_WITH_SERVICE } = ROUTES.INSURANCE;

const [COMPANY_NAME, COMPANY_NUMBER, COUNTRY_CODE] = FIELD_IDS;

describe('controllers/insurance/policy/other-company-details/save-and-back', () => {
  let req: Request;
  let res: Response;

  let updateMapAndSave = jest.fn(() => Promise.resolve(true));

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    mapAndSave.jointlyInsuredParty = updateMapAndSave;
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  const validBody = {
    [COMPANY_NAME]: mockApplication.policy.jointlyInsuredParty[COMPANY_NAME],
    [COUNTRY_CODE]: mockApplication.policy.jointlyInsuredParty[COUNTRY_CODE],
    [COMPANY_NUMBER]: mockApplication.policy.jointlyInsuredParty[COMPANY_NUMBER],
  };

  describe('when there are no validation errors', () => {
    beforeEach(async () => {
      req.body = validBody;

      await post(req, res);
    });

    it('should redirect to all sections page', () => {
      expect(res.redirect).toHaveBeenCalledWith(`${INSURANCE_ROOT}/${req.params.referenceNumber}${ALL_SECTIONS}`);
    });

    it('should call mapAndSave.jointlyInsuredParty once with data from constructPayload function', () => {
      const payload = constructPayload(req.body, FIELD_IDS);

      expect(updateMapAndSave).toHaveBeenCalledTimes(1);

      const validationErrors = generateValidationErrors(validBody);

      expect(updateMapAndSave).toHaveBeenCalledWith(payload, mockApplication, validationErrors);
    });
  });

  describe('when there are validation errors', () => {
    const mockInvalidBody = {
      [COMPANY_NAME]: '',
    };

    beforeEach(async () => {
      req.body = mockInvalidBody;

      await post(req, res);
    });

    it('should redirect to all sections page', () => {
      expect(res.redirect).toHaveBeenCalledWith(`${INSURANCE_ROOT}/${req.params.referenceNumber}${ALL_SECTIONS}`);
    });

    it('should call mapAndSave.jointlyInsuredParty once with data from constructPayload function and validation errors', () => {
      const payload = constructPayload(req.body, FIELD_IDS);

      expect(updateMapAndSave).toHaveBeenCalledTimes(1);

      const validationErrors = generateValidationErrors(mockInvalidBody);

      expect(updateMapAndSave).toHaveBeenCalledWith(payload, mockApplication, validationErrors);
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
    beforeEach(() => {
      req.body = validBody;
      res.locals = mockRes().locals;
    });

    describe('when mapAndSave.jointlyInsuredParty returns false', () => {
      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        mapAndSave.jointlyInsuredParty = jest.fn(() => Promise.resolve(false));

        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });

    describe('when mapAndSave.jointlyInsuredParty fails', () => {
      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        updateMapAndSave = jest.fn(() => Promise.reject(new Error('mock')));
        mapAndSave.jointlyInsuredParty = updateMapAndSave;

        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });
  });
});
