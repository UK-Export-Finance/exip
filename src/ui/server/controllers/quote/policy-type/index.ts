import { FIELDS, PAGES } from '../../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../constants';
import corePageVariables from '../../../helpers/page-variables/core/quote';
import generateValidationErrors from './validation';
import getUserNameFromSession from '../../../helpers/get-user-name-from-session';
import { isSinglePolicyType } from '../../../helpers/policy-type';
import { updateSubmittedData } from '../../../helpers/update-submitted-data/quote';
import { Request, Response } from '../../../../types';

const { MULTIPLE_POLICY_TYPE, POLICY_LENGTH, POLICY_TYPE, SINGLE_POLICY_LENGTH, SINGLE_POLICY_TYPE } = FIELD_IDS;

export const PAGE_VARIABLES = {
  FIELDS: {
    MULTIPLE_POLICY_TYPE: {
      ID: MULTIPLE_POLICY_TYPE,
      ...FIELDS[POLICY_TYPE],
    },
    POLICY_LENGTH: {
      ID: POLICY_LENGTH,
      ...FIELDS[POLICY_LENGTH],
    },
    POLICY_TYPE: {
      ID: POLICY_TYPE,
      ...FIELDS[POLICY_TYPE],
    },
    SINGLE_POLICY_TYPE: {
      ID: SINGLE_POLICY_TYPE,
      ...FIELDS[POLICY_TYPE],
    },
    SINGLE_POLICY_LENGTH: {
      ID: SINGLE_POLICY_LENGTH,
      ...FIELDS[SINGLE_POLICY_LENGTH],
    },
  },
};

export const TEMPLATE = TEMPLATES.QUOTE.POLICY_TYPE;

export const get = (req: Request, res: Response) =>
  res.render(TEMPLATE, {
    ...corePageVariables({ PAGE_CONTENT_STRINGS: PAGES.QUOTE.POLICY_TYPE, BACK_LINK: req.headers.referer, ORIGINAL_URL: req.originalUrl }),
    userName: getUserNameFromSession(req.session.user),
    ...PAGE_VARIABLES,
    submittedValues: req.session.submittedData.quoteEligibility,
  });

export const post = (req: Request, res: Response) => {
  const validationErrors = generateValidationErrors(req.body);

  if (validationErrors) {
    return res.render(TEMPLATE, {
      ...corePageVariables({ PAGE_CONTENT_STRINGS: PAGES.QUOTE.POLICY_TYPE, BACK_LINK: req.headers.referer, ORIGINAL_URL: req.originalUrl }),
      userName: getUserNameFromSession(req.session.user),
      ...PAGE_VARIABLES,
      validationErrors,
      submittedValues: req.body,
    });
  }

  let populatedData = req.body;

  if (isSinglePolicyType(req.body[POLICY_TYPE])) {
    populatedData = {
      [POLICY_TYPE]: req.body[POLICY_TYPE],
      [POLICY_LENGTH]: req.body[SINGLE_POLICY_LENGTH],
    };
  }

  req.session.submittedData.quoteEligibility = updateSubmittedData(populatedData, req.session.submittedData.quoteEligibility);

  return res.redirect(ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY);
};
