import {
  headingCaption, field, yesRadio, noRadio, yesNoRadioHint,
} from '../../../../../../pages/shared';
import { PAGES } from '../../../../../../content-strings';
import { FIELD_VALUES } from '../../../../../../constants';
import { YOUR_BUYER as FIELD_IDS } from '../../../../../../constants/field-ids/insurance/your-buyer';
import { INSURANCE_ROUTES, INSURANCE_ROOT } from '../../../../../../constants/routes/insurance';
import { YOUR_BUYER_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/your-buyer';
import application from '../../../../../../fixtures/application';

const CONTENT_STRINGS = PAGES.INSURANCE.YOUR_BUYER.CONNECTION_WITH_BUYER;

const {
  CONNECTION_WITH_BUYER,
  CONNECTION_WITH_BUYER_DESCRIPTION,
} = FIELD_IDS;

const {
  YOUR_BUYER: { COMPANY_OR_ORGANISATION, CONNECTION_WITH_BUYER: CONNECTION_WITH_BUYER_ROUTE, TRADED_WITH_BUYER },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

const { BUYER } = application;

context('Insurance - Your Buyer - Connection with the buyer - As an exporter, I want to provide the details on trading history with the buyer of my export trade, So that UKEF can gain clarity on whether I have  trading history with the buyer as part of due diligence', () => {
  let referenceNumber;
  let url;
  let tradedWithBuyerUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsuranceYourBuyerSection({});

      cy.completeAndSubmitCompanyOrOrganisationForm({});

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${CONNECTION_WITH_BUYER_ROUTE}`;
      tradedWithBuyerUrl = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${TRADED_WITH_BUYER}`;

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
      currentHref: `${INSURANCE_ROOT}/${referenceNumber}${CONNECTION_WITH_BUYER_ROUTE}`,
      backLink: `${INSURANCE_ROOT}/${referenceNumber}${COMPANY_OR_ORGANISATION}`,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('renders a heading caption', () => {
      cy.checkText(headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
    });

    describe(CONNECTION_WITH_BUYER, () => {
      it('renders a hint', () => {
        cy.checkText(yesNoRadioHint(), CONTENT_STRINGS.HINT);
      });

      it('renders `yes` and `no` radio buttons in the correct order', () => {
        cy.assertYesNoRadiosOrder({ noRadioFirst: true });
      });

      it('renders `yes` radio button', () => {
        yesRadio().input().should('exist');

        cy.checkText(yesRadio().label(), FIELD_VALUES.YES);

        cy.checkRadioInputYesAriaLabel(CONTENT_STRINGS.PAGE_TITLE);
      });

      it('renders `no` radio button', () => {
        noRadio().input().should('exist');

        cy.checkText(noRadio().label(), FIELD_VALUES.NO);

        cy.checkRadioInputNoAriaLabel(CONTENT_STRINGS.PAGE_TITLE);
      });
    });

    describe(CONNECTION_WITH_BUYER_DESCRIPTION, () => {
      const fieldId = CONNECTION_WITH_BUYER_DESCRIPTION;

      describe(`when not selecting a ${CONNECTION_WITH_BUYER} radio`, () => {
        it('should not render a label', () => {
          field(fieldId).label().should('not.be.visible');
        });

        it('should not render a visible input', () => {
          field(fieldId).textarea().should('not.be.visible');
        });
      });

      describe(`when clicking the 'yes' ${CONNECTION_WITH_BUYER} radio`, () => {
        beforeEach(() => {
          cy.clickYesRadioInput(0);
        });

        it('renders a label', () => {
          cy.checkText(field(fieldId).label(), FIELDS[fieldId].LABEL);
        });

        it('renders a visible input', () => {
          field(fieldId).textarea().should('be.visible');
        });
      });
    });

    it('renders a `save and back` button', () => {
      cy.assertSaveAndBackButton();
    });

    describe('form submission', () => {
      describe(`when submitting the form with ${CONNECTION_WITH_BUYER} as "no"`, () => {
        it(`should redirect to ${TRADED_WITH_BUYER} page`, () => {
          cy.completeAndSubmitConnectionToTheBuyerForm({});

          cy.assertUrl(tradedWithBuyerUrl);
        });

        describe('when going back to the page', () => {
          it('should have the submitted values', () => {
            cy.navigateToUrl(url);

            cy.assertNoRadioOptionIsChecked();
          });
        });
      });

      describe(`when submitting the form with ${CONNECTION_WITH_BUYER} as "yes"`, () => {
        it(`should redirect to ${TRADED_WITH_BUYER} page`, () => {
          cy.completeAndSubmitConnectionToTheBuyerForm({ hasConnectionToBuyer: true });

          cy.assertUrl(tradedWithBuyerUrl);
        });

        describe('when going back to the page', () => {
          it('should have the submitted values', () => {
            cy.navigateToUrl(url);

            cy.assertYesRadioOptionIsChecked();
            cy.checkText(field(CONNECTION_WITH_BUYER_DESCRIPTION).textarea(), BUYER[CONNECTION_WITH_BUYER_DESCRIPTION]);
          });
        });
      });
    });
  });
});
