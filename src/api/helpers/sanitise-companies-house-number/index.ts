import removeWhiteSpace from '../remove-white-space';

/**
 * sanitiseCompaniesHouseNumber
 * @param {string} companyNumber: Companies house number
 * @returns {string} Uppercase string without white spaces and a leading zero.
 */
const sanitiseCompaniesHouseNumber = (companyNumber: string) => removeWhiteSpace(companyNumber).toUpperCase().padStart(8, '0');

export default sanitiseCompaniesHouseNumber;
