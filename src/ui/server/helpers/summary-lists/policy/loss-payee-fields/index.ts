import { FORM_TITLES } from '../../../../content-strings/form-titles';
import { POLICY_FIELDS } from '../../../../content-strings/fields/insurance';
import { POLICY as POLICY_FIELD_IDS } from '../../../../constants/field-ids/insurance/policy';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import mapYesNoField from '../../../mappings/map-yes-no-field';
import generateChangeLink from '../../../generate-change-link';
import replaceNewLineWithLineBreak from '../../../replace-new-line-with-line-break';
import formatSortCode from '../../../format-sort-code';
import {
  ApplicationNominatedLossPayee,
  ApplicationLossPayeeFinancialDetailsUk,
  ApplicationLossPayeeFinancialDetailsInternational,
  SummaryListItemData,
} from '../../../../../types';

const {
  POLICY: { LOSS_PAYEE: FORM_TITLE },
} = FORM_TITLES;

const {
  LOSS_PAYEE: { IS_APPOINTED },
  LOSS_PAYEE_DETAILS: { NAME, IS_LOCATED_IN_UK, IS_LOCATED_INTERNATIONALLY },
  FINANCIAL_ADDRESS,
  LOSS_PAYEE_FINANCIAL_UK: { SORT_CODE, ACCOUNT_NUMBER },
  LOSS_PAYEE_FINANCIAL_INTERNATIONAL: { BIC_SWIFT_CODE, IBAN },
} = POLICY_FIELD_IDS;

const {
  POLICY: {
    LOSS_PAYEE_CHANGE,
    LOSS_PAYEE_CHECK_AND_CHANGE,
    LOSS_PAYEE_DETAILS_CHANGE,
    LOSS_PAYEE_DETAILS_CHECK_AND_CHANGE,
    LOSS_PAYEE_FINANCIAL_DETAILS_UK_CHANGE,
    LOSS_PAYEE_FINANCIAL_DETAILS_UK_CHECK_AND_CHANGE,
    LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_CHANGE,
    LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_CHECK_AND_CHANGE,
  },
} = INSURANCE_ROUTES;

/**
 * lossPayeeLocatedInUkFields
 * Populate and return Loss payee financial UK fields
 * @param {ApplicationLossPayeeFinancialDetailsUk} answers: Loss payee - financial details - UK answers
 * @param {number} referenceNumber: Application reference number
 * @param {boolean} checkAndChange: True if coming from check your answers section in submit application section
 * @returns {Array<SummaryListItemData>} Optional broker fields if yes is selected
 */
export const lossPayeeLocatedInUkFields = (answers: ApplicationLossPayeeFinancialDetailsUk, referenceNumber: number, checkAndChange?: boolean) => {
  const fields = [
    fieldGroupItem(
      {
        field: getFieldById(POLICY_FIELDS.LOSS_PAYEE_FINANCIAL_UK, FINANCIAL_ADDRESS),
        data: answers,
        href: generateChangeLink(
          LOSS_PAYEE_FINANCIAL_DETAILS_UK_CHANGE,
          LOSS_PAYEE_FINANCIAL_DETAILS_UK_CHECK_AND_CHANGE,
          `#${FINANCIAL_ADDRESS}-label`,
          referenceNumber,
          checkAndChange,
        ),
        renderChangeLink: true,
      },
      answers[FINANCIAL_ADDRESS] && replaceNewLineWithLineBreak(answers[FINANCIAL_ADDRESS]),
    ),
    fieldGroupItem(
      {
        field: getFieldById(POLICY_FIELDS.LOSS_PAYEE_FINANCIAL_UK, SORT_CODE),
        data: answers,
        href: generateChangeLink(
          LOSS_PAYEE_FINANCIAL_DETAILS_UK_CHANGE,
          LOSS_PAYEE_FINANCIAL_DETAILS_UK_CHECK_AND_CHANGE,
          `#${SORT_CODE}-label`,
          referenceNumber,
          checkAndChange,
        ),
        renderChangeLink: true,
      },
      answers[SORT_CODE] && formatSortCode(answers[SORT_CODE]),
    ),
    fieldGroupItem({
      field: getFieldById(POLICY_FIELDS.LOSS_PAYEE_FINANCIAL_UK, ACCOUNT_NUMBER),
      data: answers,
      href: generateChangeLink(
        LOSS_PAYEE_FINANCIAL_DETAILS_UK_CHANGE,
        LOSS_PAYEE_FINANCIAL_DETAILS_UK_CHECK_AND_CHANGE,
        `#${ACCOUNT_NUMBER}-label`,
        referenceNumber,
        checkAndChange,
      ),
      renderChangeLink: true,
    }),
  ];

  return fields;
};

