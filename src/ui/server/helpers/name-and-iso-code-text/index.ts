/**
 * nameAndIsoCodeText
 * Create a string with name and isoCode
 * @param {String} name: Country or currency name
 * @param {String} isoCode: Country or currency ISO code
 * @returns {String} Name and ISO code
 */
const nameAndIsoCodeText = (name: string, isoCode: string) => `${name} (${isoCode})`;

export default nameAndIsoCodeText;
