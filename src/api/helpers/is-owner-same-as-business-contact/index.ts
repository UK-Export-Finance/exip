/**
 * isOwnerSameAsBusinessContact
 * checks if the application owner email address is the same as the business contact email
 * @param {String} ownerEmail
 * @param {String} contactEmail
 * @returns {Boolean}
 */
const isOwnerSameAsBusinessContact = (ownerEmail: string, contactEmail: string) => ownerEmail === contactEmail;

export default isOwnerSameAsBusinessContact;
