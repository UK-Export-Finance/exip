import { get, post } from '.';
import { PAGES } from '../../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES, INSURANCE_ROOT } from '../../../../constants/routes/insurance';
import corePageVariables from '../../../../helpers/page-variables/core/insurance';
import { mockReq, mockRes } from '../../../../test-mocks';
import { Request, Response } from '../../../../../types';
import api from '../../../../api';

describe('controllers/insurance/eligibility/eligible-to-apply-online', () => {
  let req: Request;
  let res: Response;

  const mockReferenceNumber = '1001';

  const mockCreateApplicationResponse = {
    referenceNumber: mockReferenceNumber,
  };

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  describe('get', () => {
    it('should render template', () => {
      get(req, res);

      const expectedVariables = {
        ...corePageVariables({
          PAGE_CONTENT_STRINGS: PAGES.INSURANCE.ELIGIBILITY.ELIGIBLE_TO_APPLY_ONLINE,
          BACK_LINK: req.headers.referer,
        }),
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATES.INSURANCE.ELIGIBILITY.ELIGIBLE_TO_APPLY_ONLINE, expectedVariables);
    });
  });

  describe('post', () => {
    let createApplicationSpy = jest.fn(() => Promise.resolve(mockCreateApplicationResponse));

    beforeEach(() => {
      api.keystone.createApplication = createApplicationSpy;
    });

    it('should call api.keystone.createApplication', async () => {
      await post(req, res);

      expect(createApplicationSpy).toHaveBeenCalledTimes(1);
    });

    it(`should redirect to ${INSURANCE_ROOT}/${mockReferenceNumber}${INSURANCE_ROUTES.ALL_SECTIONS}`, async () => {
      await post(req, res);

      const expected = `${INSURANCE_ROOT}/${mockReferenceNumber}${INSURANCE_ROUTES.ALL_SECTIONS}`;

      expect(res.redirect).toHaveBeenCalledWith(expected);
    });

    describe('when there is no application', () => {
      beforeEach(() => {
        // @ts-ignore
        createApplicationSpy = jest.fn(() => Promise.resolve());

        api.keystone.createApplication = createApplicationSpy;
      });

      it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
      });
    });

    describe('when there is an error with the API call', () => {
      beforeEach(() => {
        createApplicationSpy = jest.fn(() => Promise.reject());
        api.keystone.createApplication = createApplicationSpy;
      });

      it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
      });
    });
  });
});
