import { actions } from '../../../../../pages/shared';
import { PAGES } from '../../../../../content-strings';
import { ROUTES } from '../../../../../constants/routes';
import { COUNTRY_QUOTE_SUPPORT } from '../../../../../fixtures/countries';

const CONTENT_STRINGS = PAGES.TALK_TO_AN_EXPORT_FINANCE_MANAGER_EXIT;

const { CONTACT_EFM } = CONTENT_STRINGS;

const {
  QUOTE: { BUYER_COUNTRY, TALK_TO_AN_EXPORT_FINANCE_MANAGER_EXIT },
} = ROUTES;

const COUNTRY_NAME = COUNTRY_QUOTE_SUPPORT.NO_ONLINE_SUPPORT_1.NAME;

const baseUrl = Cypress.config('baseUrl');

context('Talk to an export finance manager exit page', () => {
  const url = `${baseUrl}${TALK_TO_AN_EXPORT_FINANCE_MANAGER_EXIT}`;

  beforeEach(() => {
    cy.navigateToRootUrl();
    cy.completeAndSubmitBuyerCountryForm({ countryName: COUNTRY_NAME });

    cy.assertUrl(url);
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      backLink: BUYER_COUNTRY,
      currentHref: TALK_TO_AN_EXPORT_FINANCE_MANAGER_EXIT,
      hasAForm: false,
      assertAuthenticatedHeader: false,
      isInsurancePage: false,
      assertSaveAndBackButtonDoesNotExist: true,
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
