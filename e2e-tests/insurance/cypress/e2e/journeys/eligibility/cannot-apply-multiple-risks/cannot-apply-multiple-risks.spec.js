import {
  intro,
  listItem,
  yesRadio,
} from '../../../../../../pages/shared';
import { PAGES } from '../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { completeAndSubmitBuyerCountryForm } from '../../../../../../commands/forms';

const CONTENT_STRINGS = PAGES.INSURANCE.ELIGIBILITY.CANNOT_APPLY_MULTIPLE_RISKS;

const {
  ACTIONS: { CONTACT_EFM },
} = CONTENT_STRINGS;

const {
  START,
  ELIGIBILITY: { END_BUYER, CANNOT_APPLY_MULTIPLE_RISKS },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Cannot apply - multiple risks page - as an exporter, I want to confirm if payment by the buyer of my export depends on payment from an end buyer, So that I can UKEF have clarity of my export transaction', () => {
  const url = `${baseUrl}${CANNOT_APPLY_MULTIPLE_RISKS}`;

  before(() => {
    cy.navigateToUrl(START);

    cy.completeStartForm();
    cy.completeCheckIfEligibleForm();
    cy.completeExporterLocationForm();
    cy.completeCompaniesHouseNumberForm();
    cy.completeAndSubmitCompaniesHouseSearchForm({});
    cy.completeEligibilityCompanyDetailsForm();
    completeAndSubmitBuyerCountryForm({});
    cy.completeAndSubmitTotalValueInsuredForm({});
    cy.completeCoverPeriodForm({});
    cy.completeUkGoodsAndServicesForm();

    yesRadio().input().click();
    cy.clickSubmitButton();

    cy.assertUrl(url);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: CANNOT_APPLY_MULTIPLE_RISKS,
      backLink: END_BUYER,
      assertAuthenticatedHeader: false,
      hasAForm: false,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('renders intro copy', () => {
      cy.checkText(intro(), CONTENT_STRINGS.INTRO);
    });

    it('renders list items', () => {
      cy.checkText(listItem(1), CONTENT_STRINGS.LIST[0]);
      cy.checkText(listItem(2), CONTENT_STRINGS.LIST[1]);
    });

    it('should render `talk to your nearest EFM` copy and link', () => {
      cy.checkActionTalkToYourNearestEFM({
        expectedText: `${CONTACT_EFM.LINK.TEXT} ${CONTACT_EFM.TEXT}`,
        expectedLinkHref: CONTACT_EFM.LINK.HREF,
        expectedLinkText: CONTACT_EFM.LINK.TEXT,
      });
    });
  });
});
