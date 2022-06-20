const controller = require('.');
const CONTENT_STRINGS = require('../../content-strings');
const { FIELD_IDS, ROUTES, TEMPLATES } = require('../../constants');
const singleInputPageVariables = require('../../helpers/single-input-page-variables');
const { validation: generateValidationErrors } = require('./validation');
const getCountryByName = require('../../helpers/get-country-by-name');
const api = require('../../api');
const mapCountries = require('../../helpers/map-countries');
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
    },
    {
      marketName: 'France',
      isoCode: 'FRA',
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
        BACK_LINK: ROUTES.COMPANY_BASED,
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
        HIDDEN_FIELD_NAME: FIELD_IDS.BUYER_COUNTRY,
        countries: mapCountries(mockCountriesResponse),
        submittedValues: req.session.submittedData,
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
          HIDDEN_FIELD_NAME: FIELD_IDS.BUYER_COUNTRY,
          countries: expectedCountries,
          submittedValues: req.session.submittedData,
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
          HIDDEN_FIELD_NAME: FIELD_IDS.BUYER_COUNTRY,
          countries: mapCountries(mockCountriesResponse),
          validationErrors: generateValidationErrors(req.body),
        });
      });
    });

    describe('when there are no validation errors', () => {
      const validBody = {
        [FIELD_IDS.BUYER_COUNTRY]: mockAnswers[FIELD_IDS.BUYER_COUNTRY],
      };

      beforeEach(() => {
        req.body = validBody;
      });

      it('should update the session with submitted data, popluated with full country object', async () => {
        await controller.post(req, res);

        const expectedPopulatedData = {
          ...validBody,
          [FIELD_IDS.BUYER_COUNTRY]: getCountryByName(mockCountriesResponse, validBody[FIELD_IDS.BUYER_COUNTRY]),
        };

        const expected = updateSubmittedData(
          expectedPopulatedData,
          req.session.submittedData,
        );

        expect(req.session.submittedData).toEqual(expected);
      });

      it(`should redirect to ${ROUTES.TRIED_TO_OBTAIN_COVER}`, async () => {
        await controller.post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.TRIED_TO_OBTAIN_COVER);
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
