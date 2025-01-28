import { headingCaption, body } from '../../../../../../pages/shared';
import { brokerZeroAddressesPage } from '../../../../../../pages/insurance/policy';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../constants/field-ids/insurance/policy';
import { PAGES } from '../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import mockApplication from '../../../../../../fixtures/application';

const CONTENT_STRINGS = PAGES.INSURANCE.POLICY.BROKER_ZERO_ADDRESSES;

const {
  ROOT,
  POLICY: { BROKER_DETAILS_ROOT, BROKER_ZERO_ADDRESSES_ROOT },
} = INSURANCE_ROUTES;

const {
  BROKER_DETAILS: { POSTCODE },
} = POLICY_FIELD_IDS;

const { outro } = brokerZeroAddressesPage;

const { BROKER } = mockApplication;

const baseUrl = Cypress.config('baseUrl');

context(
  "Insurance - Policy - Broker - zero addresses page - As an exporter, I want to provide UKEF with my broker's details, So that UKEF can communicate with the broker as needed whilst processing my application",
  () => {
    let referenceNumber;
    let url;

    before(() => {
      cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
        referenceNumber = refNumber;

        // go to the page we want to test.
        cy.completeAndSubmitPolicyForms({
          stopSubmittingAfter: 'brokerDetails',
          usingBroker: true,
          isBasedInUk: true,
          buildingNumberOrName: '123456789',
        });

        url = `${baseUrl}${ROOT}/${referenceNumber}${BROKER_ZERO_ADDRESSES_ROOT}`;

        cy.navigateToUrl(url);
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
        currentHref: `${ROOT}/${referenceNumber}${BROKER_ZERO_ADDRESSES_ROOT}`,
        backLink: `${ROOT}/${referenceNumber}${BROKER_ZERO_ADDRESSES_ROOT}#`,
        hasAForm: false,
        assertSaveAndBackButtonDoesNotExist: true,
      });
    });

    describe('page tests', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it('renders a heading caption', () => {
        cy.checkText(headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
      });

      it('renders body text', () => {
        cy.checkText(body(), CONTENT_STRINGS.BODY);
      });

      it('renders outro text', () => {
        cy.checkText(outro.couldNotFind(), CONTENT_STRINGS.OUTRO.COULD_NOT_FIND);
        cy.checkText(outro.postcode(), `${BROKER[POSTCODE]}.`);
        cy.checkText(outro.youCan(), CONTENT_STRINGS.OUTRO.YOU_CAN);
        cy.checkText(outro.or(), CONTENT_STRINGS.OUTRO.OR);
      });

      it('renders outro `search again` link', () => {
        const expectedHref = `${ROOT}/${referenceNumber}${BROKER_DETAILS_ROOT}`;

        cy.checkLink(outro.searchAgainLink(), expectedHref, CONTENT_STRINGS.OUTRO.SEARCH_AGAIN);
      });

      it('renders outro `enter manually` link', () => {
        cy.assertEnterAddressManuallyLink({
          referenceNumber,
          expectedText: CONTENT_STRINGS.OUTRO.ENTER_MANUALLY,
        });
      });
    });
  },
);
