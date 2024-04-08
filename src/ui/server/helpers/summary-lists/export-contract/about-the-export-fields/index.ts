import { FORM_TITLES } from '../../../../content-strings';
import { EXPORT_CONTRACT_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import FIELD_IDS from '../../../../constants/field-ids/insurance/export-contract';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import getCountryByIsoCode from '../../../get-country-by-iso-code';
import generateChangeLink from '../../../generate-change-link';
import replaceNewLineWithLineBreak from '../../../replace-new-line-with-line-break';
import { ApplicationExportContract, Country, SummaryListItemData } from '../../../../../types';

const {
  EXPORT_CONTRACT: { ABOUT_THE_EXPORT: FORM_TITLE },
} = FORM_TITLES;

const {
  ABOUT_GOODS_OR_SERVICES: { DESCRIPTION, FINAL_DESTINATION },
  HOW_WILL_YOU_GET_PAID: { PAYMENT_TERMS_DESCRIPTION },
} = FIELD_IDS;

const {
  EXPORT_CONTRACT: {
    ABOUT_GOODS_OR_SERVICES_CHANGE,
    ABOUT_GOODS_OR_SERVICES_CHECK_AND_CHANGE,
    HOW_WILL_YOU_GET_PAID_CHANGE,
    HOW_WILL_YOU_GET_PAID_CHECK_AND_CHANGE,
  },
} = INSURANCE_ROUTES;

/**
 * generateAboutTheExportFields
 * Create all fields and values for the Insurance - "Export contract - about the export" govukSummaryList
 * @param {ApplicationExportContract} answers: All submitted export contract data
 * @param {Number} referenceNumber: Application reference number
 * @param {Array} countries: Countries
 * @param {Boolean} checkAndChange: True if coming from check your answers section in submit application section
 * @returns {Object} Fields and values in an object structure for GOVUK summary list structure
 */
const generateAboutTheExportFields = (answers: ApplicationExportContract, referenceNumber: number, countries: Array<Country>, checkAndChange: boolean) => {
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
    fieldGroupItem(
      {
        field: getFieldById(FIELDS.HOW_WILL_YOU_GET_PAID, PAYMENT_TERMS_DESCRIPTION),
        href: generateChangeLink(
          HOW_WILL_YOU_GET_PAID_CHANGE,
          HOW_WILL_YOU_GET_PAID_CHECK_AND_CHANGE,
          `#${PAYMENT_TERMS_DESCRIPTION}-label`,
          referenceNumber,
          checkAndChange,
        ),
        renderChangeLink: true,
      },
      replaceNewLineWithLineBreak(answers[PAYMENT_TERMS_DESCRIPTION]),
    ),
  ] as Array<SummaryListItemData>;

  return {
    title: FORM_TITLE,
    fields,
  };
};

export default generateAboutTheExportFields;
