import { headingCaption, saveAndBackButton, submitButton } from '../../../../../../pages/shared';
import partials from '../../../../../../partials';
import { workingWithBuyerPage } from '../../../../../../pages/insurance/your-buyer';
import { BUTTONS, PAGES } from '../../../../../../content-strings';
import { ROUTES } from '../../../../../../constants';
import { YOUR_BUYER as FIELD_IDS } from '../../../../../../constants/field-ids/insurance/your-buyer';
import { INSURANCE_ROOT } from '../../../../../../constants/routes/insurance';
import { YOUR_BUYER_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/your-buyer';

const CONTENT_STRINGS = PAGES.INSURANCE.YOUR_BUYER.WORKING_WITH_BUYER;

const {
  WORKING_WITH_BUYER: {
    CONNECTED_WITH_BUYER,
    TRADED_WITH_BUYER,
  },
} = FIELD_IDS;

const {
  YOUR_BUYER: { COMPANY_OR_ORGANISATION, WORKING_WITH_BUYER, CHECK_YOUR_ANSWERS },
} = ROUTES.INSURANCE;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.buyer;

context('Insurance - Your Buyer - Working with buyer page - As an exporter, I want to confirm my buyer details', () => {
  let referenceNumber;
  let url;
  let checkYourAnswersUrl;

  before(() => {
    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumber = refNumber;

      task.link().click();

      cy.completeAndSubmitCompanyOrOrganisationForm({});

      url = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${WORKING_WITH_BUYER}`;
      checkYourAnswersUrl = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;

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
      currentHref: `${INSURANCE_ROOT}/${referenceNumber}${WORKING_WITH_BUYER}`,
      backLink: `${INSURANCE_ROOT}/${referenceNumber}${COMPANY_OR_ORGANISATION}`,
      lightHouseThresholds: {
        // accessibility threshold is reduced here because
        // the radio component from design system has an invalid aria attribute.
        // this is out of our control
        accessibility: 90,
      },
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('renders a heading caption', () => {
      cy.checkText(headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
    });

    it(`renders an ${CONNECTED_WITH_BUYER} label, hint and radio buttons`, () => {
      const fieldId = CONNECTED_WITH_BUYER;
      const field = workingWithBuyerPage[fieldId];

      const labelCopy = FIELDS.WORKING_WITH_BUYER[fieldId].LABEL;

      field.label().should('exist');
      cy.checkText(field.label(), labelCopy);

      field.hint().should('exist');
      cy.checkText(field.hint(), FIELDS.WORKING_WITH_BUYER[fieldId].HINT);

      cy.checkAriaLabel(field.yesRadioInput(), `${labelCopy} Yes`);

      cy.checkAriaLabel(field.noRadioInput(), `${labelCopy} No`);
    });

    it(`renders an ${TRADED_WITH_BUYER} label, radio buttons and details section`, () => {
      const fieldId = TRADED_WITH_BUYER;
      const field = workingWithBuyerPage[fieldId];

      const labelCopy = FIELDS.WORKING_WITH_BUYER[fieldId].LABEL;

      field.label().should('exist');
      cy.checkText(field.label(), labelCopy);

      cy.checkAriaLabel(field.yesRadioInput(), `${labelCopy} Yes`);

      cy.checkAriaLabel(field.noRadioInput(), `${labelCopy} No`);

      field.details().should('exist');
      cy.checkText(field.details(), FIELDS.WORKING_WITH_BUYER[fieldId].DETAILS);
    });

    it('renders a `submit` button', () => {
      submitButton().should('exist');

      cy.checkText(saveAndBackButton(), BUTTONS.SAVE_AND_BACK);
    });

    it('renders a `save and back` button', () => {
      saveAndBackButton().should('exist');

      cy.checkText(saveAndBackButton(), BUTTONS.SAVE_AND_BACK);
    });

    describe('form submission', () => {
      describe('when submitting a fully filled form', () => {
        it(`should redirect to ${WORKING_WITH_BUYER} page`, () => {
          cy.completeAndSubmitWorkingWithBuyerForm({});

          cy.assertUrl(checkYourAnswersUrl);
        });
      });

      describe('when going back to the page', () => {
        it('should have the submitted values', () => {
          cy.navigateToUrl(url);

          workingWithBuyerPage[CONNECTED_WITH_BUYER].yesRadioInput().should('be.checked');
          workingWithBuyerPage[TRADED_WITH_BUYER].yesRadioInput().should('be.checked');
        });
      });
    });
  });
});
