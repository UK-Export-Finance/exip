import SHARED from '../../shared';

export const EXPORT_CONTRACT = {
  ...SHARED,
  ABOUT_GOODS_OR_SERVICES: {
    DESCRIPTION: 'goodsOrServicesDescription',
    FINAL_DESTINATION_KNOWN: 'finalDestinationKnown',
    FINAL_DESTINATION: 'finalDestinationCountryCode',
  },
  HOW_WILL_YOU_GET_PAID: {
    PAYMENT_TERMS_DESCRIPTION: 'paymentTermsDescription',
  },
  PRIVATE_MARKET: {
    ATTEMPTED: 'attempted',
    DECLINED_DESCRIPTION: 'declinedDescription',
  },
  USING_AGENT: 'isUsingAgent',
  AGENT: {
    COUNTRY_CODE: 'countryCode',
    FULL_ADDRESS: 'fullAddress',
    NAME: 'name',
  },
  AGENT_SERVICE: {
    IS_CHARGING: 'agentIsCharging',
    SERVICE_DESCRIPTION: 'serviceDescription',
  },
};

export default EXPORT_CONTRACT;
