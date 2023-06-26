import { Request, Response } from '../../../../../../types';
import { post } from '.';
import { FIELD_IDS, ROUTES } from '../../../../../constants';
import { mockReq, mockRes, mockApplication, mockPhoneNumbers, mockCompany } from '../../../../../test-mocks';
import mapAndSave from '../../map-and-save/company-details';
import constructPayload from '../../../../../helpers/construct-payload';
import { COMPANY_DETAILS_FIELD_IDS } from '..';
import api from '../../../../../api';

const {
  EXPORTER_BUSINESS: {
    COMPANY_HOUSE: { INPUT },
    YOUR_COMPANY: { TRADING_NAME, TRADING_ADDRESS, PHONE_NUMBER },
  },
} = FIELD_IDS.INSURANCE;

const { INSURANCE_ROOT, ALL_SECTIONS, PROBLEM_WITH_SERVICE } = ROUTES.INSURANCE;

const { VALID_PHONE_NUMBERS, INVALID_PHONE_NUMBERS } = mockPhoneNumbers;

describe('controllers/insurance/business/companies-details', () => {
  let req: Request;
  let res: Response;

  let updateMapAndSave = jest.fn(() => Promise.resolve(true));

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    res.locals.application = mockApplication;

    mapAndSave.companyDetails = updateMapAndSave;

    const getCompaniesHouseResponse = jest.fn(() => Promise.resolve(mockCompany));
    api.keystone.getCompaniesHouseInformation = getCompaniesHouseResponse;
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('post', () => {
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
      const body = {
        [INPUT]: '8989898',
        [TRADING_NAME]: 'true',
        [TRADING_ADDRESS]: 'false',
        [PHONE_NUMBER]: VALID_PHONE_NUMBERS.MOBILE,
      };

      it('should redirect to next page', async () => {
        req.body = body;

        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(`${INSURANCE_ROOT}/${req.params.referenceNumber}${ALL_SECTIONS}`);
      });

      it('should call mapAndSave.companyDetails once with the data from constructPayload function and company', async () => {
        req.body = {
          ...body,
          injection: 1,
        };

        await post(req, res);

        const payload = constructPayload(req.body, COMPANY_DETAILS_FIELD_IDS);

        expect(updateMapAndSave).toHaveBeenCalledTimes(1);

        const updateBody = {
          ...payload,
          ...mockCompany,
        };

        expect(updateMapAndSave).toHaveBeenCalledWith(updateBody, mockApplication, {});
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

    describe('when mapAndSave.companyDetails fails', () => {
      beforeEach(() => {
        res.locals = { csrfToken: '1234' };
        updateMapAndSave = jest.fn(() => Promise.reject());
        mapAndSave.companyDetails = updateMapAndSave;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, () => {
        post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });
  });
});
