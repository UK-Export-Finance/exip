import {
  heading, yesNoRadioHint, yesRadio, yesRadioInput, noRadio, noRadioInput, inlineErrorMessage, submitButton,
} from '../../../../pages/shared';
import { insurance } from '../../../../pages';
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
import {
  completeStartForm,
  completeCheckIfEligibleForm,
  completeExporterLocationForm,
  completeUkGoodsAndServicesForm,
  completeInsuredAmountForm,
  completeInsuredPeriodForm,
  completeOtherPartiesForm,
  completeLetterOfCreditForm,
} from '../../../../../support/insurance/eligibility/forms';

const CONTENT_STRINGS = PAGES.INSURANCE.ELIGIBILITY.PRE_CREDIT_PERIOD;

context('Insurance - Eligibility - Pre-credit period page - I want to check if I can use online service to apply for UKEF Export Insurance Policy for my export transaction that is paid via letter of credit', () => {
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
    completeOtherPartiesForm();
    completeLetterOfCreditForm();

    const expected = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ELIGIBILITY.PRE_CREDIT_PERIOD}`;

    cy.url().should('eq', expected);
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

    const expectedUrl = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ELIGIBILITY.LETTER_OF_CREDIT}`;

    cy.url().should('include', expectedUrl);

    // go back to page
    cy.visit(ROUTES.INSURANCE.ELIGIBILITY.PRE_CREDIT_PERIOD, {
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
      expect(text.trim()).equal(FIELDS[FIELD_IDS.INSURANCE.ELIGIBILITY.PRE_CREDIT_PERIOD].HINT);
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

  describe('expandable details', () => {
    it('renders summary text', () => {
      insurance.eligibility.preCreditPeriodPage.description.summary().should('exist');

      insurance.eligibility.preCreditPeriodPage.description.summary().invoke('text').then((text) => {
        expect(text.trim()).equal(CONTENT_STRINGS.PRE_CREDIT_PERIOD_DESCRIPTION.INTRO);
      });
    });

    it('clicking summary text reveals details', () => {
      insurance.eligibility.preCreditPeriodPage.description.summary().click();

      insurance.eligibility.preCreditPeriodPage.description.list.intro().should('be.visible');
    });

    it('renders body text', () => {
      insurance.eligibility.preCreditPeriodPage.description.body1().should('exist');

      insurance.eligibility.preCreditPeriodPage.description.body1().invoke('text').then((text) => {
        expect(text.trim()).equal(CONTENT_STRINGS.PRE_CREDIT_PERIOD_DESCRIPTION.BODY_1);
      });
    });

    it('renders expanded content', () => {
      insurance.eligibility.preCreditPeriodPage.description.list.intro().invoke('text').then((text) => {
        expect(text.trim()).equal(CONTENT_STRINGS.PRE_CREDIT_PERIOD_DESCRIPTION.LIST_INTRO);
      });

      insurance.eligibility.preCreditPeriodPage.description.list.item1().invoke('text').then((text) => {
        expect(text.trim()).equal(CONTENT_STRINGS.PRE_CREDIT_PERIOD_DESCRIPTION.LIST[0].TEXT);
      });

      insurance.eligibility.preCreditPeriodPage.description.list.item2().invoke('text').then((text) => {
        expect(text.trim()).equal(CONTENT_STRINGS.PRE_CREDIT_PERIOD_DESCRIPTION.LIST[1].TEXT);
      });
    });

    it('renders outro body text', () => {
      insurance.eligibility.preCreditPeriodPage.description.body2().should('exist');

      insurance.eligibility.preCreditPeriodPage.description.body2().invoke('text').then((text) => {
        expect(text.trim()).equal(CONTENT_STRINGS.PRE_CREDIT_PERIOD_DESCRIPTION.BODY_2);
      });

      insurance.eligibility.preCreditPeriodPage.description.body3().should('exist');

      insurance.eligibility.preCreditPeriodPage.description.body3().invoke('text').then((text) => {
        expect(text.trim()).equal(CONTENT_STRINGS.PRE_CREDIT_PERIOD_DESCRIPTION.BODY_3);
      });
    });
  });

  it('renders a submit button', () => {
    submitButton().should('exist');

    submitButton().invoke('text').then((text) => {
      expect(text.trim()).equal(BUTTONS.CONTINUE);
    });
  });

  describe('form submission', () => {
    describe('when submitting an empty form', () => {
      it('should render validation errors', () => {
        submitButton().click();

        partials.errorSummaryListItems().should('exist');
        partials.errorSummaryListItems().should('have.length', 1);

        const expectedMessage = ERROR_MESSAGES.INSURANCE.ELIGIBILITY[FIELD_IDS.INSURANCE.ELIGIBILITY.PRE_CREDIT_PERIOD].IS_EMPTY;

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

    describe('when submitting the answer as `no`', () => {
      before(() => {
        noRadio().click();
        submitButton().click();
      });

      it(`should redirect to ${ROUTES.INSURANCE.ELIGIBILITY.COMPANIES_HOUSE_NUMBER}`, () => {
        const expected = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ELIGIBILITY.COMPANIES_HOUSE_NUMBER}`;

        cy.url().should('eq', expected);
      });

      describe('when going back to the page', () => {
        it('should have the originally submitted answer selected', () => {
          partials.backLink().click();

          noRadioInput().should('be.checked');
        });
      });
    });
  });
});
