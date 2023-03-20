import { submitButton } from '../../../../../pages/shared';
import partials from '../../../../../partials';
import {
  VALID_PHONE_NUMBERS, WEBSITE_EXAMPLES, COMPANY_EXAMPLE,
} from '../../../../../../../constants';
import { checkYourAnswersYourBusiness } from '../../../../../pages/insurance/check-your-answers';
import { companyDetails } from '../../../../../pages/your-business';
import {
  checkChangeLinkUrl,
  changeAnswerField,
  checkChangeAnswerRendered,
} from '../../../../../../support/check-summary-list-field-change';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';

const {
  ROOT,
  CHECK_YOUR_ANSWERS: {
    YOUR_BUSINESS,
  },
  EXPORTER_BUSINESS: {
    COMPANY_DETAILS_CHECK_AND_CHANGE,
  },
} = INSURANCE_ROUTES;

const {

  COMPANY_HOUSE: {
    INPUT,
    COMPANY_NAME,
    COMPANY_NUMBER,
    COMPANY_INCORPORATED,
    COMPANY_SIC,
    FINANCIAL_YEAR_END_DATE,
  },
  YOUR_COMPANY: {
    TRADING_ADDRESS,
    TRADING_NAME,
    WEBSITE,
    PHONE_NUMBER,
  },
} = INSURANCE_FIELD_IDS.EXPORTER_BUSINESS;

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswersAndSubmit;

const { summaryList } = checkYourAnswersYourBusiness;

const getFieldVariables = (fieldId, referenceNumber) => ({
  route: COMPANY_DETAILS_CHECK_AND_CHANGE,
  checkYourAnswersRoute: YOUR_BUSINESS,
  newValueInput: '',
  fieldId,
  referenceNumber,
  summaryList,
  changeLink: summaryList.field(fieldId).changeLink,
});

