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
 * @returns {Object} Common page content strings combined with field specifics
 */
const singleInputPageVariables = ({
  FIELD_ID,
  PAGE_CONTENT_STRINGS,
  BACK_LINK,
  FEEDBACK_ROUTE = LINKS.EXTERNAL.FEEDBACK,
  ORIGINAL_URL,
}: SingleInputPageVariablesInput) => {
  const pageVariables: SingleInputPageVariables = {
    ...corePageVariables({
      PAGE_CONTENT_STRINGS,
      BACK_LINK,
      FEEDBACK_ROUTE,
      ORIGINAL_URL,
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
