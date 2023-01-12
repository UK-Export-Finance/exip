import { Request, Response } from '../../../../../types';
import { postCompanyDetailsSaveAndBack } from '.';
import { FIELD_IDS, ROUTES } from '../../../../constants';
import { mockReq, mockRes, mockApplication, mockPhoneNumbers } from '../../../../test-mocks';
import api from '../../../../api';

const {
  EXPORTER_BUSINESS: {
    YOUR_COMPANY: { TRADING_NAME, TRADING_ADDRESS, PHONE_NUMBER },
  },
} = FIELD_IDS.INSURANCE;

const { INSURANCE_ROOT, ALL_SECTIONS } = ROUTES.INSURANCE;

const { VALID_PHONE_NUMBERS, INVALID_PHONE_NUMBERS } = mockPhoneNumbers;

describe('controllers/insurance/business/companies-details', () => {
  let req: Request;
  let res: Response;

  const mockUpdateApplicationResponse = mockApplication;
  let updateApplicationSpy = jest.fn(() => Promise.resolve(mockUpdateApplicationResponse));

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    res.locals.application = mockApplication;

    api.keystone.application.update.exporterCompany = updateApplicationSpy;
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('postCompanyDetailsSaveAndBack', () => {
    describe('when there are validation errors', () => {
      it('should redirect to next page', async () => {
        req.body = {
          [TRADING_NAME]: 'true',
          [TRADING_ADDRESS]: 'false',
          [PHONE_NUMBER]: INVALID_PHONE_NUMBERS.TOO_SHORT_SPECIAL_CHAR,
        };

        await postCompanyDetailsSaveAndBack(req, res);

        expect(res.redirect).toHaveBeenCalledWith(`${INSURANCE_ROOT}/${req.params.referenceNumber}${ALL_SECTIONS}`);
      });

      it('should call api.keystone.application.update.exporterCompany once', async () => {
        req.body = {
          [TRADING_NAME]: 'true',
          [TRADING_ADDRESS]: 'false',
          [PHONE_NUMBER]: INVALID_PHONE_NUMBERS.TOO_SHORT_SPECIAL_CHAR,
        };

        await postCompanyDetailsSaveAndBack(req, res);

        expect(updateApplicationSpy).toHaveBeenCalledTimes(1);
      });
    });

    describe('when there are no validation errors', () => {
      it('should redirect to next page', async () => {
        req.body = {
          [TRADING_NAME]: 'true',
          [TRADING_ADDRESS]: 'false',
          [PHONE_NUMBER]: INVALID_PHONE_NUMBERS.TOO_SHORT_SPECIAL_CHAR,
        };

        await postCompanyDetailsSaveAndBack(req, res);

        expect(res.redirect).toHaveBeenCalledWith(`${INSURANCE_ROOT}/${req.params.referenceNumber}${ALL_SECTIONS}`);
      });

      it('should call api.keystone.application.update.exporterCompany once', async () => {
        req.body = {
          [TRADING_NAME]: 'true',
          [TRADING_ADDRESS]: 'false',
          [PHONE_NUMBER]: VALID_PHONE_NUMBERS.LANDLINE,
        };

        await postCompanyDetailsSaveAndBack(req, res);

        expect(updateApplicationSpy).toHaveBeenCalledTimes(1);
      });
    });

    describe('when there is no application', () => {
      beforeEach(() => {
        res.locals = { csrfToken: '1234' };
      });

      it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, () => {
        postCompanyDetailsSaveAndBack(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
      });
    });

    describe('when api.keystone.application.update.exporterCompany fails', () => {
      beforeEach(() => {
        res.locals = { csrfToken: '1234' };
        updateApplicationSpy = jest.fn(() => Promise.reject());
        api.keystone.application.update.exporterCompany = updateApplicationSpy;
      });

      it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, () => {
        postCompanyDetailsSaveAndBack(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
      });
    });
  });
});
