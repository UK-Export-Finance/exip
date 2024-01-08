import { PAGES, END_BUYERS_DESCRIPTION, ERROR_MESSAGES } from '../../../../content-strings';
import { FIELDS_ELIGIBILITY } from '../../../../content-strings/fields/insurance/eligibility';
import { FIELD_IDS, TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import singleInputPageVariables from '../../../../helpers/page-variables/single-input/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import constructPayload from '../../../../helpers/construct-payload';
import generateValidationErrors from '../../../../shared-validation/yes-no-radios-form';
import { updateSubmittedData } from '../../../../helpers/update-submitted-data/insurance';
import { Request, Response } from '../../../../../types';

const { CANNOT_APPLY_MULTIPLE_RISKS, CHECK_YOUR_ANSWERS } = INSURANCE_ROUTES.ELIGIBILITY;

export const FIELD_ID = FIELD_IDS.INSURANCE.ELIGIBILITY.HAS_END_BUYER;

export const PAGE_VARIABLES = {
  FIELD_ID,
  PAGE_CONTENT_STRINGS: {
    ...PAGES.INSURANCE.ELIGIBILITY.END_BUYER,
    END_BUYERS_DESCRIPTION,
  },
  FIELD: {
    ID: FIELD_ID,
    ...FIELDS_ELIGIBILITY[FIELD_ID],
  },
  HAS_SAVE_AND_BACK: false,
  CUSTOM_CONTENT_HTML: 'partials/end-buyer-details.njk',
};

export const TEMPLATE = TEMPLATES.SHARED_PAGES.SINGLE_RADIO;

/**
 * get
 * Render the "End buyer" page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} End buyer page
 */
export const get = (req: Request, res: Response) =>
  res.render(TEMPLATE, {
    ...singleInputPageVariables({ ...PAGE_VARIABLES, BACK_LINK: req.headers.referer }),
    userName: getUserNameFromSession(req.session.user),
    submittedValues: req.session.submittedData.insuranceEligibility,
  });

/**
 * post
 * Check "End buyer" validation errors and if successful, redirect to the next part of the flow.
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} Next part of the flow or error page
 */
export const post = (req: Request, res: Response) => {
  const payload = constructPayload(req.body, [FIELD_ID]);

  const validationErrors = generateValidationErrors(payload, FIELD_ID, ERROR_MESSAGES.INSURANCE.ELIGIBILITY[FIELD_ID].IS_EMPTY);

  if (validationErrors) {
    return res.render(TEMPLATE, {
      ...singleInputPageVariables({
        ...PAGE_VARIABLES,
        BACK_LINK: req.headers.referer,
      }),
      userName: getUserNameFromSession(req.session.user),
      validationErrors,
    });
  }

  const answer = payload[FIELD_ID];

  if (answer === 'true') {
    return res.redirect(CANNOT_APPLY_MULTIPLE_RISKS);
  }

  req.session.submittedData = {
    ...req.session.submittedData,
    insuranceEligibility: updateSubmittedData({ [FIELD_ID]: answer }, req.session.submittedData.insuranceEligibility),
  };

  return res.redirect(CHECK_YOUR_ANSWERS);
};
