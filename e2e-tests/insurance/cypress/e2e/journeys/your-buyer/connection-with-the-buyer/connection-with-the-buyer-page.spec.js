import { field as fieldSelector, headingCaption, yesRadio, noRadio } from '../../../../../../pages/shared';
import { connectionWithBuyerPage } from '../../../../../../pages/insurance/your-buyer';
import { PAGES } from '../../../../../../content-strings';
import { FIELD_VALUES } from '../../../../../../constants';
import { YOUR_BUYER as FIELD_IDS } from '../../../../../../constants/field-ids/insurance/your-buyer';
import { INSURANCE_ROUTES, INSURANCE_ROOT } from '../../../../../../constants/routes/insurance';
import { YOUR_BUYER_FIELDS as FIELD_STRINGS } from '../../../../../../content-strings/fields/insurance/your-buyer';

const CONTENT_STRINGS = PAGES.INSURANCE.YOUR_BUYER.CONNECTION_WITH_BUYER;

const { CONNECTION_WITH_BUYER, CONNECTION_WITH_BUYER_DESCRIPTION } = FIELD_IDS;

const {
  YOUR_BUYER: { COMPANY_OR_ORGANISATION, CONNECTION_WITH_BUYER: CONNECTION_WITH_BUYER_ROUTE, TRADED_WITH_BUYER },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context(
  'Insurance - Your buyer - Connection with the buyer - As an exporter, I want to provide the details on trading history with the buyer of my export trade, So that UKEF can gain clarity on whether I have  trading history with the buyer as part of due diligence',
  () => {
    let referenceNumber;
    let url;
    let tradedWithBuyerUrl;

    before(() => {
      cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
        referenceNumber = refNumber;

        cy.completeAndSubmitYourBuyerForms({ formToStopAt: 'companyOrOrganisation' });

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
          const { hint } = connectionWithBuyerPage[CONNECTION_WITH_BUYER];

          const { HINT } = FIELD_STRINGS[CONNECTION_WITH_BUYER];

          cy.checkText(fieldSelector(CONNECTION_WITH_BUYER).hintIntro(), HINT.INTRO);

          cy.checkText(hint.list.item1(), HINT.LIST[0]);
          cy.checkText(hint.list.item2(), HINT.LIST[1]);
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
            fieldSelector(fieldId).label().should('not.be.visible');
          });

          it('should not render a visible textarea', () => {
            fieldSelector(fieldId).textarea().should('not.be.visible');
          });
        });

        describe(`when clicking the 'yes' ${CONNECTION_WITH_BUYER} radio`, () => {
          beforeEach(() => {
            cy.clickYesRadioInput();
          });

          it('should render a textarea', () => {
            const fieldStrings = FIELD_STRINGS[fieldId];

            cy.assertTextareaRendering({
              fieldId,
              expectedLabel: fieldStrings.LABEL,
              maximumCharacters: fieldStrings.MAXIMUM,
            });
          });
        });
      });

      describe('form submission', () => {
        describe(`when submitting the form with ${CONNECTION_WITH_BUYER} as "no"`, () => {
          it(`should redirect to ${TRADED_WITH_BUYER} page`, () => {
            cy.completeAndSubmitConnectionWithTheBuyerForm({});

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
            cy.completeAndSubmitConnectionWithTheBuyerForm({ hasConnectionToBuyer: true });

            cy.assertUrl(tradedWithBuyerUrl);
          });

          describe('when going back to the page', () => {
            it('should have the submitted values', () => {
              cy.navigateToUrl(url);

              cy.assertConnectionWithBuyerFieldValues();
            });
          });
        });
      });
    });
  },
);
