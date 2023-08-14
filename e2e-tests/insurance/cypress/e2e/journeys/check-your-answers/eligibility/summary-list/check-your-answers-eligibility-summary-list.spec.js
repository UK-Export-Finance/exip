import checkSummaryList from '../../../../../../../commands/insurance/check-your-answers-eligibility-summary-list';
import partials from '../../../../../../../partials';
import { ROUTES, FIELD_IDS } from '../../../../../../../constants';

const {
  ROOT,
  CHECK_YOUR_ANSWERS: {
    ELIGIBILITY,
  },
} = ROUTES.INSURANCE;

const {
  WANT_COVER_OVER_MAX_AMOUNT,
  WANT_COVER_OVER_MAX_PERIOD,
  OTHER_PARTIES_INVOLVED,
  LETTER_OF_CREDIT,
  PRE_CREDIT_PERIOD,
  COMPANIES_HOUSE_NUMBER,
  BUYER_COUNTRY,
  HAS_MINIMUM_UK_GOODS_OR_SERVICES,
  VALID_EXPORTER_LOCATION,
} = FIELD_IDS.INSURANCE.ELIGIBILITY;

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswers;

context('Insurance - Check your answers - Eligibility - Summary List', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType({});

      task.link().click();

      url = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${ELIGIBILITY}`;

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

  it(`should render a ${BUYER_COUNTRY} summary list row`, () => {
    checkSummaryList[BUYER_COUNTRY]();
  });

  it(`should render a ${VALID_EXPORTER_LOCATION} summary list row`, () => {
    checkSummaryList[VALID_EXPORTER_LOCATION]();
  });

  it(`should render a ${HAS_MINIMUM_UK_GOODS_OR_SERVICES} summary list row`, () => {
    checkSummaryList[HAS_MINIMUM_UK_GOODS_OR_SERVICES]();
  });

  it(`should render a ${WANT_COVER_OVER_MAX_AMOUNT} summary list row`, () => {
    checkSummaryList[WANT_COVER_OVER_MAX_AMOUNT]();
  });

  it(`should render a ${WANT_COVER_OVER_MAX_PERIOD} summary list row`, () => {
    checkSummaryList[WANT_COVER_OVER_MAX_PERIOD]();
  });

  it(`should render a ${OTHER_PARTIES_INVOLVED} summary list row`, () => {
    checkSummaryList[OTHER_PARTIES_INVOLVED]();
  });

  it(`should render a ${LETTER_OF_CREDIT} summary list row`, () => {
    checkSummaryList[LETTER_OF_CREDIT]();
  });

  it(`should render a ${PRE_CREDIT_PERIOD} summary list row`, () => {
    checkSummaryList[PRE_CREDIT_PERIOD]();
  });

  it(`should render a ${COMPANIES_HOUSE_NUMBER} summary list row`, () => {
    checkSummaryList[COMPANIES_HOUSE_NUMBER]();
  });
});
