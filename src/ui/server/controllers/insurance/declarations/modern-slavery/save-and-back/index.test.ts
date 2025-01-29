import { post } from '.';
import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';
import DECLARATIONS_FIELD_IDS from '../../../../../constants/field-ids/insurance/declarations';
import { FIELD_IDS } from '..';
import constructPayload from '../../../../../helpers/construct-payload';
import mapAndSave from '../../map-and-save/modern-slavery';
import generateValidationErrors from '../validation';
import { Request, ResponseInsurance } from '../../../../../../types';
import { mockReq, mockResInsurance, mockSpyPromiseRejection, referenceNumber } from '../../../../../test-mocks';

const { INSURANCE_ROOT, ALL_SECTIONS, PROBLEM_WITH_SERVICE } = INSURANCE_ROUTES;

const {
  MODERN_SLAVERY: { WILL_ADHERE_TO_ALL_REQUIREMENTS },
} = DECLARATIONS_FIELD_IDS;

describe('controllers/insurance/declarations/modern-slavery/save-and-back', () => {
  let req: Request;
  let res: ResponseInsurance;

  jest.mock('../../map-and-save/modern-slavery');

  let mapAndSaveSpy = jest.fn(() => Promise.resolve(true));

  const mockFormBody = {
    _csrf: '1234',
    [WILL_ADHERE_TO_ALL_REQUIREMENTS]: 'true',
  };

  beforeEach(() => {
    req = mockReq();
    res = mockResInsurance();

    mapAndSave.declarationModernSlavery = mapAndSaveSpy;
  });

  describe('when the form has data', () => {
    beforeEach(() => {
      mapAndSaveSpy = jest.fn(() => Promise.resolve(true));
      mapAndSave.declarationModernSlavery = mapAndSaveSpy;

      req.body = mockFormBody;
    });

    it('should call mapAndSave.declarationModernSlavery with data from constructPayload function, application and validationErrors', async () => {
      await post(req, res);

      const payload = constructPayload(req.body, FIELD_IDS);

      const validationErrors = generateValidationErrors(payload);

      expect(mapAndSave.declarationModernSlavery).toHaveBeenCalledTimes(1);
      expect(mapAndSave.declarationModernSlavery).toHaveBeenCalledWith(payload, res.locals.application, validationErrors);
    });

    it(`should redirect to ${ALL_SECTIONS}`, async () => {
      mapAndSave.declarationModernSlavery = mapAndSaveSpy;

      await post(req, res);

      const expected = `${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      expect(res.redirect).toHaveBeenCalledWith(expected);
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
    describe('when the mapAndSave call does not return anything', () => {
      beforeEach(() => {
        mapAndSaveSpy = jest.fn(() => Promise.resolve(false));
        mapAndSave.declarationModernSlavery = mapAndSaveSpy;

        req.body = mockFormBody;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });

    describe('when the mapAndSave call fails', () => {
      beforeEach(() => {
        mapAndSaveSpy = mockSpyPromiseRejection;

        mapAndSave.declarationModernSlavery = mapAndSaveSpy;

        req.body = mockFormBody;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });
  });
});
