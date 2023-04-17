import partials from '../e2e/partials';
import { LINKS, PHASE_BANNER } from '../../content-strings';
import { INSURANCE_ROUTES } from '../../constants/routes/insurance';

const { PREFIX, LINK_TEXT, SUFFIX } = PHASE_BANNER;

export default (isInsurancePage) => {
  cy.checkText(partials.phaseBanner.tag(), 'alpha');

  cy.checkText(partials.phaseBanner.text(), `${PREFIX} ${LINK_TEXT} ${SUFFIX}`);

  cy.checkText(partials.phaseBanner.feedbackLink(), LINK_TEXT);

  let route = LINKS.EXTERNAL.FEEDBACK;

  if (isInsurancePage) {
    route = INSURANCE_ROUTES.FEEDBACK;
  }
  partials.phaseBanner.feedbackLink().should('have.attr', 'href', route);
};
