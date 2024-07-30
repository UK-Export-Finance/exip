import { PAGES, ERROR_MESSAGES, MEMBER_OF_A_GROUP_DESCRIPTION } from '../../../../content-strings';
import { FIELD_IDS, TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import singleInputPageVariables from '../../../../helpers/page-variables/single-input/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import constructPayload from '../../../../helpers/construct-payload';
import generateValidationErrors from '../../../../shared-validation/yes-no-radios-form';
import { updateSubmittedData } from '../../../../helpers/update-submitted-data/insurance';
import { Request, Response } from '../../../../../types';

const {
  ELIGIBILITY: { LONG_TERM_COVER, CHECK_YOUR_ANSWERS },
} = INSURANCE_ROUTES;

const {
  SHARED_PAGES,
  PARTIALS: {
    INSURANCE: { MEMBER_OF_A_GROUP },
  },
} = TEMPLATES;

export const FIELD_ID = FIELD_IDS.INSURANCE.ELIGIBILITY.IS_MEMBER_OF_A_GROUP;

export const PAGE_VARIABLES = {
  FIELD_ID,
  PAGE_CONTENT_STRINGS: {
    ...PAGES.INSURANCE.ELIGIBILITY.MEMBER_OF_A_GROUP,
    MEMBER_OF_A_GROUP_DESCRIPTION,
  },
};

export const TEMPLATE = SHARED_PAGES.SINGLE_RADIO;

/**
 * HTML_FLAGS
 * Conditional flags for the nunjucks template to match design
 */
export const HTML_FLAGS = {
  CUSTOM_CONTENT_HTML: MEMBER_OF_A_GROUP.CUSTOM_CONTENT_HTML,
};

/**
 * get
 * Render the "Member of a group" page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Member of a group page
 */
export const get = (req: Request, res: Response) =>
  res.render(TEMPLATE, {
    ...singleInputPageVariables({ ...PAGE_VARIABLES, BACK_LINK: req.headers.referer, HTML_FLAGS }),
    userName: getUserNameFromSession(req.session.user),
    submittedValues: req.session.submittedData.insuranceEligibility,
  });

/**
 * post
 * Check "Member of a group" validation errors and if successful, redirect to the next part of the flow.
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
        HTML_FLAGS,
      }),
      userName: getUserNameFromSession(req.session.user),
      validationErrors,
    });
  }

  const answer = payload[FIELD_ID];

  if (answer === 'true') {
    return res.redirect(LONG_TERM_COVER);
  }

  req.session.submittedData = {
    ...req.session.submittedData,
    insuranceEligibility: updateSubmittedData({ [FIELD_ID]: answer }, req.session.submittedData.insuranceEligibility),
  };

  return res.redirect(CHECK_YOUR_ANSWERS);
};
