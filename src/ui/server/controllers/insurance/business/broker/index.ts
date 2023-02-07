import { PAGES } from '../../../../content-strings';
import { Request, Response } from '../../../../../types';
import { TEMPLATES, ROUTES } from '../../../../constants';
import FIELD_IDS from '../../../../constants/field-ids/insurance/exporter-business';
// import { FIELDS } from '../../../../content-strings/fields/insurance/your-business';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import generateValidationErrors from './validation';

const { USING_BROKER } = FIELD_IDS.BROKER;

const { BROKER } = PAGES.INSURANCE.EXPORTER_BUSINESS;
const { BROKER: BROKER_TEMPLATE } = TEMPLATES.INSURANCE.EXPORTER_BUSINESS;

export const TEMPLATE = BROKER_TEMPLATE;

const { INSURANCE_ROOT, EXPORTER_BUSINESS: EXPORTER_BUSINESS_ROUTES } = ROUTES.INSURANCE;

const { BROKER_ROOT, CHECK_YOUR_ANSWERS } = EXPORTER_BUSINESS_ROUTES;

// const { BROKER: BROKER_FIELDS } = FIELDS;

const pageVariables = (referenceNumber: number) => ({
  FIELDS: {
    USING_BROKER: {
      ID: USING_BROKER,
    },
  },
  SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${BROKER_ROOT}`,
});

/**
 * gets the template for broker page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} renders check your answers page with previously submitted details
 */
const get = (req: Request, res: Response) => {
  try {
    const { application } = res.locals;

    if (!application) {
      return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
    }

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS: BROKER,
        BACK_LINK: req.headers.referer,
      }),
      application: mapApplicationToFormFields(application),
      ...pageVariables(application.referenceNumber),
    });
  } catch (error) {
    console.error('Error getting broker', { error });
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
      [USING_BROKER]: body[USING_BROKER],
    };

    // run validation on inputs
    const validationErrors = generateValidationErrors(body);

    // if any errors then render template with errors
    if (validationErrors) {
      return res.render(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: BROKER,
          BACK_LINK: req.headers.referer,
        }),
        ...pageVariables(application.referenceNumber),
        validationErrors,
        application: mapApplicationToFormFields(application),
        submittedValues,
      });
    }

    // if no errors, then runs save api call to db
    // const saveResponse = await mapAndSave.turnover(body, application);

    // if (!saveResponse) {
    //   return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
    // }

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`);
  } catch (err) {
    console.error('Error updating application - your business - broker', { err });
    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
};

export { pageVariables, get, post };
