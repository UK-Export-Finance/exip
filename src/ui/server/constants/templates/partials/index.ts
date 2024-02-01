export const PARTIALS = {
  INSURANCE: {
    BROKER: {
      CONDITIONAL_YES_HTML: 'partials/insurance/broker-conditional-yes-html.njk',
      CUSTOM_CONTENT_HTML: 'partials/insurance/broker-details.njk',
    },
    BUYER: {
      CREDIT_INSURANCE_COVER: {
        CONDITIONAL_YES_HTML: 'partials/insurance/credit-insurance-cover-conditional-yes-html.njk',
      },
      CONNECTION_WITH_BUYER: {
        CONDITIONAL_YES_HTML: 'partials/insurance/connection-to-the-buyer-conditional-yes-html.njk',
      },
      OUTSTANDING_PAYMENTS: {
        CONDITIONAL_YES_HTML: 'partials/insurance/buyer-outstanding-payment-conditional-yes-html.njk',
      },
    },
    CODE_OF_CONDUCT: {
      HINT_HTML: 'partials/insurance/code-of-conduct-hint.njk',
      CONDITIONAL_YES_HTML: 'partials/insurance/code-of-conduct-conditional-yes-html.njk',
    },
    END_BUYER: {
      CUSTOM_CONTENT_HTML: 'partials/insurance/end-buyer-details.njk',
    },
    POLICY: {
      PRE_CREDIT_PERIOD: {
        CUSTOM_CONTENT_HTML: 'partials/insurance/pre-credit-period-conditional-yes-html.njk',
      },
      CREDIT_PERIOD_WITH_BUYER: {
        CUSTOM_CONTENT_HTML: 'partials/insurance/credit-period-with-buyer-description.njk',
      },
    },
    UK_GOODS_OR_SERVICES: {
      CUSTOM_CONTENT_HTML: 'partials/insurance/uk-goods-and-services-details.njk',
    },
    EXPORT_CONTRACT: {
      ABOUT_GOODS_OR_SERVICES: {
        CONDITIONAL_YES_HTML: 'partials/insurance/about-goods-or-services-conditional-yes-html.njk',
      },
    },
  },
  QUOTE: {
    BUYER_BODY: {
      CUSTOM_CONTENT_HTML: 'partials/quote/buyer-body-details.njk',
    },
    UK_GOODS_OR_SERVICES: {
      CUSTOM_CONTENT_HTML: 'partials/quote/quote-uk-goods-and-services-details.njk',
    },
  },
};
