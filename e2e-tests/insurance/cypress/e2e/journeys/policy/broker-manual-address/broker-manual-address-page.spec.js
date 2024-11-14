import { headingCaption } from '../../../../../../partials';
import { field } from '../../../../../../pages/shared';
import { brokerManualAddressPage } from '../../../../../../pages/insurance/policy';
import { PAGES } from '../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../constants/field-ids/insurance/policy';
import { POLICY_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/policy';
import mockApplication from '../../../../../../fixtures/application';

const CONTENT_STRINGS = PAGES.INSURANCE.POLICY.BROKER_MANUAL_ADDRESS;

const {
  BROKER_DETAILS: { NAME, FULL_ADDRESS: FIELD_ID },
} = POLICY_FIELD_IDS;

const {
  ROOT,
  POLICY: { BROKER_MANUAL_ADDRESS_ROOT },
} = INSURANCE_ROUTES;

const { BROKER_MANUAL_ADDRESS: FIELD_STRINGS } = FIELDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Broker manual address page - As an exporter, ... TODO', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      // go to the page we want to test.
      cy.completeAndSubmitPolicyForms({ stopSubmittingAfter: 'brokerDetails', usingBroker: true });

      url = `${baseUrl}${ROOT}/${referenceNumber}${BROKER_MANUAL_ADDRESS_ROOT}`;

      // TODO: EMS-3973 - remove this
      cy.navigateToUrl(url);

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
      currentHref: `${ROOT}/${referenceNumber}${BROKER_MANUAL_ADDRESS_ROOT}`,
      backLink: `${ROOT}/${referenceNumber}${BROKER_MANUAL_ADDRESS_ROOT}#`,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('renders a heading caption', () => {
      cy.checkText(headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
    });

    it('renders intro text', () => {
      cy.checkIntroText(CONTENT_STRINGS.INTRO);
    });

    it('renders `broker name` text', () => {
      cy.checkText(brokerManualAddressPage.brokerName(), mockApplication.BROKER[NAME]);
    });

    it(`renders ${FIELD_ID} textarea`, () => {
      const fieldId = FIELD_ID;
      const fieldStrings = FIELD_STRINGS[fieldId];

      // TODO: EMS-3975 - remove this,
      // after FULL_ADDRESS has been removed from BROKER_DETAILS
      field(FIELD_ID).textarea().clear();

      cy.assertTextareaRendering({
        fieldId,
        expectedLabel: fieldStrings.LABEL,
        maximumCharacters: fieldStrings.MAXIMUM,
      });
    });
  });
});
