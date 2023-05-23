/**
 * isOwnerSameAsContact
 * checks if the application owner email address is the same as the business contact email
 * @param {String} ownerEmail
 * @param {String} contactEmail
 * @returns {Boolean}
 */
const isOwnerSameAsContact = (ownerEmail: string, contactEmail: string) => ownerEmail === contactEmail;

export default isOwnerSameAsContact;
