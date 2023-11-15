import { ACTIONS, LINKS } from '../../../../content-strings';
import { actions as actionSelectors } from '../../../../pages/shared';

const { ELIGIBILITY, CONTACT_APPROVED_BROKER, CONTACT_EFM } = ACTIONS;

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
 * checkActionReadAboutEligibilityLinkRedirect
 * Check "read about eligibility" action URL redirection
 */
export const checkActionReadAboutEligibilityLinkRedirect = () => {
  actionSelectors.eligibilityLink().click();

  cy.assertUrl(LINKS.EXTERNAL.GUIDANCE);
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

/**
 * checkActionTalkToYourNearestEFMLink
 * Check "talk to your nearest EFM" action content link.
 */
export const checkActionTalkToYourNearestEFMLink = () => {
  cy.checkLink(
    actionSelectors.contactEFMLink(),
    CONTACT_EFM.LINK.HREF,
    CONTACT_EFM.LINK.TEXT,
  );
};


/**
 * checkActionTalkToYourNearestEFM
 * Check "talk to your nearest EFM" action content.
 */
export const checkActionTalkToYourNearestEFM = () => {
  cy.checkText(
    actionSelectors.contactEFM(),
    `${CONTACT_EFM.LINK.TEXT} ${CONTACT_EFM.TEXT}`,
  );

  checkActionTalkToYourNearestEFMLink();
};
