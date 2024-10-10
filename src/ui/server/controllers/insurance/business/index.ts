import { PAGES } from '../../../content-strings';
import { TEMPLATES } from '../../../constants';
import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';
import sectionStartPageVariables from '../../../helpers/page-variables/core/insurance/section-start';
import getUserNameFromSession from '../../../helpers/get-user-name-from-session';
import { Request, Response } from '../../../../types';

const {
  EXPORTER_BUSINESS: { COMPANY_DETAILS_ROOT, ENTER_COMPANIES_HOUSE_NUMBER },
  PROBLEM_WITH_SERVICE,
} = INSURANCE_ROUTES;

export const TEMPLATE = TEMPLATES.SHARED_PAGES.SECTION_START;

/**
 * get
 * Render the "Your business - start" page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Your business - start page
 */
export const get = (req: Request, res: Response) => {
  try {
    const { application } = res.locals;

    if (!application) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    let START_NOW_ROUTE = COMPANY_DETAILS_ROOT;

    /**
     * If an application has:
     * 1) Migrated from V1 to V2
     * 2) Does not have a company number,
     * Change the START_NOW_ROUTE to ENTER_COMPANIES_HOUSE_NUMBER.
     * Otherwise, such applications will not be able to provide company data,
     * and it will be impossible to complete the application.
     */
    const { migratedV1toV2, company, referenceNumber } = application;

    const userNeedsToProvideCompaniesHouseNumber = migratedV1toV2 && !company.companyNumber;

    if (userNeedsToProvideCompaniesHouseNumber) {
      START_NOW_ROUTE = ENTER_COMPANIES_HOUSE_NUMBER;
    }

    return res.render(TEMPLATE, {
      ...sectionStartPageVariables({
        REFERENCE_NUMBER: referenceNumber,
        START_NOW_ROUTE,
        PAGE_CONTENT_STRINGS: PAGES.INSURANCE.EXPORTER_BUSINESS.ROOT,
        BACK_LINK: req.headers.referer,
      }),
      userName: getUserNameFromSession(req.session.user),
    });
  } catch (error) {
    console.error('Error getting credit control %o', error);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
