import { ROUTES, TEMPLATES, APPLICATION } from '../../../constants';
import { PAGES } from '../../../content-strings';
import insuranceCorePageVariables from '../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../helpers/get-user-name-from-session';
import mapApplicationToFormFields from '../../../helpers/mappings/map-application-to-form-fields';
import { Request, ResponseInsurance } from '../../../../types';

const {
  INSURANCE: { INSURANCE_ROOT, ALL_SECTIONS },
} = ROUTES;

export const TEMPLATE = TEMPLATES.INSURANCE.APPLICATION_SUBMITTED;

/**
 * get
 * Get the application and render the Application submitted page
 * @param {Express.Request} Express request
 * @param {ResponseInsurance} Express response for "insurance" routes
 * @returns {Express.Response.render} Application submitted page
 */
export const get = (req: Request, res: ResponseInsurance) => {
  const { application } = res.locals;

  const { referenceNumber } = req.params;

  if (application.status !== APPLICATION.STATUS.SUBMITTED) {
    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`);
  }

  return res.render(TEMPLATE, {
    ...insuranceCorePageVariables({
      PAGE_CONTENT_STRINGS: PAGES.INSURANCE.APPLICATION_SUBMITTED,
      BACK_LINK: req.headers.referer,
    }),
    userName: getUserNameFromSession(req.session.user),
    application: mapApplicationToFormFields(res.locals.application),
  });
};
