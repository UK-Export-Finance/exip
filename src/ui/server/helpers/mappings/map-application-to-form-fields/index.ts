import INSURANCE_FIELD_IDS from '../../../constants/field-ids/insurance';
import { objectHasKeysAndValues } from '../../object';
import mapNameFields from '../map-name-fields';
import mapTextareaFields from '../map-textarea-fields';
import formatDate from '../../date/format-date';
import getDateFieldsFromTimestamp from '../../date/get-date-fields-from-timestamp';
import mapFinancialYearEndDate from '../map-financial-year-end-date';
import transformNumberToString from '../../transform-number-to-string';
import mapNominatedLossPayeeLocation from '../map-nominated-loss-payee-location';
import { transformEmptyDecimalsToWholeNumber } from '../../number';
import { Application, ObjectType } from '../../../../types';

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
  EXPORT_CONTRACT: {
    AGENT_CHARGES: { FIXED_SUM_AMOUNT },
  },
} = INSURANCE_FIELD_IDS;

/**
 * mapApplicationToFormFields
 * Generate an object with application data mappings for UI form fields and summary lists.
 * @param {Application} application
 * @returns {Application | Object} Mapped application for UI consumption
 */
const mapApplicationToFormFields = (application?: Application): Application | ObjectType => {
  if (application && objectHasKeysAndValues(application)) {
    const mapped: ObjectType = {
      ...application,
      ...mapNameFields(application),
      ...mapTextareaFields(application),
    };

    if (mapped[SUBMISSION_DEADLINE]) {
      const submissionDeadline = new Date(mapped[SUBMISSION_DEADLINE]);
      mapped[SUBMISSION_DEADLINE] = formatDate(submissionDeadline);
    }

    if (application.business) {
      let yearsExporting;
      let employeesUK;
      let percentageTurnover;
      let estimatedAnnualTurnover;

      if (application.business[YEARS_EXPORTING]) {
        yearsExporting = transformNumberToString(Number(application.business[YEARS_EXPORTING]));
      }

      if (application.business[EMPLOYEES_UK]) {
        employeesUK = transformNumberToString(Number(application.business[EMPLOYEES_UK]));
      }

      if (application.business[PERCENTAGE_TURNOVER]) {
        percentageTurnover = transformNumberToString(Number(application.business[PERCENTAGE_TURNOVER]));
      }

      if (application.business[ESTIMATED_ANNUAL_TURNOVER]) {
        estimatedAnnualTurnover = transformNumberToString(Number(application.business[ESTIMATED_ANNUAL_TURNOVER]));
      }
      mapped.business = {
        ...mapped.business,
        [YEARS_EXPORTING]: yearsExporting,
        [EMPLOYEES_UK]: employeesUK,
        [PERCENTAGE_TURNOVER]: percentageTurnover,
        [ESTIMATED_ANNUAL_TURNOVER]: estimatedAnnualTurnover,
      };
    }

    if (application?.company?.[FINANCIAL_YEAR_END_DATE]) {
      mapped.company = {
        ...mapped.company,
        [FINANCIAL_YEAR_END_DATE]: mapFinancialYearEndDate(application.company[FINANCIAL_YEAR_END_DATE]),
      };
    }

    if (application?.policy?.[REQUESTED_START_DATE]) {
      const timestamp = new Date(application.policy[REQUESTED_START_DATE]);

      mapped.policy = {
        ...mapped.policy,
        ...getDateFieldsFromTimestamp(timestamp, REQUESTED_START_DATE),
      };
    }

    if (application?.policy?.[CONTRACT_COMPLETION_DATE]) {
      const timestamp = new Date(application.policy[CONTRACT_COMPLETION_DATE]);

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

    if (application?.exportContract?.agent?.service?.charge?.[FIXED_SUM_AMOUNT]) {
      mapped.exportContract.agent.service.charge = {
        ...mapped.exportContract.agent.service.charge,
        [FIXED_SUM_AMOUNT]: transformEmptyDecimalsToWholeNumber(application.exportContract.agent.service.charge[FIXED_SUM_AMOUNT]),
      };
    }

    return mapped;
  }

  return {};
};

export default mapApplicationToFormFields;
