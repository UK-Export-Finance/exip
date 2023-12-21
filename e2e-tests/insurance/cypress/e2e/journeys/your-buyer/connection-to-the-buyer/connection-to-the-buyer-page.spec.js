import {
  headingCaption, saveAndBackButton, field, yesRadio, noRadio, yesNoRadioHint, yesRadioInput, noRadioInput,
} from '../../../../../../pages/shared';
import { BUTTONS, PAGES } from '../../../../../../content-strings';
import { FIELD_VALUES } from '../../../../../../constants';
import { YOUR_BUYER as FIELD_IDS } from '../../../../../../constants/field-ids/insurance/your-buyer';
import { INSURANCE_ROUTES, INSURANCE_ROOT } from '../../../../../../constants/routes/insurance';
import { YOUR_BUYER_FIELDS } from '../../../../../../content-strings/fields/insurance/your-buyer';
import application from '../../../../../../fixtures/application';

const CONTENT_STRINGS = PAGES.INSURANCE.YOUR_BUYER.CONNECTION_WITH_BUYER;

const {
  WORKING_WITH_BUYER: {
    CONNECTION_WITH_BUYER,
    CONNECTION_WITH_BUYER_DESCRIPTION,
  },
} = FIELD_IDS;

const {
  YOUR_BUYER: { COMPANY_OR_ORGANISATION, CONNECTION_WITH_BUYER: CONNECTION_WITH_BUYER_ROUTE, WORKING_WITH_BUYER },
} = INSURANCE_ROUTES;

const FIELDS = YOUR_BUYER_FIELDS.WORKING_WITH_BUYER;

const baseUrl = Cypress.config('baseUrl');

const { BUYER } = application;

context('Insurance - Your Buyer - Connection with the buyer - As an exporter, I want to provide the details on trading history with the buyer of my export trade, So that UKEF can gain clarity on whether I have  trading history with the buyer as part of due diligence', () => {
  let referenceNumber;
  let url;
  let workingWithBuyerUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsuranceYourBuyerSection({});

      cy.completeAndSubmitCompanyOrOrganisationForm({});

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${CONNECTION_WITH_BUYER_ROUTE}`;
      workingWithBuyerUrl = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${WORKING_WITH_BUYER}`;

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
          yesRadioInput().click();
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
      cy.checkText(saveAndBackButton(), BUTTONS.SAVE_AND_BACK);
    });

    describe('form submission', () => {
      describe(`when submitting the form with ${CONNECTION_WITH_BUYER} as "no"`, () => {
        it(`should redirect to ${WORKING_WITH_BUYER} page`, () => {
          cy.completeAndSubmitConnectionToTheBuyerForm({});

          cy.assertUrl(workingWithBuyerUrl);
        });

        describe('when going back to the page', () => {
          it('should have the submitted values', () => {
            cy.navigateToUrl(url);

            noRadioInput().should('be.checked');
          });
        });
      });

      describe(`when submitting the form with ${CONNECTION_WITH_BUYER} as "yes"`, () => {
        it(`should redirect to ${WORKING_WITH_BUYER} page`, () => {
          cy.completeAndSubmitConnectionToTheBuyerForm({ hasConnectionToBuyer: true });

          cy.assertUrl(workingWithBuyerUrl);
        });

        describe('when going back to the page', () => {
          it('should have the submitted values', () => {
            cy.navigateToUrl(url);

            yesRadioInput().should('be.checked');
            cy.checkText(field(CONNECTION_WITH_BUYER_DESCRIPTION).textarea(), BUYER[CONNECTION_WITH_BUYER_DESCRIPTION]);
          });
        });
      });
    });
  });
});
