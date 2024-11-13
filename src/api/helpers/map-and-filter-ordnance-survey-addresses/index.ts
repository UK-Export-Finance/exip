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
      if (address.DPA.SUB_BUILDING_NAME && address.DPA.SUB_BUILDING_NAME.includes(houseNameOrNumber)) {
        mappedAndFiltered.push(mapAddress(address));
      }

      if (address.DPA.BUILDING_NAME && address.DPA.BUILDING_NAME.includes(houseNameOrNumber)) {
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
