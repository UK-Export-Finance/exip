import { post } from '.';
import BUSINESS_FIELD_IDS from '../../../../../constants/field-ids/insurance/business';
import { ROUTES } from '../../../../../constants';
import constructPayload from '../../../../../helpers/construct-payload';
import mapAndSave from '../../map-and-save/company-details';
import api from '../../../../../api';
import { Request, Response } from '../../../../../../types';
import { mockReq, mockRes, mockApplication, mockCompany } from '../../../../../test-mocks';

const { COMPANIES_HOUSE_NUMBER } = BUSINESS_FIELD_IDS;

const { INSURANCE_ROOT, ALL_SECTIONS, PROBLEM_WITH_SERVICE } = ROUTES.INSURANCE;

describe('controllers/insurance/business/companies-house-number/save-and-back', () => {
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
    describe('when there are validation errors', () => {
      const body = {
        [COMPANIES_HOUSE_NUMBER]: '8',
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
        [COMPANIES_HOUSE_NUMBER]: '8989898',
      };

      it('should redirect to next page', async () => {
        req.body = body;

        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(`${INSURANCE_ROOT}/${req.params.referenceNumber}${ALL_SECTIONS}`);
      });

      it('should call mapAndSave.companyDetails once with the data from constructPayload function and company', async () => {
        req.body = body;

        await post(req, res);

        const payload = constructPayload(req.body, [COMPANIES_HOUSE_NUMBER]);

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
        delete res.locals.application;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });

    describe('when mapAndSave.companyDetails fails', () => {
      beforeEach(() => {
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
