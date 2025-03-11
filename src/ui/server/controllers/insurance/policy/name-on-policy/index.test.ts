import { pageVariables, TEMPLATE, FIELD_IDS, get, post } from '.';
import { ROUTES, TEMPLATES } from '../../../../constants';
import POLICY_FIELD_IDS from '../../../../constants/field-ids/insurance/policy';
import { PAGES } from '../../../../content-strings';
import { POLICY_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import constructPayload from '../../../../helpers/construct-payload';
import generateValidationErrors from './validation';
import mapAndSave from '../map-and-save/policy-contact';
import getNameEmailPositionFromOwnerAndPolicy from '../../../../helpers/get-name-email-position-from-owner-and-policy';
import { Request, ResponseInsurance, RequestBody } from '../../../../../types';
import { mockReq, mockResInsurance, mockApplication, referenceNumber } from '../../../../test-mocks';

const {
  INSURANCE: {
    INSURANCE_ROOT,
    POLICY: {
      CHECK_YOUR_ANSWERS,
      NAME_ON_POLICY_SAVE_AND_BACK,
      DIFFERENT_NAME_ON_POLICY,
      DIFFERENT_NAME_ON_POLICY_CHANGE,
      DIFFERENT_NAME_ON_POLICY_CHECK_AND_CHANGE,
      NAME_ON_POLICY_CHANGE,
      NAME_ON_POLICY_CHECK_AND_CHANGE,
      PRE_CREDIT_PERIOD,
    },
    CHECK_YOUR_ANSWERS: { TYPE_OF_POLICY: CHECK_AND_CHANGE_ROUTE },
  },
} = ROUTES;

const {
  NAME_ON_POLICY: { NAME, POSITION, SAME_NAME, OTHER_NAME },
} = POLICY_FIELD_IDS;

describe('controllers/insurance/policy/name-on-policy', () => {
  let req: Request;
  let res: ResponseInsurance;

  jest.mock('../map-and-save/policy-contact');

  mapAndSave.policyContact = jest.fn(() => Promise.resolve(true));

  beforeEach(() => {
    req = mockReq();
    res = mockResInsurance();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const result = pageVariables(referenceNumber);

      const expected = {
        FIELDS: {
          NAME_ON_POLICY: {
            ID: NAME,
            ...FIELDS.NAME_ON_POLICY,
          },
          POSITION: {
            ID: POSITION,
            ...FIELDS.NAME_ON_POLICY[POSITION],
          },
        },
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${NAME_ON_POLICY_SAVE_AND_BACK}`,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.POLICY.NAME_ON_POLICY);
    });
  });

  describe('FIELD_IDS', () => {
    it('should have the correct FIELD_IDS', () => {
      const expected = [NAME, POSITION];

      expect(FIELD_IDS).toEqual(expected);
    });
  });

  describe('get', () => {
    it('should render template', async () => {
      get(req, res);

      const submittedValues = getNameEmailPositionFromOwnerAndPolicy(mockApplication.owner, mockApplication.policyContact);

      const expectedVariables = {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: PAGES.INSURANCE.POLICY.NAME_ON_POLICY,
          BACK_LINK: req.headers.referer,
        }),
        ...pageVariables(referenceNumber),
        userName: getUserNameFromSession(req.session.user),
        application: mockApplication,
        submittedValues,
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
    });
  });

  describe('post', () => {
    mapAndSave.policyContact = jest.fn(() => Promise.resolve(true));

    describe('when there are no validation errors', () => {
      describe(`when ${SAME_NAME} is selected`, () => {
        const validBody = {
          [NAME]: SAME_NAME,
          [POSITION]: 'Text',
        };

        beforeEach(() => {
          req.body = validBody;
        });

        it(`should redirect to ${PRE_CREDIT_PERIOD}`, async () => {
          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${referenceNumber}${PRE_CREDIT_PERIOD}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });

        it('should call mapAndSave.policyContact once with data from constructPayload function', async () => {
          req.body = validBody;

          await post(req, res);

          const payload = constructPayload(req.body, FIELD_IDS);

          expect(mapAndSave.policyContact).toHaveBeenCalledTimes(1);

          expect(mapAndSave.policyContact).toHaveBeenCalledWith(payload, mockApplication);
        });
      });

      describe(`when ${OTHER_NAME} is submitted`, () => {
        const validBody = {
          [NAME]: OTHER_NAME,
        };

        beforeEach(() => {
          req.body = validBody;
        });

        it(`should redirect to ${DIFFERENT_NAME_ON_POLICY}`, async () => {
          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${referenceNumber}${DIFFERENT_NAME_ON_POLICY}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });

        it('should call mapAndSave.policyContact once with data from constructPayload function', async () => {
          req.body = validBody;

          await post(req, res);

          const payload = constructPayload(req.body, FIELD_IDS);

          expect(mapAndSave.policyContact).toHaveBeenCalledTimes(1);

          expect(mapAndSave.policyContact).toHaveBeenCalledWith(payload, mockApplication);
        });
      });

      describe("when the url's last substring is `change`", () => {
        const validBody: RequestBody = {
          [NAME]: SAME_NAME,
          [POSITION]: 'Text',
        };

        describe(`when ${SAME_NAME} is selected`, () => {
          it(`should redirect to ${CHECK_YOUR_ANSWERS}`, async () => {
            req.originalUrl = NAME_ON_POLICY_CHANGE;
            req.body = validBody;

            await post(req, res);

            const expected = `${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;

            expect(res.redirect).toHaveBeenCalledWith(expected);
          });
        });

        describe(`when ${OTHER_NAME} is submitted`, () => {
          it(`should redirect to ${DIFFERENT_NAME_ON_POLICY_CHANGE}`, async () => {
            req.originalUrl = NAME_ON_POLICY_CHANGE;
            validBody[NAME] = OTHER_NAME;

            req.body = validBody;

            await post(req, res);

            const expected = `${INSURANCE_ROOT}/${referenceNumber}${DIFFERENT_NAME_ON_POLICY_CHANGE}`;

            expect(res.redirect).toHaveBeenCalledWith(expected);
          });
        });
      });

      describe("when the url's last substring is `check-and-change`", () => {
        const validBody: RequestBody = {
          [NAME]: SAME_NAME,
          [POSITION]: 'Text',
        };

        describe(`when ${SAME_NAME} is selected`, () => {
          it(`should redirect to ${CHECK_AND_CHANGE_ROUTE}`, async () => {
            req.originalUrl = NAME_ON_POLICY_CHECK_AND_CHANGE;
            req.body = validBody;

            await post(req, res);

            const expected = `${INSURANCE_ROOT}/${referenceNumber}${CHECK_AND_CHANGE_ROUTE}`;

            expect(res.redirect).toHaveBeenCalledWith(expected);
          });
        });

        describe(`when ${OTHER_NAME} is submitted`, () => {
          it(`should redirect to ${DIFFERENT_NAME_ON_POLICY_CHECK_AND_CHANGE}`, async () => {
            req.originalUrl = NAME_ON_POLICY_CHECK_AND_CHANGE;
            validBody[NAME] = OTHER_NAME;

            req.body = validBody;

            await post(req, res);

            const expected = `${INSURANCE_ROOT}/${referenceNumber}${DIFFERENT_NAME_ON_POLICY_CHECK_AND_CHANGE}`;

            expect(res.redirect).toHaveBeenCalledWith(expected);
          });
        });
      });
    });

    describe('when there are validation errors', () => {
      it('should render template with validation errors', async () => {
        await post(req, res);

        const payload = constructPayload(req.body, FIELD_IDS);
        const nameOfOwner = getNameEmailPositionFromOwnerAndPolicy(mockApplication.owner, mockApplication.policyContact);

        const submittedValues = {
          ...nameOfOwner,
          ...payload,
        };

        const expectedVariables = {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS: PAGES.INSURANCE.POLICY.NAME_ON_POLICY,
            BACK_LINK: req.headers.referer,
          }),
          ...pageVariables(referenceNumber),
          userName: getUserNameFromSession(req.session.user),
          application: mockApplication,
          submittedValues,
          validationErrors: generateValidationErrors(payload),
        };

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
      });
    });
  });
});
