import { TEMPLATE, get, post } from '.';
import { PAGES } from '../../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../../constants';
import corePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import { sanitiseData } from '../../../../helpers/sanitise-data';
import mapEligibilityAnswers from '../../../../helpers/map-eligibility-answers';
import api from '../../../../api';
import { mockAccount, referenceNumber, mockSession, mockReq, mockRes } from '../../../../test-mocks';
import { Request, Response } from '../../../../../types';

const {
  INSURANCE: {
    INSURANCE_ROOT,
    ALL_SECTIONS,
    ELIGIBILITY: { HAVE_AN_ACCOUNT },
    DASHBOARD,
    PROBLEM_WITH_SERVICE,
  },
} = ROUTES;

describe('controllers/insurance/eligibility/eligible-to-apply-online', () => {
  let req: Request;
  let res: Response;

  const mockCreateApplicationResponse = { referenceNumber };

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.ELIGIBILITY.ELIGIBLE_TO_APPLY_ONLINE);
    });
  });

  describe('get', () => {
    it('should render template', () => {
      get(req, res);

      const expectedVariables = {
        ...corePageVariables({
          PAGE_CONTENT_STRINGS: PAGES.INSURANCE.ELIGIBILITY.ELIGIBLE_TO_APPLY_ONLINE,
          BACK_LINK: req.headers.referer,
        }),
        userName: getUserNameFromSession(req.session.user),
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
    });
  });

  describe('post', () => {
    it(`should redirect to ${HAVE_AN_ACCOUNT}`, async () => {
      await post(req, res);

      const expected = `${HAVE_AN_ACCOUNT}`;

      expect(res.redirect).toHaveBeenCalledWith(expected);
    });

    describe('when there is a user and eligibility answers in the session', () => {
      let createApplicationSpy = jest.fn(() => Promise.resolve(mockCreateApplicationResponse));

      beforeEach(() => {
        api.keystone.application.create = createApplicationSpy;

        req.session = {
          ...req.session,
          user: mockAccount,
          submittedData: {
            ...req.session.submittedData,
            insuranceEligibility: mockSession.submittedData.insuranceEligibility,
          },
        };
      });

      it('should wipe req.session.submittedData.insuranceEligibility', async () => {
        await post(req, res);

        expect(req.session.submittedData.insuranceEligibility).toEqual({});
      });

      it('should call api.keystone.application.create', async () => {
        const answers = req.session.submittedData.insuranceEligibility;

        await post(req, res);

        expect(createApplicationSpy).toHaveBeenCalledTimes(1);

        const sanitisedData = sanitiseData(answers);

        const eligibilityAnswers = mapEligibilityAnswers(sanitisedData);

        expect(createApplicationSpy).toHaveBeenCalledWith(eligibilityAnswers, mockAccount.id);
      });

      it(`should redirect to ${ALL_SECTIONS}`, async () => {
        await post(req, res);

        const expected = `${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`;

        expect(res.redirect).toHaveBeenCalledWith(expected);
      });

      describe('when there is no application', () => {
        beforeEach(() => {
          // @ts-ignore
          createApplicationSpy = jest.fn(() => Promise.resolve());

          api.keystone.application.create = createApplicationSpy;
        });

        it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
          await post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
        });
      });

      describe('when there is an error with the API call', () => {
        beforeEach(() => {
          createApplicationSpy = jest.fn(() => Promise.reject(new Error('mock')));
          api.keystone.application.create = createApplicationSpy;
        });

        it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
          await post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
        });
      });
    });

    describe('when there is a user, but no eligibility answers in the session', () => {
      it(`should redirect to ${DASHBOARD}`, async () => {
        req.session = {
          ...req.session,
          user: mockAccount,
          submittedData: {
            ...req.session.submittedData,
            insuranceEligibility: {},
          },
        };

        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(DASHBOARD);
      });
    });
  });
});
