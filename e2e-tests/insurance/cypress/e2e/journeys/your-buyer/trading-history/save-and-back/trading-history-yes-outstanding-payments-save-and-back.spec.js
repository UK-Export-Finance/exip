import {
  saveAndBackButton,
  yesRadioInput,
  field,
} from '../../../../../../../pages/shared';
import partials from '../../../../../../../partials';
import { TASKS } from '../../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { YOUR_BUYER as FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/your-buyer';
import application from '../../../../../../../fixtures/application';

const { TOTAL_AMOUNT_OVERDUE, TOTAL_OUTSTANDING_PAYMENTS } = FIELD_IDS;

const {
  YOUR_BUYER: { TRADING_HISTORY },
  ALL_SECTIONS,
  ROOT,
} = INSURANCE_ROUTES;

const { BUYER } = application;

const baseUrl = Cypress.config('baseUrl');

const { taskList } = partials.insurancePartials;
const task = taskList.prepareApplication.tasks.buyer;

context('Insurance - Your buyer - Trading history - Yes outstanding payments - Save and back', () => {
  let referenceNumber;
  let url;
  let allSectionsUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsuranceYourBuyerSection({});
      cy.completeAndSubmitCompanyOrOrganisationForm({});

      url = `${baseUrl}${ROOT}/${referenceNumber}${TRADING_HISTORY}`;
      allSectionsUrl = `${baseUrl}${ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      // TODO: EMS-2659 - use buyer commands to get here
      cy.navigateToUrl(url);

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
      const expected = TASKS.STATUS.IN_PROGRESS;
      cy.checkText(task.status(), expected);
    });
  });

  describe('when submitting a partially filled form', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      yesRadioInput().first().click();
      cy.keyboardInput(field(TOTAL_OUTSTANDING_PAYMENTS).input(), BUYER[TOTAL_OUTSTANDING_PAYMENTS]);

      saveAndBackButton().click();
    });

    it(`should redirect to ${ALL_SECTIONS}`, () => {
      cy.assertUrl(allSectionsUrl);
    });

    it('should retain the `your buyer` task status as `in progress`', () => {
      const expected = TASKS.STATUS.IN_PROGRESS;
      cy.checkText(task.status(), expected);
    });

    it('should retain completed input on the page', () => {
      cy.navigateToUrl(url);

      cy.assertYesRadioOptionIsChecked(0);
      cy.checkValue(field(TOTAL_OUTSTANDING_PAYMENTS), BUYER[TOTAL_OUTSTANDING_PAYMENTS]);
    });
  });

  describe('when submitting a fully filled form', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      cy.completeAndSubmitTradingHistoryWithBuyerForm({ outstandingPayments: true });

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
      // get to trading-history page
      cy.navigateToUrl(url);

      cy.assertNoRadioOptionIsChecked(0);
      cy.checkValue(field(TOTAL_OUTSTANDING_PAYMENTS), BUYER[TOTAL_OUTSTANDING_PAYMENTS]);
      cy.checkValue(field(TOTAL_AMOUNT_OVERDUE), BUYER[TOTAL_AMOUNT_OVERDUE]);
      cy.assertNoRadioOptionIsChecked(1);
    });
  });
});
