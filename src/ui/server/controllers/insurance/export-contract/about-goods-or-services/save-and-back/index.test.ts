import { post } from '.';
import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';
import EXPORT_CONTRACT_FIELD_IDS from '../../../../../constants/field-ids/insurance/export-contract';
import { FIELD_IDS } from '..';
import constructPayload from '../../../../../helpers/construct-payload';
import mapAndSave from '../../map-and-save';
import generateValidationErrors from '../validation';
import api from '../../../../../api';
import { Request, Response } from '../../../../../../types';
import { mockApplication, mockCountries, mockReq, mockRes } from '../../../../../test-mocks';

const { INSURANCE_ROOT, ALL_SECTIONS, PROBLEM_WITH_SERVICE } = INSURANCE_ROUTES;

const {
  ABOUT_GOODS_OR_SERVICES: { DESCRIPTION, FINAL_DESTINATION },
} = EXPORT_CONTRACT_FIELD_IDS;

describe('controllers/insurance/export-contract/about-goods-or-services/save-and-back', () => {
  let req: Request;
  let res: Response;

  jest.mock('../../map-and-save');

  let mapAndSaveSpy = jest.fn(() => Promise.resolve(true));
  const getCountriesSpy = jest.fn(() => Promise.resolve(mockCountries));

  const refNumber = Number(mockApplication.referenceNumber);

  const mockFormBody = {
    _csrf: '1234',
    [DESCRIPTION]: 'Mock description',
  };

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    req.params.referenceNumber = String(mockApplication.referenceNumber);

    req.body = mockFormBody;

    api.keystone.countries.getAll = getCountriesSpy;
    mapAndSave.exportContract = mapAndSaveSpy;
  });

  describe('when the form has data', () => {
    beforeEach(() => {
      api.keystone.countries.getAll = getCountriesSpy;
      mapAndSave.exportContract = mapAndSaveSpy;
    });

    describe(`when the form has ${FINAL_DESTINATION}`, () => {
      beforeEach(() => {
        req.body[FINAL_DESTINATION] = mockCountries[0].isoCode;
      });

      it('should call api.keystone.countries.getAll', async () => {
        await post(req, res);

        expect(getCountriesSpy).toHaveBeenCalledTimes(1);
      });

      it('should call mapAndSave.exportContract with data from constructPayload function, application, validationErrors and countries', async () => {
        await post(req, res);

        const payload = constructPayload(req.body, FIELD_IDS);

        const validationErrors = generateValidationErrors(payload);

        expect(mapAndSave.exportContract).toHaveBeenCalledTimes(1);
        expect(mapAndSave.exportContract).toHaveBeenCalledWith(payload, res.locals.application, validationErrors, mockCountries);
      });

      it(`should redirect to ${ALL_SECTIONS}`, async () => {
        await post(req, res);

        const expected = `${INSURANCE_ROOT}/${refNumber}${ALL_SECTIONS}`;

        expect(res.redirect).toHaveBeenCalledWith(expected);
      });
    });

    describe(`when the form does NOT have ${FINAL_DESTINATION}`, () => {
      beforeEach(() => {
        jest.resetAllMocks();

        api.keystone.countries.getAll = getCountriesSpy;

        mapAndSaveSpy = jest.fn(() => Promise.resolve(true));
        mapAndSave.exportContract = mapAndSaveSpy;

        req.body = {
          _csrf: '1234',
          [DESCRIPTION]: 'Mock description',
        };
      });

      it('should NOT call api.keystone.countries.getAll', async () => {
        await post(req, res);

        expect(getCountriesSpy).toHaveBeenCalledTimes(0);
      });

      it('should call mapAndSave.exportContract with data from constructPayload function, application, validationErrors and empty countries', async () => {
        await post(req, res);

        const payload = constructPayload(req.body, FIELD_IDS);

        const validationErrors = generateValidationErrors(payload);

        expect(mapAndSave.exportContract).toHaveBeenCalledTimes(1);
        expect(mapAndSave.exportContract).toHaveBeenCalledWith(payload, res.locals.application, validationErrors, []);
      });

      it(`should redirect to ${ALL_SECTIONS}`, async () => {
        mapAndSave.exportContract = mapAndSaveSpy;

        await post(req, res);

        const expected = `${INSURANCE_ROOT}/${refNumber}${ALL_SECTIONS}`;

        expect(res.redirect).toHaveBeenCalledWith(expected);
      });
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

  describe('api error handling', () => {
    describe('when the mapAndSave call does not return anything', () => {
      beforeEach(() => {
        mapAndSaveSpy = jest.fn(() => Promise.resolve(false));
        mapAndSave.exportContract = mapAndSaveSpy;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });

    describe('when the mapAndSave call fails', () => {
      beforeEach(() => {
        mapAndSaveSpy = jest.fn(() => Promise.reject(new Error('mock')));

        mapAndSave.exportContract = mapAndSaveSpy;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });
  });
});
