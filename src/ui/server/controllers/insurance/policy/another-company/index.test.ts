import { FIELD_ID, PAGE_CONTENT_STRINGS, pageVariables, HTML_FLAGS, TEMPLATE, get, post } from '.';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import POLICY_FIELD_IDS from '../../../../constants/field-ids/insurance/policy';
import { ERROR_MESSAGES, PAGES } from '../../../../content-strings';
import { POLICY_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import constructPayload from '../../../../helpers/construct-payload';
import { sanitiseData } from '../../../../helpers/sanitise-data';
import generateValidationErrors from '../../../../shared-validation/yes-no-radios-form';
import mapAndSave from '../map-and-save/jointly-insured-party';
import { Request, ResponseInsurance } from '../../../../../types';
import { mockReq, mockResInsurance, mockApplication, mockSpyPromiseRejection, referenceNumber } from '../../../../test-mocks';

const {
  INSURANCE_ROOT,
  CHECK_YOUR_ANSWERS: { TYPE_OF_POLICY: CHECK_AND_CHANGE_ROUTE },
  POLICY: {
    ANOTHER_COMPANY_CHANGE,
    ANOTHER_COMPANY_CHECK_AND_CHANGE,
    ANOTHER_COMPANY_SAVE_AND_BACK,
    BROKER_ROOT,
    CHECK_YOUR_ANSWERS,
    OTHER_COMPANY_DETAILS,
    OTHER_COMPANY_DETAILS_CHANGE,
    OTHER_COMPANY_DETAILS_CHECK_AND_CHANGE,
  },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

const {
  REQUESTED_JOINTLY_INSURED_PARTY: { REQUESTED },
} = POLICY_FIELD_IDS;

const { SHARED_PAGES } = TEMPLATES;

const {
  INSURANCE: {
    POLICY: {
      REQUESTED_JOINTLY_INSURED_PARTY: {
        [FIELD_ID]: { IS_EMPTY: ERROR_MESSAGE },
      },
    },
  },
} = ERROR_MESSAGES;

describe('controllers/insurance/policy/another-company', () => {
  let req: Request;
  let res: ResponseInsurance;

  jest.mock('../map-and-save/policy');

  beforeEach(() => {
    req = mockReq();
    res = mockResInsurance();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('FIELD_ID', () => {
    it('should have the correct ID', () => {
      const expected = REQUESTED;

      expect(FIELD_ID).toEqual(expected);
    });
  });

  describe('PAGE_CONTENT_STRINGS', () => {
    it('should have the correct strings', () => {
      const expected = {
        ...PAGES.INSURANCE.POLICY.ANOTHER_COMPANY,
        HINT: FIELDS.REQUESTED_JOINTLY_INSURED_PARTY[REQUESTED].HINT,
      };

      expect(PAGE_CONTENT_STRINGS).toEqual(expected);
    });
  });

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const result = pageVariables(referenceNumber);

      const expected = {
        FIELD_ID,
        FIELD_HINT: PAGE_CONTENT_STRINGS.HINT,
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${ANOTHER_COMPANY_SAVE_AND_BACK}`,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('HTML_FLAGS', () => {
    it('should have the correct properties', () => {
      const expected = {
        HORIZONTAL_RADIOS: true,
        NO_RADIO_AS_FIRST_OPTION: true,
      };

      expect(HTML_FLAGS).toEqual(expected);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(SHARED_PAGES.SINGLE_RADIO);
    });
  });

  describe('get', () => {
    it('should render template', () => {
      get(req, res);

      const expectedVariables = {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS,
          BACK_LINK: req.headers.referer,
          HTML_FLAGS,
        }),
        ...pageVariables(referenceNumber),
        userName: getUserNameFromSession(req.session.user),
        submittedValues: mockApplication.policy.jointlyInsuredParty,
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
    });
  });

  describe('post', () => {
    mapAndSave.jointlyInsuredParty = jest.fn(() => Promise.resolve(true));

    const validBody = {
      [REQUESTED]: 'false',
    };

    describe('when there are no validation errors', () => {
      it('should call mapAndSave.jointlyInsuredParty once with data from constructPayload function', async () => {
        req.body = validBody;

        await post(req, res);

        const payload = constructPayload(req.body, [FIELD_ID]);

        const sanitisedData = sanitiseData(payload);

        expect(mapAndSave.jointlyInsuredParty).toHaveBeenCalledTimes(1);

        expect(mapAndSave.jointlyInsuredParty).toHaveBeenCalledWith(sanitisedData, mockApplication);
      });

      describe(`when ${FIELD_ID} is submitted as 'no'`, () => {
        beforeEach(() => {
          req.body = {
            [REQUESTED]: 'false',
          };
        });

        it(`should redirect to ${BROKER_ROOT}`, async () => {
          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${referenceNumber}${BROKER_ROOT}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe(`when ${FIELD_ID} is submitted as 'yes'`, () => {
        beforeEach(() => {
          req.body = {
            [REQUESTED]: 'true',
          };
        });

        it(`should redirect to ${OTHER_COMPANY_DETAILS}`, async () => {
          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${referenceNumber}${OTHER_COMPANY_DETAILS}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe(`when ${FIELD_ID} is true and the url's last substring is 'change'`, () => {
        it(`should redirect to ${OTHER_COMPANY_DETAILS_CHANGE}`, async () => {
          req.originalUrl = ANOTHER_COMPANY_CHANGE;

          req.body = {
            [FIELD_ID]: 'true',
          };

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${referenceNumber}${OTHER_COMPANY_DETAILS_CHANGE}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe(`when ${FIELD_ID} is false and the url's last substring is 'change'`, () => {
        it(`should redirect to ${CHECK_YOUR_ANSWERS}`, async () => {
          req.originalUrl = ANOTHER_COMPANY_CHANGE;

          req.body = {
            [FIELD_ID]: 'false',
          };

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe(`when ${FIELD_ID} is true and the url's last substring is 'check-and-change'`, () => {
        it(`should redirect to ${OTHER_COMPANY_DETAILS_CHECK_AND_CHANGE}`, async () => {
          req.originalUrl = ANOTHER_COMPANY_CHECK_AND_CHANGE;

          req.body = {
            [FIELD_ID]: 'true',
          };

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${referenceNumber}${OTHER_COMPANY_DETAILS_CHECK_AND_CHANGE}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe(`when ${FIELD_ID} is false and the url's last substring is 'check-and-change'`, () => {
        it(`should redirect to ${CHECK_AND_CHANGE_ROUTE}`, async () => {
          req.originalUrl = ANOTHER_COMPANY_CHECK_AND_CHANGE;

          req.body = {
            [FIELD_ID]: 'false',
          };

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${referenceNumber}${CHECK_AND_CHANGE_ROUTE}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });
    });

    describe('when there are validation errors', () => {
      const mockInvalidBody = {
        [REQUESTED]: '',
      };

      beforeEach(() => {
        req.body = mockInvalidBody;
      });

      it('should render template with validation errors', async () => {
        await post(req, res);

        const payload = constructPayload(req.body, [FIELD_ID]);
        const sanitisedData = sanitiseData(payload);

        const expectedVariables = {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS,
            BACK_LINK: req.headers.referer,
            HTML_FLAGS,
          }),
          ...pageVariables(referenceNumber),
          userName: getUserNameFromSession(req.session.user),
          application: res.locals.application,
          submittedValues: sanitisedData,
          validationErrors: generateValidationErrors(payload, FIELD_ID, ERROR_MESSAGE),
        };

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
      });
    });

    describe('api error handling', () => {
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
            const mapAndSaveSpy = mockSpyPromiseRejection;

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
