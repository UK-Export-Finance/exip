import { field } from '../../../../../../pages/shared';
import { INVALID_PHONE_NUMBERS, WEBSITE_EXAMPLES, VALID_PHONE_NUMBERS } from '../../../../../../constants';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const {
  EXPORTER_BUSINESS: {
    YOUR_COMPANY: { HAS_DIFFERENT_TRADING_NAME, TRADING_ADDRESS, WEBSITE, PHONE_NUMBER },
  },
} = INSURANCE_FIELD_IDS;

const {
  ROOT,
  ALL_SECTIONS,
  EXPORTER_BUSINESS: { COMPANY_DETAILS },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

describe('Insurance - Your business - Company details page - Save and go back', () => {
  let referenceNumber;
  let url;

  const companyDetailsFormVariables = {};

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      url = `${baseUrl}${ROOT}/${referenceNumber}${COMPANY_DETAILS}`;

      cy.completeAndSubmitYourBusinessForms({ formToStopAt: 'companyDetails' });

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe(`when only ${TRADING_ADDRESS} and ${HAS_DIFFERENT_TRADING_NAME} fields are completed`, () => {
    it('should not display validation errors and redirect to task list with status of "In progress"', () => {
      cy.navigateToUrl(url);

      cy.clickYesRadioInput();
      cy.clickYesRadioInput(1);
      cy.clickSaveAndBackButton();

      cy.assertUrl(`${baseUrl}${ROOT}/${referenceNumber}${ALL_SECTIONS}`);
      cy.checkTaskBusinessStatusIsInProgress();
    });

    it('should render valid submitted values when going back to the page', () => {
      cy.navigateToUrl(url);

      cy.assertYesRadioOptionIsChecked(0);
      cy.assertYesRadioOptionIsChecked(1);
    });
  });

  describe(`when required fields are completed and ${PHONE_NUMBER} is entered incorrectly`, () => {
    it('should not display validation errors and redirect to task list', () => {
      cy.navigateToUrl(url);

      companyDetailsFormVariables[PHONE_NUMBER] = INVALID_PHONE_NUMBERS.LANDLINE.SPECIAL_CHAR;

      cy.completeCompanyDetailsForm(companyDetailsFormVariables);

      cy.clickSaveAndBackButton();

      cy.assertUrl(`${baseUrl}${ROOT}/${referenceNumber}${ALL_SECTIONS}`);
      cy.checkTaskBusinessStatusIsInProgress();
    });

    it('should render valid submitted values when going back to the page', () => {
      cy.navigateToUrl(url);

      cy.assertNoRadioOptionIsChecked(0);
      cy.assertNoRadioOptionIsChecked(1);
      field(PHONE_NUMBER).input().should('be.empty');
    });
  });

  describe(`when required required fields are completed and ${WEBSITE} is entered incorrectly`, () => {
    it('should not display validation errors and redirect to task list', () => {
      cy.navigateToUrl(url);

      companyDetailsFormVariables[PHONE_NUMBER] = VALID_PHONE_NUMBERS.LANDLINE.NORMAL;
      companyDetailsFormVariables[WEBSITE] = WEBSITE_EXAMPLES.INVALID;

      cy.completeCompanyDetailsForm(companyDetailsFormVariables);

      cy.clickSaveAndBackButton();

      cy.assertUrl(`${baseUrl}${ROOT}/${referenceNumber}${ALL_SECTIONS}`);
      cy.checkTaskBusinessStatusIsInProgress();
    });

    it('should render valid submitted values when going back to the page', () => {
      cy.navigateToUrl(url);

      cy.assertNoRadioOptionIsChecked(0);
      cy.assertNoRadioOptionIsChecked(1);

      cy.checkValue(field(PHONE_NUMBER), VALID_PHONE_NUMBERS.LANDLINE.NORMAL);

      field(WEBSITE).input().should('be.empty');
    });
  });

  describe('when all fields are entered correctly', () => {
    it('should not display validation errors and redirect to task list if all fields are entered correctly', () => {
      cy.navigateToUrl(url);

      companyDetailsFormVariables[PHONE_NUMBER] = VALID_PHONE_NUMBERS.LANDLINE.NORMAL;
      companyDetailsFormVariables[WEBSITE] = WEBSITE_EXAMPLES.VALID;

      cy.completeCompanyDetailsForm(companyDetailsFormVariables);

      cy.clickSaveAndBackButton();

      cy.assertUrl(`${baseUrl}${ROOT}/${referenceNumber}${ALL_SECTIONS}`);
      cy.checkTaskBusinessStatusIsInProgress();
    });

    it('should render valid submitted values when going back to the page', () => {
      cy.navigateToUrl(url);

      cy.assertNoRadioOptionIsChecked(0);
      cy.assertNoRadioOptionIsChecked(1);
      cy.checkValue(field(PHONE_NUMBER), VALID_PHONE_NUMBERS.LANDLINE.NORMAL);
      cy.checkValue(field(WEBSITE), WEBSITE_EXAMPLES.VALID);
    });
  });
});
