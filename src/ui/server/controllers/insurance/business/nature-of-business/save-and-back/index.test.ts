import { Request, Response } from '../../../../../../types';
import { post } from '.';
import { FIELD_IDS, ROUTES } from '../../../../../constants';
import { mockReq, mockRes, mockApplication, mockExporterBusiness } from '../../../../../test-mocks';
import mapAndSave from '../../map-and-save';

const {
  EXPORTER_BUSINESS: {
    NATURE_OF_YOUR_BUSINESS: { YEARS_EXPORTING, EMPLOYEES_UK },
  },
} = FIELD_IDS.INSURANCE;

const { INSURANCE_ROOT, ALL_SECTIONS } = ROUTES.INSURANCE;
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

  describe('post - save and back', () => {
    describe('when there are no validation errors', () => {
      it('should redirect to all sections page', async () => {
        req.body = {
          ...mockExporterBusiness,
        };

        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(`${INSURANCE_ROOT}/${req.params.referenceNumber}${ALL_SECTIONS}`);
      });

      it('should call mapAndSave.natureOfBusiness once', async () => {
        req.body = {
          ...mockExporterBusiness,
        };

        await post(req, res);

        expect(updateMapAndSave).toHaveBeenCalledTimes(1);
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

      it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, () => {
        post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
      });
    });

    describe('when mapAndSave.natureOfBusiness fails', () => {
      beforeEach(() => {
        res.locals = { csrfToken: '1234' };
        updateMapAndSave = jest.fn(() => Promise.reject());
        mapAndSave.natureOfBusiness = updateMapAndSave;
      });

      it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, () => {
        post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
      });
    });
  });
});
