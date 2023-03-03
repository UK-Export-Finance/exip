import { saveAndBackButton, submitButton } from '../../../../pages/shared';
import partials from '../../../../partials';
import { workingWithBuyer } from '../../../../pages/insurance/your-buyer';
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

const { COMPANY_OR_ORGANISATION, WORKING_WITH_BUYER, CHECK_YOUR_ANSWERS } = ROUTES.INSURANCE.YOUR_BUYER;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.buyer;

context('Insurance - Your Buyer - Working with buyer page - As an exporter, I want to confirm my buyer details', () => {
  let referenceNumber;
  let url;
  let checkYourAnswersUrl;

  before(() => {
    cy.navigateToUrl(ROUTES.INSURANCE.START);

    cy.submitInsuranceEligibilityAndStartApplication();

    task.link().click();

    cy.completeAndSubmitCompanyOrOrganisationForm();

    cy.getReferenceNumber().then((id) => {
      referenceNumber = id;

      url = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${WORKING_WITH_BUYER}`;
      checkYourAnswersUrl = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;

      cy.url().should('eq', url);
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('exip-session');
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: `${INSURANCE_ROOT}/${referenceNumber}${WORKING_WITH_BUYER}`,
      backLink: `${INSURANCE_ROOT}/${referenceNumber}${COMPANY_OR_ORGANISATION}`,
      lightHouseThresholds: {
        'best-practices': 92,
        // accessibility threshold is reduced here because
        // the radio component from design system has an invalid aria attribute.
        // this is out of our control
        accessibility: 90,
      },
    });
  });

  it(`renders an ${CONNECTED_WITH_BUYER} label, hint and radio buttons`, () => {
    const fieldId = CONNECTED_WITH_BUYER;
    const field = workingWithBuyer[fieldId];

    field.label().should('exist');
    cy.checkText(field.label(), FIELDS.WORKING_WITH_BUYER[fieldId].LABEL);

    field.hint().should('exist');
    cy.checkText(field.hint(), FIELDS.WORKING_WITH_BUYER[fieldId].HINT);

    field.yesRadioInput().should('exist');
    field.noRadioInput().should('exist');
  });

  it(`renders an ${TRADED_WITH_BUYER} label, radio buttons and details section`, () => {
    const fieldId = TRADED_WITH_BUYER;
    const field = workingWithBuyer[fieldId];

    field.label().should('exist');
    cy.checkText(field.label(), FIELDS.WORKING_WITH_BUYER[fieldId].LABEL);

    field.yesRadioInput().should('exist');
    field.noRadioInput().should('exist');

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
        cy.completeAndSubmitWorkingWithBuyerForm();

        cy.url().should('eq', checkYourAnswersUrl);
      });
    });
  });
});
