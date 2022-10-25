import { cannotApplyPage, yesRadio, noRadio, submitButton } from '../../../../pages/shared';
import partials from '../../../../partials';
import { PAGES } from '../../../../../../content-strings';
import CONSTANTS from '../../../../../../constants';
import { completeAndSubmitBuyerCountryForm } from '../../../../../support/forms';

const CONTENT_STRINGS = PAGES.QUOTE.CANNOT_OBTAIN_COVER;
const { ROUTES } = CONSTANTS;

context('Insurance - UK goods or services page - as an exporter, I want to check if my export value is eligible for UKEF export insurance cover - submit `no - UK goods/services is below the minimum`', () => {
  beforeEach(() => {
    cy.visit(ROUTES.INSURANCE.ELIGIBILITY.BUYER_COUNTRY, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });

    completeAndSubmitBuyerCountryForm();

    cy.url().should('include', ROUTES.INSURANCE.ELIGIBILITY.EXPORTER_LOCATION);

    yesRadio().click();
    submitButton().click();

    cy.url().should('include', ROUTES.INSURANCE.ELIGIBILITY.UK_GOODS_OR_SERVICES);

    noRadio().click();
    submitButton().click();
  });

  it('redirects to exit page', () => {
    const expectedUrl = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ELIGIBILITY.CANNOT_APPLY}`;

    cy.url().should('include', expectedUrl);
  });

  it('renders a back link with correct url', () => {
    partials.backLink().should('exist');

    const expectedUrl = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ELIGIBILITY.UK_GOODS_OR_SERVICES}`;

    partials.backLink().should('have.attr', 'href', expectedUrl);
  });

  it('renders a specific reason', () => {
    cannotApplyPage.reason().invoke('text').then((text) => {
      const expected = `${CONTENT_STRINGS.REASON.INTRO} ${CONTENT_STRINGS.REASON.NOT_ENOUGH_UK_GOODS_OR_SERVICES}`;

      expect(text.trim()).equal(expected);
    });
  });
});
