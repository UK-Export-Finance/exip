import partials from '../../../../../../partials';
import { turnoverPage } from '../../../../../../pages/your-business';
import { PAGES } from '../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const CONTENT_STRINGS = PAGES.INSURANCE.EXPORTER_BUSINESS.TURNOVER_CURRENCY;

const {
  ROOT,
  EXPORTER_BUSINESS: { TURNOVER, TURNOVER_CURRENCY },
} = INSURANCE_ROUTES;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.business;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Your business - Turnover currency page - As an Exporter I want to enter the I want to enter the turnover of my business so that UKEF can have clarity on my business financial position when processing my Export Insurance Application', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      task.link().click();

      cy.completeAndSubmitCompanyDetails({});
      cy.completeAndSubmitNatureOfYourBusiness();

      turnoverPage.provideAlternativeCurrencyLink().click();

      url = `${baseUrl}${ROOT}/${referenceNumber}${TURNOVER_CURRENCY}`;

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
      currentHref: `${ROOT}/${referenceNumber}${TURNOVER_CURRENCY}`,
      backLink: `${ROOT}/${referenceNumber}${TURNOVER}`,
      assertSubmitButton: false,
    });
  });
});
