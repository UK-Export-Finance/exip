export const PARTIALS = {
  UK_GOODS_OR_SERVICES: {
    CUSTOM_CONTENT_HTML: 'partials/uk-goods-and-services-details.njk',
  },
  INSURANCE: {
    BROKER: {
      CUSTOM_CONTENT_HTML: 'partials/insurance/broker-details.njk',
    },
    BUYER: {
      CREDIT_INSURANCE_COVER: {
        CONDITIONAL_YES_HTML: 'partials/insurance/credit-insurance-cover-conditional-yes-html.njk',
      },
      CONNECTION_WITH_BUYER: {
        CONDITIONAL_YES_HTML: 'partials/insurance/connection-with-the-buyer-conditional-yes-html.njk',
        HINT_HTML: 'partials/insurance/connection-with-the-buyer-hint.njk',
      },
      BUYER_FINANCIAL_INFORMATION: {
        CUSTOM_CONTENT_HTML: 'partials/insurance/buyer-financial-information-details.njk',
      },
    },
    CODE_OF_CONDUCT: {
      HINT_HTML: 'partials/insurance/code-of-conduct-hint.njk',
      CONDITIONAL_YES_HTML: 'partials/insurance/code-of-conduct-conditional-yes-html.njk',
    },
    END_BUYER: {
      CUSTOM_CONTENT_HTML: 'partials/insurance/end-buyer-details.njk',
    },
    MEMBER_OF_A_GROUP: {
      CUSTOM_CONTENT_HTML: 'partials/insurance/member-of-a-group-details.njk',
    },
    POLICY: {
      PRE_CREDIT_PERIOD: {
        CUSTOM_CONTENT_HTML: 'partials/insurance/pre-credit-period-conditional-yes-html.njk',
      },
      CREDIT_PERIOD_WITH_BUYER: {
        CUSTOM_CONTENT_HTML: 'partials/insurance/credit-period-with-buyer-description.njk',
      },
      LOSS_PAYEE: {
        HINT_HTML: 'partials/insurance/loss-payee-hint.njk',
      },
    },
    EXPORT_CONTRACT: {
      HOW_WAS_THE_CONTRACT_AWARDED: {
        CONDITIONAL_OTHER_METHOD_HTML: 'partials/insurance/how-was-the-contract-awarded-other-html.njk',
      },
      ABOUT_GOODS_OR_SERVICES: {
        CONDITIONAL_YES_HTML: 'partials/insurance/about-goods-or-services-conditional-yes-html.njk',
      },
      PRIVATE_MARKET: {
        CUSTOM_CONTENT_HTML: 'partials/insurance/private-market-why-description.njk',
      },
      AGENT_CHARGES: {
        CONDITIONAL_PERCENTAGE_HTML: 'partials/insurance/export-contract-agent-charges-conditional-percentage-html.njk',
      },
    },
  },
  QUOTE: {
    BUYER_BODY: {
      CUSTOM_CONTENT_HTML: 'partials/quote/buyer-body-details.njk',
    },
  },
};
