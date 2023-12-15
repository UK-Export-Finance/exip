import { noRadioInput, countryInput } from '../../../../../../pages/shared';
import { aboutGoodsOrServicesPage } from '../../../../../../pages/insurance/policy';
import partials from '../../../../../../partials';
import { TASKS } from '../../../../../../content-strings';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import application from '../../../../../../fixtures/application';
import checkAutocompleteInput from '../../../../../../commands/shared-commands/assertions/check-autocomplete-input';

const { taskList } = partials.insurancePartials;

const {
  ROOT: INSURANCE_ROOT,
  ALL_SECTIONS,
  EXPORT_CONTRACT: {
    ABOUT_GOODS_OR_SERVICES,
    NAME_ON_POLICY,
  },
} = INSURANCE_ROUTES;

const {
  EXPORT_CONTRACT: {
    ABOUT_GOODS_OR_SERVICES: { DESCRIPTION, FINAL_DESTINATION },
  },
} = INSURANCE_FIELD_IDS;

const task = taskList.prepareApplication.tasks.policy;

const finalDestinationField = countryInput.field(FINAL_DESTINATION);

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Export contract - About goods or services page - Final destination not known - As an exporter, I want to enter the details of the export contract', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsuranceExportContractSection();

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${ABOUT_GOODS_OR_SERVICES}`;
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe('form submission', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it(`should redirect to ${NAME_ON_POLICY}`, () => {
      cy.completeAndSubmitAboutGoodsOrServicesForm({ finalDestinationKnown: false });

      const expectedUrl = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${NAME_ON_POLICY}`;
      cy.assertUrl(expectedUrl);
    });

    describe('after submitting the form', () => {
      it('should retain the `type of policy and exports` task status as `in progress`', () => {
        cy.navigateToUrl(`${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`);

        const expected = TASKS.STATUS.IN_PROGRESS;
        cy.checkText(task.status(), expected);
      });
    });

    describe('when going back to the page', () => {
      it('should have the submitted values', () => {
        cy.navigateToUrl(url);

        aboutGoodsOrServicesPage[DESCRIPTION].textarea().should('have.value', application.EXPORT_CONTRACT[DESCRIPTION]);

        noRadioInput().should('be.checked');
      });

      it(`should NOT have a visible ${FINAL_DESTINATION}`, () => {
        cy.navigateToUrl(url);

        checkAutocompleteInput.isNotVisible(finalDestinationField);
      });
    });
  });
});
