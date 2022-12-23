import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../constants';
import { PAGES } from '../../../../content-strings';
import { FIELDS } from '../../../../content-strings/fields/insurance';
import { Request, Response } from '../../../../../types';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';

const {
  INSURANCE: {
    INSURANCE_ROOT,
    POLICY_AND_EXPORTS: { ABOUT_GOODS_OR_SERVICES_SAVE_AND_BACK },
  },
} = ROUTES;

const {
  POLICY_AND_EXPORTS: { ABOUT_GOODS_OR_SERVICES },
} = FIELD_IDS.INSURANCE;

const { DESCRIPTION, FINAL_DESTINATION } = ABOUT_GOODS_OR_SERVICES;

/**
 * pageVariables
 * Page fields and "save and go back" URL
 * @param {Number} Application reference number
 * @returns {Object} Page variables
 */
export const pageVariables = (referenceNumber: number) => ({
  FIELDS: {
    DESCRIPTION: {
      ID: DESCRIPTION,
      ...FIELDS.ABOUT_GOODS_OR_SERVICES[DESCRIPTION],
    },
    FINAL_DESTINATION: {
      ID: FINAL_DESTINATION,
      ...FIELDS.ABOUT_GOODS_OR_SERVICES[FINAL_DESTINATION],
    },
  },
  SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${ABOUT_GOODS_OR_SERVICES_SAVE_AND_BACK}`,
});

export const TEMPLATE = TEMPLATES.INSURANCE.POLICY_AND_EXPORTS.ABOUT_GOODS_OR_SERVICES;

/**
 * get
 * Get the application and render the About goods or services page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Single contract policy page
 */
export const get = (req: Request, res: Response) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }

  const { referenceNumber } = req.params;
  const refNumber = Number(referenceNumber);

  try {
    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS: PAGES.INSURANCE.POLICY_AND_EXPORTS.ABOUT_GOODS_OR_SERVICES,
        BACK_LINK: req.headers.referer,
      }),
      ...pageVariables(refNumber),
      application,
    });
  } catch (err) {
    console.error('Error getting currencies ', { err });

    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
};
