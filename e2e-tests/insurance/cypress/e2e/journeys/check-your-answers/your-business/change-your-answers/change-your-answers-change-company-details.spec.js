import {
  submitButton, status, summaryList, noRadioInput,
} from '../../../../../../../pages/shared';
import partials from '../../../../../../../partials';
import {
  FIELD_VALUES,
  VALID_PHONE_NUMBERS,
  WEBSITE_EXAMPLES,
  COMPANY_EXAMPLE,
} from '../../../../../../../constants';
import { companyDetails, companiesHouseNumber } from '../../../../../../../pages/your-business';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';

const {
  ROOT,
  CHECK_YOUR_ANSWERS: {
    YOUR_BUSINESS,
  },
  EXPORTER_BUSINESS: {
    COMPANIES_HOUSE_NUMBER_CHECK_AND_CHANGE, COMPANY_DETAILS_CHECK_AND_CHANGE,
  },
} = INSURANCE_ROUTES;

const {
  COMPANY_HOUSE: {
    COMPANY_NAME,
    COMPANY_NUMBER,
    COMPANY_INCORPORATED,
    FINANCIAL_YEAR_END_DATE,
    COMPANY_SIC,
  },
  YOUR_COMPANY: {
    TRADING_ADDRESS,
    TRADING_NAME,
    WEBSITE,
    PHONE_NUMBER,
  },
} = INSURANCE_FIELD_IDS.EXPORTER_BUSINESS;

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswers;

const baseUrl = Cypress.config('baseUrl');

const getFieldVariables = (fieldId, referenceNumber, route = COMPANY_DETAILS_CHECK_AND_CHANGE) => ({
  route,
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
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType({ referenceNumber });

      task.link().click();

      // To get past "Eligibility" check your answers page
      cy.submitCheckYourAnswersForm();

      // To get past "Policy and exports" check your answers page
      cy.submitCheckYourAnswersForm();

      url = `${baseUrl}${ROOT}/${referenceNumber}${YOUR_BUSINESS}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe(COMPANY_NUMBER, () => {
    const fieldId = COMPANY_NUMBER;

    let fieldVariables = getFieldVariables(fieldId, referenceNumber, COMPANIES_HOUSE_NUMBER_CHECK_AND_CHANGE);

    describe('when clicking the `change` link', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it(`should redirect to ${COMPANIES_HOUSE_NUMBER_CHECK_AND_CHANGE}`, () => {
        cy.navigateToUrl(url);
        fieldVariables = getFieldVariables(fieldId, referenceNumber, COMPANIES_HOUSE_NUMBER_CHECK_AND_CHANGE);

        summaryList.field(fieldId).changeLink().click();

        const expectedUrl = `${baseUrl}${ROOT}/${referenceNumber}${COMPANIES_HOUSE_NUMBER_CHECK_AND_CHANGE}#heading`;

        cy.assertUrl(expectedUrl);
      });
    });

    describe('form submission with a new answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        fieldVariables.newValueInput = '14440211';
        cy.changeAnswerField(fieldVariables, companiesHouseNumber.input());
      });

      it(`should redirect to ${YOUR_BUSINESS}`, () => {
        const expectedUrl = `${baseUrl}${ROOT}/${referenceNumber}${YOUR_BUSINESS}#heading`;

        cy.assertUrl(expectedUrl);
      });

      it('should render the new answer and retain a `completed` status tag', () => {
        fieldVariables.newValue = fieldVariables.newValueInput;
        cy.checkChangeAnswerRendered(fieldVariables);

        cy.checkText(summaryList.field(COMPANY_NAME).value(), COMPANY_EXAMPLE.COMPANY_NAME);
        cy.checkText(summaryList.field(COMPANY_INCORPORATED).value(), COMPANY_EXAMPLE.COMPANY_INCORPORATED);

        cy.checkText(summaryList.field(COMPANY_SIC).value(), `${COMPANY_EXAMPLE.COMPANY_SIC} ${COMPANY_EXAMPLE.COMPANY_SIC_DESCRIPTION}`);

        cy.checkText(summaryList.field(FINANCIAL_YEAR_END_DATE).value(), COMPANY_EXAMPLE.FINANCIAL_YEAR_END_DATE);

        cy.checkTaskStatusCompleted(status());
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

        cy.checkChangeLinkUrl(fieldVariables, referenceNumber, fieldId);
      });
    });

    describe('form submission with a new answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        noRadioInput().first().click();

        submitButton().click();
      });

      it(`should redirect to ${YOUR_BUSINESS}`, () => {
        cy.assertChangeAnswersPageUrl(referenceNumber, YOUR_BUSINESS, fieldId);
      });

      it('should render the new answer and retain a `completed` status tag', () => {
        cy.checkText(summaryList.field(fieldId).value(), FIELD_VALUES.NO);

        cy.checkTaskStatusCompleted(status());
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

        cy.checkChangeLinkUrl(fieldVariables, referenceNumber, fieldId);
      });
    });

    describe('form submission with a new answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        noRadioInput().eq(1).click();

        submitButton().click();
      });

      it(`should redirect to ${YOUR_BUSINESS}`, () => {
        cy.assertChangeAnswersPageUrl(referenceNumber, YOUR_BUSINESS, fieldId);
      });

      it('should render the new answer and retain a `completed` status tag', () => {
        cy.checkText(summaryList.field(fieldId).value(), FIELD_VALUES.NO);

        cy.checkTaskStatusCompleted(status());
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

        cy.checkChangeLinkUrl(fieldVariables, referenceNumber);
      });
    });

    describe('form submission with a new answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        fieldVariables.newValueInput = VALID_PHONE_NUMBERS.LANDLINE.NORMAL;
        cy.changeAnswerField(fieldVariables, companyDetails[PHONE_NUMBER].input());
      });

      it(`should redirect to ${YOUR_BUSINESS}`, () => {
        cy.assertChangeAnswersPageUrl(referenceNumber, YOUR_BUSINESS, fieldId);
      });

      it('should render the new answer and retain a `completed` status tag', () => {
        fieldVariables.newValue = fieldVariables.newValueInput;
        cy.checkChangeAnswerRendered(fieldVariables);

        cy.checkTaskStatusCompleted(status());
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

        cy.checkChangeLinkUrl(fieldVariables, referenceNumber);
      });
    });

    describe('form submission with a new answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        fieldVariables.newValueInput = WEBSITE_EXAMPLES.VALID;
        cy.changeAnswerField(fieldVariables, companyDetails[WEBSITE].input());
      });

      it(`should redirect to ${YOUR_BUSINESS}`, () => {
        cy.assertChangeAnswersPageUrl(referenceNumber, YOUR_BUSINESS, fieldId);
      });

      it('should render the new answer and retain a `completed` status tag', () => {
        fieldVariables.newValue = fieldVariables.newValueInput;
        cy.checkChangeAnswerRendered(fieldVariables);

        cy.checkTaskStatusCompleted(status());
      });
    });
  });
});
