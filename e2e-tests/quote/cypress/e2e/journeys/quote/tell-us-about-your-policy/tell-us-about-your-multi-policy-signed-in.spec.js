import { PAGES } from '../../../../../../content-strings';
import { ROUTES } from '../../../../../../constants';

const CONTENT_STRINGS = PAGES.QUOTE.TELL_US_ABOUT_YOUR_POLICY;

const {
  QUOTE: { TELL_US_ABOUT_YOUR_POLICY, POLICY_TYPE },
} = ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Tell us about your multiple policy page - Signed in', () => {
  const url = `${baseUrl}${TELL_US_ABOUT_YOUR_POLICY}`;

  before(() => {
    cy.completeSignInAndGoToApplication({ createApplicationViaApi: false });
    cy.navigateToRootUrl();

    cy.completeAndSubmitBuyerCountryForm({});
    cy.completeAndSubmitBuyerBodyForm();
    cy.completeAndSubmitExporterLocationForm();
    cy.completeAndSubmitUkContentForm();
    cy.completeAndSubmitPolicyTypeMultiForm();

    cy.assertUrl(url);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.MULTIPLE_POLICY_PAGE_TITLE,
      currentHref: TELL_US_ABOUT_YOUR_POLICY,
      backLink: POLICY_TYPE,
      assertAuthenticatedHeader: true,
      isInsurancePage: false,
      assertSaveAndBackButtonDoesNotExist: true,
      lightHouseThresholds: {
        // accessibility threshold is reduced here because
        // the radio component from design system has an invalid aria attribute.
        // this is out of our control
        accessibility: 92,
      },
    });
  });
});
