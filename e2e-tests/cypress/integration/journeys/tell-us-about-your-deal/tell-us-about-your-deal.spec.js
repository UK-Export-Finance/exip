import tellUsAboutYourDealPage from '../../pages/tellUsAboutYourDeal';
import partials from '../../partials';
import {
  ORGANISATION,
  BUTTONS,
  LINKS,
  FIELDS,
  PAGES,
} from '../../../../content-strings';
import CONSTANTS from '../../../../constants';

const CONTENT_STRINGS = PAGES.TELL_US_ABOUT_YOUR_DEAL_PAGE;
const { ROUTES, FIELD_IDS } = CONSTANTS;

context('Tell us about your deal page', () => {
  describe('rendering', () => {
    before(() => {
      cy.visit(ROUTES.TELL_US_ABOUT_YOUR_DEAL, {
        auth: {
          username: Cypress.config('basicAuthKey'),
          password: Cypress.config('basicAuthSecret'),
        },
      });
      cy.url().should('include', ROUTES.TELL_US_ABOUT_YOUR_DEAL);
    });

    beforeEach(() => {
      Cypress.Cookies.preserveOnce('_csrf');
      Cypress.Cookies.preserveOnce('connect.sid');
    });

    // it('passes the audits', () => {
    //   cy.lighthouse({
    //     // accessibility threshold is reduced here because
    //     // the radio component from design system has an invalid aria attribute.
    //     // this is out of our control
    //     accessibility: 92,
    //     performance: 80,
    //     'best-practices': 100,
    //     seo: 75,
    //   });
    // });

    it('renders a back button with correct link', () => {
      partials.backLink().should('exist');
      partials.backLink().invoke('text').then((text) => {
        expect(text.trim()).equal(LINKS.BACK);
      });

      partials.backLink().should('have.attr', 'href', ROUTES.UK_CONTENT_PERCENTAGE);
    });

    it('renders a page title, heading and description', () => {
      const expectedPageTitle = `${CONTENT_STRINGS.PAGE_TITLE} - ${ORGANISATION}`;
      cy.title().should('eq', expectedPageTitle);

      tellUsAboutYourDealPage.heading().invoke('text').then((text) => {
        expect(text.trim()).equal(CONTENT_STRINGS.HEADING);
      });

      tellUsAboutYourDealPage.description().invoke('text').then((text) => {
        expect(text.trim()).equal(CONTENT_STRINGS.DESCRIPTION);
      });
    });

    it('renders `currency and amount` legend', () => {
      const fieldId = FIELD_IDS.AMOUNT_CURRENCY;

      const field = tellUsAboutYourDealPage[fieldId];

      field.legend().should('exist');
      field.legend().invoke('text').then((text) => {
        expect(text.trim()).equal(FIELDS[fieldId].LEGEND);
      });
    });

    it('renders `currency` legend, label and input', () => {
      const fieldId = FIELD_IDS.CURRENCY;

      const field = tellUsAboutYourDealPage[fieldId];

      field.label().should('exist');
      field.label().invoke('text').then((text) => {
        expect(text.trim()).equal(FIELDS[fieldId].LABEL);
      });

      field.input().should('exist');
    });

    it('renders `amount` label, hint and input', () => {
      const fieldId = FIELD_IDS.AMOUNT;

      const field = tellUsAboutYourDealPage[fieldId];

      field.label().should('exist');
      field.label().invoke('text').then((text) => {
        expect(text.trim()).equal(FIELDS[fieldId].LABEL);
      });

      field.hint().should('exist');
      field.hint().invoke('text').then((text) => {
        expect(text.trim()).equal(FIELDS[fieldId].HINT);
      });

      field.input().should('exist');
    });

    it('renders `pre credit period` label, hint and input', () => {
      const fieldId = FIELD_IDS.PRE_CREDIT_PERIOD;

      const field = tellUsAboutYourDealPage[fieldId];

      field.label().should('exist');
      field.label().invoke('text').then((text) => {
        expect(text.trim()).equal(FIELDS[fieldId].LABEL);
      });

      field.hint().should('exist');
      field.hint().invoke('text').then((text) => {
        expect(text.trim()).equal(FIELDS[fieldId].HINT);
      });

      field.input().should('exist');
    });

    it('renders `credit period` label, hint and input', () => {
      const fieldId = FIELD_IDS.CREDIT_PERIOD;

      const field = tellUsAboutYourDealPage[fieldId];

      field.label().should('exist');
      field.labelText().invoke('text').then((text) => {
        expect(text.trim()).equal(FIELDS[fieldId].LABEL);
      });

      field.hint().should('exist');
      field.hint().invoke('text').then((text) => {
        expect(text.trim()).equal(FIELDS[fieldId].HINT);
      });

      field.input().should('exist');
    });

    it('renders `policy type` legend and radio inputs with labels and hints', () => {
      const fieldId = FIELD_IDS.POLICY_TYPE;
      const field = tellUsAboutYourDealPage[fieldId];

      field.legend().invoke('text').then((text) => {
        expect(text.trim()).equal(FIELDS[fieldId].LEGEND);
      });

      field.single.input().should('exist');
      field.single.label().invoke('text').then((text) => {
        expect(text.trim()).equal(FIELDS[fieldId].OPTIONS.SINGLE.TEXT);
      });

      field.single.hint().invoke('text').then((text) => {
        expect(text.trim()).equal(FIELDS[fieldId].OPTIONS.SINGLE.HINT);
      });

      field.multi.input().should('exist');
      field.multi.label().invoke('text').then((text) => {
        expect(text.trim()).equal(FIELDS[fieldId].OPTIONS.MULTI.TEXT);
      });

      field.multi.hint().invoke('text').then((text) => {
        expect(text.trim()).equal(FIELDS[fieldId].OPTIONS.MULTI.HINT);
      });
    });

    it('should not render policy length inputs by default', () => {
      const singlePolicyLength = tellUsAboutYourDealPage[FIELD_IDS.SINGLE_POLICY_LENGTH];
      singlePolicyLength.input().should('not.be.visible');

      const multiPolicyLength = tellUsAboutYourDealPage[FIELD_IDS.MULTI_POLICY_LENGTH];
      multiPolicyLength.input().should('not.be.visible');
    });

    describe('when clicking `single` policy type', () => {
      it('should reveal policy length input with label and hint', () => {
        const singlePolicyType = tellUsAboutYourDealPage[FIELD_IDS.POLICY_TYPE].single;
        singlePolicyType.label().click();

        const singlePolicyLengthId = FIELD_IDS.SINGLE_POLICY_LENGTH;
        const singlePolicyLength = tellUsAboutYourDealPage[singlePolicyLengthId];

        singlePolicyLength.label().should('be.visible');
        singlePolicyLength.hint().should('be.visible');
        singlePolicyLength.input().should('be.visible');

        singlePolicyLength.label().invoke('text').then((text) => {
          expect(text.trim()).equal(FIELDS[singlePolicyLengthId].LABEL);
        });

        singlePolicyLength.hint().invoke('text').then((text) => {
          expect(text.trim()).equal(FIELDS[singlePolicyLengthId].HINT);
        });
      });
    });

    describe('when clicking `single` policy type', () => {
      it('should reveal policy length input with label and hint', () => {
        const multiPolicyType = tellUsAboutYourDealPage[FIELD_IDS.POLICY_TYPE].multi;
        multiPolicyType.label().click();

        const multiPolicyLengthId = FIELD_IDS.MULTI_POLICY_LENGTH;
        const multiPolicyLength = tellUsAboutYourDealPage[multiPolicyLengthId];

        multiPolicyLength.label().should('be.visible');
        multiPolicyLength.hint().should('be.visible');
        multiPolicyLength.input().should('be.visible');

        multiPolicyLength.label().invoke('text').then((text) => {
          expect(text.trim()).equal(FIELDS[multiPolicyLengthId].LABEL);
        });

        multiPolicyLength.hint().invoke('text').then((text) => {
          expect(text.trim()).equal(FIELDS[multiPolicyLengthId].HINT);
        });
      });
    });

    it('renders a submit button', () => {
      const button = tellUsAboutYourDealPage.submitButton();
      button.should('exist');

      button.invoke('text').then((text) => {
        expect(text.trim()).equal(BUTTONS.CONTINUE);
      });
    });
  });

  describe('when form is valid', () => {
    it(`should redirect to ${ROUTES.CHECK_YOUR_ANSWERS}`, () => {
      tellUsAboutYourDealPage[FIELD_IDS.AMOUNT].input().type('100');
      tellUsAboutYourDealPage[FIELD_IDS.CURRENCY].input().select('AED');
      tellUsAboutYourDealPage[FIELD_IDS.PRE_CREDIT_PERIOD].input().type('0');
      tellUsAboutYourDealPage[FIELD_IDS.CREDIT_PERIOD].input().type('1');
      tellUsAboutYourDealPage[FIELD_IDS.POLICY_TYPE].single.input().click();
      tellUsAboutYourDealPage[FIELD_IDS.SINGLE_POLICY_LENGTH].input().type('13');

      tellUsAboutYourDealPage.submitButton().click();

      cy.url().should('include', ROUTES.CHECK_YOUR_ANSWERS);
    });
  });
});
