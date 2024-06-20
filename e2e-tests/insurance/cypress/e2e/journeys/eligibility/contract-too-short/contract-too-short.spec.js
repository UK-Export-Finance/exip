import { actions } from '../../../../../../pages/shared';
import { contractTooShort } from '../../../../../../pages/insurance/eligibility';
import { PAGES } from '../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const CONTENT_STRINGS = PAGES.INSURANCE.ELIGIBILITY.CONTRACT_TOO_SHORT;

const { CONTACT_EFM } = CONTENT_STRINGS;

const {
  ELIGIBILITY: { CONTRACT_TOO_SHORT },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Eligibility - Contract too short page', () => {
  const url = `${baseUrl}${CONTRACT_TOO_SHORT}`;

  before(() => {
    cy.navigateToUrl(url);
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      backLink: `${CONTRACT_TOO_SHORT}#`,
      currentHref: CONTRACT_TOO_SHORT,
      assertAuthenticatedHeader: false,
      hasAForm: false,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.saveSession();

      cy.navigateToUrl(url);
    });

    it('should render an intro copy', () => {
      cy.checkIntroText(CONTENT_STRINGS.INTRO);
    });

    it('should render the "can still apply" copy', () => {
      cy.checkText(contractTooShort.canStillApply(), CONTENT_STRINGS.CAN_STILL_APPLY);
    });

    it('should render the `CONTACT EFM` intro', () => {
      cy.checkText(actions.intro(), CONTACT_EFM.INTRO);
    });

    it('should render the `CONTACT EFM` link and text', () => {
      cy.checkActionTalkToYourNearestEFM({
        expectedText: `${CONTACT_EFM.LINK.TEXT} ${CONTACT_EFM.TEXT}`,
        expectedLinkHref: CONTACT_EFM.LINK.HREF,
        expectedLinkText: CONTACT_EFM.LINK.TEXT,
      });
    });
  });
});
