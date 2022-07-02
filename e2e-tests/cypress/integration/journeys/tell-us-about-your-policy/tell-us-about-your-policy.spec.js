import {
  ukContentPercentagePage,
  tellUsAboutYourPolicyPage,
} from '../../pages';
import partials from '../../partials';
import {
  ORGANISATION,
  BUTTONS,
  LINKS,
  FIELDS,
  PAGES,
} from '../../../../content-strings';
import CONSTANTS from '../../../../constants';

const CONTENT_STRINGS = PAGES.TELL_US_ABOUT_YOUR_POLICY_PAGE;
const { ROUTES, FIELD_IDS } = CONSTANTS;

context('Tell us about the policy you need page', () => {
  describe('rendering', () => {
    before(() => {
      cy.visit(ROUTES.UK_CONTENT_PERCENTAGE, {
        auth: {
          username: Cypress.config('basicAuthKey'),
          password: Cypress.config('basicAuthSecret'),
        },
      });

      ukContentPercentagePage.yes().click();
      ukContentPercentagePage.submitButton().click();

      cy.url().should('include', ROUTES.TELL_US_ABOUT_YOUR_POLICY);
    });

    beforeEach(() => {
      Cypress.Cookies.preserveOnce('_csrf');
      Cypress.Cookies.preserveOnce('connect.sid');
    });

    it('passes the audits', () => {
      cy.lighthouse({
        // accessibility threshold is reduced here because
        // the radio component from design system has an invalid aria attribute.
        // this is out of our control
        accessibility: 92,
        performance: 80,
        'best-practices': 100,
        seo: 75,
      });
    });

    it('renders a back button with correct link', () => {
      partials.backLink().should('exist');
      partials.backLink().invoke('text').then((text) => {
        expect(text.trim()).equal(LINKS.BACK);
      });

      const expected = `${Cypress.config('baseUrl')}${ROUTES.UK_CONTENT_PERCENTAGE}`;

      partials.backLink().should('have.attr', 'href', expected);
    });

    it('renders a page title, heading and description', () => {
      const expectedPageTitle = `${CONTENT_STRINGS.PAGE_TITLE} - ${ORGANISATION}`;
      cy.title().should('eq', expectedPageTitle);

      tellUsAboutYourPolicyPage.heading().invoke('text').then((text) => {
        expect(text.trim()).equal(CONTENT_STRINGS.HEADING);
      });

      tellUsAboutYourPolicyPage.description().invoke('text').then((text) => {
        expect(text.trim()).equal(CONTENT_STRINGS.DESCRIPTION);
      });
    });

    it('renders `currency and amount` legend', () => {
      const fieldId = FIELD_IDS.AMOUNT_CURRENCY;

      const field = tellUsAboutYourPolicyPage[fieldId];

      field.legend().should('exist');
      field.legend().invoke('text').then((text) => {
        expect(text.trim()).equal(FIELDS[fieldId].LEGEND);
      });
    });

    it('renders `currency` legend, label and input', () => {
      const fieldId = FIELD_IDS.CURRENCY;

      const field = tellUsAboutYourPolicyPage[fieldId];

      field.label().should('exist');
      field.label().invoke('text').then((text) => {
        expect(text.trim()).equal(FIELDS[fieldId].LABEL);
      });

      field.input().should('exist');
    });

    it('renders `amount` label and input', () => {
      const fieldId = FIELD_IDS.AMOUNT;

      const field = tellUsAboutYourPolicyPage[fieldId];

      field.label().should('exist');
      field.label().invoke('text').then((text) => {
        expect(text.trim()).equal(FIELDS[fieldId].LABEL);
      });

      field.input().should('exist');
    });

    it('renders `credit period` label, hint and input', () => {
      const fieldId = FIELD_IDS.CREDIT_PERIOD;

      const field = tellUsAboutYourPolicyPage[fieldId];

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
      const field = tellUsAboutYourPolicyPage[fieldId];

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
      const singlePolicyLength = tellUsAboutYourPolicyPage[FIELD_IDS.SINGLE_POLICY_LENGTH];
      singlePolicyLength.input().should('not.be.visible');

      const multiPolicyLength = tellUsAboutYourPolicyPage[FIELD_IDS.MULTI_POLICY_LENGTH];
      multiPolicyLength.input().should('not.be.visible');
    });

    describe('when clicking `single` policy type', () => {
      it('should reveal policy length input with label and hint', () => {
        const singlePolicyType = tellUsAboutYourPolicyPage[FIELD_IDS.POLICY_TYPE].single;
        singlePolicyType.label().click();

        const singlePolicyLengthId = FIELD_IDS.SINGLE_POLICY_LENGTH;
        const singlePolicyLength = tellUsAboutYourPolicyPage[singlePolicyLengthId];

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
        const multiPolicyType = tellUsAboutYourPolicyPage[FIELD_IDS.POLICY_TYPE].multi;
        multiPolicyType.label().click();

        const multiPolicyLengthId = FIELD_IDS.MULTI_POLICY_LENGTH;
        const multiPolicyLength = tellUsAboutYourPolicyPage[multiPolicyLengthId];

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
      const button = tellUsAboutYourPolicyPage.submitButton();
      button.should('exist');

      button.invoke('text').then((text) => {
        expect(text.trim()).equal(BUTTONS.CONTINUE);
      });
    });
  });

  describe('when form is valid', () => {
    it(`should redirect to ${ROUTES.CHECK_YOUR_ANSWERS}`, () => {
      tellUsAboutYourPolicyPage[FIELD_IDS.AMOUNT].input().type('100');
      tellUsAboutYourPolicyPage[FIELD_IDS.CURRENCY].input().select('AED');
      tellUsAboutYourPolicyPage[FIELD_IDS.CREDIT_PERIOD].input().type('1');
      tellUsAboutYourPolicyPage[FIELD_IDS.POLICY_TYPE].single.input().click();
      tellUsAboutYourPolicyPage[FIELD_IDS.SINGLE_POLICY_LENGTH].input().type('13');

      tellUsAboutYourPolicyPage.submitButton().click();

      cy.url().should('include', ROUTES.CHECK_YOUR_ANSWERS);
    });
  });
});
