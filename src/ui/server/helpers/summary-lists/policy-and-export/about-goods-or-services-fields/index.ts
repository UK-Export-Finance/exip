import { FIELDS } from '../../../../content-strings/fields/insurance';
import { FIELD_IDS } from '../../../../constants';
import fieldGroupItem from '../../generate-field-group-item';
import getCountryByIsoCode from '../../../get-country-by-iso-code';
import { ApplicationPolicyAndExport, Country, SummaryListItemData } from '../../../../../types';

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      ABOUT_GOODS_OR_SERVICES: { DESCRIPTION, FINAL_DESTINATION },
    },
  },
} = FIELD_IDS;

/**
 * generateAboutGoodsOrServicesFields
 * Create all policy and date fields and values for the Insurance - Type of policy govukSummaryList
 * @param {Object} All submitted policy and export data
 * @returns {Object} All policy and date fields and values in an object structure for GOVUK summary list structure
 */
const generateAboutGoodsOrServicesFields = (answers: ApplicationPolicyAndExport, countries: Array<Country>) => {
  const fields = [
    fieldGroupItem({
      field: { id: DESCRIPTION, ...FIELDS.ABOUT_GOODS_OR_SERVICES[DESCRIPTION] },
      data: answers,
    }),
    fieldGroupItem(
      { field: { id: FINAL_DESTINATION, ...FIELDS.ABOUT_GOODS_OR_SERVICES[FINAL_DESTINATION] } },
      answers[FINAL_DESTINATION] && getCountryByIsoCode(countries, answers[FINAL_DESTINATION]).name,
    ),
  ] as Array<SummaryListItemData>;

  return fields;
};

export default generateAboutGoodsOrServicesFields;
