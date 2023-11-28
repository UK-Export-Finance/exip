import { ERROR_MESSAGES, PAGES } from '../../../../content-strings';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import BUSINESS_FIELD_IDS from '../../../../constants/field-ids/insurance/business';
import singleInputPageVariables from '../../../../helpers/page-variables/single-input/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import constructPayload from '../../../../helpers/construct-payload';
import generateValidationErrors from '../../../../shared-validation/yes-no-radios-form';
import mapAndSave from '../map-and-save/business';
import isChangeRoute from '../../../../helpers/is-change-route';
import isCheckAndChangeRoute from '../../../../helpers/is-check-and-change-route';
import { Request, Response } from '../../../../../types';

const {
  INSURANCE_ROOT,
  EXPORTER_BUSINESS: { BROKER_ROOT, CREDIT_CONTROL_SAVE_AND_BACK: SAVE_AND_BACK, CHECK_YOUR_ANSWERS },
  CHECK_YOUR_ANSWERS: { YOUR_BUSINESS: CHECK_AND_CHANGE_ROUTE },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

const { HAS_CREDIT_CONTROL } = BUSINESS_FIELD_IDS;

export const FIELD_ID = HAS_CREDIT_CONTROL;

export const TEMPLATE = TEMPLATES.INSURANCE.EXPORTER_BUSINESS.CREDIT_CONTROL;

export const PAGE_VARIABLES = {
  FIELD_ID,
  PAGE_CONTENT_STRINGS: PAGES.INSURANCE.EXPORTER_BUSINESS.CREDIT_CONTROL,
};

/**
 * get
 * Render the credit control page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Credit control page
 */
export const get = (req: Request, res: Response) => {
  try {
    const { application } = res.locals;

    if (!application) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const { referenceNumber } = application;

    return res.render(TEMPLATE, {
      ...singleInputPageVariables({
        ...PAGE_VARIABLES,
        BACK_LINK: req.headers.referer,
      }),
      userName: getUserNameFromSession(req.session.user),
      application: application.business,
      SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${SAVE_AND_BACK}`,
    });
  } catch (err) {
    console.error('Error getting credit control %O', err);
    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

/**
 * post
 * Check Credit control validation errors and if successful, redirect to the next part of the flow.
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} Next part of the flow or error page
 */
export const post = async (req: Request, res: Response) => {
  try {
    const { application } = res.locals;

    if (!application) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const { referenceNumber } = application;

    const payload = constructPayload(req.body, [FIELD_ID]);

    const validationErrors = generateValidationErrors(payload, FIELD_ID, ERROR_MESSAGES.INSURANCE.EXPORTER_BUSINESS[FIELD_ID].IS_EMPTY);

    if (validationErrors) {
      return res.render(TEMPLATE, {
        ...singleInputPageVariables({
          ...PAGE_VARIABLES,
          BACK_LINK: req.headers.referer,
        }),
        userName: getUserNameFromSession(req.session.user),
        validationErrors,
        submittedValues: payload,
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${SAVE_AND_BACK}`,
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

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${BROKER_ROOT}`);
  } catch (err) {
    console.error('Error posting credit control %O', err);
    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
