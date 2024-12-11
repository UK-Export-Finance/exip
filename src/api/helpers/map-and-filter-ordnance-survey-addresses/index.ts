import { OrdnanceSurveyResponse, Address } from '../../types';
import mapAddress from '../map-ordnance-survey-address';

/**
 * mapAndFilterOrdnanceSurveyAddresses
 * filters address based on building name and house name/number
 * maps filtered address to correct format
 * returns array of matching addresses
 * @param {String} house name or number
 * @param {Array<OrdnanceSurveyResponse>} ordnanceSurveyResponse
 * @returns {Array<Address>} mapped addresses
 */
const mapAndFilterOrdnanceSurveyAddresses = (houseNameOrNumber: string, ordnanceSurveyResponse: Array<OrdnanceSurveyResponse>): Array<Address> => {
  try {
    console.info('Mapping and filtering Ordnance Survey addresses');

    const mappedAndFiltered = [] as Array<Address>;

    ordnanceSurveyResponse.forEach((address) => {
      /**
       * NOTE - depending on the postcode and "house name or number",
       * Ordnance Survey returns different fields.
       * For example, some addresses will only return one of the following fields
       * - SUB_BUILDING_NAME
       * - BUILDING_NAME
       * - BUILDING_NUMBER
       * Good examples:
       * postcode = SW1A 2HQ, houseNameOrNumber = 1
       * postcode = W1A 1AA, houseNameOrNumber = Wogan House
       */
      if (address.DPA.SUB_BUILDING_NAME && address.DPA.SUB_BUILDING_NAME.includes(houseNameOrNumber)) {
        mappedAndFiltered.push(mapAddress(address));
      }

      if (address.DPA.BUILDING_NAME && address.DPA.BUILDING_NAME.includes(houseNameOrNumber)) {
        mappedAndFiltered.push(mapAddress(address));
      }

      if (address.DPA.BUILDING_NUMBER && address.DPA.BUILDING_NUMBER.includes(houseNameOrNumber)) {
        mappedAndFiltered.push(mapAddress(address));
      }
    });

    return mappedAndFiltered;
  } catch (error) {
    console.error('Error mapping and filtering Ordnance Survey addresses %o', error);

    throw new Error(`Mapping and filtering Ordnance Survey addresses ${error}`);
  }
};

export default mapAndFilterOrdnanceSurveyAddresses;
