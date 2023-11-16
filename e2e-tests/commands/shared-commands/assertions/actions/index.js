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
 * @param {String} Expected link href
 * @param {String} Expected link text
 */
export const checkActionTalkToYourNearestEFMLink = ({
  expectedHref,
  expectedText,
}) => {
  cy.checkLink(
    actionSelectors.contactEFMLink(),
    expectedHref || CONTACT_EFM.LINK.HREF,
    expectedText || CONTACT_EFM.LINK.TEXT,
  );
};

/**
 * checkActionTalkToYourNearestEFM
 * Check "talk to your nearest EFM" action content.
 * @param {String} Expected text
 * @param {String} Expected link href
 * @param {String} Expected link text
 */
export const checkActionTalkToYourNearestEFM = ({
  expectedText,
  expectedLinkHref,
  expectedLinkText,
}) => {
  const textAssertion = expectedText || `${CONTACT_EFM.LINK.TEXT} ${CONTACT_EFM.TEXT}`;

  cy.checkText(
    actionSelectors.contactEFM(),
    textAssertion,
  );

  checkActionTalkToYourNearestEFMLink({
    expectedHref: expectedLinkHref,
    expectedText: expectedLinkText,
  });
};
