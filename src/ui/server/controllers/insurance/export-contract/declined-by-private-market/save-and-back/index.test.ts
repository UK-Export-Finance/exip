import { post } from '.';
import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';
import { FIELD_ID } from '..';
import constructPayload from '../../../../../helpers/construct-payload';
import mapAndSave from '../../map-and-save/private-market';
import generateValidationErrors from '../validation';
import { Request, ResponseInsurance } from '../../../../../../types';
import { mockCountries, mockReq, mockResInsurance, mockSpyPromiseRejection, referenceNumber } from '../../../../../test-mocks';

const { INSURANCE_ROOT, ALL_SECTIONS, PROBLEM_WITH_SERVICE } = INSURANCE_ROUTES;

describe('controllers/insurance/export-contract/declined-by-private-market/save-and-back', () => {
  let req: Request;
  let res: ResponseInsurance;

  jest.mock('../../map-and-save/export-contract');

  let mapAndSaveSpy = jest.fn(() => Promise.resolve(true));

  const mockFormBody = {
    _csrf: '1234',
    [FIELD_ID]: 'Mock description',
  };

  beforeEach(() => {
    req = mockReq();
    res = mockResInsurance();

    req.body = mockFormBody;

    mapAndSave.privateMarket = mapAndSaveSpy;
  });

  describe('when the form has data', () => {
    beforeEach(() => {
      mapAndSave.privateMarket = mapAndSaveSpy;
    });

    describe(`when the form has ${FIELD_ID}`, () => {
      beforeEach(() => {
        req.body[FIELD_ID] = mockCountries[0].isoCode;
      });

      it('should call mapAndSave.privateMarket with data from constructPayload function, application and validationErrors', async () => {
        await post(req, res);

        const payload = constructPayload(req.body, [FIELD_ID]);

        const validationErrors = generateValidationErrors(payload);

        expect(mapAndSave.privateMarket).toHaveBeenCalledTimes(1);
        expect(mapAndSave.privateMarket).toHaveBeenCalledWith(payload, res.locals.application, validationErrors);
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

  describe('api error handling', () => {
    describe('when the mapAndSave call fails', () => {
      beforeEach(() => {
        mapAndSaveSpy = mockSpyPromiseRejection;

        mapAndSave.privateMarket = mapAndSaveSpy;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });
  });
});
