import removeWhiteSpace from '../remove-white-space';

/**
 * sanitiseCompaniesHouseNumber
 * @param {String} companyNumber: Companies house number
 * @returns {String} Uppercase string without white spaces
 */
const sanitiseCompaniesHouseNumber = (companyNumber: string) => removeWhiteSpace(companyNumber).toUpperCase();

export default sanitiseCompaniesHouseNumber;
