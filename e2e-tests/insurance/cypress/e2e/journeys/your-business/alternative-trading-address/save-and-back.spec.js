import partials from '../../../../../../partials/insurance';
import { saveAndBackButton, field } from '../../../../../../pages/shared';
import { TASKS } from '../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { EXPORTER_BUSINESS_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/business';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import application from '../../../../../../fixtures/application';

const {
  ROOT,
  ALL_SECTIONS,
  EXPORTER_BUSINESS: { ALTERNATIVE_TRADING_ADDRESS_ROOT },
} = INSURANCE_ROUTES;

const {
  EXPORTER_BUSINESS: {
    ALTERNATIVE_TRADING_ADDRESS: {
      FULL_ADDRESS,
    },
  },
} = INSURANCE_FIELD_IDS;

const { MAXIMUM } = FIELDS[FULL_ADDRESS];

const { STATUS: { IN_PROGRESS } } = TASKS;

const task = partials.taskList.prepareApplication.tasks.business;

const baseUrl = Cypress.config('baseUrl');

const { DIFFERENT_TRADING_ADDRESS } = application;

context('Insurance - Your business - Alternative trading address - Save and go back', () => {
  let referenceNumber;
  let url;
  let allSectionsUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startYourBusinessSection({});
      cy.completeAndSubmitCompanyDetails({
        differentTradingAddress: true,
      });

      url = `${baseUrl}${ROOT}/${referenceNumber}${ALTERNATIVE_TRADING_ADDRESS_ROOT}`;
      allSectionsUrl = `${baseUrl}${ROOT}/${referenceNumber}${ALL_SECTIONS}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe('when submitting an empty form via `save and go back` button', () => {
    before(() => {
      cy.navigateToUrl(url);

      saveAndBackButton().click();
    });

    it(`should redirect to ${ALL_SECTIONS}`, () => {
      cy.assertUrl(allSectionsUrl);
    });

    it(`should retain the status of task 'your business' as '${IN_PROGRESS}'`, () => {
      cy.navigateToUrl(allSectionsUrl);

      cy.checkTaskStatus(task, IN_PROGRESS);
    });
  });

  describe('when submitting an invalid answer', () => {
    it(`should redirect to ${ALL_SECTIONS}`, () => {
      cy.navigateToUrl(url);

      field(FULL_ADDRESS).textarea().type('a'.repeat(MAXIMUM + 1));

      saveAndBackButton().click();

      cy.assertUrl(allSectionsUrl);
    });

    it(`should retain the status of task 'your business' as '${IN_PROGRESS}'`, () => {
      cy.navigateToUrl(allSectionsUrl);

      cy.checkTaskStatus(task, IN_PROGRESS);
    });

    it('should not have the originally submitted answer', () => {
      cy.navigateToUrl(url);

      cy.checkText(field(FULL_ADDRESS).textarea(), '');
    });
  });

  describe('when submitting a valid answer', () => {
    it(`should redirect to ${ALL_SECTIONS}`, () => {
      cy.navigateToUrl(url);

      field(FULL_ADDRESS).textarea().type(DIFFERENT_TRADING_ADDRESS[FULL_ADDRESS]);

      saveAndBackButton().click();

      cy.assertUrl(allSectionsUrl);
    });

    it(`should retain the status of task 'your business' as '${IN_PROGRESS}'`, () => {
      cy.navigateToUrl(allSectionsUrl);

      cy.checkTaskStatus(task, IN_PROGRESS);
    });

    it('should have the originally submitted answer', () => {
      cy.navigateToUrl(url);

      cy.checkText(field(FULL_ADDRESS).textarea(), DIFFERENT_TRADING_ADDRESS[FULL_ADDRESS]);
    });
  });
});
