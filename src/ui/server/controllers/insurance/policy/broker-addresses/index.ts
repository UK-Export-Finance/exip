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
import { Request, Response } from '../../../../../types';

const { SELECT_THE_ADDRESS } = POLICY_FIELD_IDS.BROKER_ADDRESSES;

const {
  INSURANCE_ROOT,
  PROBLEM_WITH_SERVICE,
  POLICY: { BROKER_DETAILS_ROOT, BROKER_ZERO_ADDRESSES_ROOT, BROKER_CONFIRM_ADDRESS_ROOT },
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
export const pageVariables = (referenceNumber: number, totalAddresses: number) => ({
  FIELD: {
    ID: FIELD_ID,
    ...BROKER_ADDRESSES[FIELD_ID],
  },
  BODY: `${totalAddresses} ${PAGE_CONTENT_STRINGS.BODY}`,
  SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}#`,
});

// TODO: EMS-3974 - this will come from the following:
// application.broker.buildingNumberOrName
// application.broker.postcode

const mockPostcode = 'W1A 1AA';
const mockHouseNameOrNumber = 'WOGAN HOUSE';

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

    const { referenceNumber } = application;

    const response = await api.keystone.getOrdnanceSurveyAddress(mockPostcode, mockHouseNameOrNumber);

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

    const mappedAddresses = mapOrdnanceSurveyAddresses(addresses);

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({ PAGE_CONTENT_STRINGS, BACK_LINK: req.headers.referer }),
      ...pageVariables(referenceNumber, addresses.length),
      userName: getUserNameFromSession(req.session.user),
      mappedAddresses,
      postcode: mockPostcode,
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

    const { referenceNumber } = application;

    const payload = constructPayload(req.body, [FIELD_ID]);

    const validationErrors = generateValidationErrors(payload, FIELD_ID, ERROR_MESSAGE);

    if (validationErrors) {
      const response = await api.keystone.getOrdnanceSurveyAddress(mockPostcode, mockHouseNameOrNumber);

      const { addresses } = response;

      const mappedAddresses = mapOrdnanceSurveyAddresses(addresses);

      return res.render(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS,
          BACK_LINK: req.headers.referer,
        }),
        ...pageVariables(referenceNumber, addresses.length),
        userName: getUserNameFromSession(req.session.user),
        mappedAddresses,
        postcode: mockPostcode,
        validationErrors,
      });
    }

    return res.redirect(`${INSURANCE_ROOT}/${referenceNumber}${BROKER_CONFIRM_ADDRESS_ROOT}`);
  } catch (error) {
    console.error('Error updating application - policy - broker addresses %o', error);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
