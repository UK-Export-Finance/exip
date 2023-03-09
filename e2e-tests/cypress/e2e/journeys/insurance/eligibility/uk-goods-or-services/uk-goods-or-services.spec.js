import {
  yesNoRadioHint, yesRadio, yesRadioInput, noRadio, inlineErrorMessage, submitButton,
} from '../../../../pages/shared';
import partials from '../../../../partials';
import {
  FIELDS,
  PAGES,
  ERROR_MESSAGES,
} from '../../../../../../content-strings';
import { ROUTES, FIELD_IDS } from '../../../../../../constants';
import { completeAndSubmitBuyerCountryForm } from '../../../../../support/forms';
import { completeStartForm, completeCheckIfEligibleForm, completeExporterLocationForm } from '../../../../../support/insurance/eligibility/forms';
import {
  checkCalculateDescriptionSummaryText,
  checkCalculateDescriptionSummaryClickRevealsContent,
  checkCalculateDescriptionDescriptionContent,
} from '../../../../../support/check-uk-goods-and-services-calculate-description';
import {
  checkDescriptionSummaryText,
  checkDescriptionSummaryClickRevealsContent,
  checkDescriptionContent,
} from '../../../../../support/check-uk-goods-and-services-description';

const CONTENT_STRINGS = PAGES.UK_GOODS_OR_SERVICES;

const insuranceStartRoute = ROUTES.INSURANCE.START;

context('Insurance - UK goods or services page - as an exporter, I want to check if my export value is eligible for UKEF export insurance cover', () => {
  let url;

  before(() => {
    cy.navigateToUrl(ROUTES.INSURANCE.START);

    completeStartForm();
    completeCheckIfEligibleForm();
    completeAndSubmitBuyerCountryForm();
    completeExporterLocationForm();

    url = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ELIGIBILITY.UK_GOODS_OR_SERVICES}`;

    cy.url().should('include', url);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: ROUTES.INSURANCE.ELIGIBILITY.UK_GOODS_OR_SERVICES,
      backLink: ROUTES.INSURANCE.ELIGIBILITY.EXPORTER_LOCATION,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('should render a header with href to insurance start', () => {
      partials.header.serviceName().should('have.attr', 'href', insuranceStartRoute);
    });

    it('renders radio button hint', () => {
      yesNoRadioHint().should('exist');

      cy.checkText(yesNoRadioHint(), FIELDS[FIELD_IDS.HAS_MINIMUM_UK_GOODS_OR_SERVICES].HINT);
    });

    it('renders `yes` radio button', () => {
      yesRadio().should('exist');

      cy.checkText(yesRadio(), 'Yes');
    });

    it('renders `no` radio button', () => {
      noRadio().should('exist');

      cy.checkText(noRadio(), 'No');
    });

    describe('expandable details - how to calculate percentage', () => {
      it('renders summary text', () => {
        checkCalculateDescriptionSummaryText();
      });

      it('clicking summary text reveals details', () => {
        checkCalculateDescriptionSummaryClickRevealsContent();
      });

      it('renders expanded content', () => {
        checkCalculateDescriptionDescriptionContent();
      });
    });

    describe('expandable details - what counts as UK goods and services', () => {
      it('renders summary text', () => {
        checkDescriptionSummaryText();
      });

      it('clicking summary text reveals details', () => {
        checkDescriptionSummaryClickRevealsContent();
      });

      it('renders expanded content', () => {
        checkDescriptionContent();
      });

      it('does NOT render `will calculate thoroughly` copy ', () => {
        partials.ukGoodsOrServicesDescription.calculateThoroughly().should('not.exist');
      });
    });
  });

  describe('when submitting an empty form', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('should render validation errors', () => {
      submitButton().click();

      partials.errorSummaryListItems().should('exist');
      partials.errorSummaryListItems().should('have.length', 1);

      const expectedMessage = ERROR_MESSAGES[FIELD_IDS.HAS_MINIMUM_UK_GOODS_OR_SERVICES].IS_EMPTY;

      cy.checkText(partials.errorSummaryListItems(), expectedMessage);

      cy.checkText(inlineErrorMessage(), `Error: ${expectedMessage}`);
    });

    it('should focus on input when clicking summary error message', () => {
      submitButton().click();

      partials.errorSummaryListItemLinks().eq(0).click();
      yesRadioInput().should('have.focus');
    });
  });

  describe('when submitting the answer as `yes`', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      yesRadio().click();
      submitButton().click();
    });

    it(`should redirect to ${ROUTES.INSURANCE.ELIGIBILITY.INSURED_AMOUNT}`, () => {
      cy.url().should('include', ROUTES.INSURANCE.ELIGIBILITY.INSURED_AMOUNT);
    });

    describe('when going back to the page', () => {
      it('should have the originally submitted answer selected', () => {
        cy.clickBackLink();

        yesRadioInput().should('be.checked');
      });
    });
  });
});
