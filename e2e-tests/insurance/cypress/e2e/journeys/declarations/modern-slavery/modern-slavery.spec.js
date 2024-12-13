import { field as fieldSelector, headingCaption, yesRadio, noRadio } from '../../../../../../pages/shared';
import { PAGES } from '../../../../../../content-strings';
import { DECLARATIONS_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/declarations';
import { FIELD_VALUES } from '../../../../../../constants';
import { DECLARATIONS as DECLARATIONS_FIELD_IDS } from '../../../../../../constants/field-ids/insurance/declarations';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const CONTENT_STRINGS = PAGES.INSURANCE.DECLARATIONS.MODERN_SLAVERY;

const {
  ROOT: INSURANCE_ROOT,
  DECLARATIONS: { MODERN_SLAVERY },
} = INSURANCE_ROUTES;

const {
  MODERN_SLAVERY: { WILL_ADHERE_TO_ALL_REQUIREMENTS, HAS_NO_OFFENSES_OR_INVESTIGATIONS, IS_NOT_AWARE_OF_EXISTING_SLAVERY },
} = DECLARATIONS_FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Declarations - Modern slavery page - TODO', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      url = `${baseUrl}${INSURANCE_ROOT}/${referenceNumber}${MODERN_SLAVERY}`;

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
      currentHref: `${INSURANCE_ROOT}/${referenceNumber}${MODERN_SLAVERY}`,
      backLink: `${INSURANCE_ROOT}/${referenceNumber}${MODERN_SLAVERY}#`,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('renders a heading caption', () => {
      cy.checkText(headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
    });

    describe(WILL_ADHERE_TO_ALL_REQUIREMENTS, () => {
      const fieldId = WILL_ADHERE_TO_ALL_REQUIREMENTS;

      const fieldStrings = FIELDS.MODERN_SLAVERY[fieldId].VERSIONS[0];

      it('should render a legend', () => {
        cy.checkText(fieldSelector(fieldId).legend(), fieldStrings.LABEL);
      });

      describe('`yes` radio', () => {
        const selector = yesRadio();

        it('should render a label', () => {
          cy.checkText(selector.label().first(), FIELD_VALUES.YES);

          cy.checkRadioInputYesAriaLabel(fieldStrings.LABEL);
        });

        it('should render an input', () => {
          selector.input().first().should('exist');
        });
      });

      describe('`no` radio', () => {
        const selector = noRadio();

        it('should render a label', () => {
          cy.checkText(selector.label().first(), FIELD_VALUES.NO);

          cy.checkRadioInputNoAriaLabel(fieldStrings.LABEL);
        });

        it('should render an input', () => {
          selector.input().first().should('exist');
        });
      });
    });

    describe(HAS_NO_OFFENSES_OR_INVESTIGATIONS, () => {
      const fieldId = HAS_NO_OFFENSES_OR_INVESTIGATIONS;

      const fieldStrings = FIELDS.MODERN_SLAVERY[fieldId].VERSIONS[0];

      it('should render a legend', () => {
        cy.checkText(fieldSelector(fieldId).legend(), fieldStrings.LABEL);
      });

      describe('`yes` radio', () => {
        const selector = yesRadio();

        it('should render a label', () => {
          cy.checkText(selector.label().eq(1), FIELD_VALUES.YES);

          cy.checkRadioInputYesAriaLabel(fieldStrings.LABEL, 1);
        });

        it('should render an input', () => {
          selector.input().eq(1).should('exist');
        });
      });

      describe('`no` radio', () => {
        const selector = noRadio();

        it('should render a label', () => {
          cy.checkText(selector.label().first(), FIELD_VALUES.NO);

          cy.checkRadioInputNoAriaLabel(fieldStrings.LABEL, 1);
        });

        it('should render an input', () => {
          selector.input().first().should('exist');
        });
      });
    });

    describe(IS_NOT_AWARE_OF_EXISTING_SLAVERY, () => {
      const fieldId = IS_NOT_AWARE_OF_EXISTING_SLAVERY;

      const fieldStrings = FIELDS.MODERN_SLAVERY[fieldId].VERSIONS[0];

      it('should render a legend', () => {
        cy.checkText(fieldSelector(fieldId).legend(), fieldStrings.LABEL);
      });

      describe('`yes` radio', () => {
        const selector = yesRadio();

        it('should render a label', () => {
          cy.checkText(selector.label().eq(1), FIELD_VALUES.YES);

          cy.checkRadioInputYesAriaLabel(fieldStrings.LABEL, 2);
        });

        it('should render an input', () => {
          selector.input().eq(1).should('exist');
        });
      });

      describe('`no` radio', () => {
        const selector = noRadio();

        it('should render a label', () => {
          cy.checkText(selector.label().first(), FIELD_VALUES.NO);

          cy.checkRadioInputNoAriaLabel(fieldStrings.LABEL, 2);
        });

        it('should render an input', () => {
          selector.input().first().should('exist');
        });
      });
    });
  });
});
