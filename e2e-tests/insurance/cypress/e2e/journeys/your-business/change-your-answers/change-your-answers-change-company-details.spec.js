import partials from '../../../../../../partials';
import {
  VALID_PHONE_NUMBERS,
  WEBSITE_EXAMPLES,
  COMPANY_EXAMPLE,
  FIELD_VALUES,
} from '../../../../../../constants';
import {
  field,
  submitButton,
  summaryList,
  noRadioInput,
} from '../../../../../../pages/shared';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const {
  COMPANIES_HOUSE_NUMBER,
  COMPANIES_HOUSE: {
    COMPANY_NAME,
    COMPANY_NUMBER,
    COMPANY_INCORPORATED,
    FINANCIAL_YEAR_END_DATE,
    COMPANY_SIC,
  },
  EXPORTER_BUSINESS: {
    YOUR_COMPANY: {
      TRADING_ADDRESS,
      TRADING_NAME,
      WEBSITE,
      PHONE_NUMBER,
    },
  },
} = INSURANCE_FIELD_IDS;

const {
  ROOT,
  EXPORTER_BUSINESS: {
    COMPANIES_HOUSE_NUMBER_CHANGE,
    COMPANY_DETAILS_CHANGE,
    CHECK_YOUR_ANSWERS,
  },
} = INSURANCE_ROUTES;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.business;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Your business - Change your answers - Company details - As an exporter, I want to change my answers to the company details section', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.clearCookies();

    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      task.link().click();

      cy.completeAndSubmitCompanyDetails();
      cy.completeAndSubmitNatureOfYourBusiness();
      cy.completeAndSubmitTurnoverForm();
      cy.completeAndSubmitBrokerForm({});

      url = `${baseUrl}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe(COMPANY_NUMBER, () => {
    const fieldId = COMPANY_NUMBER;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${COMPANY_DETAILS_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        const expectedUrl = `${baseUrl}${ROOT}/${referenceNumber}${COMPANIES_HOUSE_NUMBER_CHANGE}#heading`;

        cy.assertUrl(expectedUrl);
      });
    });

    describe('form submission with a new answer', () => {
      const newAnswer = '14440211';

      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.keyboardInput(field(COMPANIES_HOUSE_NUMBER).input(), newAnswer);

        submitButton().click();
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        const expectedUrl = `${baseUrl}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}#heading`;

        cy.assertUrl(expectedUrl);
      });

      it('should render the new answer', () => {
        const expected = newAnswer;

        cy.assertSummaryListRowValue(summaryList, fieldId, expected);
        cy.assertSummaryListRowValue(summaryList, COMPANY_NAME, COMPANY_EXAMPLE.COMPANY_NAME);
        cy.assertSummaryListRowValue(summaryList, COMPANY_INCORPORATED, COMPANY_EXAMPLE.COMPANY_INCORPORATED);

        cy.assertSummaryListRowValue(summaryList, COMPANY_SIC, `${COMPANY_EXAMPLE.COMPANY_SIC} ${COMPANY_EXAMPLE.COMPANY_SIC_DESCRIPTION}`);

        cy.assertSummaryListRowValue(summaryList, FINANCIAL_YEAR_END_DATE, COMPANY_EXAMPLE.FINANCIAL_YEAR_END_DATE);
        cy.assertSummaryListRowValue(summaryList, COMPANY_NAME, 'AUDI LTD');
        cy.assertSummaryListRowValue(summaryList, COMPANY_INCORPORATED, '25 October 2022');
      });
    });
  });

  describe(TRADING_NAME, () => {
    const fieldId = TRADING_NAME;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${COMPANY_DETAILS_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl(referenceNumber, COMPANY_DETAILS_CHANGE, fieldId);
      });
    });

    describe('form submission with a new answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        noRadioInput().first().click();

        submitButton().click();
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.assertChangeAnswersPageUrl(referenceNumber, CHECK_YOUR_ANSWERS, fieldId);
      });

      it('should render the new answer', () => {
        const expected = FIELD_VALUES.NO;

        cy.assertSummaryListRowValue(summaryList, fieldId, expected);
      });
    });
  });

  describe(TRADING_ADDRESS, () => {
    const fieldId = TRADING_ADDRESS;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${COMPANY_DETAILS_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl(referenceNumber, COMPANY_DETAILS_CHANGE, fieldId);
      });
    });

    describe('form submission with a new answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        noRadioInput().eq(1).click();

        submitButton().click();
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.assertChangeAnswersPageUrl(referenceNumber, CHECK_YOUR_ANSWERS, fieldId);
      });

      it('should render the new answer', () => {
        const expected = FIELD_VALUES.NO;

        cy.assertSummaryListRowValue(summaryList, fieldId, expected);
      });
    });
  });

  describe(PHONE_NUMBER, () => {
    const fieldId = PHONE_NUMBER;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${COMPANY_DETAILS_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl(referenceNumber, COMPANY_DETAILS_CHANGE, fieldId);
      });
    });

    describe('form submission with a new answer', () => {
      const newAnswer = VALID_PHONE_NUMBERS.LANDLINE.NORMAL;

      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.keyboardInput(field(PHONE_NUMBER).input(), newAnswer);

        submitButton().click();
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.assertChangeAnswersPageUrl(referenceNumber, CHECK_YOUR_ANSWERS, fieldId);
      });

      it('should render the new answer', () => {
        cy.assertSummaryListRowValue(summaryList, fieldId, newAnswer);
      });
    });
  });

  describe(WEBSITE, () => {
    const fieldId = WEBSITE;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${COMPANY_DETAILS_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl(referenceNumber, COMPANY_DETAILS_CHANGE, fieldId);
      });
    });

    describe('form submission with a new answer', () => {
      const newAnswer = WEBSITE_EXAMPLES.VALID;

      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.keyboardInput(field(WEBSITE).input(), newAnswer);

        submitButton().click();
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.assertChangeAnswersPageUrl(referenceNumber, CHECK_YOUR_ANSWERS, fieldId);
      });

      it('should render the new answer', () => {
        cy.assertSummaryListRowValue(summaryList, fieldId, newAnswer);
      });
    });
  });
});
