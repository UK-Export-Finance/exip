import {
  yesRadio, yesRadioInput, noRadio, inlineErrorMessage, submitButton,
} from '../../../pages/shared';
import partials from '../../../partials';
import { PAGES, ERROR_MESSAGES } from '../../../../../content-strings';
import { ROUTES, FIELD_IDS, FIELD_VALUES } from '../../../../../constants';
import { completeAndSubmitBuyerCountryForm } from '../../../../support/forms';
import { completeAndSubmitBuyerBodyForm, completeAndSubmitExporterLocationForm } from '../../../../support/quote/forms';
import { checkDescriptionSummaryText, checkDescriptionSummaryClickRevealsContent, checkDescriptionContent } from '../../../../support/check-uk-goods-and-services-description';

const CONTENT_STRINGS = {
  ...PAGES.UK_GOODS_OR_SERVICES,
  ...PAGES.QUOTE.UK_GOODS_OR_SERVICES,
};

const startRoute = ROUTES.QUOTE.START;

context('UK goods or services page - as an exporter, I want to check if my export value is eligible for UKEF export insurance cover', () => {
  const url = ROUTES.QUOTE.UK_GOODS_OR_SERVICES;

  before(() => {
    cy.login();
    completeAndSubmitBuyerCountryForm();
    completeAndSubmitBuyerBodyForm();
    completeAndSubmitExporterLocationForm();

    cy.url().should('include', url);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: ROUTES.QUOTE.UK_GOODS_OR_SERVICES,
      backLink: ROUTES.QUOTE.EXPORTER_LOCATION,
      assertAuthenticatedHeader: false,
      isInsurancePage: false,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('should render a header with href to quote start', () => {
      partials.header.serviceName().should('have.attr', 'href', startRoute);
    });

    it('renders `yes` radio button', () => {
      yesRadio().should('exist');

      cy.checkText(yesRadio(), FIELD_VALUES.YES);
    });

    it('renders `no` radio button', () => {
      noRadio().should('exist');

      cy.checkText(noRadio(), FIELD_VALUES.NO);
    });

    describe('expandable details', () => {
      it('renders summary text', () => {
        checkDescriptionSummaryText();
      });

      it('clicking summary text reveals details', () => {
        checkDescriptionSummaryClickRevealsContent();
      });

      it('renders expanded content', () => {
        checkDescriptionContent();
      });

      it('renders `will calculate thoroughly` copy ', () => {
        const expected = CONTENT_STRINGS.WILL_CALCULATE_THOROUGHLY;
        cy.checkText(partials.ukGoodsOrServicesDescription.calculateThoroughly(), expected);
      });
    });
  });

  describe('form submission', () => {
    describe('when submitting an empty form', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it('should render validation errors', () => {
        submitButton().click();

        partials.errorSummaryListItems().should('exist');
        partials.errorSummaryListItems().should('have.length', 1);

        const expectedMessage = ERROR_MESSAGES[FIELD_IDS.HAS_MINIMUM_UK_GOODS_OR_SERVICES].IS_EMPTY;

        cy.checkText(partials.errorSummaryListItems().first(), expectedMessage);

        cy.checkText(inlineErrorMessage(), `Error: ${expectedMessage}`);
      });

      it('should focus on input when clicking summary error message', () => {
        submitButton().click();

        partials.errorSummaryListItemLinks().eq(0).click();
        yesRadioInput().should('have.focus');
      });
    });

    describe('when submitting the answer as `yes`', () => {
      it(`should redirect to ${ROUTES.QUOTE.POLICY_TYPE}`, () => {
        cy.navigateToUrl(url);

        yesRadio().click();
        submitButton().click();

        cy.url().should('include', ROUTES.QUOTE.POLICY_TYPE);
      });
    });
  });
});
