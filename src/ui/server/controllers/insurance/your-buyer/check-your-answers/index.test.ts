import { get, post } from '.';
import { PAGES } from '../../../../content-strings';
import { TEMPLATES, ROUTES } from '../../../../constants';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import { yourBuyerSummaryList } from '../../../../helpers/summary-lists/your-buyer';
import { Request, Response, ApplicationBuyer } from '../../../../../types';
import { mockReq, mockRes, mockApplication, mockBuyer, referenceNumber } from '../../../../test-mocks';

const { CHECK_YOUR_ANSWERS } = PAGES.INSURANCE.YOUR_BUYER;
const { CHECK_YOUR_ANSWERS: CHECK_YOUR_ANSWERS_TEMPLATE } = TEMPLATES.INSURANCE.YOUR_BUYER;

export const TEMPLATE = CHECK_YOUR_ANSWERS_TEMPLATE;

const { INSURANCE_ROOT, ALL_SECTIONS, PROBLEM_WITH_SERVICE } = ROUTES.INSURANCE;

describe('controllers/insurance/your-buyer/check-your-answers', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(CHECK_YOUR_ANSWERS_TEMPLATE);
    });
  });

  describe('get', () => {
    it('should render template', async () => {
      await get(req, res);
      const mockApplicationBuyer = {
        ...mockBuyer,
      } as ApplicationBuyer;

      const summaryList = yourBuyerSummaryList(
        mockApplicationBuyer,
        mockApplication.eligibility,
        referenceNumber,
        mockApplication.totalContractValueOverThreshold,
      );

      const expectedVariables = {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: CHECK_YOUR_ANSWERS,
          BACK_LINK: req.headers.referer,
        }),
        userName: getUserNameFromSession(req.session.user),
        application: mapApplicationToFormFields(mockApplication),
        SUMMARY_LISTS: summaryList,
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
  });

  describe('post', () => {
    it(`should redirect to ${ALL_SECTIONS}`, () => {
      post(req, res);

      const expected = `${INSURANCE_ROOT}/${req.params.referenceNumber}${ALL_SECTIONS}`;

      expect(res.redirect).toHaveBeenCalledWith(expected);
    });
  });
});
