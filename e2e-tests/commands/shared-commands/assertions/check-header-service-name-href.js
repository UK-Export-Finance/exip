import { PRODUCT } from '../../../content-strings';
import header from '../../../partials/header';
import { ROUTES } from '../../../constants';

const { ROOT: quoteStart } = ROUTES;
const { START: insuranceStart } = ROUTES.INSURANCE;

/**
 * checks service name based on if isInsuranceRoute is true or false
 * If true, then header should be linked to insuranceStart and have the application content string
 * @param {Boolean} isInsurancePage - If page is an insurance page or otherwise
 */
const checkHeaderServiceNameHref = ({ isInsurancePage }) => {
  if (isInsurancePage) {
    cy.checkLink(header.serviceName(), insuranceStart, PRODUCT.DESCRIPTION.APPLICATION);
  } else {
    cy.checkLink(header.serviceName(), quoteStart, PRODUCT.DESCRIPTION.QUOTE);
  }
};

export default checkHeaderServiceNameHref;
