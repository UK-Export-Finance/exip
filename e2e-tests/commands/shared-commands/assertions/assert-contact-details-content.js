import { emailLink, emailPrefix } from '../../../pages/shared';
import { contactDetails } from '../../../partials';
import { CONTACT_DETAILS } from '../../../content-strings';

const { PHONE, EMAIL, OPENING_TIMES } = CONTACT_DETAILS;

/**
 * assertContactDetailsContent
 * Check contact details content
 */
const assertContactDetailsContent = () => {
  cy.checkText(emailPrefix(), `${EMAIL.PREFIX}:`);

  cy.checkLink(emailLink(), EMAIL.VALUE, EMAIL.TEXT);

  cy.checkText(contactDetails.phone(), `${PHONE.PREFIX}: ${PHONE.VALUE}`);
  cy.checkText(contactDetails.openingTimes(), OPENING_TIMES);
};

export default assertContactDetailsContent;
