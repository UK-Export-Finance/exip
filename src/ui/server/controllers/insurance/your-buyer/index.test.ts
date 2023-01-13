import { mockReq, mockRes, mockApplication, mockCountries } from '../../../test-mocks';
import api from '../../../api';
import { Request, Response } from '../../../../types';
import { ROUTES, TEMPLATES } from '../../../constants';
import { get, post } from '.';
import mapCountries from '../../../helpers/mappings/map-countries';
import { PAGES } from '../../../content-strings';
import { FIELDS } from '../../../content-strings/fields/insurance/your-buyer';
import insuranceCorePageVariables from '../../../helpers/page-variables/core/insurance';
import yourBuyerDetailsValidation from './validation';

describe('controllers/insurance/your-buyer/your-buyer-details', () => {
  let req: Request;
  let res: Response;
  let getCountriesSpy = jest.fn(() => Promise.resolve(mockCountries));
  const TEMPLATE = TEMPLATES.INSURANCE.YOUR_BUYER.BUYER_BUYER_DETAILS;
  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    res.locals.application = mockApplication;
    req.params.referenceNumber = String(mockApplication.referenceNumber);
    api.keystone.countries.getAll = getCountriesSpy;
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATE);
    });
  });

  describe('get', () => {
    it('should call api.keystone.countries.getAll', async () => {
      await get(req, res);

      expect(getCountriesSpy).toHaveBeenCalledTimes(1);
    });

    it('should render template', async () => {
      await get(req, res);

      const expectedCountries = mapCountries(mockCountries);
      const expectedVariables = {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: PAGES.INSURANCE.YOUR_BUYER_DETAILS,
          BACK_LINK: req.headers.referer,
        }),
        ...FIELDS,
        countries: expectedCountries,
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
    });

    describe('api error handling', () => {
      describe('when there are no countries returned from the API', () => {
        beforeEach(() => {
          // @ts-ignore
          getCountriesSpy = jest.fn(() => Promise.resolve());
          api.keystone.countries.getAll = getCountriesSpy;
        });

        it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
          await get(req, res);

          expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
        });
      });

      describe('when there countries response is an empty array', () => {
        beforeEach(() => {
          getCountriesSpy = jest.fn(() => Promise.resolve([]));
          api.keystone.countries.getAll = getCountriesSpy;
        });

        it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
          await get(req, res);

          expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
        });
      });
    });
  });

  describe('post', () => {
    beforeEach(() => {
      getCountriesSpy = jest.fn(() => Promise.resolve(mockCountries));
      api.keystone.countries.getAll = getCountriesSpy;
    });

    const validBody = { organisation: 'test oraganisation', country: 'XAD' };

    describe('when there are no validation errors', () => {
      beforeEach(() => {
        req.body = validBody;
      });

      it('should redirect to needs_to_redirect_at_do_you_need_broker', async () => {
        await post(req, res);
        // This needs to replaced after broker page is completed
        const expected = '/needs_to_redirect_at_do_you_need_broker';

        expect(res.redirect).toHaveBeenCalledWith(expected);
      });
    });

    describe('when there are validation errors', () => {
      it('should call api.keystone.countries', async () => {
        await get(req, res);

        expect(getCountriesSpy).toHaveBeenCalledTimes(1);
      });

      it('should render template with validation errors', async () => {
        await post(req, res);

        const expectedCountries = mapCountries(mockCountries);
        const validationErrors = yourBuyerDetailsValidation(req.body);

        const expectedVariables = {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS: PAGES.INSURANCE.YOUR_BUYER_DETAILS,
            BACK_LINK: req.headers.referer,
          }),
          ...FIELDS,
          submittedValues: req.body,
          countries: expectedCountries,
          validationErrors,
        };
        expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
      });
    });
  });
});
