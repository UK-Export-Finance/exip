import { saveAndBackButton } from '../../../../pages/shared';
import partials from '../../../../partials';
import { companyOrOrganisationPage } from '../../../../pages/insurance/your-buyer';
import { TASKS } from '../../../../../../content-strings';
import { ROUTES } from '../../../../../../constants';
import { YOUR_BUYER as FIELD_IDS } from '../../../../../../constants/field-ids/insurance/your-buyer';
import { INSURANCE_ROOT } from '../../../../../../constants/routes/insurance';
import application from '../../../../../fixtures/application';
import countries from '../../../../../fixtures/countries';

const {
  COMPANY_OR_ORGANISATION: {
    NAME,
    ADDRESS,
    COUNTRY,
    REGISTRATION_NUMBER,
    WEBSITE,
    FIRST_NAME,
    LAST_NAME,
    POSITION,
    EMAIL,
    CAN_CONTACT_BUYER,
  },
} = FIELD_IDS;

const {
  ROOT,
  ALL_SECTIONS,
  YOUR_BUYER: {
    COMPANY_OR_ORGANISATION,
  },
} = ROUTES.INSURANCE;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.buyer;

const { BUYER } = application;
const countryToSelect = countries[0].isoCode;

context('Insurance - Your buyer - Company or organisation - Save and back', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.navigateToUrl(ROUTES.INSURANCE.START);

    cy.submitInsuranceEligibilityAndStartApplication();

    task.link().click();

    cy.getReferenceNumber().then((id) => {
      referenceNumber = id;

      url = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${COMPANY_OR_ORGANISATION}`;

      cy.url().should('eq', url);
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('exip-session');
  });

  describe('when submitting an empty form', () => {
    it(`should redirect to ${ALL_SECTIONS}`, () => {
      saveAndBackButton().click();

      cy.url().should('eq', `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${ALL_SECTIONS}`);
    });

    it('should retain the `your buyer` task status as `not started yet`', () => {
      const expected = TASKS.STATUS.NOT_STARTED_YET;
      cy.checkText(task.status(), expected);
    });
  });

  describe('when submitting a partially entered form', () => {
    it(`should redirect to ${ALL_SECTIONS}`, () => {
      cy.navigateToUrl(url);

      companyOrOrganisationPage[CAN_CONTACT_BUYER].yesRadioInput().click();

      cy.keyboardInput(companyOrOrganisationPage[NAME].input(), BUYER[NAME]);

      saveAndBackButton().click();

      cy.url().should('eq', `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${ALL_SECTIONS}`);
    });

    it('should retain the `your buyer` task status as `in progress`', () => {
      const expected = TASKS.STATUS.IN_PROGRESS;
      cy.checkText(task.status(), expected);
    });

    it(`should retain the ${NAME} and ${CAN_CONTACT_BUYER} input on the page and the other fields should be empty`, () => {
      task.link().click();

      companyOrOrganisationPage[CAN_CONTACT_BUYER].yesRadioInput().should('be.checked');
      cy.checkValue(companyOrOrganisationPage[NAME], BUYER[NAME]);
      cy.checkValue(companyOrOrganisationPage[ADDRESS], '');
      cy.checkValue(companyOrOrganisationPage[REGISTRATION_NUMBER], '');
      cy.checkValue(companyOrOrganisationPage[WEBSITE], '');
      cy.checkValue(companyOrOrganisationPage[FIRST_NAME], '');
      cy.checkValue(companyOrOrganisationPage[LAST_NAME], '');
      cy.checkValue(companyOrOrganisationPage[POSITION], '');
      cy.checkValue(companyOrOrganisationPage[EMAIL], '');
    });
  });

  describe('when submitting a fully filled form', () => {
    it(`should redirect to ${ALL_SECTIONS}`, () => {
      cy.navigateToUrl(url);

      cy.keyboardInput(companyOrOrganisationPage[NAME].input(), BUYER[NAME]);
      cy.keyboardInput(companyOrOrganisationPage[ADDRESS].input(), BUYER[ADDRESS]);
      cy.keyboardInput(companyOrOrganisationPage[REGISTRATION_NUMBER].input(), BUYER[REGISTRATION_NUMBER]);
      cy.keyboardInput(companyOrOrganisationPage[WEBSITE].input(), BUYER[WEBSITE]);
      cy.keyboardInput(companyOrOrganisationPage[FIRST_NAME].input(), BUYER[FIRST_NAME]);
      cy.keyboardInput(companyOrOrganisationPage[LAST_NAME].input(), BUYER[LAST_NAME]);
      cy.keyboardInput(companyOrOrganisationPage[POSITION].input(), BUYER[POSITION]);
      cy.keyboardInput(companyOrOrganisationPage[EMAIL].input(), BUYER[EMAIL]);
      companyOrOrganisationPage[CAN_CONTACT_BUYER].yesRadioInput().click();
      companyOrOrganisationPage[COUNTRY].input().select(countryToSelect);

      saveAndBackButton().click();

      cy.url().should('eq', `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${ALL_SECTIONS}`);
    });

    it('should retain the `your buyer` task status as `in progress`', () => {
      const expected = TASKS.STATUS.IN_PROGRESS;
      cy.checkText(task.status(), expected);
    });

    it('should retain all inputs on the page', () => {
      task.link().click();

      companyOrOrganisationPage[CAN_CONTACT_BUYER].yesRadioInput().should('be.checked');
      cy.checkValue(companyOrOrganisationPage[ADDRESS], BUYER[ADDRESS]);
      cy.checkValue(companyOrOrganisationPage[REGISTRATION_NUMBER], BUYER[REGISTRATION_NUMBER]);
      cy.checkValue(companyOrOrganisationPage[WEBSITE], BUYER[WEBSITE]);
      cy.checkValue(companyOrOrganisationPage[FIRST_NAME], BUYER[FIRST_NAME]);
      cy.checkValue(companyOrOrganisationPage[LAST_NAME], BUYER[LAST_NAME]);
      cy.checkValue(companyOrOrganisationPage[POSITION], BUYER[POSITION]);
    });
  });
});
