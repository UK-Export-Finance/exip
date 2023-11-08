import {
  actions,
  countryInput,
  cannotApplyPage,
  submitButton,
} from '../../../../../pages/shared';
import { PAGES, LINKS } from '../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';
import { FIELD_IDS } from '../../../../../constants';

const CONTENT_STRINGS = PAGES.CANNOT_APPLY;

const {
  START,
  ELIGIBILITY: { BUYER_COUNTRY, CANNOT_APPLY },
} = INSURANCE_ROUTES;

const FIELD_ID = FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY;

const COUNTRY_NAME_UNSUPPORTED = 'France';

const baseUrl = Cypress.config('baseUrl');

context('Insurance Eligibility - Cannot apply exit page', () => {
  beforeEach(() => {
    cy.navigateToUrl(START);

    cy.completeStartForm();
    cy.completeCheckIfEligibleForm();
    cy.completeExporterLocationForm();
    cy.completeCompaniesHouseNumberForm();
    cy.completeAndSubmitCompaniesHouseSearchForm({});
    cy.completeEligibilityCompanyDetailsForm();

    cy.keyboardInput(countryInput.field(FIELD_ID).input(), COUNTRY_NAME_UNSUPPORTED);
    const results = countryInput.field(FIELD_ID).results();
    results.first().click();

    submitButton().click();

    const expectedUrl = `${baseUrl}${CANNOT_APPLY}`;

    cy.assertUrl(expectedUrl);
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: CANNOT_APPLY,
      backLink: BUYER_COUNTRY,
      assertSubmitButton: false,
      assertAuthenticatedHeader: false,
    });
  });

  it('renders a reason', () => {
    cannotApplyPage.reason().should('exist');
  });

  describe('actions', () => {
    it('should render `eligibility` copy and link', () => {
      cy.checkActionReadAboutEligibility();
    });

    it('should render `contact an approved broker` copy and link', () => {
      cy.checkActionContactApprovedBroker();
    });
  });

  describe('when clicking `eligibility` link', () => {
    it(`should redirect to ${LINKS.EXTERNAL.GUIDANCE}`, () => {
      actions.eligibilityLink().click();

      cy.assertUrl(LINKS.EXTERNAL.GUIDANCE);
    });
  });
});
