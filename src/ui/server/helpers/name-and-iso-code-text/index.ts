/**
 * nameAndIsoCodeText
 * Create a string with name and isoCode
 * @param {string} name: Country or currency name
 * @param {string} isoCode: Country or currency ISO code
 * @returns {string} Name and ISO code
 */
const nameAndIsoCodeText = (name: string, isoCode: string) => `${name} (${isoCode})`;

export default nameAndIsoCodeText;
