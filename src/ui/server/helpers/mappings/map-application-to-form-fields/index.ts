import { Application } from '../../../../types';
import { FIELD_IDS } from '../../../constants';
import formatDate from '../../date/format-date';
import getDateFieldsFromTimestamp from '../../date/get-date-fields-from-timestamp';
import mapFinancialYearEndDate from '../map-financial-year-end-date';
import transformNumberToString from '../../display-number-field-value';

const {
  SUBMISSION_DEADLINE,
  POLICY_AND_EXPORTS: {
    CONTRACT_POLICY: {
      REQUESTED_START_DATE,
      SINGLE: { CONTRACT_COMPLETION_DATE },
    },
  },
  EXPORTER_BUSINESS: {
    NATURE_OF_YOUR_BUSINESS: { YEARS_EXPORTING, EMPLOYEES_INTERNATIONAL, EMPLOYEES_UK },
    TURNOVER: { FINANCIAL_YEAR_END_DATE },
  },
} = FIELD_IDS.INSURANCE;

/**
 * mapApplicationToFormFields
 * Generate an object with application data mappings for UI form fields.
 * @param {Object} Application
 * @returns {Object} Mapped application for UI form fields.
 */
const mapApplicationToFormFields = (application: Application): object => {
  if (application && Object.keys(application)) {
    const mapped = application;

    if (mapped[SUBMISSION_DEADLINE]) {
      mapped[SUBMISSION_DEADLINE] = formatDate(application[SUBMISSION_DEADLINE]);
    }

    if (application.policyAndExport && application.policyAndExport[REQUESTED_START_DATE]) {
      const timestamp = application.policyAndExport[REQUESTED_START_DATE];

      mapped.policyAndExport = {
        ...mapped.policyAndExport,
        ...getDateFieldsFromTimestamp(timestamp, REQUESTED_START_DATE),
      };
    }

    if (application.policyAndExport && application.policyAndExport[CONTRACT_COMPLETION_DATE]) {
      const timestamp = application.policyAndExport[CONTRACT_COMPLETION_DATE];

      mapped.policyAndExport = {
        ...mapped.policyAndExport,
        ...getDateFieldsFromTimestamp(timestamp, CONTRACT_COMPLETION_DATE),
      };
    }

    if (application.exporterCompany && application.exporterCompany[FINANCIAL_YEAR_END_DATE]) {
      mapped.exporterCompany = {
        ...mapped.exporterCompany,
        [FINANCIAL_YEAR_END_DATE]: mapFinancialYearEndDate(application.exporterCompany[FINANCIAL_YEAR_END_DATE]),
      };
    }

    if (application.exporterBusiness) {
      mapped.exporterBusiness = {
        ...mapped.exporterBusiness,
        [YEARS_EXPORTING]: transformNumberToString(application.exporterBusiness[YEARS_EXPORTING]),
        [EMPLOYEES_UK]: transformNumberToString(application.exporterBusiness[EMPLOYEES_UK]),
        [EMPLOYEES_INTERNATIONAL]: transformNumberToString(application.exporterBusiness[EMPLOYEES_INTERNATIONAL]),
      };
    }

    return mapped;
  }

  return {};
};

export default mapApplicationToFormFields;
