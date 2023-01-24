import { POLICY_AND_EXPORTS_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import { FIELD_IDS, ROUTES } from '../../../../constants';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import getCountryByIsoCode from '../../../get-country-by-iso-code';
import { ApplicationPolicyAndExport, Country, SummaryListItemData } from '../../../../../types';

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      ABOUT_GOODS_OR_SERVICES: { DESCRIPTION, FINAL_DESTINATION },
    },
  },
} = FIELD_IDS;

const {
  INSURANCE: {
    INSURANCE_ROOT,
    POLICY_AND_EXPORTS: { ABOUT_GOODS_OR_SERVICES_CHANGE },
  },
} = ROUTES;

/**
 * generateAboutGoodsOrServicesFields
 * Create all policy and date fields and values for the Insurance - Type of policy govukSummaryList
 * @param {Object} All submitted policy and export data
 * @returns {Object} All policy and date fields and values in an object structure for GOVUK summary list structure
 */
const generateAboutGoodsOrServicesFields = (answers: ApplicationPolicyAndExport, referenceNumber: number, countries: Array<Country>) => {
  const fields = [
    fieldGroupItem({
      field: getFieldById(FIELDS.ABOUT_GOODS_OR_SERVICES, DESCRIPTION),
      data: answers,
      href: `${INSURANCE_ROOT}/${referenceNumber}${ABOUT_GOODS_OR_SERVICES_CHANGE}#${DESCRIPTION}-label`,
      renderChangeLink: true,
    }),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS.ABOUT_GOODS_OR_SERVICES, FINAL_DESTINATION),
        href: `${INSURANCE_ROOT}/${referenceNumber}${ABOUT_GOODS_OR_SERVICES_CHANGE}#${FINAL_DESTINATION}-label`,
        renderChangeLink: true,
      },
      answers[FINAL_DESTINATION] && getCountryByIsoCode(countries, answers[FINAL_DESTINATION]).name,
    ),
  ] as Array<SummaryListItemData>;

  return fields;
};

export default generateAboutGoodsOrServicesFields;
