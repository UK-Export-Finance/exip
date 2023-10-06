import partials from '../../../../../partials';
import { field as fieldSelector } from '../../../../../pages/shared';
import { BUTTONS, PAGES, FIELDS } from '../../../../../content-strings';
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

      cy.checkText(field.heading(), FIELDS[SATISFACTION].TITLE);
      cy.checkText(field.label(), FIELDS[SATISFACTION].LABEL);

      cy.checkText(fieldSelector(VERY_SATISFIED).label(), FIELDS[SATISFACTION].VERY_SATISFIED);
      cy.checkText(fieldSelector(SATISFIED).label(), FIELDS[SATISFACTION].SATISFIED);
      cy.checkText(fieldSelector(NEITHER).label(), FIELDS[SATISFACTION].NEITHER);
      cy.checkText(fieldSelector(DISSATISFIED).label(), FIELDS[SATISFACTION].DISSATISFIED);
      cy.checkText(fieldSelector(VERY_DISSATISIFED).label(), FIELDS[SATISFACTION].VERY_DISSATISIFED);

      fieldSelector(VERY_SATISFIED).input().should('exist');
      fieldSelector(SATISFIED).input().should('exist');
      fieldSelector(NEITHER).input().should('exist');
      fieldSelector(DISSATISFIED).input().should('exist');
      fieldSelector(VERY_DISSATISIFED).input().should('exist');
    });

    it(`should render the ${IMPROVEMENT} section`, () => {
      const field = fieldSelector(IMPROVEMENT);

      cy.checkText(field.label(), FIELDS[IMPROVEMENT].LABEL);
      cy.checkText(field.hint(), FIELDS[IMPROVEMENT].HINT);
      field.textarea().should('exist');
    });

    it(`should render the ${OTHER_COMMENTS} section`, () => {
      const field = fieldSelector(OTHER_COMMENTS);

      cy.checkText(field.label(), FIELDS[OTHER_COMMENTS].LABEL);
      cy.checkText(field.hint(), FIELDS[OTHER_COMMENTS].HINT);
      field.textarea().should('exist');
    });
  });
});
