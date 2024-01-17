import { RequestBody } from './express';
import { DateErrorMessage } from './errors';

interface DateValidationRulesParams {
  formBody: RequestBody;
  errors: object;
  fieldId: string;
  errorMessages: DateErrorMessage;
}

interface DateValidationFormatRulesParams extends DateValidationRulesParams {
  dayString: string;
  monthString: string;
  yearString: string;
}

type ValidationErrorsSummaryItem = {
  text: string;
  href: string;
};

interface ValidationErrors {
  count?: number;
  errorList?: object;
  summary?: Array<ValidationErrorsSummaryItem>;
}

interface DateValidationFormatRules {
  hasErrors: boolean;
  errors: ValidationErrors;
}

export { DateValidationRulesParams, DateValidationFormatRulesParams, DateValidationFormatRules, ValidationErrors };
