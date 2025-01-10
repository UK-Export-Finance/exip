import filterOrdnanceSurveyAddresses from '../filter-ordnance-survey-addresses';
import mapOrdnanceSurveyAddresses from '../map-ordnance-survey-addresses';
import { OrdnanceSurveyResponse, Address } from '../../types';

// TODO:
// TODO:
// TODO:
// TODO:
// TODO: rename OrdnanceSurveyResponse.

/**
 * mapAndFilterOrdnanceSurveyAddresses
 * - Filter addresses based on building name/number
 * - Map the filtered addresses
 * @param {Array<OrdnanceSurveyResponse>} ordnanceSurveyResponse
 * @param {String} houseNameOrNumber
 * @returns {Array<Address>} Mapped addresses
 */
const mapAndFilterOrdnanceSurveyAddresses = (ordnanceSurveyResponse: Array<OrdnanceSurveyResponse>, houseNameOrNumber: string): Array<Address> => {
  try {
    console.info('Mapping and filtering Ordnance Survey addresses');

    const filtered = filterOrdnanceSurveyAddresses(ordnanceSurveyResponse, houseNameOrNumber);

    const mapped = mapOrdnanceSurveyAddresses(filtered);

    return mapped;
  } catch (error) {
    console.error('Error mapping and filtering Ordnance Survey addresses %o', error);

    throw new Error(`Mapping and filtering Ordnance Survey addresses ${error}`);
  }
};

export default mapAndFilterOrdnanceSurveyAddresses;
