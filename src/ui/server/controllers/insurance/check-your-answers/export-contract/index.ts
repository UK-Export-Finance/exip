import { BUTTONS, PAGES } from '../../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../../constants';
import FIELD_IDS from '../../../../constants/field-ids/insurance';
import { CHECK_YOUR_ANSWERS_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance/check-your-answers';
import api from '../../../../api';
import { isPopulatedArray } from '../../../../helpers/array';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import { exportContractSummaryLists } from '../../../../helpers/summary-lists/export-contract';
import requiredFields from '../../../../helpers/required-fields/export-contract';
import sectionStatus from '../../../../helpers/section-status';
import constructPayload from '../../../../helpers/construct-payload';
import save from '../save-data';
import { Request, ResponseInsurance } from '../../../../../types';

export const TEMPLATE = TEMPLATES.INSURANCE.CHECK_YOUR_ANSWERS;

export const FIELD_ID = FIELD_IDS.CHECK_YOUR_ANSWERS.EXPORT_CONTRACT;

const {
  INSURANCE: { INSURANCE_ROOT, ALL_SECTIONS, PROBLEM_WITH_SERVICE },
} = ROUTES;

/**
 * pageVariables
 * Page fields and SUBMIT_BUTTON_COPY
 * @returns {object} Page variables
 */
export const pageVariables = {
  FIELD: {
    ID: FIELD_ID,
    ...FIELDS[FIELD_ID],
  },
  SUBMIT_BUTTON_COPY: BUTTONS.SAVE_AND_BACK,
};

/**
 * get
 * Render the Check your answers - Export contract page
 * @param {Express.Request} Express request
 * @param {ResponseInsurance} Express response for "insurance" routes
 * @returns {Express.Response.render} Check your answers - Export contract
 */
export const get = async (req: Request, res: ResponseInsurance) => {
  try {
    const { application } = res.locals;

    if (!application) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const { referenceNumber, exportContract, totalContractValueOverThreshold } = application;

    const {
      finalDestinationKnown,
      privateMarket: { attempted: attemptedPrivateMarketCover },
      agent: {
        isUsingAgent,
        service: {
          agentIsCharging,
          charge: { method: agentChargeMethod },
        },
      },
      awardMethod,
    } = exportContract;

    const checkAndChange = true;

    const { allCurrencies, countries } = await api.keystone.getCountriesAndCurrencies();

    if (!isPopulatedArray(countries) || !isPopulatedArray(allCurrencies)) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const summaryList = exportContractSummaryLists({
      exportContract,
      totalContractValueOverThreshold,
      referenceNumber,
      countries,
      currencies: allCurrencies,
      checkAndChange,
    });

    const exportContractFields = requiredFields({
      totalContractValueOverThreshold,
      finalDestinationKnown,
      attemptedPrivateMarketCover,
      isUsingAgent,
      agentIsCharging,
      agentChargeMethod,
      awardMethodId: awardMethod?.id,
    });

    const status = sectionStatus(exportContractFields, application);

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({
        PAGE_CONTENT_STRINGS: PAGES.INSURANCE.CHECK_YOUR_ANSWERS.YOUR_EXPORT_CONTRACT,
        BACK_LINK: req.headers.referer,
      }),
      userName: getUserNameFromSession(req.session.user),
      ...pageVariables,
      status,
      SUMMARY_LISTS: summaryList,
    });
  } catch (error) {
    console.error('Error getting Check your answers - Export contract %o', error);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

/**
 * post
 * Save data and redirect to the next part of the flow.
 * @param {Express.Request} Express request
 * @param {ResponseInsurance} Express response for "insurance" routes
 * @returns {Express.Response.redirect} Next part of the flow
 */
export const post = async (req: Request, res: ResponseInsurance) => {
  const { application } = res.locals;

  if (!application) {
    return res.redirect(PROBLEM_WITH_SERVICE);
  }

  const { referenceNumber } = application;

  try {
    // save the application
    const payload = constructPayload(req.body, [FIELD_ID]);

    const saveResponse = await save.sectionReview(application, payload);

    if (!saveResponse) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`);
  } catch (error) {
    console.error('Error updating Check your answers - Export contract %o', error);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
