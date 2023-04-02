import { pageVariables, get, post, TEMPLATE } from '.';
import { PAGES } from '../../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../../constants';
import FIELD_IDS from '../../../../constants/field-ids/insurance';
import { CHECK_YOUR_ANSWERS_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance/check-your-answers';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import { eligibilitySummaryList } from '../../../../helpers/summary-lists/eligibility';
import requiredFields from '../../../../helpers/required-fields/policy-and-exports';
import sectionStatus from '../../../../helpers/section-status';
import save from '../save-data';
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes, mockApplication } from '../../../../test-mocks';

const CHECK_YOUR_ANSWERS_TEMPLATE = TEMPLATES.INSURANCE.CHECK_YOUR_ANSWERS;

const FIELD_ID = FIELD_IDS.CHECK_YOUR_ANSWERS.ELIGIBILITY;

const {
  PROBLEM_WITH_SERVICE,
  INSURANCE: {
    INSURANCE_ROOT,
    CHECK_YOUR_ANSWERS: { START_NEW_APPLICATION, TYPE_OF_POLICY },
  },
} = ROUTES;

describe('controllers/insurance/check-your-answers/eligibility', () => {
  jest.mock('../save-data');

  let mockSaveSectionReview = jest.fn(() => Promise.resolve({}));

  save.sectionReview = mockSaveSectionReview;

  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    res.locals.application = mockApplication;
    req.params.referenceNumber = String(mockApplication.referenceNumber);
  });

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const result = pageVariables(mockApplication.referenceNumber);

      const expected = {
        FIELD: {
          ID: FIELD_ID,
          ...FIELDS[FIELD_ID],
        },
        START_NEW_APPLICATION: `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${START_NEW_APPLICATION}`,
        renderNotificationBanner: true,
        eligibility: true,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(CHECK_YOUR_ANSWERS_TEMPLATE);
    });
  });

  describe('get', () => {
    it('should render template', async () => {
      await get(req, res);

      const summaryList = eligibilitySummaryList(mockApplication.eligibility);

      const fields = requiredFields(mockApplication.policyAndExport.policyType);

      const status = sectionStatus(fields, mockApplication);

      const expectedVariables = {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: PAGES.INSURANCE.CHECK_YOUR_ANSWERS.ELIGIBILITY,
          BACK_LINK: req.headers.referer,
        }),
        status,
        SUMMARY_LIST: summaryList,
        ...pageVariables(mockApplication.referenceNumber),
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
    const mockBody = {
      [FIELD_ID]: 'true',
    };

    beforeEach(() => {
      req.body = mockBody;
    });

    it('should call save.sectionReview with application and req.body', async () => {
      await post(req, res);

      expect(save.sectionReview).toHaveBeenCalledTimes(1);
      expect(save.sectionReview).toHaveBeenCalledWith(mockApplication, mockBody);
    });

    it(`should redirect to ${TYPE_OF_POLICY}`, async () => {
      await post(req, res);

      const expected = `${INSURANCE_ROOT}/${req.params.referenceNumber}${TYPE_OF_POLICY}`;

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

    describe('api error handling', () => {
      describe('when the save data API call does not return anything', () => {
        beforeEach(() => {
          mockSaveSectionReview = jest.fn(() => Promise.resolve(false));
          save.sectionReview = mockSaveSectionReview;

          req.body = mockBody;
        });

        it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
          await post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
        });
      });

      describe('when the save data API call fails', () => {
        beforeEach(() => {
          mockSaveSectionReview = jest.fn(() => Promise.reject());
          save.sectionReview = mockSaveSectionReview;

          req.body = mockBody;
        });

        it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
          await post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
        });
      });
    });
  });
});
