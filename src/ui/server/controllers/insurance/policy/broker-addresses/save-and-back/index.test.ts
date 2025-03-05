import { post } from '.';
import { ROUTES } from '../../../../../constants';
import constructPayload from '../../../../../helpers/construct-payload';
import generateValidationErrors from '../../../../../shared-validation/yes-no-radios-form';
import getOrdnanceSurveyAddressById from '../../../../../helpers/get-chosen-ordnance-survey-address/by-id';
import mapAndSave from '../../map-and-save/broker';
import { FIELD_ID, ERROR_MESSAGE } from '..';
import api from '../../../../../api';
import { Request, ResponseInsurance } from '../../../../../../types';
import {
  mockReq,
  mockResInsurance,
  mockApplication,
  mockOrdnanceSurveyAddressResponse,
  mockSpyPromiseRejection,
  referenceNumber,
} from '../../../../../test-mocks';

const { INSURANCE_ROOT, ALL_SECTIONS, PROBLEM_WITH_SERVICE } = ROUTES.INSURANCE;

const { postcode, buildingNumberOrName } = mockApplication.broker;

describe('controllers/insurance/policy/broker-addresses/save-and-back', () => {
  let req: Request;
  let res: ResponseInsurance;

  const getOrdnanceSurveyAddressesSpy = jest.fn(() => Promise.resolve(mockOrdnanceSurveyAddressResponse));
  let updateMapAndSave = jest.fn(() => Promise.resolve(true));

  beforeEach(() => {
    req = mockReq();
    res = mockResInsurance();

    api.keystone.getOrdnanceSurveyAddresses = getOrdnanceSurveyAddressesSpy;
    mapAndSave.broker = updateMapAndSave;
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  const validBody = {
    [FIELD_ID]: '0',
  };

  describe('when there are no validation errors', () => {
    beforeEach(async () => {
      req.body = validBody;

      await post(req, res);
    });

    it('should call api.keystone.getOrdnanceSurveyAddress', () => {
      expect(getOrdnanceSurveyAddressesSpy).toHaveBeenCalledTimes(1);

      expect(getOrdnanceSurveyAddressesSpy).toHaveBeenCalledWith(postcode, buildingNumberOrName);
    });

    it('should call mapAndSave.broker once with address data', () => {
      const payload = constructPayload(req.body, [FIELD_ID]);

      const chosenAddress = getOrdnanceSurveyAddressById(payload, FIELD_ID, mockOrdnanceSurveyAddressResponse.addresses);

      const validationErrors = generateValidationErrors(payload, FIELD_ID, ERROR_MESSAGE);

      expect(updateMapAndSave).toHaveBeenCalledTimes(1);

      expect(updateMapAndSave).toHaveBeenCalledWith(chosenAddress, mockApplication, validationErrors);
    });

    it('should redirect to all sections page', () => {
      expect(res.redirect).toHaveBeenCalledWith(`${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`);
    });
  });

  describe('when there are validation errors', () => {
    const mockInvalidBody = {};

    beforeEach(async () => {
      req.body = mockInvalidBody;

      await post(req, res);
    });

    it('should redirect to all sections page', () => {
      expect(res.redirect).toHaveBeenCalledWith(`${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`);
    });

    it('should NOT call api.keystone.getOrdnanceSurveyAddress', () => {
      expect(getOrdnanceSurveyAddressesSpy).toHaveBeenCalledTimes(0);
    });

    it('should NOT call mapAndSave.broker', () => {
      expect(updateMapAndSave).toHaveBeenCalledTimes(0);
    });
  });

  describe('api error handling', () => {
    describe('when api.keystone.getOrdnanceSurveyAddresses throws an error', () => {
      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        req.body = validBody;

        api.keystone.getOrdnanceSurveyAddresses = jest.fn(() => Promise.reject(mockOrdnanceSurveyAddressResponse));

        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });

    describe('when mapAndSave.broker returns false', () => {
      beforeEach(() => {
        req.body = validBody;

        api.keystone.getOrdnanceSurveyAddresses = jest.fn(() => Promise.resolve(mockOrdnanceSurveyAddressResponse));
        mapAndSave.broker = jest.fn(() => Promise.resolve(false));
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });

    describe('when mapAndSave.broker fails', () => {
      beforeEach(() => {
        req.body = validBody;

        updateMapAndSave = mockSpyPromiseRejection;
        mapAndSave.broker = updateMapAndSave;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });
  });
});
