import { completeAndSubmitBuyerCountryForm } from '../../../../../../commands/forms';
import {
  completeAndSubmitBuyerBodyForm,
  completeAndSubmitExporterLocationForm,
  completeAndSubmitUkContentForm,
} from '../../../../../../commands/quote/forms';
import { submitButton } from '../../../../../../pages/shared';
import { policyTypePage } from '../../../../../../pages/quote';
import {
  LINKS,
  FIELDS,
  PAGES,
} from '../../../../../../content-strings';
import { ROUTES, FIELD_IDS } from '../../../../../../constants';

const CONTENT_STRINGS = PAGES.QUOTE.POLICY_TYPE;

const { POLICY_TYPE: FIELD_ID } = FIELD_IDS;

const {
  QUOTE: {
    POLICY_TYPE: POLICY_TYPE_ROUTE,
    UK_GOODS_OR_SERVICES,
    TELL_US_ABOUT_YOUR_POLICY,
  },
} = ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Policy type page - as an exporter, I want to get UKEF export insurance quote based on the export policy - provide policy type', () => {
  const url = `${baseUrl}${POLICY_TYPE_ROUTE}`;

  before(() => {
    cy.login();

    completeAndSubmitBuyerCountryForm();
    completeAndSubmitBuyerBodyForm();
    completeAndSubmitExporterLocationForm();
    completeAndSubmitUkContentForm();

    cy.assertUrl(url);
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: POLICY_TYPE_ROUTE,
      backLink: UK_GOODS_OR_SERVICES,
      assertAuthenticatedHeader: false,
      isInsurancePage: false,
      lightHouseThresholds: {
        // accessibility threshold is reduced here because
        // the radio component from design system has an invalid aria attribute.
        // this is out of our control
        accessibility: 90,
      },
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('should render `single policy type` radio input with a label and hint', () => {
      const field = policyTypePage[FIELD_ID].single;

      field.input().should('exist');

      cy.checkText(field.label(), FIELDS[FIELD_ID].OPTIONS.SINGLE.TEXT);

      const HINT_STRINGS = FIELDS[FIELD_ID].OPTIONS.SINGLE.HINT;

      cy.checkText(field.hintListItem(1), HINT_STRINGS[0]);
      cy.checkText(field.hintListItem(2), HINT_STRINGS[1]);
      cy.checkText(field.hintListItem(3), HINT_STRINGS[2]);
      cy.checkText(field.hintListItem(4), HINT_STRINGS[3]);
    });

    it('should render `multiple policy type` radio input with a label and hint', () => {
      const field = policyTypePage[FIELD_ID].multiple;

      field.input().should('exist');
      cy.checkText(field.label(), FIELDS[FIELD_ID].OPTIONS.MULTIPLE.TEXT);

      const HINT_STRINGS = FIELDS[FIELD_ID].OPTIONS.MULTIPLE.HINT;

      cy.checkText(field.hintListItem(1), HINT_STRINGS[0]);
      cy.checkText(field.hintListItem(2), HINT_STRINGS[1]);
      cy.checkText(field.hintListItem(3), HINT_STRINGS[2]);
    });

    it('should not render policy length inputs by default', () => {
      const singlePolicyLength = policyTypePage[FIELD_IDS.SINGLE_POLICY_LENGTH];
      singlePolicyLength.input().should('not.be.visible');
    });

    describe('when clicking `single` policy type', () => {
      it('should reveal policy length input with label and hint', () => {
        const singlePolicyType = policyTypePage[FIELD_ID].single;
        singlePolicyType.label().click();

        const singlePolicyLengthId = FIELD_IDS.SINGLE_POLICY_LENGTH;
        const singlePolicyLength = policyTypePage[singlePolicyLengthId];

        singlePolicyLength.label().should('be.visible');
        singlePolicyLength.hint().should('be.visible');
        singlePolicyLength.input().should('be.visible');

        cy.checkText(singlePolicyLength.label(), FIELDS[singlePolicyLengthId].LABEL);

        singlePolicyLength.hint().invoke('text').then((text) => {
          expect(text.trim()).includes(FIELDS[singlePolicyLengthId].HINT[0][0].text);
          expect(text.trim()).includes(FIELDS[singlePolicyLengthId].HINT[0][1].text);
          expect(text.trim()).includes(FIELDS[singlePolicyLengthId].HINT[0][2].text);
        });

        const expectedHref = LINKS.EXTERNAL.NBI_FORM;
        const expectedText = FIELDS[singlePolicyLengthId].HINT[0][1].text;

        cy.checkLink(
          singlePolicyLength.hintLink(),
          expectedHref,
          expectedText,
        );
      });
    });

    describe('when form is valid', () => {
      it(`should redirect to ${TELL_US_ABOUT_YOUR_POLICY}`, () => {
        policyTypePage[FIELD_ID].single.input().click();
        cy.keyboardInput(policyTypePage[FIELD_IDS.SINGLE_POLICY_LENGTH].input(), '8');

        submitButton().click();

        const expectedUrl = `${baseUrl}${TELL_US_ABOUT_YOUR_POLICY}`;

        cy.assertUrl(expectedUrl);
      });
    });
  });
});
