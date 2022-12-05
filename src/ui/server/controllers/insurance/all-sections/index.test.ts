import { TEMPLATE, get } from '.';
import { PAGES } from '../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../constants';
import insuranceCorePageVariables from '../../../helpers/page-variables/core/insurance';
import { mockReq, mockRes } from '../../../test-mocks';
import { Request, Response } from '../../../../types';
import api from '../../../api';

describe('controllers/insurance/all-sections', () => {
  let req: Request;
  let res: Response;

  const mockReferenceNumber = '10001';

  const mockApplication = {
    referenceNumber: mockReferenceNumber,
  };

  const mockGetApplicationResponse = mockApplication;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    req.params.referenceNumber = mockReferenceNumber;
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.ALL_SECTIONS);
    });
  });

  describe('get', () => {
    let getApplicationSpy = jest.fn(() => Promise.resolve(mockGetApplicationResponse));

    beforeEach(() => {
      api.keystone.getApplication = getApplicationSpy;
    });

    it('should call api.keystone.getApplication', async () => {
      await get(req, res);

      expect(getApplicationSpy).toHaveBeenCalledTimes(1);
    });

    it('should render template', async () => {
      await get(req, res);

      const expectedVariables = {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: PAGES.INSURANCE.START,
          BACK_LINK: req.headers.referer,
        }),
        application: mockApplication,
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
    });

    describe('when there is no application', () => {
      beforeEach(() => {
        // @ts-ignore
        getApplicationSpy = jest.fn(() => Promise.resolve());
        api.keystone.getApplication = getApplicationSpy;
      });

      it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
        await get(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
      });
    });

    describe('when there is an error with the API call', () => {
      beforeEach(() => {
        getApplicationSpy = jest.fn(() => Promise.reject());
        api.keystone.getApplication = getApplicationSpy;
      });

      it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
        await get(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
      });
    });
  });
});
