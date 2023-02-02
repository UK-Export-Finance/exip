import { PAGES } from '../../../../content-strings';
import { Request, Response } from '../../../../../types';
import { TEMPLATES, ROUTES, FIELD_IDS } from '../../../../constants';
import { FIELDS } from '../../../../content-strings/fields/insurance/your-business';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import generateValidationErrors from './validation';

const { EXPORTER_BUSINESS } = FIELD_IDS.INSURANCE;
const { FINANCIAL_YEAR_END_DATE, ESTIMATED_ANNUAL_TURNOVER } = EXPORTER_BUSINESS.TURNOVER;

const { TURNOVER } = PAGES.INSURANCE.EXPORTER_BUSINESS;
const { TURNOVER: TURNOVER_TEMPLATE } = TEMPLATES.INSURANCE.EXPORTER_BUSINESS;

export const TEMPLATE = TURNOVER_TEMPLATE;

const { INSURANCE_ROOT, EXPORTER_BUSINESS: EXPORTER_BUSINESS_ROUTES } = ROUTES.INSURANCE;

const { TURNOVER_ROOT, BROKER_ROOT } = EXPORTER_BUSINESS_ROUTES;

const { TURNOVER: TURNOVER_FIELDS } = FIELDS;

const pageVariables = (referenceNumber: number) => ({
  FIELDS: {
    FINANCIAL_YEAR_END_DATE: {
      ID: FINANCIAL_YEAR_END_DATE,
      ...TURNOVER_FIELDS[FINANCIAL_YEAR_END_DATE],
    },
    ESTIMATED_ANNUAL_TURNOVER: {
      ID: ESTIMATED_ANNUAL_TURNOVER,
      ...TURNOVER_FIELDS[ESTIMATED_ANNUAL_TURNOVER],
    },
  },
  SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${TURNOVER_ROOT}`,
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

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS: TURNOVER,
        BACK_LINK: req.headers.referer,
      }),
      application: mapApplicationToFormFields(application),
      ...pageVariables(application.referenceNumber),
    });
  } catch (error) {
    console.error('Error getting turnover', { error });
    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
};

/**
 * posts turnover page
 * runs validation and either renders template with errors or redirects to next page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} Broker page
 */
const post = async (req: Request, res: Response) => {
  try {
    const { application } = res.locals;

    if (!application) {
      return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
    }

    const { referenceNumber } = req.params;

    const { body } = req;

    // populate submittedValues
    const submittedValues = {
      [ESTIMATED_ANNUAL_TURNOVER]: body[ESTIMATED_ANNUAL_TURNOVER],
    };

    // run validation on inputs
    const validationErrors = generateValidationErrors(body);

    // if any errors then render template with errors
    if (validationErrors && Object.keys(validationErrors).length) {
      return res.render(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: TURNOVER,
          BACK_LINK: req.headers.referer,
        }),
        ...pageVariables(application.referenceNumber),
        validationErrors,
        application: mapApplicationToFormFields(application),
        submittedValues,
      });
    }

    // // if no errors, then runs save api call to db
    // const saveResponse = await mapAndSave.turnover(body, application);

    // if (!saveResponse) {
    //   return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
    // }

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${BROKER_ROOT}`);
  } catch (err) {
    console.error('Error updating application - your business - turnover', { err });
    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
};

export { pageVariables, get, post };
