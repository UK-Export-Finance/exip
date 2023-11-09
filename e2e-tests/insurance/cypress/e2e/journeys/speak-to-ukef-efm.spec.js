import { yesRadio, submitButton } from '../../../../pages/shared';
import { insurance } from '../../../../pages';
import { PAGES } from '../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import { completeAndSubmitBuyerCountryForm } from '../../../../commands/forms';

const CONTENT_STRINGS = PAGES.INSURANCE.SPEAK_TO_UKEF_EFM;
const { ACTIONS } = CONTENT_STRINGS;

const {
  START,
  ELIGIBILITY: { INSURED_PERIOD },
  SPEAK_TO_UKEF_EFM,
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - speak to UKEF EFM exit page', () => {
  beforeEach(() => {
    cy.navigateToUrl(START);

    cy.completeStartForm();
    cy.completeCheckIfEligibleForm();
    cy.completeExporterLocationForm();
    cy.completeCompaniesHouseNumberForm();
    cy.completeAndSubmitCompaniesHouseSearchForm({});
    cy.completeEligibilityCompanyDetailsForm();
    completeAndSubmitBuyerCountryForm();
    cy.completeAndSubmitTotalValueInsuredForm({});

    let expectedUrl = `${baseUrl}${INSURED_PERIOD}`;
    cy.assertUrl(expectedUrl);

    yesRadio().input().click();
    submitButton().click();

    expectedUrl = `${baseUrl}${SPEAK_TO_UKEF_EFM}`;

    cy.assertUrl(expectedUrl);
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: SPEAK_TO_UKEF_EFM,
      backLink: INSURED_PERIOD,
      assertSubmitButton: false,
      assertAuthenticatedHeader: false,
    });
  });

  it('renders `find your nearest EFM` copy with link', () => {
    const expectedText = `${ACTIONS.FIND_EFM[0][0].text} ${ACTIONS.FIND_EFM[0][1].text}${ACTIONS.FIND_EFM[0][2].text}`;
    cy.checkText(insurance.speakToUkefEfmPage.action.text(), expectedText);

    const expectedLinkText = `${ACTIONS.FIND_EFM[0][1].text}`;
    const expectedHref = ACTIONS.FIND_EFM[0][1].href;

    cy.checkLink(
      insurance.speakToUkefEfmPage.action.link(),
      expectedHref,
      expectedLinkText,
    );
  });
});
