import { PAGES } from '../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../constants';
import { Request, Response } from '../../../../types';
import insuranceCorePageVariables from '../../../helpers/page-variables/core/insurance';
import api from '../../../api';

export const TEMPLATE = TEMPLATES.INSURANCE.DASHBOARD;

const {
  INSURANCE: { INSURANCE_ROOT, ALL_SECTIONS },
  PROBLEM_WITH_SERVICE,
} = ROUTES;

/**
 * get
 * Render the Dashboard page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Dashboard page
 */
export const get = async (req: Request, res: Response) => {
  try {
    const applications = await api.keystone.applications.getAll();

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS: PAGES.INSURANCE.DASHBOARD,
        BACK_LINK: req.headers.referer,
      }),
      applications,
      ROUTES: {
        INSURANCE_ROOT,
        ALL_SECTIONS,
      },
    });
  } catch (err) {
    console.error("Error getting applications and rendering 'dashboard' page", { err });

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
