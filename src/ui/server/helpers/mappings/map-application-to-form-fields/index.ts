import INSURANCE_FIELD_IDS from '../../../constants/field-ids/insurance';
import { objectHasKeysAndValues } from '../../object';
import mapNameFields from '../map-name-fields';
import mapTextareaFields from '../map-textarea-fields';
import formatDate from '../../date/format-date';
import getDateFieldsFromTimestamp from '../../date/get-date-fields-from-timestamp';
import mapFinancialYearEndDate from '../map-financial-year-end-date';
import transformNumberToString from '../../transform-number-to-string';
import mapNominatedLossPayeeLocation from '../map-nominated-loss-payee-location';
import { Application } from '../../../../types';

const {
  CURRENCY: { CURRENCY_CODE },
  SUBMISSION_DEADLINE,
  POLICY: {
    CONTRACT_POLICY: {
      REQUESTED_START_DATE,
      SINGLE: { CONTRACT_COMPLETION_DATE },
      POLICY_CURRENCY_CODE,
    },
    LOSS_PAYEE_DETAILS: { LOCATION },
  },
  EXPORTER_BUSINESS: {
    NATURE_OF_YOUR_BUSINESS: { YEARS_EXPORTING, EMPLOYEES_UK },
    TURNOVER: { FINANCIAL_YEAR_END_DATE, ESTIMATED_ANNUAL_TURNOVER, PERCENTAGE_TURNOVER },
  },
} = INSURANCE_FIELD_IDS;

/**
 * mapApplicationToFormFields
 * Generate an object with application data mappings for UI form fields and summary lists.
 * @param {Application}
 * @returns {Application | Object} Mapped application for UI consumption
 */
const mapApplicationToFormFields = (application?: Application): Application | object => {
  if (application && objectHasKeysAndValues(application)) {
    const mapped = {
      ...application,
      ...mapNameFields(application),
      ...mapTextareaFields(application),
    };

    if (mapped[SUBMISSION_DEADLINE]) {
      mapped[SUBMISSION_DEADLINE] = formatDate(application[SUBMISSION_DEADLINE]);
    }

    if (application.business) {
      mapped.business = {
        ...mapped.business,
        [YEARS_EXPORTING]: transformNumberToString(application.business[YEARS_EXPORTING]),
        [EMPLOYEES_UK]: transformNumberToString(application.business[EMPLOYEES_UK]),
        [PERCENTAGE_TURNOVER]: transformNumberToString(application.business[PERCENTAGE_TURNOVER]),
        [ESTIMATED_ANNUAL_TURNOVER]: transformNumberToString(application.business[ESTIMATED_ANNUAL_TURNOVER]),
      };
    }

    if (application?.company?.[FINANCIAL_YEAR_END_DATE]) {
      mapped.company = {
        ...mapped.company,
        [FINANCIAL_YEAR_END_DATE]: mapFinancialYearEndDate(application.company[FINANCIAL_YEAR_END_DATE]),
      };
    }

    if (application?.policy?.[REQUESTED_START_DATE]) {
      const timestamp = application.policy[REQUESTED_START_DATE];

      mapped.policy = {
        ...mapped.policy,
        ...getDateFieldsFromTimestamp(timestamp, REQUESTED_START_DATE),
      };
    }

    if (application?.policy?.[CONTRACT_COMPLETION_DATE]) {
      const timestamp = application.policy[CONTRACT_COMPLETION_DATE];

      mapped.policy = {
        ...mapped.policy,
        ...getDateFieldsFromTimestamp(timestamp, CONTRACT_COMPLETION_DATE),
      };
    }

    if (application?.policy?.[POLICY_CURRENCY_CODE]) {
      mapped.policy = {
        ...mapped.policy,
        [CURRENCY_CODE]: application.policy[POLICY_CURRENCY_CODE],
      };
    }

    if (objectHasKeysAndValues(application?.nominatedLossPayee)) {
      mapped.nominatedLossPayee = {
        ...mapped.nominatedLossPayee,
        [LOCATION]: mapNominatedLossPayeeLocation(application.nominatedLossPayee),
      };
    }

    return mapped;
  }

  return {};
};

export default mapApplicationToFormFields;
