import { EUR_CURRENCY_CODE, GBP_CURRENCY_CODE, USD_CURRENCY_CODE, JPY_CURRENCY_CODE } from '../../../fixtures/currencies';

const submitASupportedCurrency = ({
  url,
  completeNonCurrencyFieldsFunction,
  viaSaveAndBack = false,
  submitRadioAndAssertUrl,
  submitAndAssertRadioIsChecked,
}) => {
  describe('when submitting a supported currency', () => {
    describe(EUR_CURRENCY_CODE, () => {
      it('should redirect to the next page', () => {
        submitRadioAndAssertUrl({
          currency: EUR_CURRENCY_CODE,
          url,
          completeNonCurrencyFieldsFunction,
          viaSaveAndBack,
        });
      });

      it('should render the submitted answer when going back to the page', () => {
        submitAndAssertRadioIsChecked({
          currency: EUR_CURRENCY_CODE,
          completeNonCurrencyFieldsFunction,
          viaSaveAndBack,
        });
      });
    });

    describe(GBP_CURRENCY_CODE, () => {
      it('should redirect to the next page', () => {
        submitRadioAndAssertUrl({
          currency: GBP_CURRENCY_CODE,
          url,
          completeNonCurrencyFieldsFunction,
          viaSaveAndBack,
        });
      });

      it('should render the submitted answer when going back to the page', () => {
        submitAndAssertRadioIsChecked({
          currency: GBP_CURRENCY_CODE,
          completeNonCurrencyFieldsFunction,
          viaSaveAndBack,
        });
      });
    });

    describe(USD_CURRENCY_CODE, () => {
      it('should redirect to the next page', () => {
        submitRadioAndAssertUrl({
          currency: USD_CURRENCY_CODE,
          url,
          completeNonCurrencyFieldsFunction,
          viaSaveAndBack,
        });
      });

      it('should render the submitted answer when going back to the page', () => {
        submitAndAssertRadioIsChecked({
          currency: USD_CURRENCY_CODE,
          completeNonCurrencyFieldsFunction,
          viaSaveAndBack,
        });
      });
    });

    describe(JPY_CURRENCY_CODE, () => {
      it('should redirect to the next page', () => {
        submitRadioAndAssertUrl({
          currency: JPY_CURRENCY_CODE,
          url,
          completeNonCurrencyFieldsFunction,
          viaSaveAndBack,
        });
      });

      it('should render the submitted answer when going back to the page', () => {
        submitAndAssertRadioIsChecked({
          currency: JPY_CURRENCY_CODE,
          completeNonCurrencyFieldsFunction,
          viaSaveAndBack,
        });
      });
    });
  });
};

export default submitASupportedCurrency;
