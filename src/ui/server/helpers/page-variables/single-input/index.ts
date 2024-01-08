import corePageVariables from '../core';
import { FIELDS, LINKS } from '../../../content-strings';
import { FIELDS_ELIGIBILITY as FIELDS_INSURANCE_ELIGIBILITY } from '../../../content-strings/fields/insurance/eligibility';
import { SingleInputPageVariablesInput, SingleInputPageVariables } from '../../../../types';

/**
 * singleInputPageVariables
 * Generate page variables for a page with a single input form
 * @param {String} Field/input ID
 * @param {Object} Page content strings bespoke to the page
 * @param {String} Product string
 * @param {String} Link to the previous page
 * @param {String} Link to the start route for the header
 * @param {String} CUSTOM_CONTENT_HTML string for the location of the partial which contains HTML for custom content for single radio page
 * @param {String} CONDITIONAL_YES_HTML string for the location of the partial which contains HTML for conditional yes reveal single radio page
 * @param {String} CONDITIONAL_NO_HTML string for the location of the partial which contains HTML for conditional no reveal single radio page
 * @param {String} HINT_HTML string for the location of the partial which contains HTML for the hint for single radio page
 * @param {String} LEGEND_CLASS class for the legend on a single radio page
 * @param {Boolean} HORIZONTAL_RADIOS if radios are horizontal or not
 * @returns {Object} Common page content strings combined with field specifics
 */
const singleInputPageVariables = ({
  FIELD_ID,
  PAGE_CONTENT_STRINGS,
  BACK_LINK,
  FEEDBACK_ROUTE = LINKS.EXTERNAL.FEEDBACK,
  ORIGINAL_URL,
  CUSTOM_CONTENT_HTML,
  CONDITIONAL_YES_HTML,
  CONDITIONAL_NO_HTML,
  HINT_HTML,
  LEGEND_CLASS,
  HORIZONTAL_RADIOS,
}: SingleInputPageVariablesInput) => {
  const pageVariables: SingleInputPageVariables = {
    ...corePageVariables({
      PAGE_CONTENT_STRINGS,
      BACK_LINK,
      FEEDBACK_ROUTE,
      ORIGINAL_URL,
      CUSTOM_CONTENT_HTML,
      CONDITIONAL_YES_HTML,
      CONDITIONAL_NO_HTML,
      HINT_HTML,
      LEGEND_CLASS,
      HORIZONTAL_RADIOS,
    }),
    FIELD_ID,
  };

  const fieldStrings = FIELDS[FIELD_ID] || FIELDS_INSURANCE_ELIGIBILITY[FIELD_ID];

  if (fieldStrings) {
    pageVariables.FIELD_LABEL = fieldStrings.LABEL;
    pageVariables.FIELD_HINT = fieldStrings.HINT;
  }

  return pageVariables;
};

export default singleInputPageVariables;
