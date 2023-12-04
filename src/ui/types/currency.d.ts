import { RadioOption } from './radio-option';

interface Currency {
  name: string;
  isoCode: string;
}

interface CurrencyRadios {
  EUR: RadioOption;
  GBP: RadioOption;
  JPY: RadioOption;
  USD: RadioOption;
  ALTERNATIVE: RadioOption;
}

export { Currency, CurrencyRadios };
