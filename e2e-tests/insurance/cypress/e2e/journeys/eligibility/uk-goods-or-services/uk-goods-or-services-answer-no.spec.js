import { backLink, cannotApplyPage } from '../../../../../../pages/shared';
import { PAGES, LINKS } from '../../../../../../content-strings';
import { ROUTES } from '../../../../../../constants';

const CONTENT_STRINGS = PAGES.QUOTE.CANNOT_APPLY_EXIT;

const baseUrl = Cypress.config('baseUrl');

context(
  'Insurance - UK goods or services page - as an exporter, I want to check if my export value is eligible for UKEF credit insurance cover - submit `no - UK goods/services is below the minimum`',
  () => {
    beforeEach(() => {
      cy.completeAndSubmitEligibilityForms({ stopSubmittingAfter: 'coverPeriod' });

      cy.clickNoRadioInput();
      cy.clickSubmitButton();
    });

    beforeEach(() => {
      cy.saveSession();
    });

    it('redirects to exit page', () => {
      const expectedUrl = `${baseUrl}${ROUTES.INSURANCE.ELIGIBILITY.CANNOT_APPLY_EXIT}`;

      cy.assertUrl(expectedUrl);
    });

    it('renders a back link with correct url', () => {
      const expectedHref = `${baseUrl}${ROUTES.INSURANCE.ELIGIBILITY.UK_GOODS_OR_SERVICES}`;

      cy.checkLink(backLink(), expectedHref, LINKS.BACK);
    });

    it('renders a specific reason', () => {
      const expected = `${CONTENT_STRINGS.REASON.INTRO} ${CONTENT_STRINGS.REASON.NOT_ENOUGH_UK_GOODS_OR_SERVICES}`;
      cy.checkText(cannotApplyPage.reason(), expected);
    });

    describe('when going back to the page', () => {
      it('should NOT have the originally submitted answer selected', () => {
        cy.clickBackLink();

        cy.assertNoRadioOptionIsNotChecked();
      });
    });
  },
);
