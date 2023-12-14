import { INSURANCE_ROUTES } from '../../constants/routes/insurance';

const { INSURANCE_ROOT, ALL_SECTIONS } = INSURANCE_ROUTES;

interface SectionStartPageVariables {
  referenceNumber: number,
  startNowRoute: string  
}

/**
 * sectionStartPageVariables
 * Page URLs
 * @param {Number} Application reference number
 * @returns {Object} Page variables
 */
const sectionStartPageVariables = ({ referenceNumber, startNowRoute }: SectionStartPageVariables)  => ({
  START_NOW_URL: `${INSURANCE_ROOT}/${referenceNumber}${startNowRoute}`,
  ALL_SECTIONS_URL: `${INSURANCE_ROOT}/${referenceNumber}${ALL_SECTIONS}`,
});

export default sectionStartPageVariables;
