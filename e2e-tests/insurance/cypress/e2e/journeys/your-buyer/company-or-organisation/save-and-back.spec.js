import { field, saveAndBackButton } from '../../../../../../pages/shared';
import partials from '../../../../../../partials';
import { companyOrOrganisationPage } from '../../../../../../pages/insurance/your-buyer';
import { TASKS } from '../../../../../../content-strings';
import { ROUTES } from '../../../../../../constants';
import { YOUR_BUYER as FIELD_IDS } from '../../../../../../constants/field-ids/insurance/your-buyer';
import { INSURANCE_ROOT } from '../../../../../../constants/routes/insurance';
import application from '../../../../../../fixtures/application';

const {
  COMPANY_OR_ORGANISATION: {
    NAME,
    ADDRESS,
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

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Your buyer - Company or organisation - Save and back', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsuranceYourBuyerSection({});

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${COMPANY_OR_ORGANISATION}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe('when submitting an empty form', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      saveAndBackButton().click();
    });

    it(`should redirect to ${ALL_SECTIONS}`, () => {
      cy.assertUrl(`${baseUrl}${ROOT}/${referenceNumber}${ALL_SECTIONS}`);
    });

    it('should retain the `your buyer` task status as `not started yet`', () => {
      const expected = TASKS.STATUS.NOT_STARTED_YET;
      cy.checkText(task.status(), expected);
    });
  });

  describe('when submitting a partially entered form', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      companyOrOrganisationPage[CAN_CONTACT_BUYER].yesRadioInput().click();

      cy.keyboardInput(field(NAME).input(), BUYER[NAME]);

      saveAndBackButton().click();
    });

    it(`should redirect to ${ALL_SECTIONS}`, () => {
      cy.assertUrl(`${baseUrl}${ROOT}/${referenceNumber}${ALL_SECTIONS}`);
    });

    it('should retain the `your buyer` task status as `in progress`', () => {
      const expected = TASKS.STATUS.IN_PROGRESS;
      cy.checkText(task.status(), expected);
    });

    it(`should retain the ${NAME} and ${CAN_CONTACT_BUYER} input on the page and the other fields should be empty`, () => {
      cy.startInsuranceYourBuyerSection({});

      cy.assertRadioOptionIsChecked(companyOrOrganisationPage[CAN_CONTACT_BUYER].yesRadioInput());
      cy.checkValue(field(NAME), BUYER[NAME]);
      cy.checkValue(field(ADDRESS), '');
      cy.checkValue(field(REGISTRATION_NUMBER), '');
      cy.checkValue(field(WEBSITE), '');
      cy.checkValue(field(FIRST_NAME), '');
      cy.checkValue(field(LAST_NAME), '');
      cy.checkValue(field(POSITION), '');
      cy.checkValue(field(EMAIL), '');
    });
  });

  describe('when submitting a fully filled form', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.keyboardInput(field(NAME).input(), BUYER[NAME]);
      cy.keyboardInput(field(ADDRESS).input(), BUYER[ADDRESS]);
      cy.keyboardInput(field(REGISTRATION_NUMBER).input(), BUYER[REGISTRATION_NUMBER]);
      cy.keyboardInput(field(WEBSITE).input(), BUYER[WEBSITE]);
      cy.keyboardInput(field(FIRST_NAME).input(), BUYER[FIRST_NAME]);
      cy.keyboardInput(field(LAST_NAME).input(), BUYER[LAST_NAME]);
      cy.keyboardInput(field(POSITION).input(), BUYER[POSITION]);
      cy.keyboardInput(field(EMAIL).input(), BUYER[EMAIL]);
      companyOrOrganisationPage[CAN_CONTACT_BUYER].yesRadioInput().click();

      saveAndBackButton().click();
    });

    it(`should redirect to ${ALL_SECTIONS}`, () => {
      cy.assertUrl(`${baseUrl}${ROOT}/${referenceNumber}${ALL_SECTIONS}`);
    });

    it('should retain the `your buyer` task status as `in progress`', () => {
      const expected = TASKS.STATUS.IN_PROGRESS;
      cy.checkText(task.status(), expected);
    });

    it('should retain all inputs on the page', () => {
      cy.startInsuranceYourBuyerSection({});

      cy.assertRadioOptionIsChecked(companyOrOrganisationPage[CAN_CONTACT_BUYER].yesRadioInput());

      cy.checkValue(field(ADDRESS), BUYER[ADDRESS]);
      cy.checkValue(field(REGISTRATION_NUMBER), BUYER[REGISTRATION_NUMBER]);
      cy.checkValue(field(WEBSITE), BUYER[WEBSITE]);
      cy.checkValue(field(FIRST_NAME), BUYER[FIRST_NAME]);
      cy.checkValue(field(LAST_NAME), BUYER[LAST_NAME]);
      cy.checkValue(field(POSITION), BUYER[POSITION]);
    });
  });
});
