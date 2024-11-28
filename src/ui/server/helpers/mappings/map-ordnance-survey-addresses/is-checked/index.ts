import { MappedOrdnanceSurveyAddress, ApplicationBroker } from '../../../../../types';

/**
 * isChecked
 * Check if a provided address is a submitted broker address.
 * @param {MappedOrdnanceSurveyAddress} Ordnance survey address
 * @param {ApplicationBroker} Application broker address
 * @returns {Boolean}
 */
const isChecked = (address: MappedOrdnanceSurveyAddress, submittedAddress: ApplicationBroker) => {
  const { addressLine1, addressLine2, town, postcode } = address;

  if (
    addressLine1 === submittedAddress.addressLine1 &&
    addressLine2 === submittedAddress.addressLine2 &&
    town === submittedAddress.town &&
    postcode === submittedAddress.postcode
  ) {
    return true;
  }

  return false;
};

export default isChecked;
