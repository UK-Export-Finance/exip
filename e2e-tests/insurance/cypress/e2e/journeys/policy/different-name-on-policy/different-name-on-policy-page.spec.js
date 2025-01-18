import { headingCaption, field as fieldSelector } from '../../../../../../pages/shared';
import { PAGES } from '../../../../../../content-strings';
import { POLICY_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/policy';
import { ACCOUNT_FIELDS } from '../../../../../../content-strings/fields/insurance/account';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import mockApplication from '../../../../../../fixtures/application';

const { POLICY_CONTACT } = mockApplication;

const CONTENT_STRINGS = PAGES.INSURANCE.POLICY.DIFFERENT_NAME_ON_POLICY;

const {
  ROOT: INSURANCE_ROOT,
  POLICY: { PRE_CREDIT_PERIOD, NAME_ON_POLICY, DIFFERENT_NAME_ON_POLICY },
} = INSURANCE_ROUTES;

const {
  POLICY: {
    DIFFERENT_NAME_ON_POLICY: { POSITION, POLICY_CONTACT_DETAIL },
  },
  ACCOUNT: { FIRST_NAME, LAST_NAME, EMAIL },
} = INSURANCE_FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context(
  'Insurance - Policy - Different name on Policy page - I want to enter the details of my export application contact, So that UKEF will have clarity on who to contact while processing my Export Insurance Application',
  () => {
    let referenceNumber;
    let url;

    before(() => {
      cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
        referenceNumber = refNumber;

        // go to the page we want to test.
        cy.completeAndSubmitPolicyForms({ stopSubmittingAfter: 'nameOnPolicy', sameName: false });

        url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${DIFFERENT_NAME_ON_POLICY}`;

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
        currentHref: `${INSURANCE_ROOT}/${referenceNumber}${DIFFERENT_NAME_ON_POLICY}`,
        backLink: `${INSURANCE_ROOT}/${referenceNumber}${NAME_ON_POLICY}`,
      });
    });

    describe('page tests', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it('renders a heading caption', () => {
        cy.checkText(headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
      });

      it('renders a hint', () => {
        cy.checkText(fieldSelector(POLICY_CONTACT_DETAIL).hint(), CONTENT_STRINGS.HINT);
      });

      it(`should render ${FIRST_NAME} field and be prepopulated`, () => {
        const fieldId = FIRST_NAME;
        const field = fieldSelector(fieldId);

        field.input().should('exist');

        cy.checkText(field.label(), ACCOUNT_FIELDS[fieldId].LABEL);
      });

      it(`should render ${LAST_NAME} field and be prepopulated`, () => {
        const fieldId = LAST_NAME;
        const field = fieldSelector(fieldId);

        field.input().should('exist');

        cy.checkText(field.label(), ACCOUNT_FIELDS[fieldId].LABEL);
      });

      it(`should render ${EMAIL} field and be prepopulated`, () => {
        const fieldId = EMAIL;
        const field = fieldSelector(fieldId);

        field.input().should('exist');

        cy.checkText(field.label(), ACCOUNT_FIELDS[fieldId].LABEL);
      });

      it(`should render ${POSITION} field and should not be prepopulated`, () => {
        const fieldId = POSITION;
        const field = fieldSelector(fieldId);

        field.input().should('exist');

        cy.checkText(field.label(), FIELDS.DIFFERENT_NAME_ON_POLICY[fieldId].LABEL);
      });
    });

    describe('form submission', () => {
      it(`should redirect to ${PRE_CREDIT_PERIOD}`, () => {
        cy.navigateToUrl(url);

        cy.completeAndSubmitDifferentNameOnPolicyForm({});

        const expectedUrl = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${PRE_CREDIT_PERIOD}`;
        cy.assertUrl(expectedUrl);
      });

      it('should should have submitted values when navigating back to page', () => {
        cy.navigateToUrl(url);

        cy.assertDifferentNameOnPolicyFieldValues({
          expectedFirstName: POLICY_CONTACT[FIRST_NAME],
          expectedLastName: POLICY_CONTACT[LAST_NAME],
          expectedEmail: POLICY_CONTACT[EMAIL],
          expectedPosition: POLICY_CONTACT[POSITION],
        });
      });
    });
  },
);
