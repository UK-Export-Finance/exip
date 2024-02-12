import { PAGE_CONTENT_STRINGS, pageVariables, TEMPLATE, FIELD_IDS, get, post } from '.';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import { POLICY as POLICY_FIELD_IDS } from '../../../../constants/field-ids/insurance/policy';
import { PAGES } from '../../../../content-strings';
import { POLICY_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import constructPayload from '../../../../helpers/construct-payload';
import api from '../../../../api';
import mapCountries from '../../../../helpers/mappings/map-countries';
import generateValidationErrors from './validation';
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes, mockApplication, mockCountries } from '../../../../test-mocks';

const {
  INSURANCE_ROOT,
  POLICY: { BROKER_ROOT, OTHER_COMPANY_DETAILS_SAVE_AND_BACK },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

const {
  REQUESTED_JOINTLY_INSURED_PARTY: { COMPANY_NAME, COMPANY_NUMBER, COUNTRY },
} = POLICY_FIELD_IDS;

const {
  referenceNumber,
  policy: { jointlyInsuredParty },
} = mockApplication;

describe('controllers/insurance/policy/other-company-details', () => {
  let req: Request;
  let res: Response;

  jest.mock('../map-and-save/policy');

  let getCountriesSpy = jest.fn(() => Promise.resolve(mockCountries));

  const mockApplicationWithoutCountryCode = {
    ...mockApplication,
    policy: {
      ...mockApplication.policy,
      jointlyInsuredParty: {
        ...jointlyInsuredParty,
        [COUNTRY]: null,
      },
    },
  };

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    res.locals.application = mockApplicationWithoutCountryCode;

    req.params.referenceNumber = String(mockApplication.referenceNumber);

    api.keystone.countries.getAll = getCountriesSpy;
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('PAGE_CONTENT_STRINGS', () => {
    it('should have the correct properties', () => {
      const expected = PAGES.INSURANCE.POLICY.OTHER_COMPANY_DETAILS;

      expect(PAGE_CONTENT_STRINGS).toEqual(expected);
    });
  });

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const result = pageVariables(referenceNumber);

      const expected = {
        FIELDS: {
          COMPANY_NAME: {
            ID: COMPANY_NAME,
            ...FIELDS.REQUESTED_JOINTLY_INSURED_PARTY[COMPANY_NAME],
          },
          COMPANY_NUMBER: {
            ID: COMPANY_NUMBER,
            ...FIELDS.REQUESTED_JOINTLY_INSURED_PARTY[COMPANY_NUMBER],
          },
          COUNTRY: {
            ID: COUNTRY,
            ...FIELDS.REQUESTED_JOINTLY_INSURED_PARTY[COUNTRY],
          },
        },
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${OTHER_COMPANY_DETAILS_SAVE_AND_BACK}`,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.POLICY.OTHER_COMPANY_DETAILS);
    });
  });

  describe('FIELD_IDS', () => {
    it('should have the correct FIELD_IDS', () => {
      const expected = [COMPANY_NAME, COMPANY_NUMBER, COUNTRY];

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
        }),
        ...pageVariables(referenceNumber),
        userName: getUserNameFromSession(req.session.user),
        countries: mapCountries(mockCountries),
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
    });

    describe('when a final destination has been previously submitted', () => {
      const mockApplicationWithCountry = mockApplication;

      beforeEach(() => {
        res.locals.application = mockApplicationWithCountry;
      });

      it('should render template with countries mapped to submitted country', async () => {
        await get(req, res);

        const expectedVariables = {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS,
            BACK_LINK: req.headers.referer,
          }),
          ...pageVariables(referenceNumber),
          userName: getUserNameFromSession(req.session.user),
          countries: mapCountries(mockCountries, jointlyInsuredParty[COUNTRY]),
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
      [COMPANY_NAME]: 'Mock company name',
      [COMPANY_NUMBER]: 'Mock company number',
      [COUNTRY]: mockCountries[0].name,
    };

    describe('when there are validation errors', () => {
      it('should render template with validation errors and submitted values from constructPayload function', async () => {
        await post(req, res);

        const payload = constructPayload(req.body, FIELD_IDS);

        const expectedVariables = {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS,
            BACK_LINK: req.headers.referer,
          }),
          ...pageVariables(referenceNumber),
          userName: getUserNameFromSession(req.session.user),
          submittedValues: payload,
          countries: mapCountries(mockCountries),
          validationErrors: generateValidationErrors(payload),
        };

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
      });
    });

    describe('when a country has been previously submitted', () => {
      const mockApplicationWithCountry = mockApplication;

      beforeEach(() => {
        res.locals.application = mockApplicationWithCountry;

        req.body = {
          [COUNTRY]: mockCountries[0].isoCode,
        };
      });

      it('should render template with countries mapped to submitted country', async () => {
        await post(req, res);

        const payload = constructPayload(req.body, FIELD_IDS);

        const expectedVariables = {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS,
            BACK_LINK: req.headers.referer,
          }),
          ...pageVariables(referenceNumber),
          userName: getUserNameFromSession(req.session.user),
          submittedValues: payload,
          countries: mapCountries(mockCountries, payload[COUNTRY]),
          validationErrors: generateValidationErrors(payload),
        };

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
      });
    });

    describe('when there are no validation errors', () => {
      beforeEach(() => {
        req.body = validBody;
      });

      it(`should redirect to ${BROKER_ROOT}`, async () => {
        await post(req, res);

        const expected = `${INSURANCE_ROOT}/${req.params.referenceNumber}${BROKER_ROOT}`;

        expect(res.redirect).toHaveBeenCalledWith(expected);
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
    });
  });
});
