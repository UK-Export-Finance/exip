import { post } from '.';
import constructPayload from '../../../../../helpers/construct-payload';
import { FIELD_IDS } from '..';
import { ROUTES } from '../../../../../constants';
import BUSINESS_FIELD_IDS from '../../../../../constants/field-ids/insurance/business';
import { mockReq, mockRes, mockApplication, mockBusinessNatureOfBusiness } from '../../../../../test-mocks';
import mapAndSave from '../../map-and-save/nature-of-business';
import { Request, Response } from '../../../../../../types';

const {
  NATURE_OF_YOUR_BUSINESS: { YEARS_EXPORTING, EMPLOYEES_UK },
} = BUSINESS_FIELD_IDS;

const { INSURANCE_ROOT, ALL_SECTIONS, PROBLEM_WITH_SERVICE } = ROUTES.INSURANCE;
describe('controllers/insurance/business/nature-of-business/save-and-back', () => {
  let req: Request;
  let res: Response;

  let updateMapAndSave = jest.fn(() => Promise.resolve(true));

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    res.locals.application = mockApplication;

    mapAndSave.natureOfBusiness = updateMapAndSave;
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('when there are no validation errors', () => {
    it('should redirect to all sections page', async () => {
      req.body = {
        ...mockBusinessNatureOfBusiness,
      };

      await post(req, res);

      expect(res.redirect).toHaveBeenCalledWith(`${INSURANCE_ROOT}/${req.params.referenceNumber}${ALL_SECTIONS}`);
    });

    it('should call mapAndSave.natureOfBusiness once with data from constructPayload', async () => {
      req.body = {
        ...mockBusinessNatureOfBusiness,
        injection: 1,
      };

      await post(req, res);

      const payload = constructPayload(req.body, FIELD_IDS);

      expect(updateMapAndSave).toHaveBeenCalledTimes(1);

      expect(updateMapAndSave).toHaveBeenCalledWith(payload, mockApplication, false);
    });
  });

  describe('when there are validation errors', () => {
    it('should redirect to all sections page', async () => {
      req.body = {
        [YEARS_EXPORTING]: '5O',
        [EMPLOYEES_UK]: '2000',
      };

      await post(req, res);

      expect(res.redirect).toHaveBeenCalledWith(`${INSURANCE_ROOT}/${req.params.referenceNumber}${ALL_SECTIONS}`);
    });

    it('should call mapAndSave.natureOfBusiness once', async () => {
      req.body = {
        [YEARS_EXPORTING]: '5O',
        [EMPLOYEES_UK]: '2000',
      };

      await post(req, res);

      expect(updateMapAndSave).toHaveBeenCalledTimes(1);
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

  describe('when mapAndSave.natureOfBusiness fails', () => {
    beforeEach(() => {
      res.locals = { csrfToken: '1234' };
      updateMapAndSave = jest.fn(() => Promise.reject());
      mapAndSave.natureOfBusiness = updateMapAndSave;
    });

    it(`should redirect to ${PROBLEM_WITH_SERVICE}`, () => {
      post(req, res);

      expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
    });
  });
});
