import { FIELDS } from '../../../../content-strings/fields/insurance';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { ROUTES } from '../../../../constants';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import { ApplicationExporterBusiness, SummaryListItemData } from '../../../../../types';

const { EXPORTER_BUSINESS: FIELD_IDS } = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    INSURANCE_ROOT,
    EXPORTER_BUSINESS: { NATURE_OF_BUSINESS_CHANGE },
  },
} = ROUTES;

const {
  NATURE_OF_YOUR_BUSINESS: { GOODS_OR_SERVICES, YEARS_EXPORTING, EMPLOYEES_UK, EMPLOYEES_INTERNATIONAL },
} = FIELD_IDS;

/**
 * generateNatureOfYourBusinessFields
 * Create all your nature of your business fields and values for the Insurance - Nature of your business govukSummaryList
 * @param {ApplicationExporterBusiness} answers exporter nature of your business
 * @returns {Object} All nature of your business fields and values in an object structure for GOVUK summary list structure
 */
const generateNatureOfYourBusinessFields = (answers: ApplicationExporterBusiness, referenceNumber: number) => {
  const fields = [
    fieldGroupItem({
      field: getFieldById(FIELDS.NATURE_OF_YOUR_BUSINESS, GOODS_OR_SERVICES),
      data: answers,
      href: `${INSURANCE_ROOT}/${referenceNumber}${NATURE_OF_BUSINESS_CHANGE}#${GOODS_OR_SERVICES}-label`,
      renderChangeLink: true,
    }),
    fieldGroupItem({
      field: getFieldById(FIELDS.NATURE_OF_YOUR_BUSINESS, YEARS_EXPORTING),
      data: answers,
      href: `${INSURANCE_ROOT}/${referenceNumber}${NATURE_OF_BUSINESS_CHANGE}#${YEARS_EXPORTING}-label`,
      renderChangeLink: true,
    }),
    fieldGroupItem({
      field: getFieldById(FIELDS.NATURE_OF_YOUR_BUSINESS, EMPLOYEES_UK),
      data: answers,
      href: `${INSURANCE_ROOT}/${referenceNumber}${NATURE_OF_BUSINESS_CHANGE}#${EMPLOYEES_UK}-label`,
      renderChangeLink: true,
    }),
    fieldGroupItem({
      field: getFieldById(FIELDS.NATURE_OF_YOUR_BUSINESS, EMPLOYEES_INTERNATIONAL),
      data: answers,
      href: `${INSURANCE_ROOT}/${referenceNumber}${NATURE_OF_BUSINESS_CHANGE}#${EMPLOYEES_INTERNATIONAL}-label`,
      renderChangeLink: true,
    }),
  ] as Array<SummaryListItemData>;

  return fields;
};

export default generateNatureOfYourBusinessFields;
