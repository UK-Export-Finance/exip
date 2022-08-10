type Quote = {
  buyerCountry:  Country;
  currency: Currency;
  creditPeriodInMonths?: number;
  estimatedCost: number;
  insuredFor: number;
  percentageOfCover: number;
  policyLength: number;
  policyType: number;
  premiumRatePercentage: number;
}

interface AxiosHeaders {
  'Content-Type': string;
}

interface AxiosAuth {
  username: string;
  password: string;
}

interface Axios {
  method: string;
  url: string;
  headers: AxiosHeaders;
  Auth: AxiosAuth;
}

interface RequestSession {
  submittedData: SubmittedData;
  quote?: Quote;
}

interface RequestBody {
  [key: string]: any;
}

interface RequestHeaders {
  referer?: string;
}

interface Request {
  body: RequestBody;
  headers: RequestHeaders;
  flash: Function;
  originalUrl: string;
  session: RequestSession;
}

declare module 'express-session' {
  interface SessionData {
    submittedData: SubmittedData;
  }
}

interface Response {
  render: Function;
  redirect: Function;
}

interface CisCountry {
  marketName: string;
  isoCode: string;
  shortTermCoverAvailabilityDesc: string;
  ESRAClasificationDesc: string;
  NBIIssue: string;
  riskCategory?: string;
}

interface Country {
  name: string;
  isoCode: string;
  isSupported: boolean;
  riskCategory: string;
  selected: boolean;
  value: string;
}

interface Currency {
  name: string;
  isoCode: string;
}

type SubmittedData = {
  amount?: number;
  buyerCountry?: Country;
  canGetPrivateInsurance?: boolean;
  contractValue?: number;
  creditPeriodInMonths?: number;
  currency?: Currency;
  hasMinimumUkGoodsOrServices?: boolean;
  maximumContractAmountOwed?: number;
  percentageOfCover?: number;
  policyType?: string;
  policyLength?: number;
}

interface SummaryListField {
  text: string;
}

interface AnswersContent {
  buyerCountry?: SummaryListField;
  canGetPrivateInsurance?: SummaryListField;
  contractValue?: SummaryListField;
  creditPeriodInMonths?: SummaryListField;
  currency?: SummaryListField;
  hasMinimumUkGoodsOrServices?: SummaryListField;
  maximumContractAmountOwed?: SummaryListField;
  singlePolicyLengthMonths?: SummaryListField;
  singlePolicyType?: SummaryListField;
  multiPolicyLengthMonths?: SummaryListField;
  multiPolicyType?: SummaryListField;
  percentageOfCover?: SummaryListField;
  policyType?: SummaryListField;
  policyLength?: SummaryListField;
  validCompanyBase?: SummaryListField;
}

type SummaryListItemDataValue = {
  text: string;
}

type SummaryListItemData = {
  id: string;
  href?: string;
  renderChangeLink?: boolean;
  title?: string;
  value: SummaryListItemDataValue;
}

type SummaryListItemKey = {
  text: string;
  classes: string;
}

type SummaryListItemValue =  {
  text: string;
  classes: string;
}

type SummaryListItemActionsItemAttributes = {
  'data-cy': string;
}

type SummaryListItemActionsItem = {
  attributes?: SummaryListItemActionsItemAttributes;
  classes?: string;
  href?: string;
  text?: string;
  visuallyHiddenText?: string;
}

type SummaryListItemActions = {
  items: Array<SummaryListItemActionsItem>
}

interface SummaryListItem {
  actions: SummaryListItemActions;
  classes: string;
  key: SummaryListItemKey;
  value: SummaryListItemValue;
}

interface AnswersFieldGroups {
  EXPORT_DETAILS: Array<SummaryListItemData>;
  POLICY_DETAILS: Array<SummaryListItemData>;
}

interface QuoteContent {
  buyerCountry: SummaryListField;
  estimatedCost: SummaryListField;
  insuredFor: SummaryListField;
  multiPolicyLengthMonths?: SummaryListField;
  percentageOfCover: SummaryListField;
  premiumRatePercentage: SummaryListField;
  singlePolicyLengthMonths?: SummaryListField;
}

type ValidationErrorsSummaryItem = {
  text: string;
  href: string;
}

interface ValidationErrors {
  count?: number;
  errorList?: any;
  summary?: Array<ValidationErrorsSummaryItem>;
}

type PricingGridRate = {
  insuredFor: number;
  premiumRate: number;
}

type PricingGridMonth = {
  months: number;
  rates: Array<PricingGridRate>;
}

type PricingGridSinglePolicy = {
  HIGH: Array<PricingGridMonth>;
  STANDARD: Array<PricingGridMonth>;
  VERY_HIGH: Array<PricingGridMonth>;
}

type PricingGridMultiPolicy = {
  HIGH: Array<PricingGridMonth>;
  STANDARD: Array<PricingGridMonth>;
  VERY_HIGH: Array<PricingGridMonth>;
}

interface PricingGrid {
  SINGLE_POLICY: PricingGridSinglePolicy;
  MULTI_POLICY: PricingGridMultiPolicy;
}

type TellUsAboutPolicyPageVariablesContentStrings = {
  PRODUCT: object;
  FOOTER: object;
  BUTTONS: object;
  PAGE_TITLE?: string;
  HEADING?: string;
}

type TellUsAboutPolicyPageVariablesFields = {
  AMOUNT_CURRENCY: object;
  CONTRACT_VALUE?: object;
  CREDIT_PERIOD?: object;
  CURRENCY: object;
  PERCENTAGE_OF_COVER: object;
  MAX_AMOUNT_OWED?: object;
}

interface TellUsAboutPolicyPageVariables {
  CONTENT_STRINGS: TellUsAboutPolicyPageVariablesContentStrings;
  FIELDS: TellUsAboutPolicyPageVariablesFields;
}

export {
  AnswersContent,
  AnswersFieldGroups,
  Axios,
  CisCountry,
  Country,
  Currency,
  PricingGrid,
  PricingGridMonth,
  PricingGridRate,
  Quote,
  QuoteContent,
  Request,
  RequestBody,
  RequestSession,
  Response,
  SubmittedData,
  SummaryListItemData,
  SummaryListItem,
  TellUsAboutPolicyPageVariablesContentStrings,
  TellUsAboutPolicyPageVariablesFields,
  TellUsAboutPolicyPageVariables,
  ValidationErrors,
};
