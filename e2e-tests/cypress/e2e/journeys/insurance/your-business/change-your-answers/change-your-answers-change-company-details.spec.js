import partials from '../../../../partials';
import {
  VALID_PHONE_NUMBERS,
  WEBSITE_EXAMPLES,
  COMPANY_EXAMPLE,
  FIELD_VALUES,
} from '../../../../../../constants';
import { companyDetails, checkYourAnswers } from '../../../../pages/your-business';
import { submitButton } from '../../../../pages/shared';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const {
  COMPANY_HOUSE: {
    INPUT,
    COMPANY_NAME,
    COMPANY_NUMBER,
    COMPANY_INCORPORATED,
    FINANCIAL_YEAR_END_DATE,
  },
  YOUR_COMPANY: {
    TRADING_ADDRESS,
    TRADING_NAME,
    WEBSITE,
    PHONE_NUMBER,
  },
} = INSURANCE_FIELD_IDS.EXPORTER_BUSINESS;

const {
  ROOT,
  EXPORTER_BUSINESS: {
    COMPANY_DETAILS_CHANGE,
    CHECK_YOUR_ANSWERS,
  },
} = INSURANCE_ROUTES;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.exporterBusiness;

const { summaryList } = checkYourAnswers;

context('Insurance - Your business - Change your answers - Company details - As an exporter, I want to change my answers to the company details section', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.clearCookies();

    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumber = refNumber;

      task.link().click();

      cy.completeAndSubmitCompanyDetails();
      cy.completeAndSubmitYourContact();
      cy.completeAndSubmitNatureOfYourBusiness();
      cy.completeAndSubmitTurnoverForm();
      cy.completeAndSubmitBrokerForm();

      url = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteAccountAndApplication(referenceNumber);
  });

  describe(COMPANY_NUMBER, () => {
    const fieldId = COMPANY_NUMBER;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${COMPANY_DETAILS_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList[fieldId].changeLink().click();

        cy.assertChangeAnswersPageUrl(referenceNumber, COMPANY_DETAILS_CHANGE, INPUT);
      });
    });

    describe('form submission with a new answer', () => {
      const newAnswer = '14440211';

      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList[fieldId].changeLink().click();

        cy.keyboardInput(companyDetails.companiesHouseSearch(), newAnswer);

        submitButton().click();
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.assertChangeAnswersPageUrl(referenceNumber, CHECK_YOUR_ANSWERS);
      });

      it('should render the new answer', () => {
        const expected = newAnswer;

        cy.assertSummaryListRowValue(summaryList, fieldId, expected);
        cy.assertSummaryListRowValue(summaryList, COMPANY_NAME, COMPANY_EXAMPLE.COMPANY_NAME);
        cy.assertSummaryListRowValue(summaryList, COMPANY_INCORPORATED, COMPANY_EXAMPLE.COMPANY_INCORPORATED);

        // TODO: EMS-1080 - disabled due to bug that has been troublesome to replicate.
        // cy.assertSummaryListRowValue(summaryList, COMPANY_SIC, COMPANY_EXAMPLE.COMPANY_SIC);

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

        summaryList[fieldId].changeLink().click();

        cy.assertChangeAnswersPageUrl(referenceNumber, COMPANY_DETAILS_CHANGE, fieldId);
      });
    });

    describe('form submission with a new answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList[fieldId].changeLink().click();

        companyDetails.tradingNameNoRadioInput().click();

        submitButton().click();
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.assertChangeAnswersPageUrl(referenceNumber, CHECK_YOUR_ANSWERS);
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

        summaryList[fieldId].changeLink().click();

        cy.assertChangeAnswersPageUrl(referenceNumber, COMPANY_DETAILS_CHANGE, fieldId);
      });
    });

    describe('form submission with a new answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList[fieldId].changeLink().click();

        companyDetails.tradingAddressNoRadioInput().click();

        submitButton().click();
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.assertChangeAnswersPageUrl(referenceNumber, CHECK_YOUR_ANSWERS);
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

        summaryList[fieldId].changeLink().click();

        cy.assertChangeAnswersPageUrl(referenceNumber, COMPANY_DETAILS_CHANGE, fieldId);
      });
    });

    describe('form submission with a new answer', () => {
      const newAnswer = VALID_PHONE_NUMBERS.LANDLINE.NORMAL;

      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList[fieldId].changeLink().click();

        cy.keyboardInput(companyDetails.phoneNumber(), newAnswer);

        submitButton().click();
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.assertChangeAnswersPageUrl(referenceNumber, CHECK_YOUR_ANSWERS);
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

        summaryList[fieldId].changeLink().click();

        cy.assertChangeAnswersPageUrl(referenceNumber, COMPANY_DETAILS_CHANGE, fieldId);
      });
    });

    describe('form submission with a new answer', () => {
      const newAnswer = WEBSITE_EXAMPLES.VALID;

      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList[fieldId].changeLink().click();

        cy.keyboardInput(companyDetails.companyWebsite(), newAnswer);

        submitButton().click();
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.assertChangeAnswersPageUrl(referenceNumber, CHECK_YOUR_ANSWERS);
      });

      it('should render the new answer', () => {
        cy.assertSummaryListRowValue(summaryList, fieldId, newAnswer);
      });
    });
  });
});
