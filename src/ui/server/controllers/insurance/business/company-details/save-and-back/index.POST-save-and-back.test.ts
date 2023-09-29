import { post } from '.';
import { FIELD_IDS } from '..';
import { ROUTES } from '../../../../../constants';
import BUSINESS_FIELD_IDS from '../../../../../constants/field-ids/insurance/business';
import constructPayload from '../../../../../helpers/construct-payload';
import mapAndSave from '../../map-and-save/company-details';
import api from '../../../../../api';
import { Request, Response } from '../../../../../../types';
import { mockReq, mockRes, mockApplication, mockPhoneNumbers, mockCompany } from '../../../../../test-mocks';

const {
  YOUR_COMPANY: { TRADING_NAME, TRADING_ADDRESS, PHONE_NUMBER },
} = BUSINESS_FIELD_IDS;

const { INSURANCE_ROOT, ALL_SECTIONS, PROBLEM_WITH_SERVICE } = ROUTES.INSURANCE;

const { VALID_PHONE_NUMBERS, INVALID_PHONE_NUMBERS } = mockPhoneNumbers;

describe('controllers/insurance/business/companies-details', () => {
  let req: Request;
  let res: Response;

  let updateMapAndSave = jest.fn(() => Promise.resolve(true));

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    mapAndSave.companyDetails = updateMapAndSave;

    const getCompaniesHouseResponse = jest.fn(() => Promise.resolve(mockCompany));
    api.keystone.getCompaniesHouseInformation = getCompaniesHouseResponse;
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('post', () => {
    const validBody = {
      [TRADING_NAME]: 'true',
      [TRADING_ADDRESS]: 'false',
      [PHONE_NUMBER]: VALID_PHONE_NUMBERS.MOBILE,
    };

    describe('when there are validation errors', () => {
      const body = {
        [TRADING_NAME]: 'true',
        [TRADING_ADDRESS]: 'false',
        [PHONE_NUMBER]: INVALID_PHONE_NUMBERS.TOO_SHORT_SPECIAL_CHAR,
      };

      it('should redirect to next page', async () => {
        req.body = body;

        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(`${INSURANCE_ROOT}/${req.params.referenceNumber}${ALL_SECTIONS}`);
      });

      it('should call mapAndSave.companyDetails once', async () => {
        req.body = body;

        await post(req, res);

        expect(updateMapAndSave).toHaveBeenCalledTimes(1);
      });
    });

    describe('when there are no validation errors', () => {
      it('should redirect to next page', async () => {
        req.body = validBody;

        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(`${INSURANCE_ROOT}/${req.params.referenceNumber}${ALL_SECTIONS}`);
      });

      it('should call mapAndSave.companyDetails once with the data from constructPayload function and company', async () => {
        req.body = validBody;

        await post(req, res);

        const payload = constructPayload(req.body, FIELD_IDS);

        expect(updateMapAndSave).toHaveBeenCalledTimes(1);

        expect(updateMapAndSave).toHaveBeenCalledWith(payload, mockApplication, false);
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

    describe('api error handling', () => {
      describe('when saveResponse returns false', () => {
        beforeEach(() => {
          req.body = validBody;
          res.locals = mockRes().locals;
          mapAndSave.companyDetails = jest.fn(() => Promise.resolve(false));
        });

        it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
          await post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
        });
      });

      describe('when mapAndSave.companyDetails fails', () => {
        beforeEach(() => {
          req.body = validBody;
          res.locals = mockRes().locals;
          updateMapAndSave = jest.fn(() => Promise.reject());
          mapAndSave.companyDetails = updateMapAndSave;
        });

        it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
          await post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
        });
      });
    });
  });
});
