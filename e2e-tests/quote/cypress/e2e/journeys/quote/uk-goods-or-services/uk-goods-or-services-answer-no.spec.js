import { backLink, cannotApplyPage } from '../../../../../../pages/shared';
import { PAGES, LINKS } from '../../../../../../content-strings';
import { ROUTES } from '../../../../../../constants';

const CONTENT_STRINGS = PAGES.QUOTE.CANNOT_APPLY_EXIT;

const {
  QUOTE: { UK_GOODS_OR_SERVICES, CANNOT_APPLY_EXIT },
} = ROUTES;

const baseUrl = Cypress.config('baseUrl');

context(
  'UK goods or services page - as an exporter, I want to check if my export value is eligible for UKEF credit insurance cover - submit `no - UK goods/services is below the minimum`',
  () => {
    const url = `${baseUrl}${UK_GOODS_OR_SERVICES}`;

    beforeEach(() => {
      cy.navigateToRootUrl();
      cy.completeAndSubmitBuyerCountryForm({});
      cy.completeAndSubmitBuyerBodyForm();
      cy.completeAndSubmitExporterLocationForm();

      cy.assertUrl(url);

      cy.clickNoRadioInput();
      cy.clickSubmitButton();
    });

    it('redirects to exit page', () => {
      const expectedUrl = `${baseUrl}${CANNOT_APPLY_EXIT}`;

      cy.assertUrl(expectedUrl);
    });

    it('renders a back link with correct url', () => {
      const expectedHref = UK_GOODS_OR_SERVICES;

      cy.checkLink(backLink(), expectedHref, LINKS.BACK);
    });

    it('renders a specific reason', () => {
      const expected = `${CONTENT_STRINGS.REASON.INTRO} ${CONTENT_STRINGS.REASON.NOT_ENOUGH_UK_GOODS_OR_SERVICES}`;
      cy.checkText(cannotApplyPage.reason(), expected);
    });
  },
);
