import {
  headingCaption,
  submitButton,
  saveAndBackButton,
  countryInput,
} from '../../../../../../pages/shared';
import { aboutGoodsOrServicesPage } from '../../../../../../pages/insurance/policy-and-export';
import partials from '../../../../../../partials';
import {
  BUTTONS,
  PAGES,
  TASKS,
} from '../../../../../../content-strings';
import { POLICY_AND_EXPORT_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/policy-and-exports';
import { FIELD_IDS, FIELD_VALUES, ROUTES } from '../../../../../../constants';
import application from '../../../../../../fixtures/application';
import countries from '../../../../../../fixtures/countries';
import checkAutocompleteInput from '../../../../../../commands/shared-commands/assertions/check-autocomplete-input';

const { taskList } = partials.insurancePartials;

const CONTENT_STRINGS = PAGES.INSURANCE.POLICY_AND_EXPORTS.ABOUT_GOODS_OR_SERVICES;

const {
  INSURANCE: {
    ROOT: INSURANCE_ROOT,
    ALL_SECTIONS,
    POLICY_AND_EXPORTS: {
      SINGLE_CONTRACT_POLICY,
      ABOUT_GOODS_OR_SERVICES,
      NAME_ON_POLICY,
    },
  },
} = ROUTES;

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      ABOUT_GOODS_OR_SERVICES: { DESCRIPTION, FINAL_DESTINATION },
    },
  },
} = FIELD_IDS;

const task = taskList.prepareApplication.tasks.policyTypeAndExports;

context('Insurance - Policy and exports - About goods or services page - As an exporter, I want to enter the details of the export contract', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      // go to the page we want to test.
      taskList.prepareApplication.tasks.policyTypeAndExports.link().click();

      cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.SINGLE);

      cy.completeAndSubmitSingleContractPolicyForm({});

      url = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${ABOUT_GOODS_OR_SERVICES}`;

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
      currentHref: `${INSURANCE_ROOT}/${referenceNumber}${ABOUT_GOODS_OR_SERVICES}`,
      backLink: `${INSURANCE_ROOT}/${referenceNumber}${SINGLE_CONTRACT_POLICY}`,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('renders a heading caption', () => {
      cy.checkText(headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
    });

    it('renders `description` label, hint, prefix and input', () => {
      const fieldId = DESCRIPTION;
      const field = aboutGoodsOrServicesPage[fieldId];

      field.label().should('exist');
      cy.checkText(field.label(), FIELDS.ABOUT_GOODS_OR_SERVICES[fieldId].LABEL);

      cy.checkText(field.hint.intro(), FIELDS.ABOUT_GOODS_OR_SERVICES[fieldId].HINT.INTRO);

      cy.checkText(field.hint.list.item1(), FIELDS.ABOUT_GOODS_OR_SERVICES[fieldId].HINT.LIST[0]);

      cy.checkText(field.hint.list.item2(), FIELDS.ABOUT_GOODS_OR_SERVICES[fieldId].HINT.LIST[1]);

      cy.checkText(field.hint.list.item3(), FIELDS.ABOUT_GOODS_OR_SERVICES[fieldId].HINT.LIST[2]);

      field.input().should('exist');
    });

    it('renders `final destination` label and input with disabled first input', () => {
      const fieldId = FINAL_DESTINATION;
      const field = countryInput.field(fieldId);

      field.label().should('exist');
      cy.checkText(field.label(), FIELDS.ABOUT_GOODS_OR_SERVICES[fieldId].LABEL);

      field.input().should('exist');
    });

    describe('searchable autocomplete input', () => {
      const fieldId = FINAL_DESTINATION;
      const field = countryInput.field(fieldId);

      it('has working client side JS', () => {
        checkAutocompleteInput.hasWorkingClientSideJS(field);
      });

      it('renders an input', () => {
        checkAutocompleteInput.rendersInput(field);
      });

      it('renders `no results` message when no results are found', () => {
        checkAutocompleteInput.rendersNoResultsMessage(field, 'test');
      });

      it('renders a single country result after searching', () => {
        checkAutocompleteInput.rendersSingleResult(field, 'Alg');
      });

      it('renders multiple country results after searching', () => {
        checkAutocompleteInput.rendersMultipleResults(field, 'Be');
      });

      it('allows user to remove a selected country and search again', () => {
        checkAutocompleteInput.allowsUserToRemoveCountryAndSearchAgain(field, countries[1].name, countries[4].name);
      });
    });

    it('renders a `save and back` button', () => {
      saveAndBackButton().should('exist');

      cy.checkText(saveAndBackButton(), BUTTONS.SAVE_AND_BACK);
    });
  });

  describe('form submission', () => {
    it(`should redirect to ${NAME_ON_POLICY}`, () => {
      cy.navigateToUrl(url);

      cy.completeAndSubmitAboutGoodsOrServicesForm();

      const expectedUrl = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${NAME_ON_POLICY}`;
      cy.assertUrl(expectedUrl);
    });

    describe('after submitting the form', () => {
      it('should retain the `type of policy and exports` task status as `completed`', () => {
        cy.navigateToUrl(url);

        cy.completeAndSubmitAboutGoodsOrServicesForm();

        cy.navigateToUrl(`${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`);

        const expected = TASKS.STATUS.COMPLETED;
        cy.checkText(task.status(), expected);
      });
    });

    describe('when going back to the page', () => {
      it('should have the submitted values', () => {
        cy.navigateToUrl(url);

        cy.completeAndSubmitAboutGoodsOrServicesForm();

        cy.navigateToUrl(`${INSURANCE_ROOT}/${referenceNumber}${ABOUT_GOODS_OR_SERVICES}`);

        aboutGoodsOrServicesPage[DESCRIPTION].input().should('have.value', application.EXPORT_CONTRACT[DESCRIPTION]);

        const country = countries.find((c) => c.isoCode === application.EXPORT_CONTRACT[FINAL_DESTINATION]);
        cy.checkText(countryInput.field(FINAL_DESTINATION).results(), country.name);
      });
    });

    describe('when the description field is a pure number and there are no other validation errors', () => {
      const descriptionField = aboutGoodsOrServicesPage[DESCRIPTION];
      const submittedValue = '1234';

      beforeEach(() => {
        cy.navigateToUrl(url);

        cy.completeAndSubmitAboutGoodsOrServicesForm();

        cy.clickBackLink();

        cy.keyboardInput(descriptionField.input(), submittedValue);
        submitButton().click();
      });

      it('should retain the submitted value when going back to the page', () => {
        cy.clickBackLink();

        descriptionField.input().should('have.value', submittedValue);
      });
    });
  });
});
