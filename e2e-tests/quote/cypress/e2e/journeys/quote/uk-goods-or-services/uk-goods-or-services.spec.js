import { yesRadio, noRadio } from '../../../../../../pages/shared';
import { PAGES, ERROR_MESSAGES } from '../../../../../../content-strings';
import { ROUTES, FIELD_IDS, FIELD_VALUES } from '../../../../../../constants';
import {
  checkCalculateDescriptionSummaryText,
  checkCalculateDescriptionSummaryClickRevealsContent,
  checkCalculateDescriptionDescriptionContent,
} from '../../../../../../commands/shared-commands/assertions/check-uk-goods-and-services-calculate-description';
import {
  checkDescriptionSummaryText,
  checkDescriptionSummaryClickRevealsContent,
  checkDescriptionContent,
} from '../../../../../../commands/shared-commands/assertions/check-uk-goods-and-services-description';

const CONTENT_STRINGS = {
  ...PAGES.UK_GOODS_OR_SERVICES,
  ...PAGES.QUOTE.UK_GOODS_OR_SERVICES,
};

const {
  ELIGIBILITY: { HAS_MINIMUM_UK_GOODS_OR_SERVICES: FIELD_ID },
} = FIELD_IDS;

const {
  QUOTE: { UK_GOODS_OR_SERVICES, EXPORTER_LOCATION, POLICY_TYPE },
} = ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('UK goods or services page - as an exporter, I want to check if my export value is eligible for UKEF credit insurance cover', () => {
  const url = `${baseUrl}${UK_GOODS_OR_SERVICES}`;

  before(() => {
    cy.navigateToRootUrl();
    cy.completeAndSubmitBuyerCountryForm({});
    cy.completeAndSubmitBuyerBodyForm();
    cy.completeAndSubmitExporterLocationForm();

    cy.assertUrl(url);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: UK_GOODS_OR_SERVICES,
      backLink: EXPORTER_LOCATION,
      assertAuthenticatedHeader: false,
      isInsurancePage: false,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('renders `yes` radio button', () => {
      cy.checkText(yesRadio().label(), FIELD_VALUES.YES);

      cy.checkRadioInputYesAriaLabel(CONTENT_STRINGS.PAGE_TITLE);
    });

    it('renders `no` radio button', () => {
      cy.checkText(noRadio().label(), FIELD_VALUES.NO);

      cy.checkRadioInputNoAriaLabel(CONTENT_STRINGS.PAGE_TITLE);
    });

    describe('expandable details - how to calculate percentage', () => {
      it('renders summary text', () => {
        checkCalculateDescriptionSummaryText();
      });

      describe('when clicking the summary text', () => {
        it('should expand the collapsed `details` content', () => {
          checkCalculateDescriptionSummaryClickRevealsContent();

          checkCalculateDescriptionDescriptionContent();
        });
      });
    });

    describe('expandable details - what counts as UK goods and services', () => {
      it('renders summary text', () => {
        checkDescriptionSummaryText();
      });

      describe('when clicking the summary text', () => {
        it('should expand the collapsed `details` content', () => {
          checkDescriptionSummaryClickRevealsContent();

          checkDescriptionContent();
        });
      });
    });
  });

  describe('form submission', () => {
    describe('when submitting an empty form', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it('should render validation errors', () => {
        cy.submitAndAssertRadioErrors({
          field: yesRadio(FIELD_ID),
          expectedErrorMessage: ERROR_MESSAGES.ELIGIBILITY[FIELD_ID].IS_EMPTY,
        });
      });
    });

    describe('when submitting the answer as `yes`', () => {
      it(`should redirect to ${POLICY_TYPE}`, () => {
        cy.navigateToUrl(url);

        cy.clickYesRadioInput();
        cy.clickSubmitButton();

        const expectedUrl = `${baseUrl}${POLICY_TYPE}`;

        cy.assertUrl(expectedUrl);
      });
    });
  });
});
