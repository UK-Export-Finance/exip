import { headingCaption } from '../../../../../../pages/shared';
import { turnoverPage } from '../../../../../../pages/your-business';
import { PAGES, FIELDS } from '../../../../../../content-strings';
import { EXPORTER_BUSINESS_FIELDS } from '../../../../../../content-strings/fields/insurance/business';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import assertAlternativeCurrencyForm from '../../../../../../commands/insurance/assert-alternative-currency-form';

const CONTENT_STRINGS = PAGES.INSURANCE.EXPORTER_BUSINESS.TURNOVER_CURRENCY;

const {
  ROOT,
  EXPORTER_BUSINESS: { TURNOVER_ROOT, TURNOVER_CURRENCY },
} = INSURANCE_ROUTES;

const { CURRENCY: { CURRENCY_CODE, ALTERNATIVE_CURRENCY_CODE } } = INSURANCE_FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Your business - Turnover currency page - As an Exporter I want to enter the turnover of my business so that UKEF can have clarity on my business financial position when processing my Export Insurance Application', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startYourBusinessSection({});

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
      backLink: `${ROOT}/${referenceNumber}${TURNOVER_ROOT}`,
      assertSaveAndBackButtonDoesNotExist: true,
    });
  });

  describe('page tests', () => {
    const { radios, alternativeCurrencyInput } = assertAlternativeCurrencyForm({
      LEGEND: EXPORTER_BUSINESS_FIELDS[CURRENCY_CODE].LEGEND,
      ALTERNATIVE_CURRENCY_TEXT: FIELDS[ALTERNATIVE_CURRENCY_CODE].TEXT,
    });

    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('renders a heading caption', () => {
      cy.checkText(headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
    });

    it('renders alternative currency radios', () => {
      radios();
    });

    it('renders alternative currency input', () => {
      alternativeCurrencyInput();
    });
  });
});
