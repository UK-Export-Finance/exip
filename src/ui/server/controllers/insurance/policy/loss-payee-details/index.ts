import { PAGES } from '../../../../content-strings';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import POLICY_FIELD_IDS from '../../../../constants/field-ids/insurance/policy';
import { POLICY_FIELDS } from '../../../../content-strings/fields/insurance/policy';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import constructPayload from '../../../../helpers/construct-payload';
import generateValidationErrors from './validation';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import mapAndSave from '../map-and-save/loss-payee';
import isChangeRoute from '../../../../helpers/is-change-route';
import isCheckAndChangeRoute from '../../../../helpers/is-check-and-change-route';
import { Application, Request, Response } from '../../../../../types';

const { NAME, LOCATION, IS_LOCATED_IN_UK, IS_LOCATED_INTERNATIONALLY } = POLICY_FIELD_IDS.LOSS_PAYEE_DETAILS;

const {
  INSURANCE_ROOT,
  PROBLEM_WITH_SERVICE,
  POLICY: {
    LOSS_PAYEE_FINANCIAL_DETAILS_UK_ROOT,
    LOSS_PAYEE_FINANCIAL_DETAILS_UK_CHANGE,
    LOSS_PAYEE_FINANCIAL_DETAILS_UK_CHECK_AND_CHANGE,
    LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_ROOT,
    LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_CHANGE,
    LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_CHECK_AND_CHANGE,
    LOSS_PAYEE_DETAILS_SAVE_AND_BACK,
  },
} = INSURANCE_ROUTES;

const { LOSS_PAYEE_DETAILS } = POLICY_FIELDS;

export const FIELD_IDS = [NAME, LOCATION];

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.POLICY.LOSS_PAYEE_DETAILS;

export const TEMPLATE = TEMPLATES.INSURANCE.POLICY.LOSS_PAYEE_DETAILS;

/**
 * pageVariables
 * Page fields and "save and go back" URL
 * @param {Number} Application reference number
 * @returns {Object} Page variables
 */
export const pageVariables = (referenceNumber: number) => ({
  FIELDS: {
    NAME: {
      ID: NAME,
      ...LOSS_PAYEE_DETAILS[NAME],
    },
    LOCATION: {
      ID: LOCATION,
      ...LOSS_PAYEE_DETAILS[LOCATION],
    },
    IS_LOCATED_IN_UK: {
      ID: IS_LOCATED_IN_UK,
    },
    IS_LOCATED_INTERNATIONALLY: {
      ID: IS_LOCATED_INTERNATIONALLY,
    },
  },
  SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${LOSS_PAYEE_DETAILS_SAVE_AND_BACK}`,
});

/**
 * Render the Loss payee details page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Loss payee details page
 */
export const get = (req: Request, res: Response) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(PROBLEM_WITH_SERVICE);
  }

  const mappedApplication = mapApplicationToFormFields(application) as Application;

  return res.render(TEMPLATE, {
    ...insuranceCorePageVariables({
      PAGE_CONTENT_STRINGS,
      BACK_LINK: req.headers.referer,
    }),
    ...pageVariables(application.referenceNumber),
    userName: getUserNameFromSession(req.session.user),
    submittedValues: mappedApplication?.nominatedLossPayee,
  });
};

/**
 * post
 * Run validation and either renders template with errors or redirects to next page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} Next part of the flow
 */
export const post = async (req: Request, res: Response) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(PROBLEM_WITH_SERVICE);
  }

  const { referenceNumber } = application;

  const payload = constructPayload(req.body, FIELD_IDS);

  const validationErrors = generateValidationErrors(payload);

  if (validationErrors) {
    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS,
        BACK_LINK: req.headers.referer,
      }),
      ...pageVariables(application.referenceNumber),
      userName: getUserNameFromSession(req.session.user),
      submittedValues: payload,
      validationErrors,
    });
  }

  try {
    const locationAnswer = payload[LOCATION];

    const saveResponse = await mapAndSave.lossPayee(payload, application);

    if (!saveResponse) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    /**
     * If the route is a "change" route,
     * - if LOCATION has been submitted as IS_LOCATED_IN_UK,
     * redirect to LOSS_PAYEE_FINANCIAL_DETAILS_UK form.
     * - if LOCATION has been submitted as IS_LOCATED_INTERNATIONALLY,
     * redirect to LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL form.
     */
    if (isChangeRoute(req.originalUrl)) {
      if (locationAnswer === IS_LOCATED_IN_UK) {
        return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${LOSS_PAYEE_FINANCIAL_DETAILS_UK_CHANGE}`);
      }

      if (locationAnswer === IS_LOCATED_INTERNATIONALLY) {
        return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_CHANGE}`);
      }
    }

    /**
     * If the route is a "check and change" route,
     * redirect to CHECK_YOUR_ANSWERS.
     */
    if (isCheckAndChangeRoute(req.originalUrl)) {
      if (locationAnswer === IS_LOCATED_IN_UK) {
        return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${LOSS_PAYEE_FINANCIAL_DETAILS_UK_CHECK_AND_CHANGE}`);
      }

      if (locationAnswer === IS_LOCATED_INTERNATIONALLY) {
        return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_CHECK_AND_CHANGE}`);
      }
    }

    /**
     * if LOCATION has been submitted as IS_LOCATED_IN_UK,
     * redirect to LOSS_PAYEE_FINANCIAL_DETAILS_UK_ROOT
     */
    if (locationAnswer === IS_LOCATED_IN_UK) {
      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${LOSS_PAYEE_FINANCIAL_DETAILS_UK_ROOT}`);
    }

    /**
     * if LOCATION has been submitted as IS_LOCATED_INTERNATIONALLY,
     * redirect to LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_ROOT
     */
    if (locationAnswer === IS_LOCATED_INTERNATIONALLY) {
      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_ROOT}`);
    }
  } catch (err) {
    console.error('Error updating application - policy - loss payee details %O', err);
    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
