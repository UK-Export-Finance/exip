import { intro, field as fieldSelector, radios } from '../../../../../../pages/shared';
import { brokerAddressesPage } from '../../../../../../pages/insurance/policy';
import { PAGES } from '../../../../../../content-strings';
import { POLICY_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/policy';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../constants/field-ids/insurance/policy';

const {
  PAGE_TITLE,
  INTRO: { ADDRESS, FOUND_FOR, SEPARATOR, SEARCH_AGAIN },
} = PAGES.INSURANCE.POLICY.BROKER_ADDRESSES;

const {
  ROOT,
  POLICY: { BROKER_ADDRESSES_ROOT, BROKER_DETAILS_ROOT },
} = INSURANCE_ROUTES;

const {
  BROKER_ADDRESSES: { SELECT_THE_ADDRESS: FIELD_ID },
} = POLICY_FIELD_IDS;

const { BROKER_ADDRESSES: FIELD_STRINGS } = FIELDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Broker addresses page', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      // go to the page we want to test.
      url = `${baseUrl}${ROOT}/${referenceNumber}${BROKER_ADDRESSES_ROOT}`;

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
      pageTitle: PAGE_TITLE,
      currentHref: `${ROOT}/${referenceNumber}${BROKER_ADDRESSES_ROOT}`,
      backLink: `${ROOT}/${referenceNumber}${BROKER_ADDRESSES_ROOT}#`,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('renders a intro copy', () => {
      intro()
        .invoke('text')
        .then((text) => {
          expect(text.trim()).includes(`1 ${ADDRESS} ${FOUND_FOR} `);
          expect(text.trim()).includes('W1A 1AA');
          expect(text.trim()).includes(` ${SEPARATOR} `);
          expect(text.trim()).includes('WOGAN HOUSE.');
          expect(text.trim()).includes(SEARCH_AGAIN);
        });
    });

    it('renders a `search again` link', () => {
      const expectedHref = `${ROOT}/${referenceNumber}${BROKER_DETAILS_ROOT}`;

      cy.checkLink(brokerAddressesPage.searchAgainLink(), expectedHref, SEARCH_AGAIN);
    });

    describe(FIELD_ID, () => {
      const field = fieldSelector(FIELD_ID);

      it('renders a legend', () => {
        cy.checkText(field.label(), FIELD_STRINGS[FIELD_ID].LABEL);
      });

      it('renders an `address` radio label and input', () => {
        const expectedFieldValue = 'BRITISH BROADCASTING CORPORATION WOGAN HOUSE PORTLAND PLACE';

        const { option } = radios(FIELD_ID, expectedFieldValue);

        cy.checkText(option.label(), expectedFieldValue);
      });
    });
  });
});
