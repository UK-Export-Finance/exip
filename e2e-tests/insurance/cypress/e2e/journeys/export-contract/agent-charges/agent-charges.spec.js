import { headingCaption } from '../../../../../../pages/shared';
// import { FIELD_VALUES } from '../../../../../../constants';
import { PAGES } from '../../../../../../content-strings';
// import { EXPORT_CONTRACT_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/export-contract';
// import FIELD_IDS from '../../../../../../constants/field-ids/insurance/export-contract';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const CONTENT_STRINGS = PAGES.INSURANCE.EXPORT_CONTRACT.AGENT_CHARGES;

const {
  ROOT,
  EXPORT_CONTRACT: { AGENT_CHARGES },
} = INSURANCE_ROUTES;

// const { AGENT_CHARGES: { METHOD, PAYABLE_COUNTRY_CODE } } = FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Export contract - Agent charges page - As an Exporter, I want to state what my agent’s charges are, So that UKEF, the legal team and the British Embassy are aware of expenses incurred in my export contract bid', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      url = `${baseUrl}${ROOT}/${referenceNumber}${AGENT_CHARGES}`;

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
      currentHref: `${ROOT}/${referenceNumber}${AGENT_CHARGES}`,
      backLink: `${ROOT}/${referenceNumber}#`,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('renders a heading caption', () => {
      cy.checkText(headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
    });

    // it(`renders ${SERVICE_DESCRIPTION} label and input`, () => {
    //   const fieldId = SERVICE_DESCRIPTION;
    //   const fieldStrings = FIELDS.AGENT_CHARGES[fieldId];

    //   cy.assertTextareaRendering({
    //     fieldId,
    //     expectedLabel: fieldStrings.LABEL,
    //     maximumCharacters: fieldStrings.MAXIMUM,
    //   });
    // });

    // describe(`${IS_CHARGING} label and input`, () => {
    //   const fieldId = IS_CHARGING;

    //   it('renders `yes` and `no` radio buttons in the correct order', () => {
    //     cy.assertYesNoRadiosOrder({ noRadioFirst: true });
    //   });

    //   it('renders `no` radio button', () => {
    //     cy.checkText(noRadio().label(), FIELD_VALUES.NO);

    //     cy.checkRadioInputNoAriaLabel(FIELDS.AGENT_CHARGES[fieldId].LABEL);
    //   });

    //   it('renders `yes` radio button', () => {
    //     yesRadio().input().should('exist');

    //     cy.checkText(yesRadio().label(), FIELD_VALUES.YES);

    //     cy.checkRadioInputYesAriaLabel(FIELDS.AGENT_CHARGES[fieldId].LABEL);
    //   });
    // });

    it('renders a `save and back` button', () => {
      cy.assertSaveAndBackButton();
    });
  });
});
