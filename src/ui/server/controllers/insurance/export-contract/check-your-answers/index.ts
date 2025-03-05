import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import { PAGES } from '../../../../content-strings';
import api from '../../../../api';
import { isPopulatedArray } from '../../../../helpers/array';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import { exportContractSummaryLists } from '../../../../helpers/summary-lists/export-contract';
import { Request, ResponseInsurance } from '../../../../../types';

const { INSURANCE_ROOT, ALL_SECTIONS, PROBLEM_WITH_SERVICE } = INSURANCE_ROUTES;

export const TEMPLATE = TEMPLATES.INSURANCE.EXPORT_CONTRACT.CHECK_YOUR_ANSWERS;

/**
 * get
 * Get the application and render Export contract - check your answers page
 * @param {Express.Request} Express request
 * @param {ResponseInsurance} Express response for "insurance" routes
 * @returns {Express.Response.render} Export contract - check your answers page
 */
export const get = async (req: Request, res: ResponseInsurance) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(PROBLEM_WITH_SERVICE);
  }

  const { exportContract, referenceNumber, totalContractValueOverThreshold } = application;

  try {
    const countries = await api.keystone.countries.getAll();

    const { allCurrencies } = await api.keystone.APIM.getCurrencies();

    if (!isPopulatedArray(countries) || !isPopulatedArray(allCurrencies)) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const summaryLists = exportContractSummaryLists({
      exportContract,
      totalContractValueOverThreshold,
      referenceNumber,
      countries,
      currencies: allCurrencies,
    });

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS: PAGES.INSURANCE.EXPORT_CONTRACT.CHECK_YOUR_ANSWERS,
        BACK_LINK: req.headers.referer,
      }),
      userName: getUserNameFromSession(req.session.user),
      application: mapApplicationToFormFields(res.locals.application),
      SUMMARY_LISTS: summaryLists,
    });
  } catch (error) {
    console.error('Error getting countries %o', error);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

/**
 * post
 * Redirect to the next part of the flow.
 * @param {Express.Request} Express request
 * @param {ResponseInsurance} Express response for "insurance" routes
 * @returns {Express.Response.redirect} Next part of the flow
 */
export const post = (req: Request, res: ResponseInsurance) => {
  const { referenceNumber } = req.params;

  return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`);
};
