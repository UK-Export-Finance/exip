import partials from '../e2e/partials';
import { LINKS } from '../../content-strings';
import { INSURANCE_ROUTES } from '../../constants/routes/insurance';

export default (isInsurancePage) => {
  cy.checkText(partials.phaseBanner.tag(), 'alpha');

  cy.checkText(partials.phaseBanner.text(), 'This is a new service - your feedback will help us to improve it.');

  cy.checkText(partials.phaseBanner.feedbackLink(), 'feedback');

  let route = LINKS.EXTERNAL.FEEDBACK;

  if (isInsurancePage) {
    route = INSURANCE_ROUTES.FEEDBACK;
  }
  partials.phaseBanner.feedbackLink().should('have.attr', 'href', route);
};
