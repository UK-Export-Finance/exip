import { FORM_TITLES } from '../../../../content-strings/form-titles';
import { POLICY_FIELDS } from '../../../../content-strings/fields/insurance';
import { POLICY as POLICY_FIELD_IDS } from '../../../../constants/field-ids/insurance/policy';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import mapYesNoField from '../../../mappings/map-yes-no-field';
import generateChangeLink from '../../../generate-change-link';
import getCountryByIsoCode from '../../../get-country-by-iso-code';
import { ApplicationJointlyInsuredParty, SummaryListItemData, Country } from '../../../../../types';

const {
  POLICY: { OTHER_COMPANY: FORM_TITLE },
} = FORM_TITLES;

const {
  REQUESTED_JOINTLY_INSURED_PARTY: { REQUESTED, COMPANY_NAME, COMPANY_NUMBER, COUNTRY_CODE },
} = POLICY_FIELD_IDS;

const {
  POLICY: { ANOTHER_COMPANY_CHANGE, ANOTHER_COMPANY_CHECK_AND_CHANGE, OTHER_COMPANY_DETAILS_CHANGE, OTHER_COMPANY_DETAILS_CHECK_AND_CHANGE },
} = INSURANCE_ROUTES;

const { REQUESTED_JOINTLY_INSURED_PARTY } = POLICY_FIELDS;

/**
 * optionalOtherCompanyFields
 * if yes selected for other company requested, populates and returns optional fields in an array
 * @param {ApplicationJointlyInsuredParty} answers: Jointly insured party answers
 * @param {Number} referenceNumber: Application reference number
 * @param {Array<Country>} countries: Countries
 * @param {Boolean} checkAndChange: true if coming from check your answers section in submit application section
 * @returns {Array<SummaryListItemData>} optional other company fields if yes selected
 */
export const optionalOtherCompanyFields = (
  answers: ApplicationJointlyInsuredParty,
  referenceNumber: number,
  countries: Array<Country>,
  checkAndChange: boolean,
) => {
  let fields = [] as Array<SummaryListItemData>;

  /**
   * If other company requested
   * populate optional fields.
   */
  if (answers[REQUESTED]) {
    fields = [
      fieldGroupItem({
        field: getFieldById(REQUESTED_JOINTLY_INSURED_PARTY, COMPANY_NAME),
        data: answers,
        href: generateChangeLink(
          OTHER_COMPANY_DETAILS_CHANGE,
          OTHER_COMPANY_DETAILS_CHECK_AND_CHANGE,
          `#${COMPANY_NAME}-label`,
          referenceNumber,
          checkAndChange,
        ),
        renderChangeLink: true,
      }),
      fieldGroupItem(
        {
          field: getFieldById(REQUESTED_JOINTLY_INSURED_PARTY, COUNTRY_CODE),
          data: answers,
          href: generateChangeLink(
            OTHER_COMPANY_DETAILS_CHANGE,
            OTHER_COMPANY_DETAILS_CHECK_AND_CHANGE,
            `#${COUNTRY_CODE}-label`,
            referenceNumber,
            checkAndChange,
          ),
          renderChangeLink: true,
        },
        getCountryByIsoCode(countries, answers[COUNTRY_CODE]).name,
      ),
      fieldGroupItem({
        field: getFieldById(REQUESTED_JOINTLY_INSURED_PARTY, COMPANY_NUMBER),
        data: answers,
        href: generateChangeLink(
          OTHER_COMPANY_DETAILS_CHANGE,
          OTHER_COMPANY_DETAILS_CHECK_AND_CHANGE,
          `#${COMPANY_NUMBER}-label`,
          referenceNumber,
          checkAndChange,
        ),
        renderChangeLink: true,
      }),
    ];
  }

  return fields;
};

/**
 * generateOtherCompanyFields
 * Create all other company fields and values for the Insurance - Other company govukSummaryList
 * @param {ApplicationJointlyInsuredParty} answers
 * @param {Number} Application reference number
 * @param {Array<Country>} countries: Countries
 * @returns {Object} All other company fields and values in an object structure for GOVUK summary list structure
 */
export const generateOtherCompanyFields = (
  answers: ApplicationJointlyInsuredParty,
  referenceNumber: number,
  countries: Array<Country>,
  checkAndChange: boolean,
) => {
  const fields = [
    fieldGroupItem(
      {
        field: getFieldById(REQUESTED_JOINTLY_INSURED_PARTY, REQUESTED),
        data: answers,
        href: generateChangeLink(ANOTHER_COMPANY_CHANGE, ANOTHER_COMPANY_CHECK_AND_CHANGE, `#${REQUESTED}-label`, referenceNumber, checkAndChange),
        renderChangeLink: true,
      },
      mapYesNoField(answers[REQUESTED]),
    ),
    ...optionalOtherCompanyFields(answers, referenceNumber, countries, checkAndChange),
  ] as Array<SummaryListItemData>;

  return {
    title: FORM_TITLE,
    fields,
  };
};
