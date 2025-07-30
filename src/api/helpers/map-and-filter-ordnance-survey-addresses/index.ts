import filterOrdnanceSurveyAddresses from '../filter-ordnance-survey-addresses';
import mapOrdnanceSurveyAddresses from '../map-ordnance-survey-addresses';
import { OrdnanceSurveyAddress, Address } from '../../types';

/**
 * mapAndFilterOrdnanceSurveyAddresses
 * - Filter addresses based on building name/number
 * - Map the filtered addresses
 * @param {Array<OrdnanceSurveyAddress>} ordnanceSurveyResponse
 * @param {string} houseNameOrNumber
 * @returns {Array<Address>} Mapped addresses
 */
const mapAndFilterOrdnanceSurveyAddresses = (addresses: Array<OrdnanceSurveyAddress>, houseNameOrNumber: string): Array<Address> => {
  try {
    console.info('Mapping and filtering Ordnance Survey addresses');

    const filtered = filterOrdnanceSurveyAddresses(addresses, houseNameOrNumber);

    const mapped = mapOrdnanceSurveyAddresses(filtered);

    return mapped;
  } catch (error) {
    console.error('Error mapping and filtering Ordnance Survey addresses %o', error);

    throw new Error(`Mapping and filtering Ordnance Survey addresses ${error}`);
  }
};

export default mapAndFilterOrdnanceSurveyAddresses;
