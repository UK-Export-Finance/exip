import { RequestBody } from './express';
import { DateErrorMessage, ErrorMessageObject } from './errors';

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

interface ValidationMinAndMaxLengthCore {
  errorMessages: ErrorMessageObject;
  errors: object;
  fieldId: string;
  minimum: number;
  maximum: number;
  value: string;
}

interface ValidationMinAndMaxLengthParams extends ValidationMinAndMaxLengthCore {
  value: string;
}

export { DateValidationRulesParams, DateValidationFormatRulesParams, DateValidationFormatRules, ValidationErrors, ValidationMinAndMaxLengthParams };
