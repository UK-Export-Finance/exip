import { OrdnanceSurveyResponse } from '../../types';

/**
 * mapAddress
 * Maps address from OrdnanceSurveyResponse to correct format
 * @param {OrdnanceSurveyResponse} address
 * @returns {Address} mapped address
 */
const mapAddress = (address: OrdnanceSurveyResponse) => ({
  addressLine1: `${address.DPA.ORGANISATION_NAME ?? ''} ${address.DPA.BUILDING_NAME ?? ''} ${address.DPA.BUILDING_NUMBER ?? ''} ${
    address.DPA.THOROUGHFARE_NAME ?? ''
  }`.trim(),
  addressLine2: address.DPA.DEPENDENT_LOCALITY,
  town: address.DPA.POST_TOWN,
  postalCode: address.DPA.POSTCODE,
});

export default mapAddress;