/**
 * lossPayeeLocatedInternationallyFields
 * Populate and return Loss payee financial international fields
 * @param {ApplicationLossPayeeFinancialDetailsInternational} answers: Loss payee - financial details - international answers
 * @param {number} referenceNumber: Application reference number
 * @param {boolean} checkAndChange: True if coming from check your answers section in submit application section
 * @returns {Array<SummaryListItemData>} Optional broker fields if yes is selected
 */
export const lossPayeeLocatedInternationallyFields = (
  answers: ApplicationLossPayeeFinancialDetailsInternational,
  referenceNumber: number,
  checkAndChange?: boolean,
) => {
  const fields = [
    fieldGroupItem(
      {
        field: getFieldById(POLICY_FIELDS.LOSS_PAYEE_FINANCIAL_INTERNATIONAL, FINANCIAL_ADDRESS),
        data: answers,
        href: generateChangeLink(
          LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_CHANGE,
          LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_CHECK_AND_CHANGE,
          `#${FINANCIAL_ADDRESS}-label`,
          referenceNumber,
          checkAndChange,
        ),
        renderChangeLink: true,
      },
      answers[FINANCIAL_ADDRESS] && replaceNewLineWithLineBreak(answers[FINANCIAL_ADDRESS]),
    ),
    fieldGroupItem({
      field: getFieldById(POLICY_FIELDS.LOSS_PAYEE_FINANCIAL_INTERNATIONAL, BIC_SWIFT_CODE),
      data: answers,
      href: generateChangeLink(
        LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_CHANGE,
        LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_CHECK_AND_CHANGE,
        `#${BIC_SWIFT_CODE}-label`,
        referenceNumber,
        checkAndChange,
      ),
      renderChangeLink: true,
    }),
    fieldGroupItem({
      field: getFieldById(POLICY_FIELDS.LOSS_PAYEE_FINANCIAL_INTERNATIONAL, IBAN),
      data: answers,
      href: generateChangeLink(
        LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_CHANGE,
        LOSS_PAYEE_FINANCIAL_DETAILS_INTERNATIONAL_CHECK_AND_CHANGE,
        `#${IBAN}-label`,
        referenceNumber,
        checkAndChange,
      ),
      renderChangeLink: true,
    }),
  ];

  return fields;
};

/**
 * lossPayeeFields
 * If IS_APPOINTED is true, populate and return optional fields.
 * @param {ApplicationNominatedLossPayee} answers: Loss payee answers
 * @param {number} referenceNumber: Application reference number
 * @param {boolean} checkAndChange: True if coming from check your answers section in submit application section
 * @returns {Array<SummaryListItemData>} Optional broker fields if yes is selected
 */
export const lossPayeeFields = (answers: ApplicationNominatedLossPayee, referenceNumber: number, checkAndChange?: boolean) => {
  let fields = [] as Array<SummaryListItemData>;

  /**
   * If using a loss payee,
   * populate optional fields depending on the location of the loss payee.
   */
  if (answers[IS_APPOINTED]) {
    fields = [
      fieldGroupItem({
        field: getFieldById(POLICY_FIELDS.LOSS_PAYEE_DETAILS, NAME),
        data: answers,
        href: generateChangeLink(LOSS_PAYEE_DETAILS_CHANGE, LOSS_PAYEE_DETAILS_CHECK_AND_CHANGE, `#${NAME}-label`, referenceNumber, checkAndChange),
        renderChangeLink: true,
      }),
    ];

    if (answers[IS_LOCATED_IN_UK]) {
      fields = [...fields, ...lossPayeeLocatedInUkFields(answers.financialUk, referenceNumber, checkAndChange)];
    }

    if (answers[IS_LOCATED_INTERNATIONALLY]) {
      fields = [...fields, ...lossPayeeLocatedInternationallyFields(answers.financialInternational, referenceNumber, checkAndChange)];
    }
  }

  return fields;
};

/**
 * generateLossPayeeFields
 * Create all your loss payee fields and values for the Insurance - Loss payee govukSummaryList
 * @param {ApplicationNominatedLossPayee} answers
 * @param {number} referenceNumber: Application reference number
 * @param {boolean} checkAndChange: True if coming from check your answers section in submit application section
 * @returns {object} All loss payee fields and values in an object structure for GOVUK summary list structure
 */
export const generateLossPayeeFields = (answers: ApplicationNominatedLossPayee, referenceNumber: number, checkAndChange?: boolean) => {
  const fields = [
    fieldGroupItem(
      {
        field: getFieldById(POLICY_FIELDS.LOSS_PAYEE, IS_APPOINTED),
        data: answers,
        href: generateChangeLink(LOSS_PAYEE_CHANGE, LOSS_PAYEE_CHECK_AND_CHANGE, `#${IS_APPOINTED}-label`, referenceNumber, checkAndChange),
        renderChangeLink: true,
      },
      mapYesNoField(answers[IS_APPOINTED]),
    ),
    ...lossPayeeFields(answers, referenceNumber, checkAndChange),
  ] as Array<SummaryListItemData>;

  return {
    title: FORM_TITLE,
    fields,
  };
};
