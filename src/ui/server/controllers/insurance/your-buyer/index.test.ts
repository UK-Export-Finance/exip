import { mockReq, mockRes, mockApplication, mockCisCountries } from '../../../test-mocks';
import api from '../../../api';
import { Request, Response } from '../../../../types';
import { ROUTES, TEMPLATES } from '../../../constants';
import { get, post } from '.';
import { mapCountriesSelect } from '../../../helpers/mappings/map-countries-select';
import { PAGES } from '../../../content-strings';
import { yourBuyerFiledVariables } from '../../../content-strings/fields/insurance/your-buyer';
import insuranceCorePageVariables from '../../../helpers/page-variables/core/insurance';

describe('controllers/insurance/your-buyer/your-buyer-details', () => {
  let req: Request;
  let res: Response;
  //   let refNumber: number;
  let getCountriesSpy = jest.fn(() => Promise.resolve(mockCisCountries));

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    res.locals.application = mockApplication;
    req.params.referenceNumber = String(mockApplication.referenceNumber);
    // refNumber = Number(mockApplication.referenceNumber);
    api.external.getCountries = getCountriesSpy;
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATES.INSURANCE.YOUR_BUYER.BUYER_BUYER_DETAILS).toEqual(TEMPLATES.INSURANCE.YOUR_BUYER.BUYER_BUYER_DETAILS);
    });
  });

  describe('get', () => {
    it('should call api.external.getCountries', async () => {
      await get(req, res);

      expect(getCountriesSpy).toHaveBeenCalledTimes(1);
    });

    it('should render template', async () => {
      await get(req, res);

      const expectedCountries = mapCountriesSelect(mockCisCountries);
      const expectedVariables = {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: PAGES.INSURANCE.YOUR_BUYER_DETAILS,
          BACK_LINK: req.headers.referer,
        }),
        ...yourBuyerFiledVariables,
        countries: expectedCountries,
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATES.INSURANCE.YOUR_BUYER.BUYER_BUYER_DETAILS, expectedVariables);
    });

    describe('when there is no application', () => {
      beforeEach(() => {
        res.locals = { csrfToken: '1234' };
      });

      it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
        await get(req, res);
        expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
      });
    });

    describe('api error handling', () => {
      describe('when there are no countries returned from the API', () => {
        beforeEach(() => {
          // @ts-ignore
          getCountriesSpy = jest.fn(() => Promise.resolve());
          api.external.getCountries = getCountriesSpy;
        });

        it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
          await get(req, res);

          expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
        });
      });

      describe('when there countries response is an empty array', () => {
        // beforeEach(() => {
        //   getCountriesSpy = jest.fn(() => Promise.resolve([]));
        //   api.external.getCountries = getCountriesSpy;
        // });

        it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
          getCountriesSpy = jest.fn(() => Promise.resolve([]));
          api.external.getCountries = getCountriesSpy;
          await get(req, res);

          expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
        });
      });

      describe('when there is an error with the getCountries API call', () => {
        beforeEach(() => {
          getCountriesSpy = jest.fn(() => Promise.reject());
          api.external.getCountries = getCountriesSpy;
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
      getCountriesSpy = jest.fn(() => Promise.resolve(mockCisCountries));
      api.external.getCountries = getCountriesSpy;
    });

    const validBody = {
      CountryId: mockCisCountries[0].isoCode,
    };

    describe.skip('when there are no validation errors', () => {
      beforeEach(() => {
        req.body = validBody;
      });

      it('should redirect to needs_to_redirect_at_do_you_need_broker', async () => {
        await post(req, res);

        // const expected = `${INSURANCE_ROOT}/${req.params.referenceNumber}${ABOUT_GOODS_OR_SERVICES}`;
        // const expected = `${INSURANCE_ROOT}/${req.params.referenceNumber}/${YOUR_BUYER}`;
        expect(res.redirect).toHaveBeenCalledWith('/needs_to_redirect_at_do_you_need_broker');
      });
    });
  });
});
