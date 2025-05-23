const field = (id) => ({
  label: () => cy.get(`[data-cy="${id}-label"]`),
  legend: () => cy.get(`[data-cy="${id}-legend`),
  heading: () => cy.get(`[data-cy="${id}-heading"]`),
  hint: () => cy.get(`[data-cy="${id}-hint"]`),
  hintIntro: () => cy.get(`[data-cy="${id}-hint-intro"]`),
  hintLink: () => cy.get(`[data-cy="${id}-hint-link"]`),
  hintOutro: () => cy.get(`[data-cy="${id}-hint-outro"]`),
  input: () => cy.get(`[data-cy="${id}-input"]`),
  textarea: () => cy.get(`[data-cy="${id}"]`),
  inputOption: () => cy.get(`[data-cy="${id}-input"]`).find('option'),
  inputFirstOption: () => cy.get(`[data-cy="${id}-input"]`).find('option').eq(0),
  inputOptionSelected: () => cy.get(`[data-cy="${id}-input"]`).find(':selected'),
  dayInput: () => cy.get(`[data-cy="${id}-day-input"]`),
  monthInput: () => cy.get(`[data-cy="${id}-month-input"]`),
  yearInput: () => cy.get(`[data-cy="${id}-year-input"]`),
  errorMessage: () => cy.get(`[data-cy="${id}-error-message"]`),
  prefix: () => cy.get(`[data-cy="${id}-prefix"]`),
  suffix: () => cy.get(`[data-cy="${id}-suffix"]`),
  characterCount: () => cy.get(`[data-cy="${id}"]`).siblings('.govuk-character-count__status'),
});

export default field;
