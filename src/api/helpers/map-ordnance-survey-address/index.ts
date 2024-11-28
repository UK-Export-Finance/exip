import { OrdnanceSurveyResponse } from '../../types';

/**
 * mapOrdnanceSurveyAddress
 * Maps address from OrdnanceSurveyResponse to a UKEF/EXIP aligned format
 * @param {OrdnanceSurveyResponse} address
 * @returns {Address} mapped address
 */
const mapOrdnanceSurveyAddress = (address: OrdnanceSurveyResponse) => {
  let addressLine1 = '';

  if (address.DPA.SUB_BUILDING_NAME) {
    addressLine1 = address.DPA.SUB_BUILDING_NAME;
  }

  if (address.DPA.ORGANISATION_NAME) {
    if (addressLine1) {
      addressLine1 += ` ${address.DPA.ORGANISATION_NAME}`;
    } else {
      addressLine1 = address.DPA.ORGANISATION_NAME;
    }
  }

  if (address.DPA.BUILDING_NAME) {
    if (addressLine1) {
      addressLine1 += ` ${address.DPA.BUILDING_NAME}`;
    } else {
      addressLine1 = address.DPA.BUILDING_NAME;
    }
  }

  /**
   * NOTE: Ordnance Survey does not return county data.
   * Therefore this should be set to an empty string,
   * to avoid any null/mapping/type issues.
   */
  const county = '';

  return {
    addressLine1,
    addressLine2: address.DPA.THOROUGHFARE_NAME,
    town: address.DPA.POST_TOWN,
    county,
    postcode: address.DPA.POSTCODE,
  };
};

export default mapOrdnanceSurveyAddress;
