import { cannotApplyPage, noRadio, submitButton } from '../../../pages/shared';
import partials from '../../../partials';
import { PAGES } from '../../../../../content-strings';
import CONSTANTS from '../../../../../constants';
import { completeAndSubmitBuyerCountryForm } from '../../../../support/forms';
import { completeAndSubmitBuyerBodyForm, completeAndSubmitExporterLocationForm } from '../../../../support/quote/forms';

const CONTENT_STRINGS = PAGES.QUOTE.CANNOT_APPLY;
const { ROUTES } = CONSTANTS;

context('UK goods or services page - as an exporter, I want to check if my export value is eligible for UKEF export insurance cover - submit `no - UK goods/services is below the minimum`', () => {
  beforeEach(() => {
    cy.login();
    completeAndSubmitBuyerCountryForm();
    completeAndSubmitBuyerBodyForm();
    completeAndSubmitExporterLocationForm();

    cy.url().should('include', ROUTES.QUOTE.UK_GOODS_OR_SERVICES);

    noRadio().click();
    submitButton().click();
  });

  it('redirects to exit page', () => {
    cy.url().should('include', ROUTES.QUOTE.CANNOT_APPLY);
  });

  it('renders a back link with correct url', () => {
    partials.backLink().should('exist');

    partials.backLink().should('have.attr', 'href', ROUTES.QUOTE.UK_GOODS_OR_SERVICES);
  });

  it('renders a specific reason', () => {
    cannotApplyPage.reason().invoke('text').then((text) => {
      const expected = `${CONTENT_STRINGS.REASON.INTRO} ${CONTENT_STRINGS.REASON.NOT_ENOUGH_UK_GOODS_OR_SERVICES}`;

      expect(text.trim()).equal(expected);
    });
  });
});
