import { PAGES } from '../../../../content-strings';
import { Request, Response } from '../../../../../types';
import { TEMPLATES, ROUTES } from '../../../../constants';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import { yourBusinessSummaryList } from '../../../../helpers/summary-lists/your-business';

const { CHECK_YOUR_ANSWERS } = PAGES.INSURANCE.EXPORTER_BUSINESS;
const { CHECK_YOUR_ANSWERS: CHECK_YOUR_ANSWERS_TEMPLATE } = TEMPLATES.INSURANCE.EXPORTER_BUSINESS;

export const TEMPLATE = CHECK_YOUR_ANSWERS_TEMPLATE;

const { INSURANCE_ROOT, EXPORTER_BUSINESS: EXPORTER_BUSINESS_ROUTES } = ROUTES.INSURANCE;

const { CHECK_YOUR_ANSWERS: CHECK_YOUR_ANSWERS_ROUTE } = EXPORTER_BUSINESS_ROUTES;

/**
 * gets the template for check your answers page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} renders check your answers page with previously submitted details
 */
const get = (req: Request, res: Response) => {
  try {
    const { application } = res.locals;
    const { referenceNumber } = req.params;
    const refNumber = Number(referenceNumber);

    if (!application) {
      return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
    }

    const summaryList = yourBusinessSummaryList(application.exporterCompany, application.exporterBusiness, refNumber);

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS: CHECK_YOUR_ANSWERS,
        BACK_LINK: req.headers.referer,
      }),
      application: mapApplicationToFormFields(application),
      SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS_ROUTE}`,
      SUMMARY_LIST: summaryList,
    });
  } catch (err) {
    console.error('Error getting check your answers', { err });
    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
};

export { get };
