import { countryInput, submitButton } from '../../../../pages/shared';
import { insurance } from '../../../../pages';
import { PAGES } from '../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import { FIELD_IDS } from '../../../../constants';
import { COUNTRY_APPLICATION_SUPPORT } from '../../../../fixtures/countries';

const CONTENT_STRINGS = PAGES.INSURANCE.APPLY_OFFLINE;
const { ACTIONS } = CONTENT_STRINGS;

const FIELD_ID = FIELD_IDS.ELIGIBILITY.BUYER_COUNTRY;

const {
  START,
  APPLY_OFFLINE,
  ELIGIBILITY: { BUYER_COUNTRY },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - apply offline exit page', () => {
  beforeEach(() => {
    cy.navigateToUrl(START);

    cy.completeStartForm();
    cy.completeCheckIfEligibleForm();
    cy.completeExporterLocationForm();
    cy.completeCompaniesHouseNumberForm();
    cy.completeAndSubmitCompaniesHouseSearchForm({});
    cy.completeEligibilityCompanyDetailsForm();

    cy.keyboardInput(countryInput.field(FIELD_ID).input(), COUNTRY_APPLICATION_SUPPORT.OFFLINE.NAME);

    const results = countryInput.field(FIELD_ID).results();
    results.first().click();

    submitButton().click();

    const expectedUrl = `${baseUrl}${APPLY_OFFLINE}`;

    cy.assertUrl(expectedUrl);
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: APPLY_OFFLINE,
      backLink: BUYER_COUNTRY,
      hasAForm: false,
      assertAuthenticatedHeader: false,
    });
  });

  it('renders `download form` copy with link', () => {
    const expected = `${ACTIONS.DOWNLOAD_FORM.LINK.TEXT} ${ACTIONS.DOWNLOAD_FORM.TEXT}`;
    cy.checkText(insurance.applyOfflinePage.downloadFormCopy(), expected);

    cy.checkLink(
      insurance.applyOfflinePage.downloadFormLink(),
      ACTIONS.DOWNLOAD_FORM.LINK.HREF_NBI,
      ACTIONS.DOWNLOAD_FORM.LINK.TEXT,
    );
  });

  it('renders `contact` copy with link', () => {
    const expectedContactCopy = `${ACTIONS.CONTACT.TEXT} ${ACTIONS.CONTACT.LINK.TEXT}`;

    cy.checkText(insurance.applyOfflinePage.contactCopy(), expectedContactCopy);

    const expectedLinkHref = ACTIONS.CONTACT.LINK.HREF;
    const expectedLinkText = ACTIONS.CONTACT.LINK.TEXT;

    cy.checkLink(
      insurance.applyOfflinePage.contactLink(),
      expectedLinkHref,
      expectedLinkText,
    );
  });
});
