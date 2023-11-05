import customerServiceContactDetails from '../../../partials/customerServiceContactDetails';
import { CUSTOMER_SERVICE_CONTACT_DETAILS } from '../../../content-strings';

const {
  TELEPHONE,
  EMAIL,
  OPENING_TIMES,
  CALL_CHARGES,
} = CUSTOMER_SERVICE_CONTACT_DETAILS;

/**
 * assertCustomerServiceContactDetailsContent
 * Check customer service contact details content
 */
const assertCustomerServiceContactDetailsContent = () => {
  cy.checkText(customerServiceContactDetails.telephone(), `${TELEPHONE.PREFIX} ${TELEPHONE.VALUE}`);
  cy.checkText(customerServiceContactDetails.email(), `${EMAIL.PREFIX} ${EMAIL.VALUE}`);
  cy.checkText(customerServiceContactDetails.openingHours(), OPENING_TIMES);
  cy.checkLink(customerServiceContactDetails.callChargesLink(), CALL_CHARGES.HREF, CALL_CHARGES.TEXT);
};

export default assertCustomerServiceContactDetailsContent;
