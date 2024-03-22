import { headingCaption } from '../../../../../../pages/shared';
import { aboutGoodsOrServicesPage } from '../../../../../../pages/insurance/export-contract';
import { PAGES } from '../../../../../../content-strings';
import { EXPORT_CONTRACT_FIELDS as FIELD_STRINGS } from '../../../../../../content-strings/fields/insurance/export-contract';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const CONTENT_STRINGS = PAGES.INSURANCE.EXPORT_CONTRACT.HOW_WILL_YOU_GET_PAID;

const {
  ROOT: INSURANCE_ROOT,
  EXPORT_CONTRACT: {
    ABOUT_GOODS_OR_SERVICES,
    HOW_WILL_YOU_GET_PAID,
  },
} = INSURANCE_ROUTES;

const {
  EXPORT_CONTRACT: {
    HOW_WILL_YOU_GET_PAID: { PAYMENT_TERMS_DESCRIPTION },
  },
} = INSURANCE_FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Export contract - How will you get paid page - As an exporter, I want to provide information on how I will be paid for my export, So that UKEF can have clarity on the payment terms I have with the buyer', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${HOW_WILL_YOU_GET_PAID}`;

      cy.navigateToUrl(url);
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
      currentHref: `${INSURANCE_ROOT}/${referenceNumber}${HOW_WILL_YOU_GET_PAID}`,
      backLink: `${INSURANCE_ROOT}/${referenceNumber}${ABOUT_GOODS_OR_SERVICES}`,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('renders a heading caption', () => {
      cy.checkText(headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
    });

    it(`renders ${PAYMENT_TERMS_DESCRIPTION} label, hint and input`, () => {
      const fieldId = PAYMENT_TERMS_DESCRIPTION;
      const field = aboutGoodsOrServicesPage[fieldId];

      cy.checkText(field.label(), FIELD_STRINGS.HOW_WILL_YOU_GET_PAID[fieldId].LABEL);

      cy.checkText(field.hint.intro(), FIELD_STRINGS.HOW_WILL_YOU_GET_PAID[fieldId].HINT.INTRO);

      cy.checkText(field.hint.list.item1(), FIELD_STRINGS.HOW_WILL_YOU_GET_PAID[fieldId].HINT.LIST[0]);
      cy.checkText(field.hint.list.item2(), FIELD_STRINGS.HOW_WILL_YOU_GET_PAID[fieldId].HINT.LIST[1]);
      cy.checkText(field.hint.list.item3(), FIELD_STRINGS.HOW_WILL_YOU_GET_PAID[fieldId].HINT.LIST[2]);

      cy.checkText(field.hint.outro(), FIELD_STRINGS.HOW_WILL_YOU_GET_PAID[fieldId].HINT.OUTRO);

      // field.textarea().should('exist');
      // TODO - assert textarea
    });

    it('renders a `save and back` button', () => {
      cy.assertSaveAndBackButton();
    });
  });
});
