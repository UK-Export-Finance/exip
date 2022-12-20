import {
  cannotApplyPage, yesRadio, yesRadioInput, submitButton,
} from '../../../../pages/shared';
import partials from '../../../../partials';
import { PAGES } from '../../../../../../content-strings';
import { ROUTES } from '../../../../../../constants';
import { completeAndSubmitBuyerCountryForm } from '../../../../../support/forms';
import {
  completeStartForm,
  completeCheckIfEligibleForm,
  completeExporterLocationForm,
  completeUkGoodsAndServicesForm,
  completeInsuredAmountForm,
  completeInsuredPeriodForm,
} from '../../../../../support/insurance/eligibility/forms';

const CONTENT_STRINGS = PAGES.INSURANCE.APPLY_OFFLINE;

context('Insurance - Insured amount page - I want to check if I can use online service to apply for UKEF Export Insurance Policy for my export transaction that is less than the maxium amount of cover available online - submit `cover over max amount`', () => {
  before(() => {
    cy.visit(ROUTES.INSURANCE.START, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });

    completeStartForm();
    completeCheckIfEligibleForm();
    completeAndSubmitBuyerCountryForm();
    completeExporterLocationForm();
    completeUkGoodsAndServicesForm();
    completeInsuredAmountForm();
    completeInsuredPeriodForm();

    yesRadio().click();
    submitButton().click();
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  it('redirects to exit page', () => {
    cy.url().should('include', ROUTES.INSURANCE.APPLY_OFFLINE);
  });

  it('renders a back link with correct url', () => {
    partials.backLink().should('exist');

    const expectedUrl = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ELIGIBILITY.OTHER_PARTIES_INVOLVED}`;

    partials.backLink().should('have.attr', 'href', expectedUrl);
  });

  it('renders a specific reason', () => {
    cannotApplyPage.reason().invoke('text').then((text) => {
      const expected = `${CONTENT_STRINGS.REASON.INTRO} ${CONTENT_STRINGS.REASON.OTHER_PARTIES_INVOLVED}`;

      expect(text.trim()).equal(expected);
    });
  });

  describe('when going back to the page', () => {
    it('should NOT have the originally submitted answer selected', () => {
      partials.backLink().click();

      yesRadioInput().should('not.be.checked');
    });
  });
});
