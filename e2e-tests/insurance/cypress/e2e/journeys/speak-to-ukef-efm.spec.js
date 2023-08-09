import { yesRadio, submitButton } from '../../../../pages/shared';
import { insurance } from '../../../../pages';
import { PAGES } from '../../../../content-strings';
import { ROUTES } from '../../../../constants';
import {
  completeStartForm,
  completeCheckIfEligibleForm,
  completeExporterLocationForm,
  completeUkGoodsAndServicesForm,
  completeInsuredAmountForm,
} from '../../../../commands/insurance/eligibility/forms';
import { completeAndSubmitBuyerCountryForm } from '../../../../commands/forms';

const CONTENT_STRINGS = PAGES.INSURANCE.SPEAK_TO_UKEF_EFM;
const { ACTIONS } = CONTENT_STRINGS;

context('Insurance - speak to UKEF EFM exit page', () => {
  beforeEach(() => {
    cy.navigateToUrl(ROUTES.INSURANCE.START);

    completeStartForm();
    completeCheckIfEligibleForm();
    completeAndSubmitBuyerCountryForm();
    completeExporterLocationForm();
    completeUkGoodsAndServicesForm();
    completeInsuredAmountForm();

    cy.url().should('include', ROUTES.INSURANCE.ELIGIBILITY.INSURED_PERIOD);

    yesRadio().click();
    submitButton().click();

    cy.url().should('include', ROUTES.INSURANCE.SPEAK_TO_UKEF_EFM);
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: ROUTES.INSURANCE.SPEAK_TO_UKEF_EFM,
      backLink: ROUTES.INSURANCE.ELIGIBILITY.INSURED_PERIOD,
      assertSubmitButton: false,
      assertAuthenticatedHeader: false,
    });
  });

  it('renders `find your nearest EFM` copy with link', () => {
    const expectedText = `${ACTIONS.FIND_EFM[0][0].text} ${ACTIONS.FIND_EFM[0][1].text}${ACTIONS.FIND_EFM[0][2].text}`;
    cy.checkText(insurance.speakToUkefEfmPage.action.text(), expectedText);

    const expectedLink = `${ACTIONS.FIND_EFM[0][1].text}`;
    cy.checkText(insurance.speakToUkefEfmPage.action.link(), expectedLink);

    const expectedHref = ACTIONS.FIND_EFM[0][1].href;

    insurance.speakToUkefEfmPage.action.link().should('have.attr', 'href', expectedHref);
  });
});
