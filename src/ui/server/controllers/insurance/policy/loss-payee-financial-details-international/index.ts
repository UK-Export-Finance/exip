import { PAGES } from '../../../../content-strings';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import POLICY_FIELD_IDS from '../../../../constants/field-ids/insurance/policy';
import { POLICY_FIELDS } from '../../../../content-strings/fields/insurance/policy';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import constructPayload from '../../../../helpers/construct-payload';
import generateValidationErrors from './validation';
import mapAndSave from '../map-and-save/loss-payee-financial-details-international';
import isCheckAndChangeRoute from '../../../../helpers/is-check-and-change-route';
import { Application, Request, Response } from '../../../../../types';

const { BIC_SWIFT_CODE, IBAN } = POLICY_FIELD_IDS.LOSS_PAYEE_FINANCIAL_INTERNATIONAL;
const { FINANCIAL_ADDRESS } = POLICY_FIELD_IDS;

const {
  INSURANCE_ROOT,
  PROBLEM_WITH_SERVICE,
  POLICY: { CHECK_YOUR_ANSWERS, LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_SAVE_AND_BACK },
  CHECK_YOUR_ANSWERS: { TYPE_OF_POLICY: CHECK_AND_CHANGE_ROUTE },
} = INSURANCE_ROUTES;

const { LOSS_PAYEE_FINANCIAL_INTERNATIONAL, FINANCIAL_ADDRESS: FINANCIAL_ADDRESS_FIELD } = POLICY_FIELDS;

export const FIELD_IDS = [BIC_SWIFT_CODE, IBAN, FINANCIAL_ADDRESS];

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.POLICY.LOSS_PAYEE_FINANCIAL_DETAILS;

export const TEMPLATE = TEMPLATES.INSURANCE.POLICY.LOSS_PAYEE_FINANCIAL_INTERNATIONAL;

/**
 * pageVariables
 * Page fields and "save and go back" URL
 * @param {Number} referenceNumber: Application reference number
 * @returns {Object} Page variables
 */
export const pageVariables = (referenceNumber: number) => ({
  FIELDS: {
    BIC_SWIFT_CODE: {
      ID: BIC_SWIFT_CODE,
      ...LOSS_PAYEE_FINANCIAL_INTERNATIONAL[BIC_SWIFT_CODE],
    },
    IBAN: {
      ID: IBAN,
      ...LOSS_PAYEE_FINANCIAL_INTERNATIONAL[IBAN],
    },
    FINANCIAL_ADDRESS: {
      ID: FINANCIAL_ADDRESS,
      ...FINANCIAL_ADDRESS_FIELD,
    },
  },
  SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_SAVE_AND_BACK}`,
});

/**
 * Render the "Loss payee financial details (international)" page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} "Loss payee financial details (international)" page
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
    submittedValues: mappedApplication.nominatedLossPayee.financialInternational,
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
    const saveResponse = await mapAndSave.lossPayeeFinancialDetailsInternational(payload, application);

    if (!saveResponse) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    if (isCheckAndChangeRoute(req.originalUrl)) {
      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_AND_CHANGE_ROUTE}`);
    }

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`);
  } catch (error) {
    console.error('Error updating application - policy - loss payee financial details (international) %o', error);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
