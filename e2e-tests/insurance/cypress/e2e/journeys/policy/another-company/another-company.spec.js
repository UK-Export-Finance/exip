import {
  headingCaption,
  yesRadio,
  yesNoRadioHint,
  noRadio,
  saveAndBackButton,
} from '../../../../../../pages/shared';
import {
  BUTTONS,
  PAGES,
} from '../../../../../../content-strings';
import { FIELD_VALUES } from '../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../constants/field-ids/insurance/policy';
import { POLICY_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/policy';

const CONTENT_STRINGS = PAGES.INSURANCE.POLICY.ANOTHER_COMPANY;

const {
  ROOT,
  POLICY: { ANOTHER_COMPANY },
} = INSURANCE_ROUTES;

const { NEED_ANOTHER_COMPANY_TO_BE_INSURED } = POLICY_FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

const story = 'As an exporter, I want to inform UKEF of any other company I would like to include on my policy, So that cover is available for all appropriate parties';

context(`Insurance - Policy - Another company page - ${story}`, () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      // go to the page we want to test.
      cy.startInsurancePolicySection({});

      url = `${baseUrl}${ROOT}/${referenceNumber}${ANOTHER_COMPANY}`;

      cy.navigateToUrl(url);
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
      currentHref: `${ROOT}/${referenceNumber}${ANOTHER_COMPANY}`,
      backLink: `${url}#`,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('renders a heading caption', () => {
      cy.checkText(headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
    });

    it('renders a `save and back` button', () => {
      cy.checkText(saveAndBackButton(), BUTTONS.SAVE_AND_BACK);
    });

    describe(`renders ${NEED_ANOTHER_COMPANY_TO_BE_INSURED} label and inputs`, () => {
      it('renders a hint', () => {
        cy.checkText(yesNoRadioHint(), FIELDS[NEED_ANOTHER_COMPANY_TO_BE_INSURED].HINT);
      });

      it('renders `yes` and `no` radio buttons in the correct order', () => {
        cy.assertYesNoRadiosOrder({ noRadioFirst: true });
      });

      it('renders `no` radio button', () => {
        cy.checkText(noRadio().label(), FIELD_VALUES.NO);

        cy.checkRadioInputNoAriaLabel(CONTENT_STRINGS.PAGE_TITLE);
      });

      it('renders `yes` radio button', () => {
        yesRadio().input().should('exist');

        cy.checkText(yesRadio().label(), FIELD_VALUES.YES);

        cy.checkRadioInputYesAriaLabel(CONTENT_STRINGS.PAGE_TITLE);
      });
    });
  });
});
