/**
 * asserts 'apply through PDF copy and link' section on PDF exit page
 * @param {object} PDF_FORM: content strings for PDF_FORM
 */
export const assertApplyThroughPDFCopyAndLink = (PDF_FORM) =>
  cy.checkActionApplyThroughPDF({
    expectedText: `${PDF_FORM.INTRO} ${PDF_FORM.LINK.TEXT}.`,
    expectedLinkHref: PDF_FORM.LINK.HREF,
    expectedLinkText: PDF_FORM.LINK.TEXT,
  });

/**
 * asserts 'talk to EFM' section on PDF exit page
 * @param {object} CONTACT_EFM: content strings for CONTACT_EFM
 */
export const assertTalkToEFMCopyAndLink = (CONTACT_EFM) =>
  cy.checkActionTalkToYourNearestEFM({
    expectedText: `${CONTACT_EFM.INTRO} ${CONTACT_EFM.LINK.TEXT}`,
    expectedLinkHref: CONTACT_EFM.LINK.HREF,
    expectedLinkText: CONTACT_EFM.LINK.TEXT,
  });

/**
 * asserts 'contact UKEF' section on PDF exit page
 * @param {object} CONTACT_UKEF_TEAM: content strings for CONTACT_UKEF_TEAM
 */
export const assertContactUkefTeam = (CONTACT_UKEF_TEAM) =>
  cy.checkActionContactUKEFTeam({
    expectedText: CONTACT_UKEF_TEAM,
  });
