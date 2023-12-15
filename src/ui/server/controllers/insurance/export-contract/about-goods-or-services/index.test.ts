import { pageVariables, TEMPLATE, FIELD_IDS, get, post } from '.';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import EXPORT_CONTRACT_FIELD_IDS from '../../../../constants/field-ids/insurance/export-contract';
import { PAGES } from '../../../../content-strings';
import { EXPORT_CONTRACT_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import constructPayload from '../../../../helpers/construct-payload';
import api from '../../../../api';
import generateValidationErrors from './validation';
import mapCountries from '../../../../helpers/mappings/map-countries';
import { sanitiseData } from '../../../../helpers/sanitise-data';
import mapAndSave from '../map-and-save';
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes, mockApplication, mockCountries } from '../../../../test-mocks';

const {
  INSURANCE_ROOT,
  ALL_SECTIONS,
  EXPORT_CONTRACT: { ABOUT_GOODS_OR_SERVICES_SAVE_AND_BACK },
  CHECK_YOUR_ANSWERS: { TYPE_OF_POLICY: CHECK_AND_CHANGE_ROUTE },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

const {
  ABOUT_GOODS_OR_SERVICES: { DESCRIPTION, FINAL_DESTINATION_KNOWN, FINAL_DESTINATION },
} = EXPORT_CONTRACT_FIELD_IDS;

describe('controllers/insurance/export-contract/about-goods-or-services', () => {
  let req: Request;
  let res: Response;
  let refNumber: number;

  jest.mock('../map-and-save');

  mapAndSave.exportContract = jest.fn(() => Promise.resolve(true));
  let getCountriesSpy = jest.fn(() => Promise.resolve(mockCountries));

  const mockApplicationWithoutCountryCode = {
    ...mockApplication,
    policy: {
      ...mockApplication.policy,
      [FINAL_DESTINATION]: null,
    },
  };

  const countryIsoCode = mockCountries[0].isoCode;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    res.locals.application = mockApplicationWithoutCountryCode;
    req.params.referenceNumber = String(mockApplication.referenceNumber);
    refNumber = Number(mockApplication.referenceNumber);
    api.keystone.countries.getAll = getCountriesSpy;
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const result = pageVariables(refNumber);

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
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${req.params.referenceNumber}${ABOUT_GOODS_OR_SERVICES_SAVE_AND_BACK}`,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.POLICY.ABOUT_GOODS_OR_SERVICES);
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
          PAGE_CONTENT_STRINGS: PAGES.INSURANCE.POLICY.ABOUT_GOODS_OR_SERVICES,
          BACK_LINK: req.headers.referer,
        }),
        ...pageVariables(refNumber),
        userName: getUserNameFromSession(req.session.user),
        application: mockApplicationWithoutCountryCode,
        countries: mapCountries(mockCountries, mockApplication.exportContract[FINAL_DESTINATION]),
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
    });

    describe('when a final destination has been previously submitted', () => {
      const mockApplicationWithCountry = {
        ...mockApplication,
        policy: {
          ...mockApplication.policy,
          [FINAL_DESTINATION]: countryIsoCode,
        },
      };

      beforeEach(() => {
        res.locals.application = mockApplicationWithCountry;
      });

      it('should render template with countries mapped to submitted country', async () => {
        await get(req, res);

        const expectedVariables = {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS: PAGES.INSURANCE.POLICY.ABOUT_GOODS_OR_SERVICES,
            BACK_LINK: req.headers.referer,
          }),
          ...pageVariables(refNumber),
          userName: getUserNameFromSession(req.session.user),
          application: mockApplicationWithCountry,
          countries: mapCountries(mockCountries, countryIsoCode),
        };

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
      });
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

      it(`should redirect to ${ALL_SECTIONS}`, async () => {
        await post(req, res);

        const expected = `${INSURANCE_ROOT}/${req.params.referenceNumber}${ALL_SECTIONS}`;

        expect(res.redirect).toHaveBeenCalledWith(expected);
      });

      describe("when the url's last substring is `change`", () => {
        it(`should redirect to ${CHECK_AND_CHANGE_ROUTE}`, async () => {
          req.originalUrl = INSURANCE_ROUTES.EXPORT_CONTRACT.ABOUT_GOODS_OR_SERVICES_CHANGE;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${refNumber}${ALL_SECTIONS}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe("when the url's last substring is `check-and-change`", () => {
        it(`should redirect to ${CHECK_AND_CHANGE_ROUTE}`, async () => {
          req.originalUrl = INSURANCE_ROUTES.EXPORT_CONTRACT.ABOUT_GOODS_OR_SERVICES_CHECK_AND_CHANGE;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${refNumber}${CHECK_AND_CHANGE_ROUTE}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });
    });

    describe('when there are validation errors', () => {
      it('should render template with validation errors', async () => {
        await post(req, res);

        const payload = constructPayload(req.body, FIELD_IDS);

        const expectedVariables = {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS: PAGES.INSURANCE.POLICY.ABOUT_GOODS_OR_SERVICES,
            BACK_LINK: req.headers.referer,
          }),
          ...pageVariables(refNumber),
          userName: getUserNameFromSession(req.session.user),
          application: mockApplicationWithoutCountryCode,
          submittedValues: sanitiseData(payload),
          countries: mapCountries(mockCountries),
          validationErrors: generateValidationErrors(payload),
        };

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
      });

      describe('when a final destination is submitted', () => {
        const mockFormBody = {
          [FINAL_DESTINATION]: countryIsoCode,
        };

        beforeEach(() => {
          req.body = mockFormBody;
        });

        it('should render template with countries mapped to submitted country', async () => {
          await post(req, res);

          const payload = constructPayload(req.body, FIELD_IDS);

          const expectedVariables = {
            ...insuranceCorePageVariables({
              PAGE_CONTENT_STRINGS: PAGES.INSURANCE.POLICY.ABOUT_GOODS_OR_SERVICES,
              BACK_LINK: req.headers.referer,
            }),
            ...pageVariables(refNumber),
            userName: getUserNameFromSession(req.session.user),
            application: mockApplicationWithoutCountryCode,
            submittedValues: payload,
            countries: mapCountries(mockCountries, countryIsoCode),
            validationErrors: generateValidationErrors(payload),
          };

          expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
        });
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

        describe('when no application is returned', () => {
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
