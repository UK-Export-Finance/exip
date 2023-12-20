import { FIELDS } from '../../../../content-strings/fields/insurance';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import { ApplicationBusiness, SummaryListItemData, SummaryListGroupData } from '../../../../../types';
import generateChangeLink from '../../../generate-change-link';

const { EXPORTER_BUSINESS: FIELD_IDS } = INSURANCE_FIELD_IDS;

const {
  EXPORTER_BUSINESS: { NATURE_OF_BUSINESS_CHANGE, NATURE_OF_BUSINESS_CHECK_AND_CHANGE },
} = INSURANCE_ROUTES;

const {
  NATURE_OF_YOUR_BUSINESS: { GOODS_OR_SERVICES, YEARS_EXPORTING, EMPLOYEES_UK },
} = FIELD_IDS;

/**
 * generateNatureOfYourBusinessFields
 * Create all Nature of your business fields and values for the Insurance - Nature of your business govukSummaryList
 * @param {ApplicationBusiness} answers:  Nature of your business answers
 * @param {Number} referenceNumber: Application reference number
 * @param {Boolean} checkAndChange: True if coming from check your answers section in submit application section
 * @returns {Object} All Nature of your business fields and values in an object structure for GOVUK summary list structure
 */
const generateNatureOfYourBusinessFields = (answers: ApplicationBusiness, referenceNumber: number, checkAndChange: boolean): SummaryListGroupData => {
  const fields = [
    fieldGroupItem({
      field: getFieldById(FIELDS.NATURE_OF_YOUR_BUSINESS, GOODS_OR_SERVICES),
      data: answers,
      href: generateChangeLink(NATURE_OF_BUSINESS_CHANGE, NATURE_OF_BUSINESS_CHECK_AND_CHANGE, `#${GOODS_OR_SERVICES}-label`, referenceNumber, checkAndChange),
      renderChangeLink: true,
    }),
    fieldGroupItem({
      field: getFieldById(FIELDS.NATURE_OF_YOUR_BUSINESS, YEARS_EXPORTING),
      data: answers,
      href: generateChangeLink(NATURE_OF_BUSINESS_CHANGE, NATURE_OF_BUSINESS_CHECK_AND_CHANGE, `#${YEARS_EXPORTING}-label`, referenceNumber, checkAndChange),
      renderChangeLink: true,
    }),
    fieldGroupItem({
      field: getFieldById(FIELDS.NATURE_OF_YOUR_BUSINESS, EMPLOYEES_UK),
      data: answers,
      href: generateChangeLink(NATURE_OF_BUSINESS_CHANGE, NATURE_OF_BUSINESS_CHECK_AND_CHANGE, `#${EMPLOYEES_UK}-label`, referenceNumber, checkAndChange),
      renderChangeLink: true,
    }),
  ] as Array<SummaryListItemData>;

  // TODO: content strings
  return {
    title: 'Nature of your business',
    fields,
  };
};

export default generateNatureOfYourBusinessFields;
