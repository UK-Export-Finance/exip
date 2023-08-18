import { TEMPLATES, ROUTES } from '../../../../../constants';
import { PAGES } from '../../../../../content-strings';
import insuranceCorePageVariables from '../../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../../helpers/get-user-name-from-session';
import { Request, Response } from '../../../../../../types';

const { COMPANIES_HOUSE_UNAVAILABLE } = PAGES.INSURANCE.EXPORTER_BUSINESS;

const { COMPANIES_HOUSE_UNAVAILABLE: COMPANIES_HOUSE_UNAVAILABLE_TEMPLATE } = TEMPLATES.INSURANCE.EXPORTER_BUSINESS;

const { INSURANCE_ROOT, ALL_SECTIONS, EXPORTER_BUSINESS: EXPORTER_BUSINESS_ROUTES, PROBLEM_WITH_SERVICE } = ROUTES.INSURANCE;

const { COMPANIES_HOUSE_NUMBER_ROOT } = EXPORTER_BUSINESS_ROUTES;

export const TEMPLATE = COMPANIES_HOUSE_UNAVAILABLE_TEMPLATE;

/**
 * gets the template for companies house unavailable page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} renders companies house unavailable page
 */
const get = (req: Request, res: Response) => {
  try {
    const { application } = res.locals;

    if (!application) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const { referenceNumber } = application;

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS: COMPANIES_HOUSE_UNAVAILABLE,
        BACK_LINK: req.headers.referer,
      }),
      userName: getUserNameFromSession(req.session.user),
      COMPANIES_HOUSE_NUMBER: `${INSURANCE_ROOT}/${referenceNumber}${COMPANIES_HOUSE_NUMBER_ROOT}`,
      ALL_SECTIONS: `${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`,
    });
  } catch (err) {
    console.error('Error getting companies house unavailable page %O', err);
    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

export { get };
