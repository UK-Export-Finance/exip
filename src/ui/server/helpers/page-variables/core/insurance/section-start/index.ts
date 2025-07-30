import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';
import insuranceCorePageVariables from '..';
import { SectionStartPageVariablesInput, SectionStartPageVariables } from '../../../../../../types';

const { INSURANCE_ROOT, ALL_SECTIONS } = INSURANCE_ROUTES;

/**
 * sectionStartPageVariables
 * @param {number} REFERENCE_NUMBER: Application reference number
 * @param {string} START_NOW_ROUTE: Link to the "start now" page
 * @param {string} PAGE_CONTENT_STRINGS: Page content strings bespoke to the page
 * @param {string} BACK_LINK: Link to the previous page
 * @returns {object} Page variables
 */
const sectionStartPageVariables = ({
  REFERENCE_NUMBER,
  START_NOW_ROUTE,
  PAGE_CONTENT_STRINGS,
  BACK_LINK,
}: SectionStartPageVariablesInput): SectionStartPageVariables => ({
  ALL_SECTIONS_URL: `${INSURANCE_ROOT}/${REFERENCE_NUMBER}${ALL_SECTIONS}`,
  START_NOW_URL: `${INSURANCE_ROOT}/${REFERENCE_NUMBER}${START_NOW_ROUTE}`,
  ...insuranceCorePageVariables({
    PAGE_CONTENT_STRINGS,
    BACK_LINK,
  }),
});

export default sectionStartPageVariables;
