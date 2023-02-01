import { PAGES } from '../../../../content-strings';
import { Request, Response } from '../../../../../types';
import { TEMPLATES, ROUTES, FIELD_IDS } from '../../../../constants';
import { FIELDS } from '../../../../content-strings/fields/insurance/your-business';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import chooseDateFormat from '../../../../helpers/date/choose-date-format';

const { EXPORTER_BUSINESS } = FIELD_IDS.INSURANCE;
const { FINANCIAL_YEAR_END_DATE } = EXPORTER_BUSINESS.TURNOVER;

const { TURNOVER } = PAGES.INSURANCE.EXPORTER_BUSINESS;
const { TURNOVER: TURNOVER_TEMPLATE } = TEMPLATES.INSURANCE.EXPORTER_BUSINESS;

export const TEMPLATE = TURNOVER_TEMPLATE;

const { INSURANCE_ROOT, EXPORTER_BUSINESS: EXPORTER_BUSINESS_ROUTES } = ROUTES.INSURANCE;

const { TURNOVER_ROOT } = EXPORTER_BUSINESS_ROUTES;

const { TURNOVER: TURNOVER_FIELDS } = FIELDS;

const pageVariables = (referenceNumber: number) => ({
  FIELDS: {
    FINANCIAL_YEAR_END_DATE: {
      ID: FINANCIAL_YEAR_END_DATE,
      ...TURNOVER_FIELDS[FINANCIAL_YEAR_END_DATE],
    },
  },
  POST_ROUTES: {
    NATURE_OF_BUSINESS: `${INSURANCE_ROOT}/${referenceNumber}${TURNOVER_ROOT}`,
    SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${TURNOVER_ROOT}`,
  },
});

/**
 * gets the template for turnover page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} renders turnover page with/without previously submitted details
 */
const get = (req: Request, res: Response) => {
  try {
    const { application } = res.locals;

    if (!application) {
      return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
    }

    const { exporterCompany } = application;

    // values from application if they exist
    const submittedValues = {
      // if FINANCIAL_YEAR_END_DATE exists, then will display in correct format or will not render section if null
      [FINANCIAL_YEAR_END_DATE]: exporterCompany[FINANCIAL_YEAR_END_DATE] ? chooseDateFormat(exporterCompany[FINANCIAL_YEAR_END_DATE], 'd MMMM') : null,
    };

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS: TURNOVER,
        BACK_LINK: req.headers.referer,
      }),
      submittedValues,
      ...pageVariables(application.referenceNumber),
    });
  } catch (error) {
    console.error('Error getting turnover', { error });
    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
};

export { pageVariables, get };
