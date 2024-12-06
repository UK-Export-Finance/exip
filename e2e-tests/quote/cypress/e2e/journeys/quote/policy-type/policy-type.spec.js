import { policyTypePage } from '../../../../../../pages/quote';
import { FIELDS, PAGES } from '../../../../../../content-strings';
import { APPLICATION, ELIGIBILITY, FIELD_IDS, ROUTES } from '../../../../../../constants';

const CONTENT_STRINGS = PAGES.QUOTE.POLICY_TYPE;

const { POLICY_TYPE: FIELD_ID } = FIELD_IDS;

const {
  QUOTE: { POLICY_TYPE: POLICY_TYPE_ROUTE, UK_GOODS_OR_SERVICES, TELL_US_ABOUT_YOUR_POLICY },
} = ROUTES;

const {
  POLICY: { TOTAL_MONTHS_OF_COVER },
} = APPLICATION;

const { MAX_COVER_PERIOD_MONTHS } = ELIGIBILITY;

const baseUrl = Cypress.config('baseUrl');

context('Policy type page - as an exporter, I want to get UKEF credit insurance quote based on the export policy - provide policy type', () => {
  const url = `${baseUrl}${POLICY_TYPE_ROUTE}`;

  before(() => {
    cy.navigateToRootUrl();

    cy.completeAndSubmitBuyerCountryForm({});
    cy.completeAndSubmitBuyerBodyForm();
    cy.completeAndSubmitExporterLocationForm();
    cy.completeAndSubmitUkContentForm();

    cy.assertUrl(url);
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: POLICY_TYPE_ROUTE,
      backLink: UK_GOODS_OR_SERVICES,
      assertAuthenticatedHeader: false,
      isInsurancePage: false,
      assertSaveAndBackButtonDoesNotExist: true,
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

    const { multiple: multiplePolicyField, single: singlePolicyField } = policyTypePage[FIELD_ID];

    describe('`single policy type` radio', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it('should render an input and label', () => {
        singlePolicyField.input().should('exist');

        cy.checkText(singlePolicyField.label(), FIELDS[FIELD_ID].OPTIONS.SINGLE.TEXT);
      });

      it('should render a hint', () => {
        const HINT_STRINGS = FIELDS[FIELD_ID].OPTIONS.SINGLE.HINT;

        cy.checkText(singlePolicyField.hintListItem(1), HINT_STRINGS[0]);

        cy.checkText(singlePolicyField.hintListItem(2), HINT_STRINGS[1]);

        singlePolicyField
          .hintListItem(2)
          .invoke('text')
          .then((text) => {
            expect(text).includes(`${MAX_COVER_PERIOD_MONTHS} months`);
          });

        cy.checkText(singlePolicyField.hintListItem(3), HINT_STRINGS[2]);
        cy.checkText(singlePolicyField.hintListItem(4), HINT_STRINGS[3]);
      });
    });

    describe('`multiple policy type` radio', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it('should render an input and label', () => {
        multiplePolicyField.input().should('exist');

        cy.checkText(multiplePolicyField.label(), FIELDS[FIELD_ID].OPTIONS.MULTIPLE.TEXT);
      });

      it('should render a hint', () => {
        const HINT_STRINGS = FIELDS[FIELD_ID].OPTIONS.MULTIPLE.HINT;

        cy.checkText(multiplePolicyField.hintListItem(1), HINT_STRINGS[0]);

        multiplePolicyField
          .hintListItem(1)
          .invoke('text')
          .then((text) => {
            expect(text).includes(`${TOTAL_MONTHS_OF_COVER.MAXIMUM} months`);
          });

        cy.checkText(multiplePolicyField.hintListItem(2), HINT_STRINGS[1]);
        cy.checkText(multiplePolicyField.hintListItem(3), HINT_STRINGS[2]);
      });
    });

    describe('form submission', () => {
      it(`should redirect to ${TELL_US_ABOUT_YOUR_POLICY}`, () => {
        policyTypePage[FIELD_ID].single.label().click();

        cy.clickSubmitButton();

        const expectedUrl = `${baseUrl}${TELL_US_ABOUT_YOUR_POLICY}`;

        cy.assertUrl(expectedUrl);
      });
    });
  });
});
