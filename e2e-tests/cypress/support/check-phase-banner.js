import partials from '../e2e/partials';
import { LINKS } from '../../content-strings';

export default () => {
  cy.checkText(partials.phaseBanner.tag(), 'alpha');

  cy.checkText(partials.phaseBanner.text(), 'This is a new service - your feedback will help us to improve it.');

  cy.checkText(partials.phaseBanner.feedbackLink(), 'feedback');

  partials.phaseBanner.feedbackLink().should('have.attr', 'href', LINKS.EXTERNAL.FEEDBACK);
};
