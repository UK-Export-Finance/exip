import { actions } from '../../../../../../pages/shared';
import { PAGES } from '../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const CONTENT_STRINGS = PAGES.INSURANCE.ELIGIBILITY.TALK_TO_AN_EXPORT_FINANCE_MANAGER_EXIT;

const { CONTACT_EFM } = CONTENT_STRINGS;

const {
  ELIGIBILITY: { TALK_TO_AN_EXPORT_FINANCE_MANAGER_EXIT },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Eligibility - Talk to an export finance manager page', () => {
  const url = `${baseUrl}${TALK_TO_AN_EXPORT_FINANCE_MANAGER_EXIT}`;

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
      backLink: `${TALK_TO_AN_EXPORT_FINANCE_MANAGER_EXIT}#`,
      currentHref: TALK_TO_AN_EXPORT_FINANCE_MANAGER_EXIT,
      assertAuthenticatedHeader: false,
      assertSaveAndBackButtonDoesNotExist: true,
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
