import {
  headingCaption,
  yesRadio,
  noRadio,
  autoCompleteField,
} from '../../../../../../pages/shared';
import { aboutGoodsOrServicesPage } from '../../../../../../pages/insurance/export-contract';
import { PAGES } from '../../../../../../content-strings';
import { EXPORT_CONTRACT_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/export-contract';
import { FIELD_VALUES } from '../../../../../../constants';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import application from '../../../../../../fixtures/application';
import COUNTRIES from '../../../../../../fixtures/countries';
import { assertCountryAutocompleteInput, checkAutocompleteInput } from '../../../../../../shared-test-assertions';

const CONTENT_STRINGS = PAGES.INSURANCE.EXPORT_CONTRACT.ABOUT_GOODS_OR_SERVICES;

const {
  ROOT: INSURANCE_ROOT,
  ALL_SECTIONS,
  EXPORT_CONTRACT: {
    ROOT: EXPORT_CONTRACT_ROOT,
    ABOUT_GOODS_OR_SERVICES,
    CHECK_YOUR_ANSWERS,
  },
} = INSURANCE_ROUTES;

const {
  EXPORT_CONTRACT: {
    ABOUT_GOODS_OR_SERVICES: { DESCRIPTION, FINAL_DESTINATION_KNOWN, FINAL_DESTINATION },
  },
} = INSURANCE_FIELD_IDS;

const finalDestinationField = autoCompleteField(FINAL_DESTINATION);

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Export contract - About goods or services page - Final destination known - As an exporter, I want to enter the details of the export contract', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsuranceExportContractSection({});

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${ABOUT_GOODS_OR_SERVICES}`;

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
      backLink: `${INSURANCE_ROOT}/${referenceNumber}${EXPORT_CONTRACT_ROOT}`,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('renders a heading caption', () => {
      cy.checkText(headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
    });

    it(`renders ${DESCRIPTION} label, hint and input`, () => {
      const fieldId = DESCRIPTION;
      const field = aboutGoodsOrServicesPage[fieldId];

      cy.checkText(field.label(), FIELDS.ABOUT_GOODS_OR_SERVICES[fieldId].LABEL);

      cy.checkText(field.hint.intro(), FIELDS.ABOUT_GOODS_OR_SERVICES[fieldId].HINT.INTRO);

      cy.checkText(field.hint.list.item1(), FIELDS.ABOUT_GOODS_OR_SERVICES[fieldId].HINT.LIST[0]);

      cy.checkText(field.hint.list.item2(), FIELDS.ABOUT_GOODS_OR_SERVICES[fieldId].HINT.LIST[1]);

      cy.checkText(field.hint.list.item3(), FIELDS.ABOUT_GOODS_OR_SERVICES[fieldId].HINT.LIST[2]);

      cy.checkText(field.hint.outro(), FIELDS.ABOUT_GOODS_OR_SERVICES[fieldId].HINT.OUTRO);

      field.textarea().should('exist');
    });

    describe(`${FINAL_DESTINATION_KNOWN} label and input`, () => {
      const fieldId = FINAL_DESTINATION_KNOWN;

      it('renders `yes` and `no` radio buttons in the correct order', () => {
        cy.assertYesNoRadiosOrder({ noRadioFirst: true });
      });

      it('renders `no` radio button', () => {
        cy.checkText(noRadio().label(), FIELD_VALUES.NO);

        cy.checkRadioInputNoAriaLabel(FIELDS.ABOUT_GOODS_OR_SERVICES[fieldId].LABEL);
      });

      it('renders `yes` radio button', () => {
        yesRadio().input().should('exist');

        cy.checkText(yesRadio().label(), FIELD_VALUES.YES);

        cy.checkRadioInputYesAriaLabel(FIELDS.ABOUT_GOODS_OR_SERVICES[fieldId].LABEL);
      });
    });

    it(`renders ${FINAL_DESTINATION} label and input`, () => {
      const fieldId = FINAL_DESTINATION;
      const field = finalDestinationField;

      cy.checkText(field.label(), FIELDS.ABOUT_GOODS_OR_SERVICES[fieldId].LABEL);

      field.input().should('exist');
    });

    describe(`searchable autocomplete input (${FINAL_DESTINATION})`, () => {
      const fieldId = FINAL_DESTINATION;
      const field = autoCompleteField(fieldId);

      it('should NOT be visible by default', () => {
        checkAutocompleteInput.isNotVisible(field);
      });

      describe(`when clicking the 'yes' ${FINAL_DESTINATION_KNOWN} radio`, () => {
        beforeEach(() => {
          cy.navigateToUrl(url);

          cy.clickYesRadioInput();
        });

        assertCountryAutocompleteInput({ fieldId });
      });
    });

    it('renders a `save and back` button', () => {
      cy.assertSaveAndBackButton();
    });
  });

  describe('form submission', () => {
    it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
      cy.navigateToUrl(url);

      cy.completeAndSubmitAboutGoodsOrServicesForm({});

      const expectedUrl = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
      cy.assertUrl(expectedUrl);
    });

    describe('after submitting the form', () => {
      it('should update the `export contract` task status to `completed`', () => {
        cy.navigateToUrl(url);

        cy.completeAndSubmitAboutGoodsOrServicesForm({});

        cy.navigateToUrl(`${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`);

        cy.checkTaskExportContractStatusIsComplete();
      });
    });

    describe('when going back to the page', () => {
      it('should have the submitted values', () => {
        cy.navigateToUrl(url);

        cy.completeAndSubmitAboutGoodsOrServicesForm({});

        cy.navigateToUrl(url);

        aboutGoodsOrServicesPage[DESCRIPTION].textarea().should('have.value', application.EXPORT_CONTRACT[DESCRIPTION]);

        cy.assertYesRadioOptionIsChecked();

        const country = COUNTRIES.find((c) => c.ISO_CODE === application.EXPORT_CONTRACT[FINAL_DESTINATION]);
        cy.checkText(autoCompleteField(FINAL_DESTINATION).results(), country.NAME);
      });

      it(`should have a visible ${FINAL_DESTINATION}`, () => {
        cy.navigateToUrl(url);

        checkAutocompleteInput.isVisible(finalDestinationField);
      });
    });

    describe('when the description field is a pure number and there are no other validation errors', () => {
      const descriptionField = aboutGoodsOrServicesPage[DESCRIPTION];
      const submittedValue = '1234';

      beforeEach(() => {
        cy.navigateToUrl(url);

        cy.completeAndSubmitAboutGoodsOrServicesForm({});

        cy.clickBackLink();

        cy.keyboardInput(descriptionField.textarea(), submittedValue);
        cy.clickSubmitButton();
      });

      it('should retain the submitted value when going back to the page', () => {
        cy.clickBackLink();

        descriptionField.textarea().should('have.value', submittedValue);
      });
    });
  });
});
