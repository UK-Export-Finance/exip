import { headingCaption, noRadio, yesNoRadioHint, yesRadio } from '../../../../../../pages/shared';
import { ERROR_MESSAGES, PAGES } from '../../../../../../content-strings';
import { EXPORTER_BUSINESS_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/business';
import { FIELD_VALUES } from '../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { EXPORTER_BUSINESS as FIELD_IDS } from '../../../../../../constants/field-ids/insurance/business';

const CONTENT_STRINGS = PAGES.INSURANCE.EXPORTER_BUSINESS.CREDIT_CONTROL;

const { HAS_CREDIT_CONTROL: FIELD_ID } = FIELD_IDS;

const {
  ROOT,
  EXPORTER_BUSINESS: { CHECK_YOUR_ANSWERS, CREDIT_CONTROL, TURNOVER_ROOT },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context(
  'Insurance - Your business - Credit control page - answer `yes` - As an Exporter, I want to provide our late payment process  So that UKEF can have clarity on our credit control',
  () => {
    let referenceNumber;
    let url;
    let checkYourAnswersUrl;

    before(() => {
      cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
        referenceNumber = refNumber;

        cy.completeAndSubmitYourBusinessForms({ stopSubmittingAfter: 'turnover' });

        url = `${baseUrl}${ROOT}/${referenceNumber}${CREDIT_CONTROL}`;
        checkYourAnswersUrl = `${baseUrl}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;

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
        currentHref: `${ROOT}/${referenceNumber}${CREDIT_CONTROL}`,
        backLink: `${ROOT}/${referenceNumber}${TURNOVER_ROOT}`,
      });
    });

    describe('page tests', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it('renders a heading caption', () => {
        cy.checkText(headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
      });

      it('renders a `yes` radio button with a hint', () => {
        yesRadio().input().should('exist');

        cy.checkText(yesRadio().label(), FIELD_VALUES.YES);
        cy.checkText(yesNoRadioHint(), FIELDS[FIELD_ID].HINT);

        cy.checkRadioInputYesAriaLabel(CONTENT_STRINGS.PAGE_TITLE);
      });

      it('renders a `no` radio button', () => {
        cy.checkText(noRadio().label(), FIELD_VALUES.NO);

        cy.checkRadioInputNoAriaLabel(CONTENT_STRINGS.PAGE_TITLE);
      });
    });

    describe('form submission', () => {
      describe('when submitting an empty form', () => {
        beforeEach(() => {
          cy.navigateToUrl(url);

          cy.clickSubmitButton();
        });

        it('should render validation errors', () => {
          cy.submitAndAssertRadioErrors({
            field: yesRadio(FIELD_ID),
            expectedErrorMessage: ERROR_MESSAGES.INSURANCE.EXPORTER_BUSINESS[FIELD_ID].IS_EMPTY,
          });
        });
      });

      describe('when submitting the answer as `yes`', () => {
        it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
          cy.navigateToUrl(url);

          cy.completeAndSubmitCreditControlForm({});

          cy.assertUrl(checkYourAnswersUrl);
        });
      });
    });

    describe('when going back to the page', () => {
      it('should have the submitted values', () => {
        cy.navigateToUrl(url);

        cy.assertYesRadioOptionIsChecked();
      });
    });
  },
);
