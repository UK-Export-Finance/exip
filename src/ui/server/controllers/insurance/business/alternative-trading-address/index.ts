import { PAGES } from '../../../../content-strings';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import BUSINESS_FIELD_IDS from '../../../../constants/field-ids/insurance/business';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { FIELDS } from '../../../../content-strings/fields/insurance/your-business';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import { Request, Response } from '../../../../../types';
import constructPayload from '../../../../helpers/construct-payload';
import generateValidationErrors from './validation';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import generateMultipleFieldHtml from '../../../../helpers/generate-multiple-field-html';
import mapAndSave from '../map-and-save/company-different-trading-address';
import isChangeRoute from '../../../../helpers/is-change-route';
import isCheckAndChangeRoute from '../../../../helpers/is-check-and-change-route';

const {
  INSURANCE_ROOT,
  EXPORTER_BUSINESS: { NATURE_OF_BUSINESS_ROOT, ALTERNATIVE_TRADING_ADDRESS_ROOT_SAVE_AND_BACK: SAVE_AND_BACK, CHECK_YOUR_ANSWERS },
  CHECK_YOUR_ANSWERS: { YOUR_BUSINESS: CHECK_AND_CHANGE_ROUTE },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

const {
  ALTERNATIVE_TRADING_ADDRESS: { FULL_ADDRESS },
} = BUSINESS_FIELD_IDS;

const {
  COMPANIES_HOUSE: { COMPANY_ADDRESS },
} = INSURANCE_FIELD_IDS;

export const TEMPLATE = TEMPLATES.INSURANCE.EXPORTER_BUSINESS.ALTERNATIVE_TRADING_ADDRESS;

export const FIELD_IDS = [FULL_ADDRESS];

/**
 * pageVariables
 * Page fields and "save and go back" URL
 * @returns {Object} Page variables
 */
const pageVariables = {
  FIELDS: {
    ALTERNATIVE_TRADING_ADDRESS: {
      ID: FULL_ADDRESS,
      ...FIELDS[FULL_ADDRESS],
    },
    REGISTERED_OFFICE_ADDRESS: {
      ID: COMPANY_ADDRESS,
      HEADING: FIELDS[FULL_ADDRESS].REGISTERED_OFFICE_ADDRESS_HEADING,
      HINT: FIELDS[FULL_ADDRESS].REGISTERED_OFFICE_ADDRESS_HINT,
    },
  },
};

/**
 * get
 * Render the alternative trading address page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Alternative trading address page
 */
const get = (req: Request, res: Response) => {
  try {
    const { application } = res.locals;

    if (!application) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const { company, referenceNumber } = application;

    // generates address as HTML with line breaks
    const addressHtml = generateMultipleFieldHtml(company[COMPANY_ADDRESS]);

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS: PAGES.INSURANCE.EXPORTER_BUSINESS.ALTERNATIVE_TRADING_ADDRESS,
        BACK_LINK: req.headers.referer,
      }),
      userName: getUserNameFromSession(req.session.user),
      addressHtml,
      ...pageVariables,
      application: mapApplicationToFormFields(application),
      SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${SAVE_AND_BACK}`,
    });
  } catch (err) {
    console.error('Error getting alternative trading address %O', err);
    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

/**
 * post
 * Check Alternative trading address validation errors and if successful, redirect to the next part of the flow.
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} Next part of the flow or error page
 */
const post = async (req: Request, res: Response) => {
  try {
    const { application } = res.locals;

    if (!application) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const { referenceNumber } = application;

    const { body } = req;

    const payload = constructPayload(body, FIELD_IDS);

    const validationErrors = generateValidationErrors(payload);

    if (validationErrors) {
      const { company } = application;

      const addressHtml = generateMultipleFieldHtml(company[COMPANY_ADDRESS]);

      return res.render(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: PAGES.INSURANCE.EXPORTER_BUSINESS.ALTERNATIVE_TRADING_ADDRESS,
          BACK_LINK: req.headers.referer,
        }),
        userName: getUserNameFromSession(req.session.user),
        addressHtml,
        ...pageVariables,
        validationErrors,
        application: mapApplicationToFormFields(application),
        submittedValues: payload,
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${SAVE_AND_BACK}`,
      });
    }

    /**
     * No validation errors.
     * call mapAndSave to call the API.
     */
    const saveResponse = await mapAndSave.companyDifferentTradingAddress(payload, application);

    if (!saveResponse) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    if (isCheckAndChangeRoute(req.originalUrl)) {
      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_AND_CHANGE_ROUTE}`);
    }

    if (isChangeRoute(req.originalUrl)) {
      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`);
    }

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${NATURE_OF_BUSINESS_ROOT}`);
  } catch (err) {
    console.error('Error posting alternative trading address %O', err);
    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

export { pageVariables, get, post };
