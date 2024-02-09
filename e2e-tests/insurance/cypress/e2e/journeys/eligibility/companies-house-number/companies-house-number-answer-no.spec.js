import { backLink } from '../../../../../../pages/shared';
import { LINKS } from '../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const {
  ELIGIBILITY: { COMPANIES_HOUSE_NUMBER, NO_COMPANIES_HOUSE_NUMBER },
  START,
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Eligibility - Companies house number page - I want to check if I can use online service to apply for UKEF Export Insurance Policy for my export transaction if I do not have UK Companies House Registration Number - submit `no companies house number`', () => {
  const url = `${baseUrl}${COMPANIES_HOUSE_NUMBER}`;

  before(() => {
    cy.navigateToUrl(START);

    cy.completeStartForm();
    cy.completeCheckIfEligibleForm();
    cy.completeExporterLocationForm();
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);

    cy.clickNoRadioInput();
    cy.clickSubmitButton();
  });

  it(`should redirect to ${NO_COMPANIES_HOUSE_NUMBER} exit page`, () => {
    const expectedUrl = `${baseUrl}${NO_COMPANIES_HOUSE_NUMBER}`;

    cy.assertUrl(expectedUrl);
  });

  it('should render a back link with correct url', () => {
    const expectedHref = `${baseUrl}${COMPANIES_HOUSE_NUMBER}`;

    cy.checkLink(
      backLink(),
      expectedHref,
      LINKS.BACK,
    );
  });

  describe('when going back to the page', () => {
    it('should NOT have the originally submitted answer selected', () => {
      cy.navigateToUrl(url);

      cy.clickBackLink();

      cy.assertNoRadioOptionIsNotChecked();
    });
  });
});
