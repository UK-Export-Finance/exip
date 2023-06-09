import { completeAndSubmitBuyerCountryForm } from '../../../../support/forms';
import {
  completeAndSubmitBuyerBodyForm,
  completeAndSubmitExporterLocationForm,
  completeAndSubmitUkContentForm,
  completeAndSubmitPolicyTypeMultiForm,
} from '../../../../support/quote/forms';
import { PAGES } from '../../../../../content-strings';
import { ROUTES } from '../../../../../constants';

const CONTENT_STRINGS = PAGES.QUOTE.TELL_US_ABOUT_YOUR_POLICY;

context('Tell us about your multiple policy page - Signed in', () => {
  const url = ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY;

  before(() => {
    cy.completeSignInAndGoToApplication();
    cy.login()

    completeAndSubmitBuyerCountryForm();
    completeAndSubmitBuyerBodyForm();
    completeAndSubmitExporterLocationForm();
    completeAndSubmitUkContentForm();
    completeAndSubmitPolicyTypeMultiForm();

    cy.url().should('include', url);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.MULTIPLE_POLICY_PAGE_TITLE,
      currentHref: ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY,
      backLink: ROUTES.QUOTE.POLICY_TYPE,
      assertAuthenticatedHeader: true,
      isInsurancePage: false,
      lightHouseThresholds: {
        // accessibility threshold is reduced here because
        // the radio component from design system has an invalid aria attribute.
        // this is out of our control
        accessibility: 92,
      },
    });
  });
});
