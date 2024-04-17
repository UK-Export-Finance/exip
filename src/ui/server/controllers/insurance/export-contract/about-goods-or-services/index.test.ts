import { pageVariables, PAGE_CONTENT_STRINGS, HTML_FLAGS, TEMPLATE, FIELD_IDS, get, post } from '.';
import { ATTRIBUTES, TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import EXPORT_CONTRACT_FIELD_IDS from '../../../../constants/field-ids/insurance/export-contract';
import { PAGES } from '../../../../content-strings';
import { EXPORT_CONTRACT_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import constructPayload from '../../../../helpers/construct-payload';
import api from '../../../../api';
import generateValidationErrors from './validation';
import getCountryByIsoCode from '../../../../helpers/get-country-by-iso-code';
import mapCountries from '../../../../helpers/mappings/map-countries';
import { sanitiseData } from '../../../../helpers/sanitise-data';
import mapAndSave from '../map-and-save/export-contract';
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes, mockApplication, mockCountries, referenceNumber } from '../../../../test-mocks';

const {
  INSURANCE_ROOT,
  EXPORT_CONTRACT: { ABOUT_GOODS_OR_SERVICES_SAVE_AND_BACK, ABOUT_GOODS_OR_SERVICES_CHECK_AND_CHANGE, HOW_WILL_YOU_GET_PAID, CHECK_YOUR_ANSWERS },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

const {
  ABOUT_GOODS_OR_SERVICES: { DESCRIPTION, FINAL_DESTINATION_KNOWN, FINAL_DESTINATION },
} = EXPORT_CONTRACT_FIELD_IDS;

const {
  INSURANCE: {
    EXPORT_CONTRACT: { ABOUT_GOODS_OR_SERVICES },
  },
  PARTIALS: {
    INSURANCE: { EXPORT_CONTRACT },
  },
} = TEMPLATES;

describe('controllers/insurance/export-contract/about-goods-or-services', () => {
  let req: Request;
  let res: Response;

  jest.mock('../map-and-save/export-contract');

  mapAndSave.exportContract = jest.fn(() => Promise.resolve(true));
  let getCountriesSpy = jest.fn(() => Promise.resolve(mockCountries));

  const countryIsoCode = mockCountries[0].isoCode;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    api.keystone.countries.getAll = getCountriesSpy;
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('PAGE_CONTENT_STRINGS', () => {
    it('should have the correct strings', () => {
      expect(PAGE_CONTENT_STRINGS).toEqual(PAGES.INSURANCE.EXPORT_CONTRACT.ABOUT_GOODS_OR_SERVICES);
    });
  });

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const result = pageVariables(referenceNumber);

      const expected = {
        FIELDS: {
          DESCRIPTION: {
            ID: DESCRIPTION,
            ...FIELDS.ABOUT_GOODS_OR_SERVICES[DESCRIPTION],
          },
          FINAL_DESTINATION_KNOWN: {
            ID: FINAL_DESTINATION_KNOWN,
            ...FIELDS.ABOUT_GOODS_OR_SERVICES[FINAL_DESTINATION_KNOWN],
          },
          FINAL_DESTINATION: {
            ID: FINAL_DESTINATION,
            ...FIELDS.ABOUT_GOODS_OR_SERVICES[FINAL_DESTINATION],
          },
        },
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${ABOUT_GOODS_OR_SERVICES_SAVE_AND_BACK}`,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('HTML_FLAGS', () => {
    it('should have correct properties', () => {
      const expected = {
        CONDITIONAL_YES_HTML: EXPORT_CONTRACT.ABOUT_GOODS_OR_SERVICES.CONDITIONAL_YES_HTML,
        HORIZONTAL_RADIOS: true,
        NO_RADIO_AS_FIRST_OPTION: true,
        LEGEND_CLASS: ATTRIBUTES.CLASSES.LEGEND.M,
      };

      expect(HTML_FLAGS).toEqual(expected);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(ABOUT_GOODS_OR_SERVICES);
    });
  });

  describe('FIELD_IDS', () => {
    it('should have the correct FIELD_IDS', () => {
      const expected = [DESCRIPTION, FINAL_DESTINATION, FINAL_DESTINATION_KNOWN];

      expect(FIELD_IDS).toEqual(expected);
    });
  });

  describe('get', () => {
    it('should call api.keystone.countries.getAll', async () => {
      await get(req, res);

      expect(getCountriesSpy).toHaveBeenCalledTimes(1);
    });

    it('should render template', async () => {
      await get(req, res);

      const expectedVariables = {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS,
          BACK_LINK: req.headers.referer,
          HTML_FLAGS,
        }),
        ...pageVariables(referenceNumber),
        userName: getUserNameFromSession(req.session.user),
        application: mapApplicationToFormFields(mockApplication),
        countries: mapCountries(mockCountries, mockApplication.exportContract[FINAL_DESTINATION]),
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
    });

    describe('when there is no application', () => {
      beforeEach(() => {
        delete res.locals.application;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await get(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });

    describe('api error handling', () => {
      describe('when the get countries API call fails', () => {
        beforeEach(() => {
          getCountriesSpy = jest.fn(() => Promise.reject(new Error('mock')));
          api.keystone.countries.getAll = getCountriesSpy;
        });

        it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
          await get(req, res);

          expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
        });
      });

      describe('when the get countries response does not return a populated array', () => {
        beforeEach(() => {
          getCountriesSpy = jest.fn(() => Promise.resolve([]));
          api.keystone.countries.getAll = getCountriesSpy;
        });

        it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
          await get(req, res);

          expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
        });
      });
    });
  });

  describe('post', () => {
    beforeEach(() => {
      getCountriesSpy = jest.fn(() => Promise.resolve(mockCountries));
      api.keystone.countries.getAll = getCountriesSpy;
    });

    const validBody = {
      [DESCRIPTION]: 'Mock description',
      [FINAL_DESTINATION_KNOWN]: 'true',
      [FINAL_DESTINATION]: countryIsoCode,
    };

    it('should call api.keystone.countries.getAll', async () => {
      await post(req, res);

      expect(getCountriesSpy).toHaveBeenCalledTimes(1);
    });

    describe('when there are no validation errors', () => {
      beforeEach(() => {
        req.body = validBody;
      });

      it('should call mapAndSave.exportContract with data from constructPayload function and application', async () => {
        await post(req, res);

        const payload = constructPayload(req.body, FIELD_IDS);

        expect(mapAndSave.exportContract).toHaveBeenCalledTimes(1);

        const expectedValidationErrors = false;

        expect(mapAndSave.exportContract).toHaveBeenCalledWith(payload, res.locals.application, expectedValidationErrors, mockCountries);
      });

      it(`should redirect to ${HOW_WILL_YOU_GET_PAID}`, async () => {
        await post(req, res);

        const expected = `${INSURANCE_ROOT}/${referenceNumber}${HOW_WILL_YOU_GET_PAID}`;

        expect(res.redirect).toHaveBeenCalledWith(expected);
      });

      describe("when the url's last substring is `change`", () => {
        it(`should redirect to ${ABOUT_GOODS_OR_SERVICES_CHECK_AND_CHANGE}`, async () => {
          req.originalUrl = INSURANCE_ROUTES.EXPORT_CONTRACT.ABOUT_GOODS_OR_SERVICES_CHANGE;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe("when the url's last substring is `check-and-change`", () => {
        it(`should redirect to ${ABOUT_GOODS_OR_SERVICES_CHECK_AND_CHANGE}`, async () => {
          req.originalUrl = INSURANCE_ROUTES.EXPORT_CONTRACT.ABOUT_GOODS_OR_SERVICES_CHECK_AND_CHANGE;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${referenceNumber}${ABOUT_GOODS_OR_SERVICES_CHECK_AND_CHANGE}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });
    });

    describe('when there are validation errors', () => {
      it('should render template with validation errors', async () => {
        await post(req, res);

        const payload = constructPayload(req.body, FIELD_IDS);

        const submittedCountry = getCountryByIsoCode(mockCountries, payload[FINAL_DESTINATION]);

        const expectedVariables = {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS,
            BACK_LINK: req.headers.referer,
            HTML_FLAGS,
          }),
          ...pageVariables(referenceNumber),
          userName: getUserNameFromSession(req.session.user),
          application: mockApplication,
          submittedValues: sanitiseData(payload),
          countries: mapCountries(mockCountries, submittedCountry?.isoCode),
          validationErrors: generateValidationErrors(payload),
        };

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
      });
    });

    describe('when there is no application', () => {
      beforeEach(() => {
        delete res.locals.application;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });

    describe('api error handling', () => {
      describe('get countries call', () => {
        describe('when the get countries API call fails', () => {
          beforeEach(() => {
            getCountriesSpy = jest.fn(() => Promise.reject(new Error('mock')));
            api.keystone.countries.getAll = getCountriesSpy;
          });

          it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
            await post(req, res);

            expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
          });
        });

        describe('when the get countries response does not return a populated array', () => {
          beforeEach(() => {
            getCountriesSpy = jest.fn(() => Promise.resolve([]));
            api.keystone.countries.getAll = getCountriesSpy;
          });

          it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
            await post(req, res);

            expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
          });
        });
      });

      describe('mapAndSave.exportContract call', () => {
        beforeEach(() => {
          req.body = validBody;
        });

        describe('when a true boolean is not returned', () => {
          beforeEach(() => {
            const mapAndSaveSpy = jest.fn(() => Promise.resolve(false));

            mapAndSave.exportContract = mapAndSaveSpy;
          });

          it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
            await post(req, res);

            expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
          });
        });

        describe('when there is an error', () => {
          beforeEach(() => {
            const mapAndSaveSpy = jest.fn(() => Promise.reject(new Error('mock')));

            mapAndSave.exportContract = mapAndSaveSpy;
          });

          it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
            await post(req, res);

            expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
          });
        });
      });
    });
  });
});
