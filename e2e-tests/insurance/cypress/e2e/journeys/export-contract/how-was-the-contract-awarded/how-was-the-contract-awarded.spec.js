import { field as fieldSelector, headingCaption, radios } from '../../../../../../pages/shared';
import { EXPORT_CONTRACT_AWARD_METHOD } from '../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { PAGES } from '../../../../../../content-strings';
import { EXPORT_CONTRACT_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance';
import { EXPORT_CONTRACT as EXPORT_CONTRACT_FIELD_IDS } from '../../../../../../constants/field-ids/insurance/export-contract';

const { OPEN_TENDER, NEGOTIATED_CONTRACT, DIRECT_AWARD, COMPETITIVE_BIDDING, OTHER } = EXPORT_CONTRACT_AWARD_METHOD;

const CONTENT_STRINGS = PAGES.INSURANCE.EXPORT_CONTRACT.HOW_WAS_THE_CONTRACT_AWARDED;

const {
  ROOT,
  EXPORT_CONTRACT: { ROOT: EXPORT_CONTRACT_ROOT, ABOUT_GOODS_OR_SERVICES, HOW_WAS_THE_CONTRACT_AWARDED },
} = INSURANCE_ROUTES;

const {
  HOW_WAS_THE_CONTRACT_AWARDED: { AWARD_METHOD, OTHER_AWARD_METHOD },
} = EXPORT_CONTRACT_FIELD_IDS;

const AWARD_METHOD_OPTIONS = FIELDS.HOW_WAS_THE_CONTRACT_AWARDED[AWARD_METHOD].OPTIONS;

const baseUrl = Cypress.config('baseUrl');

context(
  'Insurance - Export contract - How was the contract awarded page - As a Legal adviser, I want to understand how the contract was awarded, So that I can assure UKEF adheres to due diligence procedures',
  () => {
    let referenceNumber;
    let url;
    let aboutGoodsOrServicesUrl;

    before(() => {
      cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
        referenceNumber = refNumber;

        // go to the page we want to test.
        cy.startInsuranceExportContractSection({});

        url = `${baseUrl}${ROOT}/${referenceNumber}${HOW_WAS_THE_CONTRACT_AWARDED}`;
        aboutGoodsOrServicesUrl = `${baseUrl}${ROOT}/${referenceNumber}${ABOUT_GOODS_OR_SERVICES}`;

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
        currentHref: `${ROOT}/${referenceNumber}${HOW_WAS_THE_CONTRACT_AWARDED}`,
        backLink: `${ROOT}/${referenceNumber}${EXPORT_CONTRACT_ROOT}`,
      });
    });

    describe('page tests', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it('renders a heading caption', () => {
        cy.checkText(headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
      });

      it(`renders an ${OPEN_TENDER.VALUE} radio`, () => {
        const selector = radios(AWARD_METHOD_OPTIONS.OPEN_TENDER.ID).option;

        cy.checkText(selector.label(), OPEN_TENDER.VALUE);
        cy.checkValue(selector, OPEN_TENDER.DB_ID);
      });

      it(`renders a ${NEGOTIATED_CONTRACT.VALUE} radio`, () => {
        const selector = radios(AWARD_METHOD_OPTIONS.NEGOTIATED_CONTRACT.ID).option;

        cy.checkText(selector.label(), NEGOTIATED_CONTRACT.VALUE);
        cy.checkValue(selector, NEGOTIATED_CONTRACT.DB_ID);
      });

      it(`renders a ${DIRECT_AWARD.VALUE} radio`, () => {
        const selector = radios(AWARD_METHOD_OPTIONS.DIRECT_AWARD.ID).option;

        cy.checkText(selector.label(), DIRECT_AWARD.VALUE);
        cy.checkValue(selector, DIRECT_AWARD.DB_ID);
      });

      it(`renders a ${COMPETITIVE_BIDDING.VALUE} radio`, () => {
        const selector = radios(AWARD_METHOD_OPTIONS.COMPETITIVE_BIDDING.ID).option;

        cy.checkText(selector.label(), COMPETITIVE_BIDDING.VALUE);
        cy.checkValue(selector, COMPETITIVE_BIDDING.DB_ID);
      });

      it(`renders an ${OTHER.VALUE} radio`, () => {
        const selector = radios(AWARD_METHOD_OPTIONS.OTHER.ID).option;

        cy.checkText(selector.label(), OTHER.VALUE);
        cy.checkValue(selector, OTHER.DB_ID);
      });

      it(`should NOT display conditional "${OTHER_AWARD_METHOD}" section without selecting the "${OTHER.VALUE}" radio`, () => {
        fieldSelector(OTHER_AWARD_METHOD).input().should('not.be.visible');
      });

      it(`should display conditional "${OTHER_AWARD_METHOD}" section when selecting the "${OTHER.VALUE}" radio`, () => {
        radios(AWARD_METHOD_OPTIONS.OTHER.ID).option.label().click();

        fieldSelector(OTHER_AWARD_METHOD).input().should('be.visible');
      });

      it('renders a `save and back` button', () => {
        cy.assertSaveAndBackButton();
      });
    });

    describe('form submission', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
        cy.completeAndSubmitHowWasTheContractAwardedForm({});
      });

      it(`should redirect to ${ABOUT_GOODS_OR_SERVICES}`, () => {
        cy.assertUrl(aboutGoodsOrServicesUrl);
      });
    });

    describe(`when submitting with ${AWARD_METHOD} as ${OPEN_TENDER.VALUE} and going back to the page`, () => {
      it('should have the correct radios selected', () => {
        cy.navigateToUrl(url);
        cy.completeAndSubmitHowWasTheContractAwardedForm({ openTender: true });

        cy.clickBackLink();
        cy.assertHowWasTheContractAwardedFieldValues({ openTender: true });
      });
    });

    describe(`when submitting with ${AWARD_METHOD} as ${NEGOTIATED_CONTRACT.VALUE} and going back to the page`, () => {
      it('should have the correct radios selected', () => {
        cy.navigateToUrl(url);
        cy.completeAndSubmitHowWasTheContractAwardedForm({ negotiatedContract: true });

        cy.clickBackLink();
        cy.assertHowWasTheContractAwardedFieldValues({ negotiatedContract: true });
      });
    });

    describe(`when submitting with ${AWARD_METHOD} as ${DIRECT_AWARD.VALUE} and going back to the page`, () => {
      it('should have the correct radios selected', () => {
        cy.navigateToUrl(url);
        cy.completeAndSubmitHowWasTheContractAwardedForm({ directAward: true });

        cy.clickBackLink();
        cy.assertHowWasTheContractAwardedFieldValues({ directAward: true });
      });
    });

    describe(`when submitting with ${AWARD_METHOD} as ${COMPETITIVE_BIDDING.VALUE} and going back to the page`, () => {
      it('should have the correct radios selected', () => {
        cy.navigateToUrl(url);
        cy.completeAndSubmitHowWasTheContractAwardedForm({ competitiveBidding: true });

        cy.clickBackLink();
        cy.assertHowWasTheContractAwardedFieldValues({ competitiveBidding: true });
      });
    });

    describe(`when submitting with ${AWARD_METHOD} as ${OTHER.VALUE} and going back to the page`, () => {
      it('should have the correct radios selected', () => {
        cy.navigateToUrl(url);
        cy.completeAndSubmitHowWasTheContractAwardedForm({ otherMethod: true });

        cy.clickBackLink();
        cy.assertHowWasTheContractAwardedFieldValues({ otherMethod: true });
      });
    });
  },
);
