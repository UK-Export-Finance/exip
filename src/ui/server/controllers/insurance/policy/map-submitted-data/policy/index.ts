import INSURANCE_FIELD_IDS from '../../../../../constants/field-ids/insurance';
import createTimestampFromNumbers from '../../../../../helpers/date/create-timestamp-from-numbers';
import { isSinglePolicyType, isMultiplePolicyType } from '../../../../../helpers/policy-type';
import mapCurrencyCodeFormData from '../../../../../helpers/mappings/map-currency-code-form-data';
import { objectHasProperty } from '../../../../../helpers/object';
import { RequestBody } from '../../../../../../types';

const {
  CURRENCY: { CURRENCY_CODE },
  POLICY: {
    POLICY_TYPE,
    CONTRACT_POLICY: {
      REQUESTED_START_DATE,
      SINGLE: { CONTRACT_COMPLETION_DATE, TOTAL_CONTRACT_VALUE },
      MULTIPLE: { TOTAL_MONTHS_OF_COVER },
      POLICY_CURRENCY_CODE,
    },
    EXPORT_VALUE: {
      MULTIPLE: { TOTAL_SALES_TO_BUYER, MAXIMUM_BUYER_WILL_OWE },
    },
    NEED_PRE_CREDIT_PERIOD,
    CREDIT_PERIOD_WITH_BUYER,
  },
} = INSURANCE_FIELD_IDS;

/**
 * mapSubmittedData
 * 1) Check form data and map any fields that need to be sent to the API in a different format or structure.
 * 2) If a policy is a "single" policy, but has "multiple" policy fields, wipe "multiple" policy fields.
 * 3) If a policy is a "multiple" policy, but has "single" policy fields, wipe "single" policy fields.
 * 4) Map submitted currency fields.
 * @param {Express.Request.body} Form data
 * @returns {Object} Page variables
 */
const mapSubmittedData = (formBody: RequestBody): object => {
  const { _csrf, ...otherFields } = formBody;

  let populatedData = otherFields;

  const dateFieldIds = {
    start: {
      day: `${REQUESTED_START_DATE}-day`,
      month: `${REQUESTED_START_DATE}-month`,
      year: `${REQUESTED_START_DATE}-year`,
    },
    end: {
      day: `${CONTRACT_COMPLETION_DATE}-day`,
      month: `${CONTRACT_COMPLETION_DATE}-month`,
      year: `${CONTRACT_COMPLETION_DATE}-year`,
    },
  };

  const { start, end } = dateFieldIds;

  /**
   * If REQUESTED_START_DATE and/or CONTRACT_COMPLETION_DATE fields are provided,
   * transform the day/month/year fields into a timestamp.
   */
  if (formBody[start.day] && formBody[start.month] && formBody[start.year]) {
    const day = Number(formBody[start.day]);
    const month = Number(formBody[start.month]);
    const year = Number(formBody[start.year]);

    populatedData[REQUESTED_START_DATE] = createTimestampFromNumbers(day, month, year);
  }

  if (formBody[end.day] && formBody[end.month] && formBody[end.year]) {
    const day = Number(formBody[end.day]);
    const month = Number(formBody[end.month]);
    const year = Number(formBody[end.year]);

    populatedData[CONTRACT_COMPLETION_DATE] = createTimestampFromNumbers(day, month, year);
  }

  /**
   * If NEED_PRE_CREDIT_PERIOD is answered as "no",
   * wipe the CREDIT_PERIOD_WITH_BUYER field.
   */
  if (formBody[NEED_PRE_CREDIT_PERIOD] === 'false') {
    populatedData[CREDIT_PERIOD_WITH_BUYER] = '';
  }

  const policyType = formBody[POLICY_TYPE];

  /**
   * If the policy type is "single",
   * wipe "multiple" specific fields.
   */
  if (isSinglePolicyType(policyType)) {
    populatedData = {
      ...populatedData,
      [MAXIMUM_BUYER_WILL_OWE]: '',
      [TOTAL_MONTHS_OF_COVER]: '',
      [TOTAL_SALES_TO_BUYER]: '',
    };
  }

  /**
   * If the policy type is "multiple",
   * wipe "single" specific fields.
   */
  if (isMultiplePolicyType(policyType)) {
    populatedData = {
      ...populatedData,
      [CONTRACT_COMPLETION_DATE]: null,
      [TOTAL_CONTRACT_VALUE]: '',
    };
  }

  populatedData = mapCurrencyCodeFormData(populatedData);

  // map the resulting "currency code" into a "Policy currency code" field
  if (objectHasProperty(populatedData, CURRENCY_CODE)) {
    populatedData[POLICY_CURRENCY_CODE] = populatedData[CURRENCY_CODE];
    delete populatedData[CURRENCY_CODE];
  }

  return populatedData;
};

export default mapSubmittedData;
