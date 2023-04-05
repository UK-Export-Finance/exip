import { TEMPLATE, get, post } from '.';
import { PAGES } from '../../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../../constants';
import corePageVariables from '../../../../helpers/page-variables/core/insurance';
import api from '../../../../api';
import { mockAccount, mockApplication, mockSession, mockReq, mockRes } from '../../../../test-mocks';
import { Request, Response } from '../../../../../types';

const {
  PROBLEM_WITH_SERVICE,
  INSURANCE: { ELIGIBILITY, DASHBOARD },
} = ROUTES;

describe('controllers/insurance/eligibility/eligible-to-apply-online', () => {
  let req: Request;
  let res: Response;

  const { referenceNumber } = mockApplication;

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
        user: req.session.user,
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
    });
  });

  describe('post', () => {
    it(`should redirect to ${ELIGIBILITY.ACCOUNT_TO_APPLY_ONLINE}`, async () => {
      await post(req, res);

      const expected = `${ELIGIBILITY.ACCOUNT_TO_APPLY_ONLINE}`;

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

      it('should call api.keystone.application.create', async () => {
        await post(req, res);

        expect(createApplicationSpy).toHaveBeenCalledTimes(1);

        expect(createApplicationSpy).toHaveBeenCalledWith(req.session.submittedData.insuranceEligibility, mockAccount.id);
      });

      it(`should redirect to ${DASHBOARD}`, async () => {
        await post(req, res);

        const expected = `${DASHBOARD}`;

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
          createApplicationSpy = jest.fn(() => Promise.reject());
          api.keystone.application.create = createApplicationSpy;
        });

        it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
          await post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
        });
      });
    });
  });
});
