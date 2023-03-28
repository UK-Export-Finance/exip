import { get, post, TEMPLATE } from '.';
import { PAGES } from '../../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../../constants';
import { Request, Response } from '../../../../../types';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import { yourBuyerSummaryList } from '../../../../helpers/summary-lists/your-buyer';
import { mockReq, mockRes, mockApplication } from '../../../../test-mocks';
import requiredFields from '../../../../helpers/required-fields/your-buyer';
import sectionStatus from '../../../../helpers/section-status';

const CHECK_YOUR_ANSWERS_TEMPLATE = TEMPLATES.INSURANCE.CHECK_YOUR_ANSWERS;

const {
  PROBLEM_WITH_SERVICE,
  INSURANCE: {
    INSURANCE_ROOT,
    ALL_SECTIONS,
    CHECK_YOUR_ANSWERS: { YOUR_BUYER_SAVE_AND_BACK },
  },
} = ROUTES;

describe('controllers/insurance/check-your-answers/your-buyer', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    res.locals.application = mockApplication;
    req.params.referenceNumber = String(mockApplication.referenceNumber);
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(CHECK_YOUR_ANSWERS_TEMPLATE);
    });
  });

  describe('get', () => {
    it('should render template', async () => {
      await get(req, res);
      const checkAndChange = true;
      const summaryList = yourBuyerSummaryList(mockApplication.buyer, mockApplication.referenceNumber, checkAndChange);

      const fields = requiredFields();

      const status = sectionStatus(fields, mockApplication);

      const expectedVariables = {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: PAGES.INSURANCE.CHECK_YOUR_ANSWERS.YOUR_BUYER,
          BACK_LINK: req.headers.referer,
        }),
        SUMMARY_LIST: summaryList,
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${YOUR_BUYER_SAVE_AND_BACK}`,
        status,
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
    });

    describe('when there is no application', () => {
      beforeEach(() => {
        res.locals = { csrfToken: '1234' };
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

    describe('when there is no application', () => {
      beforeEach(() => {
        res.locals = { csrfToken: '1234' };
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });
  });
});
