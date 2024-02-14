import {
  backLink, cannotApplyPage, yesRadio, yesRadioInput, submitButton,
} from '../../../../../../pages/shared';
import { PAGES, LINKS } from '../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { completeAndSubmitBuyerCountryForm } from '../../../../../../commands/forms';
import {
  completeStartForm,
  completeCheckIfEligibleForm,
  completeExporterLocationForm,
  completeUkGoodsAndServicesForm,
  completeInsuredAmountForm,
  completeInsuredPeriodForm,
} from '../../../../../../commands/insurance/eligibility/forms';

const CONTENT_STRINGS = PAGES.INSURANCE.APPLY_OFFLINE;

const {
  ELIGIBILITY: { OTHER_PARTIES_INVOLVED },
  START,
  APPLY_OFFLINE,
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Insured amount page - I want to check if I can use online service to apply for UKEF Export Insurance Policy for my export transaction that is less than the maximum amount of cover available online - submit `cover over max amount`', () => {
  const url = `${baseUrl}${OTHER_PARTIES_INVOLVED}`;

  before(() => {
    cy.navigateToUrl(START);

    completeStartForm();
    completeCheckIfEligibleForm();
    completeAndSubmitBuyerCountryForm();
    completeExporterLocationForm();
    completeUkGoodsAndServicesForm();
    completeInsuredAmountForm();
    completeInsuredPeriodForm();
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);

    yesRadio().label().click();
    submitButton().click();
  });

  it('redirects to exit page', () => {
    const expectedUrl = `${baseUrl}${APPLY_OFFLINE}`;

    cy.assertUrl(expectedUrl);
  });

  it('renders a back link with correct url', () => {
    const expectedHref = `${baseUrl}${OTHER_PARTIES_INVOLVED}`;

    cy.checkLink(
      backLink(),
      expectedHref,
      LINKS.BACK,
    );
  });

  it('renders a specific reason', () => {
    const expected = `${CONTENT_STRINGS.REASON.INTRO} ${CONTENT_STRINGS.REASON.OTHER_PARTIES_INVOLVED}`;
    cy.checkText(cannotApplyPage.reason(), expected);
  });

  describe('when going back to the page', () => {
    it('should NOT have the originally submitted answer selected', () => {
      cy.clickBackLink();

      yesRadioInput().should('not.be.checked');
    });
  });
});
