import { broker } from '../../../../pages/your-business';
import partials from '../../../../partials';
import { saveAndBackButton, submitButton } from '../../../../pages/shared';
import {
  PAGES, BUTTONS, ERROR_MESSAGES, LINKS,
} from '../../../../../../content-strings';
import { ROUTES } from '../../../../../../constants';
import { EXPORTER_BUSINESS as FIELD_IDS } from '../../../../../../constants/field-ids/insurance/exporter-business';
import { EXPORTER_BUSINESS_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/exporter-business';
import application from '../../../../../fixtures/application';

const CONTENT_STRINGS = PAGES.INSURANCE.EXPORTER_BUSINESS.BROKER;

const {
  BROKER: {
    USING_BROKER,
    HEADING,
    NAME,
    ADDRESS_LINE_1,
    ADDRESS_LINE_2,
    TOWN,
    COUNTY,
    POSTCODE,
    EMAIL,
    DETAILS,
  },
} = FIELD_IDS;

const {
  ROOT,
  START,
  EXPORTER_BUSINESS: {
    BROKER,
    TURNOVER,
    CHECK_YOUR_ANSWERS,
  },
} = ROUTES.INSURANCE;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.exporterBusiness;

const BROKER_ERRORS = ERROR_MESSAGES.INSURANCE.EXPORTER_BUSINESS;
const ERROR_MESSAGE_BROKER = BROKER_ERRORS[USING_BROKER];

const { APPROVED_BROKER_LIST } = LINKS.EXTERNAL;

const ERROR_ASSERTIONS = {
  field: broker[USING_BROKER],
  numberOfExpectedErrors: 1,
  errorIndex: 0,
};

context('Insurance - Your business - Broker Page - As an Exporter I want to confirm if I am using a broker for my export Insurance so that UKEF and I can easily collaborate and manage correspondence regarding my export insurance', () => {
  let referenceNumber;
  let url;
  let checkYourAnswersUrl;

  before(() => {
    cy.navigateToUrl(START);

    cy.submitInsuranceEligibilityAndStartApplication();

    task.link().click();

    cy.completeAndSubmitCompanyDetails();
    cy.completeAndSubmitNatureOfYourBusiness();
    cy.completeAndSubmitTurnoverForm();

    cy.getReferenceNumber().then((id) => {
      referenceNumber = id;

      url = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${BROKER}`;
      checkYourAnswersUrl = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;

      cy.url().should('eq', url);
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('exip-session');
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: `${ROOT}/${referenceNumber}${BROKER}`,
      backLink: `${ROOT}/${referenceNumber}${TURNOVER}`,
      assertSubmitButton: true,
      lightHouseThresholds: {
        // accessibility threshold is reduced here because
        // the radio component from design system has an invalid aria attribute.
        // this is out of our control
        accessibility: 90,
      },
    });
  });

  it('renders a heading caption', () => {
    cy.checkText(partials.headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
  });

  it(`should display ${USING_BROKER} section`, () => {
    const fieldId = USING_BROKER;
    const field = broker[fieldId];

    field.yesRadioInput().should('exist');
    cy.checkAriaLabel(field.yesRadioInput(), `${CONTENT_STRINGS.PAGE_TITLE} yes radio`);

    field.noRadioInput().should('exist');
    cy.checkAriaLabel(field.noRadioInput(), `${CONTENT_STRINGS.PAGE_TITLE} no radio`);
  });

  it('should display additional broker section when yes radio is selected', () => {
    const fieldId = USING_BROKER;
    const field = broker[fieldId];
    field.yesRadioInput().click();

    cy.checkText(broker[HEADING](), FIELDS.BROKER[HEADING].HEADING);

    cy.checkText(broker[NAME].label(), FIELDS.BROKER[NAME].LABEL);
    broker[NAME].input().should('exist');

    cy.checkText(broker[ADDRESS_LINE_1].label(), FIELDS.BROKER[ADDRESS_LINE_1].LABEL);
    broker[ADDRESS_LINE_1].input().should('exist');

    cy.checkText(broker[ADDRESS_LINE_2].label(), FIELDS.BROKER[ADDRESS_LINE_2].LABEL);
    broker[ADDRESS_LINE_2].input().should('exist');

    cy.checkText(broker[TOWN].label(), FIELDS.BROKER[TOWN].LABEL);
    broker[TOWN].input().should('exist');

    cy.checkText(broker[COUNTY].label(), FIELDS.BROKER[COUNTY].LABEL);
    broker[COUNTY].input().should('exist');

    cy.checkText(broker[POSTCODE].label(), FIELDS.BROKER[POSTCODE].LABEL);
    broker[POSTCODE].input().should('exist');

    cy.checkText(broker[EMAIL].label(), FIELDS.BROKER[EMAIL].LABEL);
    broker[EMAIL].input().should('exist');
  });

  describe('when clicking the "Why appoint a broker" details section', () => {
    it('should display the details section', () => {
      cy.checkText(broker[DETAILS].summary(), FIELDS.BROKER[DETAILS].SUMMARY);

      broker[DETAILS].summary().click();

      cy.checkText(broker[DETAILS].line_1(), FIELDS.BROKER[DETAILS].LINE_1);
      cy.checkText(broker[DETAILS].line_2(), FIELDS.BROKER[DETAILS].LINE_2);
      cy.checkText(broker[DETAILS].line_3(), FIELDS.BROKER[DETAILS].LINE_3);
      cy.checkText(broker[DETAILS].line_4(), FIELDS.BROKER[DETAILS].LINE_4);

      cy.checkLink(broker[DETAILS].link(), APPROVED_BROKER_LIST, FIELDS.BROKER[DETAILS].LINK_TEXT);
    });
  });

  it('should display save and go back button', () => {
    cy.checkText(saveAndBackButton(), BUTTONS.SAVE_AND_BACK);
  });

  describe('form submission', () => {
    describe('when submitting an empty form', () => {
      const errorMessage = ERROR_MESSAGE_BROKER.IS_EMPTY;

      it(`should display validation errors if ${USING_BROKER} radio not selected`, () => {
      // visit url to refresh form and radios
        cy.navigateToUrl(url);

        const { field, numberOfExpectedErrors, errorIndex } = ERROR_ASSERTIONS;

        cy.submitAndAssertRadioErrors(field, errorIndex, numberOfExpectedErrors, errorMessage);
      });
    });

    describe('when submitting a fully filled form', () => {
      describe(`when selecting yes for ${USING_BROKER}`, () => {
        it(`should redirect to ${CHECK_YOUR_ANSWERS} page`, () => {
          cy.completeAndSubmitBrokerForm();

          cy.url().should('eq', checkYourAnswersUrl);
        });

        describe('when going back to the page', () => {
          it('should have the submitted values', () => {
            cy.navigateToUrl(url);

            broker[USING_BROKER].yesRadioInput().should('be.checked');
            cy.checkValue(broker[NAME].input(), application.EXPORTER_BROKER[NAME]);
            cy.checkValue(broker[ADDRESS_LINE_1].input(), application.EXPORTER_BROKER[ADDRESS_LINE_1]);
            cy.checkValue(broker[ADDRESS_LINE_2].input(), '');
            cy.checkValue(broker[TOWN].input(), application.EXPORTER_BROKER[TOWN]);
            cy.checkValue(broker[COUNTY].input(), '');
            cy.checkValue(broker[POSTCODE].input(), application.EXPORTER_BROKER[POSTCODE]);
            cy.checkValue(broker[EMAIL].input(), application.EXPORTER_BROKER[EMAIL]);
          });
        });
      });

      describe(`when selecting no for ${USING_BROKER}`, () => {
        it(`should redirect to ${CHECK_YOUR_ANSWERS} page`, () => {
          broker[USING_BROKER].noRadioInput().click();
          submitButton().click();

          cy.url().should('eq', checkYourAnswersUrl);
        });

        describe('when going back to the page', () => {
          it('should have the submitted values', () => {
            cy.navigateToUrl(url);

            broker[USING_BROKER].noRadioInput().should('be.checked');
          });
        });
      });
    });
  });
});
