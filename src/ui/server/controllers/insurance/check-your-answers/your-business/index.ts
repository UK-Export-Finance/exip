import { PAGES } from '../../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../../constants';
import { Request, Response } from '../../../../../types';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import { yourBusinessSummaryList } from '../../../../helpers/summary-lists/your-business';
import requiredFields from '../../../../helpers/required-fields/exporter-business';
import sectionStatus from '../../../../helpers/section-status';

export const TEMPLATE = TEMPLATES.INSURANCE.CHECK_YOUR_ANSWERS;

const {
  PROBLEM_WITH_SERVICE,
  INSURANCE: {
    INSURANCE_ROOT,
    CHECK_YOUR_ANSWERS: { YOUR_BUYER, YOUR_BUSINESS_SAVE_AND_BACK },
  },
} = ROUTES;

/**
 * get
 * Render the check your answers your buyer page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} check your answers your buyer
 */
export const get = async (req: Request, res: Response) => {
  try {
    const { application } = res.locals;

    if (!application) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const { referenceNumber, exporterBroker } = application;

    const checkAndChange = true;

    const summaryList = yourBusinessSummaryList(
      application.exporterCompany,
      application.exporterBusiness,
      application.exporterBroker,
      referenceNumber,
      checkAndChange,
    );

    const exporterFields = requiredFields(exporterBroker.isUsingBroker);

    const status = sectionStatus(exporterFields, application);

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS: PAGES.INSURANCE.CHECK_YOUR_ANSWERS.YOUR_BUSINESS,
        BACK_LINK: req.headers.referer,
      }),
      SUMMARY_LIST: summaryList,
      SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${YOUR_BUSINESS_SAVE_AND_BACK}`,
      status,
    });
  } catch (err) {
    console.error('Error getting check your answers - policy and exports', { err });
    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
};

/**
 * post
 * Redirect to the next part of the flow.
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} Next part of the flow
 */
export const post = (req: Request, res: Response) => {
  try {
    const { application } = res.locals;

    if (!application) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const { referenceNumber } = req.params;

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${YOUR_BUYER}`);
  } catch (err) {
    console.error('Error posting check your answers - policy and exports', { err });
    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
};
