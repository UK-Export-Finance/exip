import {
  heading, yesNoRadioHint, yesRadio, yesRadioInput, noRadio, inlineErrorMessage, submitButton,
} from '../../../../pages/shared';
import partials from '../../../../partials';
import {
  ORGANISATION,
  BUTTONS,
  FIELDS,
  LINKS,
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

    cy.url().should('include', ROUTES.INSURANCE.ELIGIBILITY.UK_GOODS_OR_SERVICES);
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  it('passes the audits', () => {
    cy.lighthouse({
      accessibility: 100,
      performance: 75,
      'best-practices': 100,
      seo: 70,
    });
  });

  it('renders a back link with correct url', () => {
    partials.backLink().should('exist');
    partials.backLink().invoke('text').then((text) => {
      expect(text.trim()).equal(LINKS.BACK);
    });

    partials.backLink().click();

    cy.url().should('include', ROUTES.INSURANCE.ELIGIBILITY.EXPORTER_LOCATION);

    // go back to page
    cy.visit(ROUTES.INSURANCE.ELIGIBILITY.UK_GOODS_OR_SERVICES, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });
  });

  it('renders an analytics cookies consent banner that can be accepted', () => {
    cy.checkAnalyticsCookiesConsentAndAccept();
  });

  it('renders an analytics cookies consent banner that can be rejected', () => {
    cy.rejectAnalyticsCookies();
  });

  it('should render a header with href to insurance start', () => {
    partials.header.serviceName().should('have.attr', 'href', insuranceStartRoute);
  });

  it('renders a phase banner', () => {
    cy.checkPhaseBanner();
  });

  it('renders a page title and heading', () => {
    const expectedPageTitle = `${CONTENT_STRINGS.PAGE_TITLE} - ${ORGANISATION}`;
    cy.title().should('eq', expectedPageTitle);

    heading().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.PAGE_TITLE);
    });
  });

  it('renders radio button hint', () => {
    yesNoRadioHint().should('exist');

    yesNoRadioHint().invoke('text').then((text) => {
      expect(text.trim()).equal(FIELDS[FIELD_IDS.HAS_MINIMUM_UK_GOODS_OR_SERVICES].HINT);
    });
  });

  it('renders `yes` radio button', () => {
    yesRadio().should('exist');

    yesRadio().invoke('text').then((text) => {
      expect(text.trim()).equal('Yes');
    });
  });

  it('renders `no` radio button', () => {
    noRadio().should('exist');

    noRadio().invoke('text').then((text) => {
      expect(text.trim()).equal('No');
    });
  });

  it('renders a submit button', () => {
    submitButton().should('exist');

    submitButton().invoke('text').then((text) => {
      expect(text.trim()).equal(BUTTONS.CONTINUE);
    });
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

  describe('form submission', () => {
    describe('when submitting an empty form', () => {
      it('should render validation errors', () => {
        submitButton().click();

        partials.errorSummaryListItems().should('exist');
        partials.errorSummaryListItems().should('have.length', 1);

        const expectedMessage = ERROR_MESSAGES[FIELD_IDS.HAS_MINIMUM_UK_GOODS_OR_SERVICES].IS_EMPTY;

        partials.errorSummaryListItems().first().invoke('text').then((text) => {
          expect(text.trim()).equal(expectedMessage);
        });

        inlineErrorMessage().invoke('text').then((text) => {
          expect(text.trim()).includes(expectedMessage);
        });
      });

      it('should focus on input when clicking summary error message', () => {
        submitButton().click();

        partials.errorSummaryListItemLinks().eq(0).click();
        yesRadioInput().should('have.focus');
      });
    });

    describe('when submitting the answer as `yes`', () => {
      before(() => {
        yesRadio().click();
        submitButton().click();
      });

      it(`should redirect to ${ROUTES.INSURANCE.ELIGIBILITY.INSURED_AMOUNT}`, () => {
        cy.url().should('include', ROUTES.INSURANCE.ELIGIBILITY.INSURED_AMOUNT);
      });

      describe('when going back to the page', () => {
        it('should have the originally submitted answer selected', () => {
          partials.backLink().click();

          yesRadioInput().should('be.checked');
        });
      });
    });
  });
});
