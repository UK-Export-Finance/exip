import { field as fieldSelector, yesRadio, noRadio } from '../../../../../../pages/shared';
import { DECLARATIONS_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/declarations';
import { FIELD_VALUES, MAXIMUM_CHARACTERS } from '../../../../../../constants';
import { DECLARATIONS as DECLARATIONS_FIELD_IDS } from '../../../../../../constants/field-ids/insurance/declarations';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const {
  ROOT: INSURANCE_ROOT,
  DECLARATIONS: { MODERN_SLAVERY },
} = INSURANCE_ROUTES;

const {
  MODERN_SLAVERY: {
    WILL_ADHERE_TO_ALL_REQUIREMENTS,
    HAS_NO_OFFENSES_OR_INVESTIGATIONS,
    IS_NOT_AWARE_OF_EXISTING_SLAVERY,
    CONDITIONAL_REASONS: { CANNOT_ADHERE_TO_ALL_REQUIREMENTS, OFFENSES_OR_INVESTIGATIONS, AWARE_OF_EXISTING_SLAVERY },
  },
} = DECLARATIONS_FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Declarations - Modern slavery page - radios - TODO EMS-4023', () => {
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

    cy.navigateToUrl(url);
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe(WILL_ADHERE_TO_ALL_REQUIREMENTS, () => {
    const fieldId = WILL_ADHERE_TO_ALL_REQUIREMENTS;
    const conditionalFieldId = CANNOT_ADHERE_TO_ALL_REQUIREMENTS;

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

    it(`should NOT display conditional "${conditionalFieldId}" field`, () => {
      fieldSelector(conditionalFieldId).textarea().should('not.be.visible');
    });

    it(`should display conditional "${conditionalFieldId}" field when selecting the ${fieldId} radio`, () => {
      cy.clickNoRadioInput(0);

      cy.assertTextareaRendering({
        fieldId: conditionalFieldId,
        expectedLabel: fieldStrings.CONDITIONAL_REASON.LABEL,
        maximumCharacters: MAXIMUM_CHARACTERS.DECLARATIONS.MODERN_SLAVERY.CONDITIONAL_REASON,
      });
    });
  });

  describe(HAS_NO_OFFENSES_OR_INVESTIGATIONS, () => {
    const fieldId = HAS_NO_OFFENSES_OR_INVESTIGATIONS;
    const conditionalFieldId = OFFENSES_OR_INVESTIGATIONS;

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

    it(`should NOT display conditional "${conditionalFieldId}" field`, () => {
      fieldSelector(conditionalFieldId).textarea().should('not.be.visible');
    });

    it(`should display conditional "${conditionalFieldId}" field when selecting the ${fieldId} radio`, () => {
      cy.clickNoRadioInput(1);

      cy.assertTextareaRendering({
        fieldId: conditionalFieldId,
        expectedLabel: fieldStrings.CONDITIONAL_REASON.LABEL,
        maximumCharacters: MAXIMUM_CHARACTERS.DECLARATIONS.MODERN_SLAVERY.CONDITIONAL_REASON,
      });
    });
  });

  describe(IS_NOT_AWARE_OF_EXISTING_SLAVERY, () => {
    const fieldId = IS_NOT_AWARE_OF_EXISTING_SLAVERY;
    const conditionalFieldId = AWARE_OF_EXISTING_SLAVERY;

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

    it(`should NOT display conditional "${conditionalFieldId}" field`, () => {
      fieldSelector(conditionalFieldId).textarea().should('not.be.visible');
    });

    it(`should display conditional "${conditionalFieldId}" field when selecting the ${fieldId} radio`, () => {
      cy.clickNoRadioInput(2);

      cy.assertTextareaRendering({
        fieldId: conditionalFieldId,
        expectedLabel: fieldStrings.CONDITIONAL_REASON.LABEL,
        maximumCharacters: MAXIMUM_CHARACTERS.DECLARATIONS.MODERN_SLAVERY.CONDITIONAL_REASON,
      });
    });
  });
});
