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

  return {
    addressLine1,
    addressLine2: address.DPA.THOROUGHFARE_NAME,
    town: address.DPA.POST_TOWN,
    postalCode: address.DPA.POSTCODE,
  };
};

export default mapOrdnanceSurveyAddress;
