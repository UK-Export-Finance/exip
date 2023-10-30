import { noCompaniesHouseNumberPage } from '../../../../../../pages/insurance/eligibility';
import { PAGES } from '../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const CONTENT_STRINGS = PAGES.INSURANCE.ELIGIBILITY.NO_COMPANIES_HOUSE_NUMBER;

const { ACTIONS } = CONTENT_STRINGS;

const {
  ELIGIBILITY: { NO_COMPANIES_HOUSE_NUMBER },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Eligibility - You cannot apply for credit insurance page (no companies house number)', () => {
  const url = `${baseUrl}${NO_COMPANIES_HOUSE_NUMBER}`;

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
      currentHref: NO_COMPANIES_HOUSE_NUMBER,
      assertBackLink: false,
      assertAuthenticatedHeader: false,
      assertSubmitButton: false,
    });
  });

  it('should render body copy', () => {
    cy.checkText(
      noCompaniesHouseNumberPage.body(),
      CONTENT_STRINGS.BODY,
    );
  });

  describe('actions', () => {
    it('should render `update company details` copy and link', () => {
      cy.checkText(
        noCompaniesHouseNumberPage.actions.updateCompanyDetails(),
        `${ACTIONS.UPDATE_COMPANY_DETAILS.TEXT} ${ACTIONS.UPDATE_COMPANY_DETAILS.LINK.TEXT}`,
      );

      cy.checkLink(
        noCompaniesHouseNumberPage.actions.updateCompanyDetailsLink(),
        ACTIONS.UPDATE_COMPANY_DETAILS.LINK.HREF,
        ACTIONS.UPDATE_COMPANY_DETAILS.LINK.TEXT,
      );
    });

    it('should render `eligibility` copy and link', () => {
      cy.checkText(
        noCompaniesHouseNumberPage.actions.eligibility(),
        `${ACTIONS.ELIGIBILITY.TEXT} ${ACTIONS.ELIGIBILITY.LINK.TEXT}`,
      );

      cy.checkLink(
        noCompaniesHouseNumberPage.actions.eligibilityLink(),
        ACTIONS.ELIGIBILITY.LINK.HREF,
        ACTIONS.ELIGIBILITY.LINK.TEXT,
      );
    });

    it('should render `contact an approved broker` copy and link', () => {
      cy.checkText(
        noCompaniesHouseNumberPage.actions.approvedBroker(),
        `${ACTIONS.CONTACT_APPROVED_BROKER.LINK.TEXT} ${ACTIONS.CONTACT_APPROVED_BROKER.TEXT}`,
      );

      cy.checkLink(
        noCompaniesHouseNumberPage.actions.approvedBrokerLink(),
        ACTIONS.CONTACT_APPROVED_BROKER.LINK.HREF,
        ACTIONS.CONTACT_APPROVED_BROKER.LINK.TEXT,
      );
    });

    it('should render `talk to your nearest EFM` copy and link', () => {
      cy.checkText(
        noCompaniesHouseNumberPage.actions.contactEFM(),
        `${ACTIONS.CONTACT_EFM.LINK.TEXT} ${ACTIONS.CONTACT_EFM.TEXT}`,
      );

      cy.checkLink(
        noCompaniesHouseNumberPage.actions.contactEFMLink(),
        ACTIONS.CONTACT_EFM.LINK.HREF,
        ACTIONS.CONTACT_EFM.LINK.TEXT,
      );
    });
  });
});
