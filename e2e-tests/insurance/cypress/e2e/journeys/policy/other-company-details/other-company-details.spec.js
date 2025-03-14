import { field as fieldSelector, headingCaption } from '../../../../../../pages/shared';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../constants/field-ids/insurance/policy';
import { PAGES } from '../../../../../../content-strings';
import { POLICY_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/policy';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { assertCountryAutocompleteInput } from '../../../../../../shared-test-assertions';

const CONTENT_STRINGS = PAGES.INSURANCE.POLICY.OTHER_COMPANY_DETAILS;

const {
  ROOT,
  POLICY: { ANOTHER_COMPANY, OTHER_COMPANY_DETAILS, BROKER_ROOT },
} = INSURANCE_ROUTES;

const {
  REQUESTED_JOINTLY_INSURED_PARTY: { COMPANY_NAME, COMPANY_NUMBER, COUNTRY_CODE },
} = POLICY_FIELD_IDS;

const { REQUESTED_JOINTLY_INSURED_PARTY: FIELD_STRINGS } = FIELDS;

const baseUrl = Cypress.config('baseUrl');

const story =
  'As an exporter, I want to inform UKEF of any other company I would like to include on my policy, So that cover is available for all appropriate parties';

context(`Insurance - Policy - Other company details page - ${story}`, () => {
  let referenceNumber;
  let url;
  let brokerUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      // go to the page we want to test.
      cy.completeAndSubmitPolicyForms({ stopSubmittingAfter: 'anotherCompany', otherCompanyInvolved: true });

      url = `${baseUrl}${ROOT}/${referenceNumber}${OTHER_COMPANY_DETAILS}`;
      brokerUrl = `${baseUrl}${ROOT}/${referenceNumber}${BROKER_ROOT}`;

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
      currentHref: `${ROOT}/${referenceNumber}${OTHER_COMPANY_DETAILS}`,
      backLink: `${ROOT}/${referenceNumber}${ANOTHER_COMPANY}`,
      hasAForm: false,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('renders a heading caption', () => {
      cy.checkText(headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
    });

    it(`renders ${COMPANY_NAME} label and input`, () => {
      const fieldId = COMPANY_NAME;
      const field = fieldSelector(fieldId);

      cy.checkText(field.label(), FIELD_STRINGS[fieldId].LABEL);
      field.input().should('exist');
    });

    describe(`searchable autocomplete input (${COUNTRY_CODE})`, () => {
      assertCountryAutocompleteInput({
        fieldId: COUNTRY_CODE,
        assertFilteredCisCountries: false,
      });
    });

    it(`renders ${COMPANY_NUMBER} label and input`, () => {
      const fieldId = COMPANY_NUMBER;
      const field = fieldSelector(fieldId);

      cy.checkText(field.label(), FIELD_STRINGS[fieldId].LABEL);
      field.input().should('exist');
    });
  });

  describe('form submission', () => {
    it(`should redirect to ${BROKER_ROOT}`, () => {
      cy.navigateToUrl(url);

      cy.completeAndSubmitOtherCompanyDetailsForm({});

      cy.assertUrl(brokerUrl);
    });

    describe('when going back to the page', () => {
      it('should have the submitted values', () => {
        cy.navigateToUrl(url);

        cy.assertOtherCompanyDetailsFieldValues({});
      });
    });
  });
});
