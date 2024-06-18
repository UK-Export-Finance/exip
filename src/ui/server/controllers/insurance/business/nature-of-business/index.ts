import { PAGES } from '../../../../content-strings';
import { TEMPLATES, ROUTES } from '../../../../constants';
import BUSINESS_FIELD_IDS from '../../../../constants/field-ids/insurance/business';
import { FIELDS } from '../../../../content-strings/fields/insurance/your-business';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import constructPayload from '../../../../helpers/construct-payload';
import generateValidationErrors from './validation';
import mapAndSave from '../map-and-save/business';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import isChangeRoute from '../../../../helpers/is-change-route';
import isCheckAndChangeRoute from '../../../../helpers/is-check-and-change-route';
import { Request, Response } from '../../../../../types';

const { GOODS_OR_SERVICES, YEARS_EXPORTING, EMPLOYEES_UK } = BUSINESS_FIELD_IDS.NATURE_OF_YOUR_BUSINESS;

const { NATURE_OF_YOUR_BUSINESS } = PAGES.INSURANCE.EXPORTER_BUSINESS;
const { NATURE_OF_YOUR_BUSINESS: NATURE_OF_YOUR_BUSINESS_TEMPLATE } = TEMPLATES.INSURANCE.EXPORTER_BUSINESS;

export const TEMPLATE = NATURE_OF_YOUR_BUSINESS_TEMPLATE;

export const FIELD_IDS = [GOODS_OR_SERVICES, YEARS_EXPORTING, EMPLOYEES_UK];

const {
  INSURANCE_ROOT,
  EXPORTER_BUSINESS: EXPORTER_BUSINESS_ROUTES,
  CHECK_YOUR_ANSWERS: { YOUR_BUSINESS: CHECK_AND_CHANGE_ROUTE },
  PROBLEM_WITH_SERVICE,
} = ROUTES.INSURANCE;

const { NATURE_OF_BUSINESS_ROOT, NATURE_OF_BUSINESS_SAVE_AND_BACK, CHECK_YOUR_ANSWERS, TURNOVER_ROOT } = EXPORTER_BUSINESS_ROUTES;

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
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS: NATURE_OF_YOUR_BUSINESS,
        BACK_LINK: req.headers.referer,
      }),
      userName: getUserNameFromSession(req.session.user),
      application: mapApplicationToFormFields(application),
      ...pageVariables(application.referenceNumber),
    });
  } catch (err) {
    console.error('Error getting nature of business %O', err);
    return res.redirect(PROBLEM_WITH_SERVICE);
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
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const { referenceNumber } = req.params;

    const { body } = req;

    const payload = constructPayload(body, FIELD_IDS);

    const validationErrors = generateValidationErrors(payload);

    if (validationErrors) {
      return res.render(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: NATURE_OF_YOUR_BUSINESS,
          BACK_LINK: req.headers.referer,
        }),
        userName: getUserNameFromSession(req.session.user),
        ...pageVariables(application.referenceNumber),
        validationErrors,
        application: mapApplicationToFormFields(application),
        submittedValues: payload,
      });
    }

    /**
     * No validation errors.
     * call mapAndSave to call the API.
     */
    const saveResponse = await mapAndSave.business(payload, application);

    if (!saveResponse) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    if (isChangeRoute(req.originalUrl)) {
      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`);
    }

    if (isCheckAndChangeRoute(req.originalUrl)) {
      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_AND_CHANGE_ROUTE}`);
    }

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${TURNOVER_ROOT}`);
  } catch (err) {
    console.error('Error updating application - your business - nature of business %O', err);
    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

export { pageVariables, get, post };
