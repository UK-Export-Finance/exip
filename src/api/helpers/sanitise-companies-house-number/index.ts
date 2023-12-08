import removeWhiteSpace from '../remove-white-space';

/**
 * sanitiseCompaniesHouseNumber
 * @param {String} companyNumber: Companies house number
 * @returns {String} Uppercase string without white spaces and a leading zero.
 */
const sanitiseCompaniesHouseNumber = (companyNumber: string) => removeWhiteSpace(companyNumber).toUpperCase().padStart(8, '0');

export default sanitiseCompaniesHouseNumber;
