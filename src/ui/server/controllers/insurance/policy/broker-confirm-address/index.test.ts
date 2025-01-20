import { pageVariables, PAGE_CONTENT_STRINGS, TEMPLATE, get, post } from '.';
import { PAGES } from '../../../../content-strings';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import POLICY_FIELD_IDS from '../../../../constants/field-ids/insurance/policy';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import replaceNewLineWithLineBreak from '../../../../helpers/replace-new-line-with-line-break';
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes, mockApplication, referenceNumber } from '../../../../test-mocks';

const {
  BROKER_DETAILS: { POSTCODE, BUILDING_NUMBER_OR_NAME },
  BROKER_MANUAL_ADDRESS: { FULL_ADDRESS: FIELD_ID },
} = POLICY_FIELD_IDS;

const {
  INSURANCE_ROOT,
  ALL_SECTIONS,
  POLICY: { BROKER_DETAILS_ROOT, BROKER_MANUAL_ADDRESS_ROOT, LOSS_PAYEE_ROOT },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

describe('controllers/insurance/policy/broker-confirm-address', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('PAGE_CONTENT_STRINGS', () => {
    it('should have the correct strings', () => {
      expect(PAGE_CONTENT_STRINGS).toEqual(PAGES.INSURANCE.POLICY.BROKER_CONFIRM_ADDRESS);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.POLICY.BROKER_CONFIRM_ADDRESS);
    });
  });

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const result = pageVariables(referenceNumber);

      const expected = {
        USE_DIFFERENT_ADDRESS_URL: `${INSURANCE_ROOT}/${referenceNumber}${BROKER_DETAILS_ROOT}`,
        ENTER_ADDRESS_MANUALLY_URL: `${INSURANCE_ROOT}/${referenceNumber}${BROKER_MANUAL_ADDRESS_ROOT}`,
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('get', () => {
    describe(`when application.broker does not have ${POSTCODE}, ${BUILDING_NUMBER_OR_NAME} or ${FIELD_ID}`, () => {
      beforeEach(() => {
        res.locals.application = {
          ...mockApplication,
          broker: {
            ...mockApplication.broker,
            [POSTCODE]: '',
            [BUILDING_NUMBER_OR_NAME]: '',
            [FIELD_ID]: '',
          },
        };
      });

      it(`should redirect to ${BROKER_DETAILS_ROOT}`, () => {
        get(req, res);

        expect(res.redirect).toHaveBeenCalledWith(`${INSURANCE_ROOT}/${referenceNumber}${BROKER_DETAILS_ROOT}`);
      });
    });

    describe(`when application.broker has ${POSTCODE} and ${BUILDING_NUMBER_OR_NAME}, no ${FIELD_ID}`, () => {
      beforeEach(() => {
        res.locals.application = {
          ...mockApplication,
          broker: {
            ...mockApplication.broker,
            [POSTCODE]: 'Mock postcode',
            [BUILDING_NUMBER_OR_NAME]: 'Mock building name/number',
            [FIELD_ID]: '',
          },
        };
      });

      it(`should NOT redirect to ${BROKER_DETAILS_ROOT}`, () => {
        get(req, res);

        expect(res.redirect).toHaveBeenCalledTimes(0);
      });
    });

    describe(`when application.broker has ${FIELD_ID}, no ${POSTCODE} or ${BUILDING_NUMBER_OR_NAME}`, () => {
      beforeEach(() => {
        res.locals.application = {
          ...mockApplication,
          broker: {
            ...mockApplication.broker,
            [POSTCODE]: '',
            [BUILDING_NUMBER_OR_NAME]: '',
            [FIELD_ID]: 'Mock full address',
          },
        };
      });

      it(`should NOT redirect to ${BROKER_DETAILS_ROOT}`, () => {
        get(req, res);

        expect(res.redirect).toHaveBeenCalledTimes(0);
      });
    });

    describe(`when application.broker has ${FIELD_ID} and ${POSTCODE}, no ${BUILDING_NUMBER_OR_NAME}`, () => {
      beforeEach(() => {
        res.locals.application = {
          ...mockApplication,
          broker: {
            ...mockApplication.broker,
            [POSTCODE]: 'Mock postcode',
            [BUILDING_NUMBER_OR_NAME]: '',
            [FIELD_ID]: 'Mock full address',
          },
        };
      });

      it(`should NOT redirect to ${BROKER_DETAILS_ROOT}`, () => {
        get(req, res);

        expect(res.redirect).toHaveBeenCalledTimes(0);
      });
    });

    describe(`when application.broker has ${FIELD_ID} and ${BUILDING_NUMBER_OR_NAME}, no ${POSTCODE}`, () => {
      beforeEach(() => {
        res.locals.application = {
          ...mockApplication,
          broker: {
            ...mockApplication.broker,
            [POSTCODE]: '',
            [BUILDING_NUMBER_OR_NAME]: 'Mock building name/number',
            [FIELD_ID]: 'Mock full address',
          },
        };
      });

      it(`should NOT redirect to ${BROKER_DETAILS_ROOT}`, () => {
        get(req, res);

        expect(res.redirect).toHaveBeenCalledTimes(0);
      });
    });

    it('should render template', () => {
      get(req, res);

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS,
          BACK_LINK: req.headers.referer,
        }),
        ...pageVariables(referenceNumber),
        userName: getUserNameFromSession(req.session.user),
        submittedAnswer: replaceNewLineWithLineBreak(mockApplication.broker[FIELD_ID]),
      });
    });

    describe('when there is no application', () => {
      beforeEach(() => {
        delete res.locals.application;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, () => {
        get(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });
  });

  describe('post', () => {
    it(`should redirect to ${LOSS_PAYEE_ROOT}`, () => {
      post(req, res);

      const expected = `${INSURANCE_ROOT}/${referenceNumber}${LOSS_PAYEE_ROOT}`;

      expect(res.redirect).toHaveBeenCalledWith(expected);
    });

    describe('when there is no application', () => {
      beforeEach(() => {
        delete res.locals.application;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, () => {
        post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });
  });
});
