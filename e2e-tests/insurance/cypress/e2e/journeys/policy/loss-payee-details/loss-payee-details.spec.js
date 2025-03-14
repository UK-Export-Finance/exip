import { field as fieldSelector, headingCaption } from '../../../../../../pages/shared';
import { PAGES } from '../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../constants/field-ids/insurance/policy';
import { POLICY_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/policy';
import application from '../../../../../../fixtures/application';

const CONTENT_STRINGS = PAGES.INSURANCE.POLICY.LOSS_PAYEE_DETAILS;

const {
  LOSS_PAYEE_DETAILS: { NAME, LOCATION, IS_LOCATED_IN_UK, IS_LOCATED_INTERNATIONALLY },
} = POLICY_FIELD_IDS;

const {
  ROOT,
  POLICY: { LOSS_PAYEE_ROOT, LOSS_PAYEE_DETAILS_ROOT, LOSS_PAYEE_FINANCIAL_DETAILS_UK_ROOT, LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_ROOT },
} = INSURANCE_ROUTES;

const { LOSS_PAYEE_DETAILS: FIELD_STRINGS } = FIELDS;

const baseUrl = Cypress.config('baseUrl');

const { POLICY } = application;

context(
  'Insurance - Policy - Loss payee details page - As an exporter, I want to inform UKEF about whether I have a loss payee, So that the appropriate parties can be paid in the event of an insurance claim',
  () => {
    let referenceNumber;
    let url;
    let lossPayeeFinancialUkUrl;
    let lossPayeeFinancialInternationalUrl;

    before(() => {
      cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
        referenceNumber = refNumber;

        // go to the page we want to test.
        cy.completeAndSubmitPolicyForms({ stopSubmittingAfter: 'lossPayee', isAppointingLossPayee: true });

        url = `${baseUrl}${ROOT}/${referenceNumber}${LOSS_PAYEE_DETAILS_ROOT}`;
        lossPayeeFinancialUkUrl = `${baseUrl}${ROOT}/${referenceNumber}${LOSS_PAYEE_FINANCIAL_DETAILS_UK_ROOT}`;
        lossPayeeFinancialInternationalUrl = `${baseUrl}${ROOT}/${referenceNumber}${LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_ROOT}`;

        cy.assertUrl(url);
      });
    });

    beforeEach(() => {
      cy.saveSession();
    });

    after(() => {
      cy.deleteApplication(referenceNumber);
    });

    it('renders core page elements', () => {
      cy.corePageChecks({
        pageTitle: CONTENT_STRINGS.PAGE_TITLE,
        currentHref: `${ROOT}/${referenceNumber}${LOSS_PAYEE_DETAILS_ROOT}`,
        backLink: `${ROOT}/${referenceNumber}${LOSS_PAYEE_ROOT}`,
      });
    });

    describe('page tests', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it('renders a heading caption', () => {
        cy.checkText(headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
      });

      it(`renders ${NAME} label and input`, () => {
        const fieldId = NAME;
        const field = fieldSelector(fieldId);

        cy.checkText(field.label(), FIELD_STRINGS[fieldId].LABEL);
        field.input().should('exist');
      });

      it('renders a `UK` location radio input and label', () => {
        const RADIO_ID = `${LOCATION}-${IS_LOCATED_IN_UK}`;

        const field = fieldSelector(RADIO_ID);

        field.input().should('exist');

        const expectedLabel = FIELD_STRINGS[LOCATION].OPTIONS.UK.TEXT;
        cy.checkText(field.label(), expectedLabel);
      });

      it('renders an `International` location radio input and label', () => {
        const RADIO_ID = `${LOCATION}-${IS_LOCATED_INTERNATIONALLY}`;

        const field = fieldSelector(RADIO_ID);

        field.input().should('exist');

        const expectedLabel = FIELD_STRINGS[LOCATION].OPTIONS.INTERNATIONAL.TEXT;
        cy.checkText(field.label(), expectedLabel);
      });
    });

    describe('form submission', () => {
      describe(IS_LOCATED_IN_UK, () => {
        beforeEach(() => {
          cy.navigateToUrl(url);
          cy.completeAndSubmitLossPayeeDetailsForm({});
        });

        it(`should redirect to ${LOSS_PAYEE_FINANCIAL_DETAILS_UK_ROOT}`, () => {
          cy.assertUrl(lossPayeeFinancialUkUrl);
        });

        it('should have the submitted values when going back to the page', () => {
          cy.navigateToUrl(url);
          cy.checkValue(fieldSelector(NAME), POLICY[NAME]);

          const radioFieldId = `location-${IS_LOCATED_IN_UK}`;
          cy.assertRadioOptionIsChecked(fieldSelector(radioFieldId).input());
        });
      });

      describe(IS_LOCATED_INTERNATIONALLY, () => {
        beforeEach(() => {
          cy.navigateToUrl(url);
          cy.completeAndSubmitLossPayeeDetailsForm({ locatedInUK: false });
        });

        it(`should redirect to ${LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_ROOT}`, () => {
          cy.assertUrl(lossPayeeFinancialInternationalUrl);
        });

        it('should have the submitted values when going back to the page', () => {
          cy.navigateToUrl(url);

          const radioFieldId = `location-${IS_LOCATED_INTERNATIONALLY}`;
          cy.assertRadioOptionIsChecked(fieldSelector(radioFieldId).input());
        });
      });
    });
  },
);
