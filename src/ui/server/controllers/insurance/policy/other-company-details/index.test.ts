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
import { sanitiseData } from '../../../../helpers/sanitise-data';
import generateValidationErrors from './validation';
import mapAndSave from '../map-and-save/jointly-insured-party';
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes, mockApplication, mockCountries } from '../../../../test-mocks';

const {
  INSURANCE_ROOT,
  CHECK_YOUR_ANSWERS: { TYPE_OF_POLICY: CHECK_AND_CHANGE_ROUTE },
  POLICY: { BROKER_ROOT, CHECK_YOUR_ANSWERS, OTHER_COMPANY_DETAILS_CHECK_AND_CHANGE, OTHER_COMPANY_DETAILS_CHANGE, OTHER_COMPANY_DETAILS_SAVE_AND_BACK },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

const {
  REQUESTED_JOINTLY_INSURED_PARTY: { COMPANY_NAME, COMPANY_NUMBER, COUNTRY_CODE },
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

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

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
          COUNTRY_CODE: {
            ID: COUNTRY_CODE,
            ...FIELDS.REQUESTED_JOINTLY_INSURED_PARTY[COUNTRY_CODE],
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
      const expected = [COMPANY_NAME, COMPANY_NUMBER, COUNTRY_CODE];

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
        application: mockApplication,
        countries: mapCountries(mockCountries, jointlyInsuredParty[COUNTRY_CODE]),
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
      jest.resetAllMocks();

      getCountriesSpy = jest.fn(() => Promise.resolve(mockCountries));
      api.keystone.countries.getAll = getCountriesSpy;

      mapAndSave.jointlyInsuredParty = jest.fn(() => Promise.resolve(true));
    });

    const validBody = {
      [COMPANY_NAME]: 'Mock company name',
      [COMPANY_NUMBER]: 'Mock company number',
      [COUNTRY_CODE]: mockCountries[0].name,
    };

    describe('when there are validation errors', () => {
      it('should call api.keystone.countries.getAll', async () => {
        await post(req, res);

        expect(getCountriesSpy).toHaveBeenCalledTimes(1);
      });

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
          application: mockApplication,
          submittedValues: payload,
          countries: mapCountries(mockCountries, payload[COUNTRY_CODE]),
          validationErrors: generateValidationErrors(payload),
        };

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
      });
    });

    describe('when there are no validation errors', () => {
      beforeEach(() => {
        req.body = validBody;
      });

      it('should NOT call api.keystone.countries.getAll', async () => {
        await post(req, res);

        expect(getCountriesSpy).toHaveBeenCalledTimes(0);
      });

      it('should call mapAndSave.jointlyInsuredParty once with data from constructPayload function', async () => {
        await post(req, res);

        const payload = constructPayload(req.body, FIELD_IDS);

        const sanitisedData = sanitiseData(payload);

        expect(mapAndSave.jointlyInsuredParty).toHaveBeenCalledTimes(1);

        expect(mapAndSave.jointlyInsuredParty).toHaveBeenCalledWith(sanitisedData, mockApplication);
      });

      it(`should redirect to ${BROKER_ROOT}`, async () => {
        await post(req, res);

        const expected = `${INSURANCE_ROOT}/${referenceNumber}${BROKER_ROOT}`;

        expect(res.redirect).toHaveBeenCalledWith(expected);
      });

      describe("when the url's last substring is 'change'", () => {
        it(`should redirect to ${CHECK_YOUR_ANSWERS}`, async () => {
          req.originalUrl = OTHER_COMPANY_DETAILS_CHANGE;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe("when the url's last substring is 'check-and-change'", () => {
        it(`should redirect to ${CHECK_AND_CHANGE_ROUTE}`, async () => {
          req.originalUrl = OTHER_COMPANY_DETAILS_CHECK_AND_CHANGE;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${referenceNumber}${CHECK_AND_CHANGE_ROUTE}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
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

      describe('mapAndSave.jointlyInsuredParty call', () => {
        beforeEach(() => {
          req.body = validBody;
        });

        describe('when a true boolean is not returned', () => {
          beforeEach(() => {
            const mapAndSaveSpy = jest.fn(() => Promise.resolve(false));

            mapAndSave.jointlyInsuredParty = mapAndSaveSpy;
          });

          it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
            await post(req, res);

            expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
          });
        });

        describe('when there is an error', () => {
          beforeEach(() => {
            const mapAndSaveSpy = jest.fn(() => Promise.reject(new Error('mock')));

            mapAndSave.jointlyInsuredParty = mapAndSaveSpy;
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
