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

  const addressLine1IsTheSame = addressLine1 === submittedAddress.addressLine1;
  const addressLine2IsTheSame = addressLine2 === submittedAddress.addressLine2;
  const townIsTheSame = town === submittedAddress.town;
  const postcodeIsTheSame = postcode === submittedAddress.postcode;

  return addressLine1IsTheSame && addressLine2IsTheSame && townIsTheSame && postcodeIsTheSame;
};

export default isChecked;
