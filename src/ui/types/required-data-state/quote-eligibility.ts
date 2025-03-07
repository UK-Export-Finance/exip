import { QUOTE_ROUTES } from '../../server/constants/routes/quote';

const {
  TYPE_OF_BUYER,
  BUYER_COUNTRY,
  BUYER_COUNTRY_CHANGE,
  CHECK_YOUR_ANSWERS,
  EXPORTER_LOCATION,
  EXPORTER_LOCATION_CHANGE,
  UK_GOODS_OR_SERVICES,
  UK_GOODS_OR_SERVICES_CHANGE,
  POLICY_TYPE,
  POLICY_TYPE_CHANGE,
  TELL_US_ABOUT_YOUR_POLICY,
  TELL_US_ABOUT_YOUR_POLICY_CHANGE,
  YOUR_QUOTE,
} = QUOTE_ROUTES;

type RequiredDataStateQuoteEligibility = {
  [BUYER_COUNTRY]: Array<string>;
  [BUYER_COUNTRY_CHANGE]: Array<string>;
  [TYPE_OF_BUYER]: Array<string>;
  [EXPORTER_LOCATION]: Array<string>;
  [EXPORTER_LOCATION_CHANGE]: Array<string>;
  [UK_GOODS_OR_SERVICES]: Array<string>;
  [UK_GOODS_OR_SERVICES_CHANGE]: Array<string>;
  [POLICY_TYPE]: Array<string>;
  [POLICY_TYPE_CHANGE]: Array<string>;
  [TELL_US_ABOUT_YOUR_POLICY]: Array<string>;
  [TELL_US_ABOUT_YOUR_POLICY_CHANGE]: Array<string>;
  [CHECK_YOUR_ANSWERS]: Array<string>;
  [YOUR_QUOTE]: Array<string>;
};

export { RequiredDataStateQuoteEligibility };
