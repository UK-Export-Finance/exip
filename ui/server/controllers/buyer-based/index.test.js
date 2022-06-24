const controller = require('.');
const CONTENT_STRINGS = require('../../content-strings');
const { FIELD_IDS, ROUTES, TEMPLATES } = require('../../constants');
const singleInputPageVariables = require('../../helpers/single-input-page-variables');
const { validation: generateValidationErrors } = require('./validation');
const isChangeRoute = require('../../helpers/is-change-route');
const getCountryByName = require('../../helpers/get-country-by-name');
const api = require('../../api');
const { mapCountries } = require('../../helpers/map-countries');
const { updateSubmittedData } = require('../../helpers/update-submitted-data');
const {
  mockReq,
  mockRes,
  mockAnswers,
  mockSession,
} = require('../../test-mocks');

describe('controllers/buyer-based', () => {
  let req;
  let res;
  const mockCountriesResponse = [
    {
      marketName: 'Abu Dhabi',
      isoCode: 'XAD',
      active: 'N',
    },
    {
      marketName: 'France',
      isoCode: 'FRA',
      active: 'Y',
    },
  ];

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('PAGE_VARIABLES', () => {
    it('should have correct properties', () => {
      const expected = {
        FIELD_NAME: FIELD_IDS.COUNTRY,
        PAGE_CONTENT_STRINGS: CONTENT_STRINGS.PAGES.BUYER_BASED_PAGE,
      };

      expect(controller.PAGE_VARIABLES).toEqual(expected);
    });
  });

  describe('get', () => {
    const getCountriesSpy = jest.fn(() => Promise.resolve(mockCountriesResponse));

    beforeEach(() => {
      delete req.session.submittedData;
      api.getCountries = getCountriesSpy;
    });

    it('should call api.getCountries', async () => {
      await controller.get(req, res);

      expect(getCountriesSpy).toHaveBeenCalledTimes(1);
    });

    it('should render template', async () => {
      await controller.get(req, res);

      const expectedVariables = {
        ...singleInputPageVariables(controller.PAGE_VARIABLES),
        BACK_LINK: req.headers.referer,
        HIDDEN_FIELD_NAME: FIELD_IDS.BUYER_COUNTRY,
        countries: mapCountries(mockCountriesResponse),
        submittedValues: req.session.submittedData,
        isChangeRoute: isChangeRoute(req.originalUrl),
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATES.BUYER_BASED, expectedVariables);
    });

    describe('when a country has been submitted', () => {
      it('should render template with countries mapped to submitted country', async () => {
        req.session.submittedData = mockSession.submittedData;

        await controller.get(req, res);

        const expectedCountries = mapCountries(
          mockCountriesResponse,
          req.session.submittedData[FIELD_IDS.BUYER_COUNTRY].isoCode,
        );

        const expectedVariables = {
          ...singleInputPageVariables(controller.PAGE_VARIABLES),
          BACK_LINK: req.headers.referer,
          HIDDEN_FIELD_NAME: FIELD_IDS.BUYER_COUNTRY,
          countries: expectedCountries,
          submittedValues: req.session.submittedData,
          isChangeRoute: isChangeRoute(req.originalUrl),
        };

        expect(res.render).toHaveBeenCalledWith(TEMPLATES.BUYER_BASED, expectedVariables);
      });
    });
  });

  describe('post', () => {
    const getCountriesSpy = jest.fn(() => Promise.resolve(mockCountriesResponse));

    beforeEach(() => {
      api.getCountries = getCountriesSpy;
    });

    describe('when there are validation errors', () => {
      it('should render template with validation errors', async () => {
        await controller.post(req, res);

        expect(res.render).toHaveBeenCalledWith(TEMPLATES.BUYER_BASED, {
          ...singleInputPageVariables(controller.PAGE_VARIABLES),
          BACK_LINK: req.headers.referer,
          HIDDEN_FIELD_NAME: FIELD_IDS.BUYER_COUNTRY,
          countries: mapCountries(mockCountriesResponse),
          validationErrors: generateValidationErrors(req.body),
          isChangeRoute: isChangeRoute(req.originalUrl),
        });
      });
    });

    describe('when the submitted country is not supported', () => {
      const unsupportedCountry = mockCountriesResponse[0];

      beforeEach(() => {
        req.body[FIELD_IDS.BUYER_COUNTRY] = unsupportedCountry.marketName;
      });

      it(`should redirect to ${ROUTES.CANNOT_OBTAIN_COVER}`, async () => {
        await controller.post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.CANNOT_OBTAIN_COVER);
      });

      it('should add previousRoute and exitReason to req.flash', async () => {
        await controller.post(req, res);

        expect(req.flash).toHaveBeenCalledWith('previousRoute', ROUTES.BUYER_BASED);

        const countryName = unsupportedCountry.marketName;

        const { PAGES } = CONTENT_STRINGS;
        const { CANNOT_OBTAIN_COVER_PAGE } = PAGES;
        const { REASON } = CANNOT_OBTAIN_COVER_PAGE;

        const expectedReason = `${REASON.UNSUPPORTED_BUYER_COUNTRY_1} ${countryName}, ${REASON.UNSUPPORTED_BUYER_COUNTRY_2}`;

        expect(req.flash).toHaveBeenCalledWith('exitReason', expectedReason);
      });
    });

    describe('when there are no validation errors', () => {
      const selectedCountryName = mockAnswers[FIELD_IDS.BUYER_COUNTRY];
      const mappedCountries = mapCountries(mockCountriesResponse);

      const selectedCountry = getCountryByName(mappedCountries, selectedCountryName);

      const validBody = {
        [FIELD_IDS.BUYER_COUNTRY]: selectedCountryName,
      };

      beforeEach(() => {
        req.body = validBody;
      });

      it('should update the session with submitted data, popluated with country object', async () => {
        await controller.post(req, res);

        const expectedPopulatedData = {
          ...validBody,
          [FIELD_IDS.BUYER_COUNTRY]: {
            name: selectedCountry.name,
            isoCode: selectedCountry.isoCode,
          },
        };

        const expected = updateSubmittedData(
          expectedPopulatedData,
          req.session.submittedData,
        );

        expect(req.session.submittedData).toEqual(expected);
      });

      it(`should redirect to ${ROUTES.COMPANY_BASED}`, async () => {
        await controller.post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.COMPANY_BASED);
      });

      describe('when the url\'s last substring is `change`', () => {
        it(`should redirect to ${ROUTES.CHECK_YOUR_ANSWERS}`, async () => {
          req.originalUrl = 'mock/change';

          await controller.post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(ROUTES.CHECK_YOUR_ANSWERS);
        });
      });
    });
  });
});
