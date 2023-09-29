import { yourContactPage } from '../../../../../../pages/your-business';
import partials from '../../../../../../partials';
import { saveAndBackButton, submitButton } from '../../../../../../pages/shared';
import { TASKS } from '../../../../../../content-strings';
import { ROUTES } from '../../../../../../constants';
import { EXPORTER_BUSINESS as EXPORTER_BUSINESS_FIELD_IDS } from '../../../../../../constants/field-ids/insurance/business';
import { ACCOUNT as ACCOUNT_FIELD_IDS } from '../../../../../../constants/field-ids/insurance/account';
import application from '../../../../../../fixtures/application';
import account from '../../../../../../fixtures/account';

const {
  CONTACT: {
    POSITION,
    BUSINESS_CONTACT_DETAIL,
  },
} = EXPORTER_BUSINESS_FIELD_IDS;

const { FIRST_NAME, LAST_NAME, EMAIL } = ACCOUNT_FIELD_IDS;

const {
  ROOT,
  EXPORTER_BUSINESS: {
    CONTACT,
  },
  ALL_SECTIONS,
} = ROUTES.INSURANCE;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.business;

const businessContactDetails = application.EXPORTER_BUSINESS[BUSINESS_CONTACT_DETAIL];

context('Insurance - Your business - Contact page - Save and go back', () => {
  let referenceNumber;
  let url;
  let allSectionsUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      task.link().click();

      cy.completeAndSubmitCompaniesHouseSearchForm({ referenceNumber });
      cy.completeAndSubmitCompanyDetails();

      url = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${CONTACT}`;
      allSectionsUrl = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe('when no fields are entered', () => {
    it(`should redirect to ${ALL_SECTIONS} retain the "your business" task status as "in progress"`, () => {
      cy.navigateToUrl(url);

      saveAndBackButton().click();

      cy.assertUrl(allSectionsUrl);

      const expected = TASKS.STATUS.IN_PROGRESS;
      cy.checkText(task.status(), expected);
    });

    it('should retain the prepopulated fields on the page from the session', () => {
      cy.navigateToUrl(allSectionsUrl);

      task.link().click();

      // submit companies house number form
      submitButton().click();
      // submit company details form
      submitButton().click();

      cy.checkValue(yourContactPage.field(FIRST_NAME), account[FIRST_NAME]);
      cy.checkValue(yourContactPage.field(LAST_NAME), account[LAST_NAME]);
      cy.checkValue(yourContactPage.field(EMAIL), account[EMAIL]);
      cy.checkValue(yourContactPage.field(POSITION), '');
    });
  });

  describe('when fields are entered but with validation errors', () => {
    it(`should redirect to ${ALL_SECTIONS} retain the "your business" task status as "in progress"`, () => {
      cy.navigateToUrl(url);

      cy.keyboardInput(yourContactPage.field(FIRST_NAME).input(), businessContactDetails[FIRST_NAME]);
      cy.keyboardInput(yourContactPage.field(LAST_NAME).input(), businessContactDetails[LAST_NAME]);
      cy.keyboardInput(yourContactPage.field(EMAIL).input(), 'test');

      saveAndBackButton().click();

      cy.assertUrl(allSectionsUrl);

      const expected = TASKS.STATUS.IN_PROGRESS;
      cy.checkText(task.status(), expected);
    });

    it('should retain the prepopulated fields on the page from the session for email and submitted values for first and last name', () => {
      cy.navigateToUrl(allSectionsUrl);

      task.link().click();

      // submit companies house number form
      submitButton().click();
      // submit company details form
      submitButton().click();

      cy.checkValue(yourContactPage.field(FIRST_NAME), businessContactDetails[FIRST_NAME]);
      cy.checkValue(yourContactPage.field(LAST_NAME), businessContactDetails[LAST_NAME]);
      cy.checkValue(yourContactPage.field(EMAIL), account[EMAIL]);
      cy.checkValue(yourContactPage.field(POSITION), '');
    });
  });

  describe('when all fields are provided', () => {
    it(`should redirect to ${ALL_SECTIONS} retain the "your business" task status as "in progress"`, () => {
      cy.navigateToUrl(url);

      cy.keyboardInput(yourContactPage.field(FIRST_NAME).input(), businessContactDetails[FIRST_NAME]);
      cy.keyboardInput(yourContactPage.field(LAST_NAME).input(), businessContactDetails[LAST_NAME]);
      cy.keyboardInput(yourContactPage.field(EMAIL).input(), businessContactDetails[EMAIL]);
      cy.keyboardInput(yourContactPage.field(POSITION).input(), businessContactDetails[POSITION]);

      saveAndBackButton().click();

      cy.assertUrl(allSectionsUrl);

      const expected = TASKS.STATUS.IN_PROGRESS;
      cy.checkText(task.status(), expected);
    });

    it('should retain the submitted fields on the page', () => {
      cy.navigateToUrl(allSectionsUrl);

      task.link().click();

      // submit companies house number form
      submitButton().click();
      // submit company details form
      submitButton().click();

      cy.checkValue(yourContactPage.field(FIRST_NAME), businessContactDetails[FIRST_NAME]);
      cy.checkValue(yourContactPage.field(LAST_NAME), businessContactDetails[LAST_NAME]);
      cy.checkValue(yourContactPage.field(EMAIL), businessContactDetails[EMAIL]);
      cy.checkValue(yourContactPage.field(POSITION), businessContactDetails[POSITION]);
    });
  });
});
