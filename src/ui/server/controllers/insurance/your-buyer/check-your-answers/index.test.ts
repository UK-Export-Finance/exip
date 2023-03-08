import { get, post } from '.';
import { PAGES } from '../../../../content-strings';
import { Request, Response, ApplicationBuyer } from '../../../../../types';
import { TEMPLATES, ROUTES } from '../../../../constants';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import { yourBuyerSummaryList } from '../../../../helpers/summary-lists/your-buyer';
import { mockReq, mockRes, mockApplication, mockBuyer } from '../../../../test-mocks';

const { CHECK_YOUR_ANSWERS } = PAGES.INSURANCE.YOUR_BUYER;
const { CHECK_YOUR_ANSWERS: CHECK_YOUR_ANSWERS_TEMPLATE } = TEMPLATES.INSURANCE.YOUR_BUYER;

export const TEMPLATE = CHECK_YOUR_ANSWERS_TEMPLATE;

const { INSURANCE_ROOT, ALL_SECTIONS, YOUR_BUYER: YOUR_BUYER_ROUTES } = ROUTES.INSURANCE;

const { CHECK_YOUR_ANSWERS_SAVE_AND_BACK } = YOUR_BUYER_ROUTES;

describe('controllers/insurance/your-buyer/check-your-answers', () => {
  let req: Request;
  let res: Response;
  let refNumber: number;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    res.locals.application = mockApplication;
    req.params.referenceNumber = String(mockApplication.referenceNumber);
    refNumber = Number(mockApplication.referenceNumber);
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

      const summaryList = yourBuyerSummaryList(mockApplicationBuyer, mockApplication.referenceNumber);

      const expectedVariables = {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: CHECK_YOUR_ANSWERS,
          BACK_LINK: req.headers.referer,
        }),
        application: mapApplicationToFormFields(mockApplication),
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${refNumber}${CHECK_YOUR_ANSWERS_SAVE_AND_BACK}`,
        SUMMARY_LIST: summaryList,
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
    });

    describe('when there is no application', () => {
      beforeEach(() => {
        res.locals = { csrfToken: '1234' };
      });

      it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
        await get(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
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
