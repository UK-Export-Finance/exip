import {
  completeAndSubmitBuyerForm,
  completeAndSubmitCompanyForm,
  completeAndSubmitUkContentForm,
} from '../../../support/forms';
import { policyTypePage } from '../../pages';
import partials from '../../partials';
import {
  ORGANISATION,
  BUTTONS,
  LINKS,
  FIELDS,
  PAGES,
} from '../../../../content-strings';
import CONSTANTS from '../../../../constants';

const CONTENT_STRINGS = PAGES.POLICY_TYPE_PAGE;
const {
  ROUTES,
  FIELD_IDS,
} = CONSTANTS;

context('Policy type page', () => {
  describe('rendering', () => {
    before(() => {
      cy.login();

      completeAndSubmitBuyerForm();
      completeAndSubmitCompanyForm();
      completeAndSubmitUkContentForm();

      cy.url().should('include', ROUTES.POLICY_TYPE);
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
        seo: 60,
      });
    });

    it('renders a phase banner', () => {
      cy.checkPhaseBanner();
    });

    it('renders a back link with correct url', () => {
      partials.backLink().should('exist');
      partials.backLink().invoke('text').then((text) => {
        expect(text.trim()).equal(LINKS.BACK);
      });

      const expected = `${Cypress.config('baseUrl')}${ROUTES.HAS_MINIMUM_UK_GOODS_OR_SERVICES}`;

      partials.backLink().should('have.attr', 'href', expected);
    });

    it('renders a page title and heading', () => {
      const expectedPageTitle = `${CONTENT_STRINGS.PAGE_TITLE} - ${ORGANISATION}`;
      cy.title().should('eq', expectedPageTitle);

      policyTypePage.heading().invoke('text').then((text) => {
        expect(text.trim()).equal(CONTENT_STRINGS.HEADING);
      });
    });

    it('renders `policy type` radio inputs with labels and hints', () => {
      const fieldId = FIELD_IDS.POLICY_TYPE;
      const field = policyTypePage[fieldId];

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
      const singlePolicyLength = policyTypePage[FIELD_IDS.SINGLE_POLICY_LENGTH];
      singlePolicyLength.input().should('not.be.visible');

      const multiPolicyLength = policyTypePage[FIELD_IDS.MULTI_POLICY_LENGTH];
      multiPolicyLength.input().should('not.be.visible');
    });

    describe('when clicking `single` policy type', () => {
      it('should reveal policy length input with label and hint', () => {
        const singlePolicyType = policyTypePage[FIELD_IDS.POLICY_TYPE].single;
        singlePolicyType.label().click();

        const singlePolicyLengthId = FIELD_IDS.SINGLE_POLICY_LENGTH;
        const singlePolicyLength = policyTypePage[singlePolicyLengthId];

        singlePolicyLength.label().should('be.visible');
        singlePolicyLength.hint().should('be.visible');
        singlePolicyLength.input().should('be.visible');

        singlePolicyLength.label().invoke('text').then((text) => {
          expect(text.trim()).equal(FIELDS[singlePolicyLengthId].LABEL);
        });

        singlePolicyLength.hint().invoke('text').then((text) => {
          expect(text.trim()).includes(FIELDS[singlePolicyLengthId].HINT[0][0].text);
          expect(text.trim()).includes(FIELDS[singlePolicyLengthId].HINT[0][1].text);
          expect(text.trim()).includes(FIELDS[singlePolicyLengthId].HINT[0][2].text);
        });

        const expectedHref = LINKS.EXTERNAL.NBI_FORM;
        singlePolicyLength.hintLink().should('have.attr', 'href', expectedHref);
      });
    });

    describe('when clicking `multi` policy type', () => {
      it('should reveal policy length input with label and hint', () => {
        const multiPolicyType = policyTypePage[FIELD_IDS.POLICY_TYPE].multi;
        multiPolicyType.label().click();

        const multiPolicyLengthId = FIELD_IDS.MULTI_POLICY_LENGTH;
        const multiPolicyLength = policyTypePage[multiPolicyLengthId];

        multiPolicyLength.label().should('be.visible');
        multiPolicyLength.hint().should('be.visible');
        multiPolicyLength.input().should('be.visible');

        multiPolicyLength.label().invoke('text').then((text) => {
          expect(text.trim()).equal(FIELDS[multiPolicyLengthId].LABEL);
        });
        multiPolicyLength.hint().invoke('text').then((text) => {
          expect(text.trim()).includes(FIELDS[multiPolicyLengthId].HINT[0][0].text);
          expect(text.trim()).includes(FIELDS[multiPolicyLengthId].HINT[0][1].text);
          expect(text.trim()).includes(FIELDS[multiPolicyLengthId].HINT[0][2].text);
        });

        const expectedHref = LINKS.EXTERNAL.NBI_FORM;
        multiPolicyLength.hintLink().should('have.attr', 'href', expectedHref);
      });
    });

    it('renders a submit button', () => {
      const button = policyTypePage.submitButton();
      button.should('exist');

      button.invoke('text').then((text) => {
        expect(text.trim()).equal(BUTTONS.CONTINUE);
      });
    });
  });

  describe('when form is valid', () => {
    it(`should redirect to ${ROUTES.TELL_US_ABOUT_YOUR_POLICY}`, () => {
      policyTypePage[FIELD_IDS.POLICY_TYPE].single.input().click();
      policyTypePage[FIELD_IDS.SINGLE_POLICY_LENGTH].input().type('8');

      policyTypePage.submitButton().click();

      cy.url().should('include', ROUTES.TELL_US_ABOUT_YOUR_POLICY);
    });
  });
});
