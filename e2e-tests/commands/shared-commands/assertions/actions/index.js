import { ACTIONS } from '../../../../content-strings';
import { actions as actionSelectors } from '../../../../pages/shared';

const { ELIGIBILITY, CONTACT_APPROVED_BROKER } = ACTIONS;

/**
 * checkActionReadAboutEligibility
 * Check "read about eligibility" action content.
 */
export const checkActionReadAboutEligibility = () => {
  cy.checkText(
    actionSelectors.eligibility(),
    `${ELIGIBILITY.TEXT} ${ELIGIBILITY.LINK.TEXT}`,
  );

  cy.checkLink(
    actionSelectors.eligibilityLink(),
    ELIGIBILITY.LINK.HREF,
    ELIGIBILITY.LINK.TEXT,
  );
};

/**
 * checkActionContactApprovedBroker
 * Check "contact approved broker" action content.
 */
export const checkActionContactApprovedBroker = () => {
  cy.checkText(
    actionSelectors.approvedBroker(),
    `${CONTACT_APPROVED_BROKER.LINK.TEXT} ${CONTACT_APPROVED_BROKER.TEXT}`,
  );

  cy.checkLink(
    actionSelectors.approvedBrokerLink(),
    CONTACT_APPROVED_BROKER.LINK.HREF,
    CONTACT_APPROVED_BROKER.LINK.TEXT,
  );
};
