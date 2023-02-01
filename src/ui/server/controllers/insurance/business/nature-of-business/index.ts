import { PAGES } from '../../../../content-strings';
import { Request, Response } from '../../../../../types';
import { TEMPLATES, ROUTES, FIELD_IDS } from '../../../../constants';
import { FIELDS } from '../../../../content-strings/fields/insurance/your-business';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import generateValidationErrors from './validation';
import mapAndSave from '../map-and-save';

const { EXPORTER_BUSINESS } = FIELD_IDS.INSURANCE;
const { GOODS_OR_SERVICES, YEARS_EXPORTING, EMPLOYEES_UK, EMPLOYEES_INTERNATIONAL } = EXPORTER_BUSINESS.NATURE_OF_YOUR_BUSINESS;

const { NATURE_OF_YOUR_BUSINESS } = PAGES.INSURANCE.EXPORTER_BUSINESS;
const { NATURE_OF_YOUR_BUSINESS: NATURE_OF_YOUR_BUSINESS_TEMPLATE } = TEMPLATES.INSURANCE.EXPORTER_BUSINESS;

export const TEMPLATE = NATURE_OF_YOUR_BUSINESS_TEMPLATE;

const { INSURANCE_ROOT, EXPORTER_BUSINESS: EXPORTER_BUSINESS_ROUTES } = ROUTES.INSURANCE;

const { NATURE_OF_BUSINESS_ROOT, NATURE_OF_BUSINESS_SAVE_AND_BACK, TURNOVER_ROOT } = EXPORTER_BUSINESS_ROUTES;

const { NATURE_OF_YOUR_BUSINESS: NATURE_OF_YOUR_BUSINESS_FIELDS } = FIELDS;

const MAXIMUM = 1000;

const pageVariables = (referenceNumber: number) => ({
  FIELDS: {
    GOODS_OR_SERVICES: {
      ID: GOODS_OR_SERVICES,
      ...NATURE_OF_YOUR_BUSINESS_FIELDS[GOODS_OR_SERVICES],
      MAXIMUM,
    },
    YEARS_EXPORTING: {
      ID: YEARS_EXPORTING,
      ...NATURE_OF_YOUR_BUSINESS_FIELDS[YEARS_EXPORTING],
    },
    EMPLOYEES_UK: {
      ID: EMPLOYEES_UK,
      ...NATURE_OF_YOUR_BUSINESS_FIELDS[EMPLOYEES_UK],
    },
    EMPLOYEES_INTERNATIONAL: {
      ID: EMPLOYEES_INTERNATIONAL,
      ...NATURE_OF_YOUR_BUSINESS_FIELDS[EMPLOYEES_INTERNATIONAL],
    },
  },
  POST_ROUTES: {
    NATURE_OF_BUSINESS: `${INSURANCE_ROOT}/${referenceNumber}${NATURE_OF_BUSINESS_ROOT}`,
    SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${NATURE_OF_BUSINESS_SAVE_AND_BACK}`,
  },
});

/**
 * gets the template for nature of business page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} renders nature of business page with/without previously submitted details
 */
const get = (req: Request, res: Response) => {
  try {
    const { application } = res.locals;

    if (!application) {
      return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
    }

    const { exporterBusiness } = application;

    // values from application if they exist
    const submittedValues = {
      [GOODS_OR_SERVICES]: exporterBusiness?.[GOODS_OR_SERVICES],
      [YEARS_EXPORTING]: exporterBusiness?.[YEARS_EXPORTING],
      [EMPLOYEES_UK]: exporterBusiness?.[EMPLOYEES_UK],
      [EMPLOYEES_INTERNATIONAL]: exporterBusiness?.[EMPLOYEES_INTERNATIONAL],
    };

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS: NATURE_OF_YOUR_BUSINESS,
        BACK_LINK: req.headers.referer,
      }),
      submittedValues,
      ...pageVariables(application.referenceNumber),
    });
  } catch (error) {
    console.error('Error getting nature of business', { error });
    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
};

/**
 * posts nature of business page
 * runs validation and either renders template with errors or redirects to next page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} Turnover page with or without errors
 */
const post = async (req: Request, res: Response) => {
  try {
    const { application } = res.locals;

    if (!application) {
      return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
    }

    const { referenceNumber } = application;

    const { body } = req;

    // populate submittedValues
    const submittedValues = {
      [GOODS_OR_SERVICES]: body[GOODS_OR_SERVICES],
      [YEARS_EXPORTING]: body[YEARS_EXPORTING],
      [EMPLOYEES_UK]: body[EMPLOYEES_UK],
      [EMPLOYEES_INTERNATIONAL]: body[EMPLOYEES_INTERNATIONAL],
    };

    // run validation on inputs
    const validationErrors = generateValidationErrors(body);

    // if any errors then render template with errors
    if (validationErrors && Object.keys(validationErrors).length) {
      return res.render(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: NATURE_OF_YOUR_BUSINESS,
          BACK_LINK: req.headers.referer,
        }),
        ...pageVariables(application.referenceNumber),
        validationErrors,
        submittedValues,
      });
    }

    // if no errors, then runs save api call to db
    const saveResponse = await mapAndSave.natureOfBusiness(body, application);

    if (!saveResponse) {
      return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
    }

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${TURNOVER_ROOT}`);
  } catch (err) {
    console.error('Error updating application - your business - nature of business', { err });
    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
};

export { pageVariables, get, post };
