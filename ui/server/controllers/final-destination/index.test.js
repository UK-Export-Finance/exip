const controller = require('.');
const CONTENT_STRINGS = require('../../content-strings');
const { FIELDS, ROUTES, TEMPLATES } = require('../../constants');
const singleInputPageVariables = require('../../helpers/single-input-page-variables');
const { validation: generateValidationErrors } = require('./validation');
const api = require('../../api');
const mapCountries = require('../../helpers/map-countries');
const updateSubmittedData = require('../../helpers/update-submitted-data');
const { mockReq, mockRes } = require('../../test-mocks');

describe('controllers/final-destination', () => {
  let req;
  let res;
  const mockCountriesResponse = [
    {
      marketName: 'Abu Dhabi',
      isoCode: 'XAD',
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
        FIELD_NAME: FIELDS.COUNTRY,
        PAGE_CONTENT_STRINGS: CONTENT_STRINGS.FINAL_DESTINATION_PAGE,
        BACK_LINK: ROUTES.TRIED_TO_OBTAIN_COVER,
      };

      expect(controller.PAGE_VARIABLES).toEqual(expected);
    });
  });

  describe('get', () => {
    const getCountriesSpy = jest.fn(() => Promise.resolve(mockCountriesResponse));

    beforeEach(() => {
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
        HIDDEN_FIELD_NAME: FIELDS.FINAL_DESTINATION,
        countries: mapCountries(mockCountriesResponse),
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATES.FINAL_DESTINATION, expectedVariables);
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

        expect(res.render).toHaveBeenCalledWith(TEMPLATES.FINAL_DESTINATION, {
          ...singleInputPageVariables(controller.PAGE_VARIABLES),
          HIDDEN_FIELD_NAME: FIELDS.FINAL_DESTINATION,
          countries: mapCountries(mockCountriesResponse),
          validationErrors: generateValidationErrors(req.body),
        });
      });
    });

    describe('when there are no validation errors', () => {
      it('should update the session with submitted data', () => {
        req.body = {
          [FIELDS.FINAL_DESTINATION]: mapCountries(mockCountriesResponse)[0].value,
        };

        controller.post(req, res);

        const expected = updateSubmittedData(
          req.body,
          req.session.submittedData,
        );

        expect(req.session.submittedData).toEqual(expected);
      });

      it(`should redirect to ${ROUTES.UK_CONTENT_PERCENTAGE}`, async () => {
        req.body = {
          [FIELDS.FINAL_DESTINATION]: mapCountries(mockCountriesResponse)[0].value,
        };

        await controller.post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.UK_CONTENT_PERCENTAGE);
      });
    });
  });
});
