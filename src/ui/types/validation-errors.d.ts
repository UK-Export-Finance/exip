type ValidationErrorsSummaryItem = {
  text: string;
  href: string;
};

interface ValidationErrors {
  count?: number;
  errorList?: object;
  summary?: Array<ValidationErrorsSummaryItem>;
}

export { ValidationErrors };
