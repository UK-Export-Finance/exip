import { completeAndSubmitBuyerCountryForm } from '../../../../../../commands/forms';
import {
  completeAndSubmitBuyerBodyForm,
  completeAndSubmitExporterLocationForm,
  completeAndSubmitUkContentForm,
} from '../../../../../../commands/quote/forms';
import { submitButton } from '../../../../../../pages/shared';
import { policyTypePage } from '../../../../../../pages/quote';
import { FIELDS, PAGES } from '../../../../../../content-strings';
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

    describe('when form is valid', () => {
      it(`should redirect to ${TELL_US_ABOUT_YOUR_POLICY}`, () => {
        policyTypePage[FIELD_ID].single.label().click();

        submitButton().click();

        const expectedUrl = `${baseUrl}${TELL_US_ABOUT_YOUR_POLICY}`;

        cy.assertUrl(expectedUrl);
      });
    });
  });
});