context('Insurance - Check your answers - Company details - Your business - Summary list', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType();

      task.link().click();

      // to get past eligibility check your answers page
      submitButton().click();
      // to get past policy and exports check your answers page
      submitButton().click();

      url = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${YOUR_BUSINESS}`;

      cy.url().should('eq', url);
    });
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);
  });

  after(() => {
    cy.deleteAccount();
  });

  describe(COMPANY_NUMBER, () => {
    const fieldId = COMPANY_NUMBER;

    let fieldVariables = getFieldVariables(fieldId, referenceNumber);

    describe('when clicking the `change` link', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it(`should redirect to ${COMPANY_DETAILS_CHECK_AND_CHANGE}`, () => {
        cy.navigateToUrl(url);
        fieldVariables = getFieldVariables(fieldId, referenceNumber);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl(referenceNumber, COMPANY_DETAILS_CHECK_AND_CHANGE, INPUT);
      });
    });

    describe('form submission with a new answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        fieldVariables.newValueInput = '14440211';
        changeAnswerField(fieldVariables, companyDetails.companiesHouseSearch());
      });

      it(`should redirect to ${YOUR_BUSINESS}`, () => {
        cy.assertChangeAnswersPageUrl(referenceNumber, YOUR_BUSINESS);
      });

      it('should render the new answer', () => {
        fieldVariables.newValue = fieldVariables.newValueInput;
        checkChangeAnswerRendered(fieldVariables);

        cy.checkText(summaryList.field(COMPANY_NAME).value(), COMPANY_EXAMPLE.COMPANY_NAME);
        cy.checkText(summaryList.field(COMPANY_INCORPORATED).value(), COMPANY_EXAMPLE.COMPANY_INCORPORATED);
        cy.checkText(summaryList.field(COMPANY_SIC).value(), COMPANY_EXAMPLE.COMPANY_SIC);
        cy.checkText(summaryList.field(FINANCIAL_YEAR_END_DATE).value(), COMPANY_EXAMPLE.FINANCIAL_YEAR_END_DATE);
      });
    });
  });

  describe(TRADING_NAME, () => {
    const fieldId = TRADING_NAME;

    let fieldVariables = getFieldVariables(fieldId, referenceNumber);

    describe('when clicking the `change` link', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it(`should redirect to ${COMPANY_DETAILS_CHECK_AND_CHANGE}`, () => {
        cy.navigateToUrl(url);
        fieldVariables = getFieldVariables(fieldId, referenceNumber);

        checkChangeLinkUrl(fieldVariables, referenceNumber, fieldId);
      });
    });

    describe('form submission with a new answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        companyDetails.tradingNameNoRadioInput().click();

        submitButton().click();
      });

      it(`should redirect to ${YOUR_BUSINESS}`, () => {
        cy.assertChangeAnswersPageUrl(referenceNumber, YOUR_BUSINESS);
      });

      it('should render the new answer', () => {
        cy.checkText(summaryList.field(fieldId).value(), 'No');
      });
    });
  });

  describe(TRADING_ADDRESS, () => {
    const fieldId = TRADING_ADDRESS;

    let fieldVariables = getFieldVariables(fieldId, referenceNumber);

    describe('when clicking the `change` link', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it(`should redirect to ${COMPANY_DETAILS_CHECK_AND_CHANGE}`, () => {
        cy.navigateToUrl(url);
        fieldVariables = getFieldVariables(fieldId, referenceNumber);

        checkChangeLinkUrl(fieldVariables, referenceNumber, fieldId);
      });
    });

    describe('form submission with a new answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        companyDetails.tradingAddressNoRadioInput().click();

        submitButton().click();
      });

      it(`should redirect to ${YOUR_BUSINESS}`, () => {
        cy.assertChangeAnswersPageUrl(referenceNumber, YOUR_BUSINESS);
      });

      it('should render the new answer', () => {
        cy.checkText(summaryList.field(fieldId).value(), 'No');
      });
    });
  });

  describe(PHONE_NUMBER, () => {
    const fieldId = PHONE_NUMBER;

    let fieldVariables = getFieldVariables(fieldId, referenceNumber);

    describe('when clicking the `change` link', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it(`should redirect to ${COMPANY_DETAILS_CHECK_AND_CHANGE}`, () => {
        cy.navigateToUrl(url);
        fieldVariables = getFieldVariables(fieldId, referenceNumber);

        checkChangeLinkUrl(fieldVariables, referenceNumber);
      });
    });

    describe('form submission with a new answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        fieldVariables.newValueInput = VALID_PHONE_NUMBERS.LANDLINE.NORMAL;
        changeAnswerField(fieldVariables, companyDetails.phoneNumber());
      });

      it(`should redirect to ${YOUR_BUSINESS}`, () => {
        cy.assertChangeAnswersPageUrl(referenceNumber, YOUR_BUSINESS);
      });

      it('should render the new answer', () => {
        fieldVariables.newValue = fieldVariables.newValueInput;
        checkChangeAnswerRendered(fieldVariables);
      });
    });
  });

  describe(WEBSITE, () => {
    const fieldId = WEBSITE;

    let fieldVariables = getFieldVariables(fieldId, referenceNumber);

    describe('when clicking the `change` link', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it(`should redirect to ${COMPANY_DETAILS_CHECK_AND_CHANGE}`, () => {
        cy.navigateToUrl(url);
        fieldVariables = getFieldVariables(fieldId, referenceNumber);

        checkChangeLinkUrl(fieldVariables, referenceNumber);
      });
    });

    describe('form submission with a new answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        fieldVariables.newValueInput = WEBSITE_EXAMPLES.VALID;
        changeAnswerField(fieldVariables, companyDetails.companyWebsite());
      });

      it(`should redirect to ${YOUR_BUSINESS}`, () => {
        cy.assertChangeAnswersPageUrl(referenceNumber, YOUR_BUSINESS);
      });

      it('should render the new answer', () => {
        fieldVariables.newValue = fieldVariables.newValueInput;
        checkChangeAnswerRendered(fieldVariables);
      });
    });
  });
});
