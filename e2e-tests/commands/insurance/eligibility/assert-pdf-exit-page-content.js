import { PDF_EXIT } from '../../../content-strings/pages/insurance/eligibility';

const {
  ACTIONS: { PDF_FORM, CONTACT_EFM, CONTACT_UKEF_TEAM },
} = PDF_EXIT;

/**
 * asserts 'apply through PDF copy and link' section on PDF exit page
 * @param {object} contentStrings: content strings for PDF_FORM
 */
export const assertApplyThroughPDFCopyAndLink = ({ contentStrings = PDF_FORM }) =>
  cy.checkActionApplyThroughPDF({
    expectedText: `${contentStrings.INTRO} ${contentStrings.LINK.TEXT}.`,
    expectedLinkHref: contentStrings.LINK.HREF,
    expectedLinkText: contentStrings.LINK.TEXT,
  });

/**
 * asserts 'talk to EFM' section on PDF exit page
 * @param {object} contentStrings: content strings for CONTACT_EFM
 */
export const assertTalkToEFMCopyAndLink = ({ contentStrings = CONTACT_EFM }) =>
  cy.checkActionTalkToYourNearestEFM({
    expectedText: `${contentStrings.INTRO} ${contentStrings.LINK.TEXT}`,
    expectedLinkHref: contentStrings.LINK.HREF,
    expectedLinkText: contentStrings.LINK.TEXT,
  });

/**
 * asserts 'contact UKEF' section on PDF exit page
 * @param {object} contentStrings: content strings for CONTACT_UKEF_TEAM
 */
export const assertContactUkefTeam = ({ contentStrings = CONTACT_UKEF_TEAM }) =>
  cy.checkActionContactUKEFTeam({
    expectedText: contentStrings,
  });
