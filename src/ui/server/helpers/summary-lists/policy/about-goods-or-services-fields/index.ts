import { POLICY_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import { FIELD_IDS, ROUTES } from '../../../../constants';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import getCountryByIsoCode from '../../../get-country-by-iso-code';
import { ApplicationPolicy, Country, SummaryListItemData } from '../../../../../types';
import generateChangeLink from '../../../generate-change-link';

const {
  INSURANCE: {
    POLICY: {
      ABOUT_GOODS_OR_SERVICES: { DESCRIPTION, FINAL_DESTINATION },
    },
  },
} = FIELD_IDS;

const {
  INSURANCE: {
    POLICY: { ABOUT_GOODS_OR_SERVICES_CHANGE, ABOUT_GOODS_OR_SERVICES_CHECK_AND_CHANGE },
  },
} = ROUTES;

/**
 * generateAboutGoodsOrServicesFields
 * Create all policy fields and values for the Insurance - Type of policy govukSummaryList
 * @param {Object} All submitted policy data
 * @param {Boolean} checkAndChange true if coming from check your answers section in submit application section
 * @returns {Object} All policy fields and values in an object structure for GOVUK summary list structure
 */
const generateAboutGoodsOrServicesFields = (answers: ApplicationPolicy, referenceNumber: number, countries: Array<Country>, checkAndChange: boolean) => {
  const fields = [
    fieldGroupItem({
      field: getFieldById(FIELDS.ABOUT_GOODS_OR_SERVICES, DESCRIPTION),
      data: answers,
      href: generateChangeLink(
        ABOUT_GOODS_OR_SERVICES_CHANGE,
        ABOUT_GOODS_OR_SERVICES_CHECK_AND_CHANGE,
        `#${DESCRIPTION}-label`,
        referenceNumber,
        checkAndChange,
      ),
      renderChangeLink: true,
    }),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS.ABOUT_GOODS_OR_SERVICES, FINAL_DESTINATION),
        href: generateChangeLink(
          ABOUT_GOODS_OR_SERVICES_CHANGE,
          ABOUT_GOODS_OR_SERVICES_CHECK_AND_CHANGE,
          `#${FINAL_DESTINATION}-label`,
          referenceNumber,
          checkAndChange,
        ),
        renderChangeLink: true,
      },
      answers[FINAL_DESTINATION] && getCountryByIsoCode(countries, answers[FINAL_DESTINATION]).name,
    ),
  ] as Array<SummaryListItemData>;

  return fields;
};

export default generateAboutGoodsOrServicesFields;
