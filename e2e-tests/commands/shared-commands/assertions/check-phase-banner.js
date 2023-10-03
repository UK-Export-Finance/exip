import partials from '../../../partials';
import { LINKS, PHASE_BANNER } from '../../../content-strings';
import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';

const { PREFIX, LINK_TEXT, SUFFIX } = PHASE_BANNER;

/**
 * checkPhaseBanner
 * checks phasebanner text, link based on if insurancePage or not
 * @param {Boolean} isInsurancePage - If page is an insurance page or otherwise
 */
const checkPhaseBanner = ({ isInsurancePage }) => {
  cy.checkText(partials.phaseBanner.tag(), 'alpha');

  cy.checkText(partials.phaseBanner.text(), `${PREFIX} ${LINK_TEXT} ${SUFFIX}`);

  let route = LINKS.EXTERNAL.FEEDBACK;

  if (isInsurancePage) {
    route = INSURANCE_ROUTES.FEEDBACK;
  }

  cy.checkLink(partials.phaseBanner.feedbackLink(), route, LINK_TEXT);
};

export default checkPhaseBanner;
