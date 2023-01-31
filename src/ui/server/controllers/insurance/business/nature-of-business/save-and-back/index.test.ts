import { Request, Response } from '../../../../../../types';
import { post } from '.';
import { FIELD_IDS, ROUTES } from '../../../../../constants';
import { mockReq, mockRes, mockApplication, mockExporterBusiness } from '../../../../../test-mocks';
import api from '../../../../../api';

const {
  EXPORTER_BUSINESS: {
    NATURE_OF_YOUR_BUSINESS: { YEARS_EXPORTING, EMPLOYEES_UK },
  },
} = FIELD_IDS.INSURANCE;

const { INSURANCE_ROOT, ALL_SECTIONS } = ROUTES.INSURANCE;
describe('controllers/insurance/business/nature-of-business/save-and-back', () => {
  let req: Request;
  let res: Response;

  const mockUpdateApplicationResponse = mockApplication;
  let updateApplicationSpy = jest.fn(() => Promise.resolve(mockUpdateApplicationResponse));

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    res.locals.application = mockApplication;

    api.keystone.application.update.exporterBusiness = updateApplicationSpy;
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

      it('should call api.keystone.application.update.exporterBusiness once', async () => {
        req.body = {
          ...mockExporterBusiness,
        };

        await post(req, res);

        expect(updateApplicationSpy).toHaveBeenCalledTimes(1);
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

      it('should call api.keystone.application.update.exporterBusiness once', async () => {
        req.body = {
          [YEARS_EXPORTING]: '5O',
          [EMPLOYEES_UK]: '2000',
        };

        await post(req, res);

        expect(updateApplicationSpy).toHaveBeenCalledTimes(1);
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

    describe('when api.keystone.application.update.exporterCompany fails', () => {
      beforeEach(() => {
        res.locals = { csrfToken: '1234' };
        updateApplicationSpy = jest.fn(() => Promise.reject());
        api.keystone.application.update.exporterBusiness = updateApplicationSpy;
      });

      it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, () => {
        post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
      });
    });
  });
});
