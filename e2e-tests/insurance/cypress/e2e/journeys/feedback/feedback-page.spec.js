import partials from '../../../../../partials';
import { field as fieldSelector } from '../../../../../pages/shared';
import { BUTTONS, PAGES, FIELDS as FIELD_STRINGS } from '../../../../../content-strings';
import { ROUTES } from '../../../../../constants';
import { FIELD_IDS } from '../../../../../constants/field-ids';

const CONTENT_STRINGS = PAGES.FEEDBACK_PAGE;

const {
  FEEDBACK: {
    SATISFACTION,
    VERY_SATISFIED,
    SATISFIED,
    NEITHER,
    DISSATISFIED,
    VERY_DISSATISIFED,
    IMPROVEMENT,
    OTHER_COMMENTS,
  },
} = FIELD_IDS;

const {
  START,
  FEEDBACK,
} = ROUTES.INSURANCE;

context('Insurance - Feedback - As an exporter I want to give feedback on the UKEF EXIP Digital Service so that UKEF will have clarity on how the digital service is/or not meeting my EXIP application needs', () => {
  const startUrl = START;
  const url = FEEDBACK;

  before(() => {
    cy.navigateToUrl(startUrl);
    partials.phaseBanner.feedbackLink().click();
  });

  beforeEach(() => {
    cy.saveSession();
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: url,
      backLink: startUrl,
      submitButtonCopy: BUTTONS.SEND_FEEDBACK,
      assertAuthenticatedHeader: false,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it(`should render the ${SATISFACTION} radios`, () => {
      const field = fieldSelector(SATISFACTION);

      cy.checkText(field.heading(), FIELD_STRINGS[SATISFACTION].TITLE);
      cy.checkText(field.label(), FIELD_STRINGS[SATISFACTION].LABEL);

      cy.checkText(fieldSelector(VERY_SATISFIED).label(), FIELD_STRINGS[SATISFACTION].VERY_SATISFIED);
      cy.checkText(fieldSelector(SATISFIED).label(), FIELD_STRINGS[SATISFACTION].SATISFIED);
      cy.checkText(fieldSelector(NEITHER).label(), FIELD_STRINGS[SATISFACTION].NEITHER);
      cy.checkText(fieldSelector(DISSATISFIED).label(), FIELD_STRINGS[SATISFACTION].DISSATISFIED);
      cy.checkText(fieldSelector(VERY_DISSATISIFED).label(), FIELD_STRINGS[SATISFACTION].VERY_DISSATISIFED);

      fieldSelector(VERY_SATISFIED).input().should('exist');
      fieldSelector(SATISFIED).input().should('exist');
      fieldSelector(NEITHER).input().should('exist');
      fieldSelector(DISSATISFIED).input().should('exist');
      fieldSelector(VERY_DISSATISIFED).input().should('exist');
    });

    it(`should render the ${IMPROVEMENT} textarea`, () => {
      const fieldId = IMPROVEMENT;
      const fieldStrings = FIELD_STRINGS[fieldId];

      cy.assertTextareaRendering({
        fieldId,
        expectedLabel: fieldStrings.LABEL,
        expectedHint: fieldStrings.HINT,
        maximumCharacters: fieldStrings.MAXIMUM,
      });
    });

    it(`should render the ${OTHER_COMMENTS} textarea`, () => {
      const fieldId = OTHER_COMMENTS;
      const fieldStrings = FIELD_STRINGS[fieldId];

      cy.assertTextareaRendering({
        fieldId,
        expectedLabel: fieldStrings.LABEL,
        expectedHint: fieldStrings.HINT,
        maximumCharacters: fieldStrings.MAXIMUM,
      });
    });
  });
});
