import { PAGES, FIELDS } from '../../../../content-strings';
import { TEMPLATES, ROUTES, FIELD_IDS, INSURANCE, SERVICE_NAME } from '../../../../constants';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import { objectHasKeysAndValues } from '../../../../helpers/object';
import generateValidationErrors from './validation';
import { Request, Response, InsuranceFeedbackVariables } from '../../../../../types';
import api from '../../../../api';

const {
  FEEDBACK: { SATISFACTION, IMPROVEMENT, OTHER_COMMENTS, VERY_SATISFIED, SATISFIED, NEITHER, DISSATISFIED, VERY_DISSATISIFED, REFERRAL_URL, SERVICE, PRODUCT },
} = FIELD_IDS;

const { FEEDBACK_PAGE } = PAGES;
const { FEEDBACK: FEEDBACK_TEMPLATE } = TEMPLATES.INSURANCE;

const { FEEDBACK_SENT } = ROUTES.INSURANCE;

export const TEMPLATE = FEEDBACK_TEMPLATE;

export const MAXIMUM = 1200;

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
  MAXIMUM,
});

/**
 * gets the template for the feedback page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} renders insurance feedback page
 */
const get = (req: Request, res: Response) => {
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
    });
  } catch (err) {
    console.error('Error getting insurance feedback page', { err });
    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
};

/**
 * posts the feedback form
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} renders insurance feedback confirmation page
 */
const post = async (req: Request, res: Response) => {
  try {
    const { body } = req;

    const { _csrf, ...feedback } = body;

    // run validation on inputs
    const validationErrors = generateValidationErrors(body);

    // if any errors then render template with errors
    if (validationErrors) {
      return res.render(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: FEEDBACK_PAGE,
          BACK_LINK: req.headers.referer,
        }),
        ...pageVariables(),
        validationErrors,
        submittedValues: body,
      });
    }

    const referralUrl = req.flash('serviceOriginUrl');
    /**
     * reflash for consumption by feedback-confirmation controller
     * allows for redirect back to service after completing the feedback
     */
    req.flash('serviceOriginUrl', referralUrl);

    if (objectHasKeysAndValues(feedback)) {
      const feedbackVariables = {
        // satisfaction will be null if not selected so set as empty string if null
        [SATISFACTION]: feedback[SATISFACTION] ?? '',
        [IMPROVEMENT]: feedback[IMPROVEMENT],
        [OTHER_COMMENTS]: feedback[OTHER_COMMENTS],
        [REFERRAL_URL]: referralUrl?.toString(),
        [SERVICE]: INSURANCE,
        [PRODUCT]: SERVICE_NAME,
      } as InsuranceFeedbackVariables;

      const saveResponse = await api.keystone.feedback.create(feedbackVariables);

      if (!saveResponse || !saveResponse.success) {
        return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
      }
    }

    return res.redirect(FEEDBACK_SENT);
  } catch (err) {
    console.error('Error posting insurance feedback page', { err });
    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
};

export { pageVariables, get, post };
