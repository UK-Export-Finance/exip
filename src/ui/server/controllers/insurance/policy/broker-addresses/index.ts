import { PAGES } from '../../../../content-strings';
import { TEMPLATES } from '../../../../constants';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import POLICY_FIELD_IDS from '../../../../constants/field-ids/insurance/policy';
import { POLICY_FIELDS } from '../../../../content-strings/fields/insurance/policy';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import api from '../../../../api';
import mapOrdnanceSurveyAddresses from '../../../../helpers/mappings/map-ordnance-survey-addresses';
import { Request, Response } from '../../../../../types';

const { SELECT_THE_ADDRESS } = POLICY_FIELD_IDS.BROKER_ADDRESSES;

const { INSURANCE_ROOT, PROBLEM_WITH_SERVICE } = INSURANCE_ROUTES;

const { BROKER_ADDRESSES } = POLICY_FIELDS;

export const PAGE_CONTENT_STRINGS = PAGES.INSURANCE.POLICY.BROKER_ADDRESSES;

export const TEMPLATE = TEMPLATES.INSURANCE.POLICY.BROKER_ADDRESSES;

/**
 * pageVariables
 * Page fields and "save and go back" URL
 * @param {Number} referenceNumber: Application reference number
 * @param {String} postcode: The submitted postcode
 * @param {Number} totalAddresses: Total amount of addresses found
 * @returns {Object} Page variables
 */
export const pageVariables = (referenceNumber: number, postcode: string, totalAddresses: number) => ({
  FIELD: {
    ID: SELECT_THE_ADDRESS,
    ...BROKER_ADDRESSES[SELECT_THE_ADDRESS],
  },
  BODY: `${totalAddresses} ${PAGE_CONTENT_STRINGS.BODY} ${postcode}`,
  SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${referenceNumber}#`,
});

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

    // TODO: check that postcode and houseNameOrNumber is provided - if not, redirect

    // TODO: this will come from the following:
    // application.broker.buildingNumberOrName
    // application.broker.postcode

    // const mockPostcode = 'IG95NX';
    // // const mockHouseNameOrNumber = '15';
    // const mockHouseNameOrNumber = 'FLAT';

    const mockPostcode = 'W1A';
    const mockHouseNameOrNumber = '2';

    // TODO
    // TODO: rename getOrdnanceSurveyAddress to getOrdnanceSurveyAddresses

    // TODO: do we need constructPayload and sanitiseData?
    const response = await api.keystone.getOrdnanceSurveyAddress(mockPostcode, mockHouseNameOrNumber);

    if (response.apiError) {
      return res.redirect(PROBLEM_WITH_SERVICE);
    }

    const { addresses } = response;

    const mappedAddresses = mapOrdnanceSurveyAddresses(addresses);

    return res.render(TEMPLATE, {
      ...insuranceCorePageVariables({ PAGE_CONTENT_STRINGS, BACK_LINK: req.headers.referer }),
      ...pageVariables(referenceNumber, mockPostcode, addresses.length),
      userName: getUserNameFromSession(req.session.user),
      mappedAddresses,
    });
  } catch (error) {
    console.error('Error calling ordnance survey %o', error);

    return res.redirect(PROBLEM_WITH_SERVICE);
  }
};
