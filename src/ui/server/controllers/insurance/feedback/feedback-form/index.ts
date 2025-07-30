import { PAGES, FIELDS } from '../../../../content-strings';
import { TEMPLATES, ROUTES, APPLY, SERVICE_NAME } from '../../../../constants';
import { FEEDBACK_FIELD_IDS } from '../../../../constants/field-ids/feedback';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import { objectHasKeysAndValues } from '../../../../helpers/object';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import constructPayload from '../../../../helpers/construct-payload';
import generateValidationErrors from './validation';
import api from '../../../../api';
import { Request, ResponseInsurance, InsuranceFeedbackVariables } from '../../../../../types';

const { SATISFACTION, IMPROVEMENT, OTHER_COMMENTS, VERY_SATISFIED, SATISFIED, NEITHER, DISSATISFIED, VERY_DISSATISIFED } = FEEDBACK_FIELD_IDS;

const { REFERRAL_URL, SERVICE, PRODUCT } = FEEDBACK_FIELD_IDS;
const { FEEDBACK_PAGE } = PAGES;
const { FEEDBACK: FEEDBACK_TEMPLATE } = TEMPLATES.INSURANCE;

const { FEEDBACK_SENT, PROBLEM_WITH_SERVICE } = ROUTES.INSURANCE;

export const TEMPLATE = FEEDBACK_TEMPLATE;

export const FIELD_IDS = [SATISFACTION, IMPROVEMENT, OTHER_COMMENTS];

/**
 * pageVariables
 * Page fields
 * @returns {object} Page variables
 */
const pageVariables = () => ({
  FIELDS: {
    SATISFACTION: {
      ID: SATISFACTION,
      OPTIONS: { VERY_SATISFIED, SATISFIED, NEITHER, DISSATISFIED, VERY_DISSATISIFED },
      ...FIELDS[SATISFACTION],
    },
    IMPROVEMENT: {
      ID: IMPROVEMENT,
      ...FIELDS[IMPROVEMENT],
    },
    OTHER_COMMENTS: {
      ID: OTHER_COMMENTS,
      ...FIELDS[OTHER_COMMENTS],
    },
  },
});

/**
 * gets the template for the feedback page
 * @param {Express.Request} Express request
 * @param {ResponseInsurance} Express response for "insurance" routes
 * @returns {Express.Response.render} renders insurance feedback page
 */
const get = (req: Request, res: ResponseInsurance) => {
  try {
    /**
     * flash containing origin of user when clicking the feedback form
     * used by post request as variable passed to API
     */
    req.flash('serviceOriginUrl', req.headers.referer);

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS: FEEDBACK_PAGE,
        BACK_LINK: req.headers.referer,
      }),
      ...pageVariables(),
      userName: getUserNameFromSession(req.session.user),
    });
  } catch (error) {
    console.error('Error getting insurance feedback page %o', error);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

/**
 * posts the feedback form
 * @param {Express.Request} Express request
 * @param {ResponseInsurance} Express response for "insurance" routes
 * @returns {Express.Response.render} renders insurance feedback confirmation page
 */
const post = async (req: Request, res: ResponseInsurance) => {
  try {
    const { body } = req;

    const { _csrf, ...submittedFeedback } = body;

    const payload = constructPayload(submittedFeedback, FIELD_IDS);

    const validationErrors = generateValidationErrors(payload);

    if (validationErrors) {
      return res.render(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: FEEDBACK_PAGE,
          BACK_LINK: req.headers.referer,
        }),
        ...pageVariables(),
        validationErrors,
        submittedValues: payload,
        userName: getUserNameFromSession(req.session.user),
      });
    }

    const referralUrl = req.flash('serviceOriginUrl');
    /**
     * reflash for consumption by feedback-confirmation controller
     * allows for redirect back to service after completing the feedback
     */
    req.flash('serviceOriginUrl', referralUrl);

    if (objectHasKeysAndValues(payload)) {
      const feedbackVariables = {
        // satisfaction will be null if not selected so set as empty string if null
        [SATISFACTION]: payload[SATISFACTION] ?? '',
        [IMPROVEMENT]: payload[IMPROVEMENT],
        [OTHER_COMMENTS]: payload[OTHER_COMMENTS],
        [REFERRAL_URL]: referralUrl?.toString(),
        [SERVICE]: APPLY,
        [PRODUCT]: SERVICE_NAME,
      } as InsuranceFeedbackVariables;

      const saveResponse = await api.keystone.feedback.create(feedbackVariables);

      if (!saveResponse?.success) {
        return res.redirect(PROBLEM_WITH_SERVICE);
      }
    }

    return res.redirect(FEEDBACK_SENT);
  } catch (error) {
    console.error('Error posting insurance feedback page %o', error);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

export { pageVariables, get, post };
