import { FIELD_IDS, TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import { PAGES } from '../../../../content-strings';
import { POLICY_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import api from '../../../../api';
import { isPopulatedArray } from '../../../../helpers/array';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import { policySummaryLists } from '../../../../helpers/summary-lists/policy';
import { Request, Response } from '../../../../../types';

const { INSURANCE_ROOT, ALL_SECTIONS, PROBLEM_WITH_SERVICE } = INSURANCE_ROUTES;

const { POLICY } = FIELD_IDS.INSURANCE;

export const pageVariables = (referenceNumber: number) => ({
  FIELD: FIELDS[POLICY.POLICY_TYPE],
  SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`,
});

export const TEMPLATE = TEMPLATES.INSURANCE.POLICY.CHECK_YOUR_ANSWERS;

/**
 * get
 * Get the application and render Type of policy - check your answers page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Type of policy - check your answers page
 */
export const get = async (req: Request, res: Response) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(PROBLEM_WITH_SERVICE);
  }

  const { referenceNumber, policy, exportContract, policyContact, broker, nominatedLossPayee } = application;

  try {
    const { allCurrencies } = await api.keystone.APIM.getCurrencies();
    const countries = await api.keystone.countries.getAll();

    if (!isPopulatedArray(allCurrencies) || !isPopulatedArray(countries)) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const answers = {
      ...policy,
      ...exportContract,
    };

    const summaryLists = policySummaryLists(answers, policyContact, broker, nominatedLossPayee, referenceNumber, allCurrencies, countries);

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS: PAGES.INSURANCE.POLICY.CHECK_YOUR_ANSWERS,
        BACK_LINK: req.headers.referer,
      }),
      ...pageVariables(referenceNumber),
      userName: getUserNameFromSession(req.session.user),
      application: mapApplicationToFormFields(res.locals.application),
      SUMMARY_LISTS: summaryLists,
    });
  } catch (err) {
    console.error('Error getting currencies and/or countries %O', err);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

/**
 * post
 * Redirect to the next part of the flow.
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} Next part of the flow
 */
export const post = (req: Request, res: Response) => {
  const { referenceNumber } = req.params;

  return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`);
};
