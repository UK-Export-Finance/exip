import { submitButton } from '../../../pages/shared';
import {
  tellUsAboutYourPolicyPage,
  checkYourAnswersPage,
} from '../../../pages/quote';
import partials from '../../../partials';
import { FIELD_IDS, ROUTES } from '../../../../../constants';

const { CREDIT_PERIOD } = FIELD_IDS;

context('Change your answers (policy fields) - as an exporter, I want to change the details before submitting the proposal', () => {
  before(() => {
    cy.login();
    cy.submitAnswersHappyPathMultiPolicy();
    cy.url().should('include', ROUTES.QUOTE.CHECK_YOUR_ANSWERS);
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  describe('change `Credit period`', () => {
    let row = checkYourAnswersPage.summaryLists.policy[CREDIT_PERIOD];

    it(`clicking 'change' redirects to ${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY_CHANGE}`, () => {
      row.changeLink().click();

      const expectedUrl = ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY_CHANGE;
      cy.url().should('include', expectedUrl);
    });

    it('has a hash tag and label ID in the URL so that the element gains focus and user has context of what they want to change', () => {
      const expected = `${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY_CHANGE}#${CREDIT_PERIOD}-label`;
      cy.url().should('include', expected);
    });

    it('renders a back link with correct url', () => {
      partials.backLink().should('exist');

      const expected = `${Cypress.config('baseUrl')}${ROUTES.QUOTE.CHECK_YOUR_ANSWERS}`;
      partials.backLink().should('have.attr', 'href', expected);
    });

    it('has originally submitted answer', () => {
      const firstOption = tellUsAboutYourPolicyPage[CREDIT_PERIOD].inputOption().eq(0);
      firstOption.should('have.attr', 'selected', 'selected');

      const secondOption = tellUsAboutYourPolicyPage[CREDIT_PERIOD].inputOption().eq(1);
      secondOption.should('not.have.attr', 'selected');
    });

    it(`redirects to ${ROUTES.QUOTE.CHECK_YOUR_ANSWERS} when submitting a new answer`, () => {
      tellUsAboutYourPolicyPage[CREDIT_PERIOD].input().select('2');
      submitButton().click();

      cy.url().should('include', ROUTES.QUOTE.CHECK_YOUR_ANSWERS);
    });

    it('renders the new answer in `Check your answers` page', () => {
      row = checkYourAnswersPage.summaryLists.policy[CREDIT_PERIOD];

      row.value().invoke('text').then((text) => {
        const expected = '2 months';

        expect(text.trim()).equal(expected);
      });
    });
  });
});
