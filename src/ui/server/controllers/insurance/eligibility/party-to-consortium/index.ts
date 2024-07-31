import { PAGES, ERROR_MESSAGES } from '../../../../content-strings';
import { FIELD_IDS, TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import singleInputPageVariables from '../../../../helpers/page-variables/single-input/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import constructPayload from '../../../../helpers/construct-payload';
import generateValidationErrors from '../../../../shared-validation/yes-no-radios-form';
import { updateSubmittedData } from '../../../../helpers/update-submitted-data/insurance';
import { Request, Response } from '../../../../../types';
import isChangeRoute from '../../../../helpers/is-change-route';

const {
  ELIGIBILITY: { PARTY_TO_CONSORTIUM_EXIT, CHECK_YOUR_ANSWERS, MEMBER_OF_A_GROUP },
} = INSURANCE_ROUTES;

export const FIELD_ID = FIELD_IDS.INSURANCE.ELIGIBILITY.IS_PARTY_TO_CONSORTIUM;

export const PAGE_VARIABLES = {
  FIELD_ID,
  PAGE_CONTENT_STRINGS: PAGES.INSURANCE.ELIGIBILITY.PARTY_TO_CONSORTIUM,
};

export const TEMPLATE = TEMPLATES.SHARED_PAGES.SINGLE_RADIO;

/**
 * get
 * Render the "Party to a consortium" page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Party to a consortium page
 */
export const get = (req: Request, res: Response) =>
  res.render(TEMPLATE, {
    ...singleInputPageVariables({ ...PAGE_VARIABLES, BACK_LINK: req.headers.referer }),
    userName: getUserNameFromSession(req.session.user),
    submittedValues: req.session.submittedData.insuranceEligibility,
  });

/**
 * post
 * Check "Party to a consortium" validation errors and if successful, redirect to the next part of the flow.
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
    return res.redirect(PARTY_TO_CONSORTIUM_EXIT);
  }

  req.session.submittedData = {
    ...req.session.submittedData,
    insuranceEligibility: updateSubmittedData({ [FIELD_ID]: answer }, req.session.submittedData.insuranceEligibility),
  };

  if (isChangeRoute(req.originalUrl)) {
    return res.redirect(CHECK_YOUR_ANSWERS);
  }

  return res.redirect(MEMBER_OF_A_GROUP);
};
