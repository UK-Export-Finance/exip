import { ERROR_MESSAGES, PAGES } from '../../../../content-strings';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import POLICY_FIELD_IDS from '../../../../constants/field-ids/insurance/policy';
import { POLICY_FIELDS } from '../../../../content-strings/fields/insurance/policy';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import api from '../../../../api';
import mapOrdnanceSurveyAddresses from '../../../../helpers/mappings/map-ordnance-survey-addresses';
import constructPayload from '../../../../helpers/construct-payload';
import generateValidationErrors from '../../../../shared-validation/yes-no-radios-form';
import getOrdnanceSurveyAddressByIndex from '../../../../helpers/get-chosen-ordnance-survey-address/by-index';
import getOrdnanceSurveyAddressById from '../../../../helpers/get-chosen-ordnance-survey-address/by-id';
import mapAndSave from '../map-and-save/broker';
import isChangeRoute from '../../../../helpers/is-change-route';
import { Request, Response } from '../../../../../types';

const { SELECT_THE_ADDRESS } = POLICY_FIELD_IDS.BROKER_ADDRESSES;

const {
  INSURANCE_ROOT,
  PROBLEM_WITH_SERVICE,
  POLICY: {
    BROKER_ADDRESSES_SAVE_AND_BACK,
    BROKER_DETAILS_ROOT,
    BROKER_ZERO_ADDRESSES_ROOT,
    BROKER_CONFIRM_ADDRESS_ROOT,
    BROKER_MANUAL_ADDRESS_ROOT,
    CHECK_YOUR_ANSWERS,
  },
} = INSURANCE_ROUTES;

const { BROKER_ADDRESSES } = POLICY_FIELDS;

export const FIELD_ID = SELECT_THE_ADDRESS;

export const ERROR_MESSAGE = ERROR_MESSAGES.INSURANCE.POLICY[FIELD_ID].IS_EMPTY;

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.POLICY.BROKER_ADDRESSES;

export const TEMPLATE = TEMPLATES.INSURANCE.POLICY.BROKER_ADDRESSES;

/**
 * pageVariables
 * Page fields and "save and go back" URL
 * @param {Number} referenceNumber: Application reference number
 * @param {Number} totalAddresses: Total amount of addresses found
 * @returns {Object} Page variables
 */
export const pageVariables = (referenceNumber: number, totalAddresses: number) => {
  let ADDRESS_STRING = PAGE_CONTENT_STRINGS.INTRO.ADDRESSES;

  if (totalAddresses === 1) {
    ADDRESS_STRING = PAGE_CONTENT_STRINGS.INTRO.ADDRESS;
  }

  return {
    FIELD: {
      ID: SELECT_THE_ADDRESS,
      ...BROKER_ADDRESSES[SELECT_THE_ADDRESS],
    },
    INTRO: {
      ...PAGE_CONTENT_STRINGS.INTRO,
      ADDRESSES_FOUND: `${totalAddresses} ${ADDRESS_STRING} ${PAGE_CONTENT_STRINGS.INTRO.FOUND_FOR}`,
    },
    SEARCH_AGAIN_URL: `${INSURANCE_ROOT}/${referenceNumber}${BROKER_DETAILS_ROOT}`,
    ENTER_ADDRESS_MANUALLY_URL: `${INSURANCE_ROOT}/${referenceNumber}${BROKER_MANUAL_ADDRESS_ROOT}`,
    SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}${BROKER_ADDRESSES_SAVE_AND_BACK}`,
  };
};

/**
 * Render the Broker addresses page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Broker addresses page
 */
export const get = async (req: Request, res: Response) => {
  try {
    const { application } = res.locals;

    if (!application) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const { broker, referenceNumber } = application;
    const { postcode, buildingNumberOrName } = broker;

    /**
     * If a user manually navigates to this route,
     * without providing previously required data,
     * redirect the user back to BROKER_DETAILS,
     * where the data can be submitted.
     */
    if (!postcode || !buildingNumberOrName) {
      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${BROKER_DETAILS_ROOT}`);
    }

    const response = await api.keystone.getOrdnanceSurveyAddresses(String(postcode), String(buildingNumberOrName));

    if (response.apiError) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    if (response.invalidPostcode) {
      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${BROKER_DETAILS_ROOT}`);
    }

    if (response.noAddressesFound) {
      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${BROKER_ZERO_ADDRESSES_ROOT}`);
    }

    const { addresses } = response;

    /**
     * If only one address is found - no need to ask the user to select an address. Therefore:
     * 1) Generate an address to save.
     * 2) Send to the API.
     * 3) Redirect to the next part of the flow.
     */
    if (addresses.length === 1) {
      console.info(`Policy - broker addresses - only 1 address available. Redirecting to ${BROKER_CONFIRM_ADDRESS_ROOT}`);

      const addressToSave = getOrdnanceSurveyAddressByIndex({ addresses, index: 0 });

      const saveResponse = await mapAndSave.broker(addressToSave, application);

      if (!saveResponse) {
        return res.redirect(PROBLEM_WITH_SERVICE);
      }

      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${BROKER_CONFIRM_ADDRESS_ROOT}`);
    }

    const mappedAddresses = mapOrdnanceSurveyAddresses(addresses, broker);

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({ PAGE_CONTENT_STRINGS, BACK_LINK: req.headers.referer }),
      ...pageVariables(referenceNumber, addresses.length),
      userName: getUserNameFromSession(req.session.user),
      mappedAddresses,
      postcode,
      buildingNumberOrName,
    });
  } catch (error) {
    console.error('Error calling ordnance survey %o', error);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};

/**
 * post
 * Check Policy - Broker addresses validation errors and if successful, redirect to the next part of the flow.
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.redirect} Next part of the flow or error page
 */
export const post = async (req: Request, res: Response) => {
  try {
    const { application } = res.locals;

    if (!application) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const { broker, referenceNumber } = application;
    const { postcode, buildingNumberOrName } = broker;

    const payload = constructPayload(req.body, [FIELD_ID]);

    const validationErrors = generateValidationErrors(payload, FIELD_ID, ERROR_MESSAGE);

    const response = await api.keystone.getOrdnanceSurveyAddresses(String(postcode), String(buildingNumberOrName));

    const { addresses } = response;

    const mappedAddresses = mapOrdnanceSurveyAddresses(addresses, broker);

    if (validationErrors) {
      return res.render(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS,
          BACK_LINK: req.headers.referer,
        }),
        ...pageVariables(referenceNumber, addresses.length),
        userName: getUserNameFromSession(req.session.user),
        mappedAddresses,
        postcode,
        validationErrors,
      });
    }

    const chosenAddress = getOrdnanceSurveyAddressById(payload, FIELD_ID, addresses);

    const saveResponse = await mapAndSave.broker(chosenAddress, application);

    if (!saveResponse) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    if (isChangeRoute(req.originalUrl)) {
      return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`);
    }

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${BROKER_CONFIRM_ADDRESS_ROOT}`);
  } catch (error) {
    console.error('Error updating application - policy - broker addresses %o', error);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
