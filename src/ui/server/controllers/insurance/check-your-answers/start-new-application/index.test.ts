import { pageVariables, get, TEMPLATE } from '.';
import { PAGES } from '../../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../../constants';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import formatDate from '../../../../helpers/date/format-date';
import { mockReq, mockRes, mockApplication } from '../../../../test-mocks';
import { Request, Response } from '../../../../../types';

const {
  PROBLEM_WITH_SERVICE,
  INSURANCE: { INSURANCE_ROOT, START, ALL_SECTIONS },
} = ROUTES;

describe('controllers/insurance/check-your-answers/start-new-application', () => {
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
        START_NEW_APPLICATION_URL: START,
        RETURN_TO_APPLICATION_URL: `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${ALL_SECTIONS}`,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.NEED_TO_START_NEW_APPLICATION);
    });
  });

  describe('get', () => {
    it('should render template', async () => {
      await get(req, res);

      const expectedVariables = {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: PAGES.INSURANCE.CHECK_YOUR_ANSWERS.START_NEW_APPLICATION,
          BACK_LINK: req.headers.referer,
        }),
        ...pageVariables(mockApplication.referenceNumber),
        formattedSubmissionDeadline: formatDate(new Date(mockApplication.submissionDeadline)),
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
});
