/* eslint-disable no-unused-vars */
export {};
import { SubmittedData } from '../submitted-data';
import { Quote } from '../quote';
import { Application } from '../application';

export interface Next {
  (error?: any): void;
}

export interface RequestBody {
  _csrf?: string;
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface RequestCookies {
  optionalCookies?: string;
  '__Host-optionalCookies'?: any;
}

export interface RequestHeaders {
  referer: string;
  origin: string;
  host: string;
}

export interface SRI {
  JS: string;
  GOVUK: string;
  FORM: string;
  COOKIES: string;
  ACCESSIBILITY: string;
  GA: string;
  GA_TAG_MANAGER: string;
}

export interface MetaData {
  URL: string;
  TITLE: string;
  ORGANISATION: string;
}

export interface ResponseLocals {
  csrfToken: string;
  cookieConsent?: boolean;
  cookieConsentDecision?: boolean;
  cookieConsentNewDecision?: boolean;
  googleAnalyticsId?: string;
  googleTagManagerId?: string;
  meta: MetaData;
  SRI: SRI;
}

export interface ResponseLocalsInsurance extends ResponseLocals {
  application: Application;
}

export interface RequestParams {
  referenceNumber?: string;
  pageNumber?: string;
}

export interface RequestQuery {
  token?: string;
  id?: string;
  [key: string]: any;
}

export interface RequestSessionUser {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
  token?: string;
  expires: string;
}

export interface RequestSession {
  submittedData: SubmittedData;
  quote?: Quote;
  cookieConsentNewDecision?: boolean;
  accountIdToConfirm?: string;
  accountId?: string;
  user?: RequestSessionUser;
  emailAddressForPasswordReset?: string;
  passwordResetSuccess?: boolean;
  emailAddressForAccountReactivation?: string;
  returnToServiceUrl?: string;
}

export interface Request {
  body: RequestBody;
  cookies: RequestCookies;
  csrfToken: () => string;
  flash: (str1: string, str2?: string) => string;
  headers: RequestHeaders;
  hostname: string;
  method: string;
  originalUrl: string;
  baseUrl: string;
  redirect: (str: string) => any;
  params: RequestParams;
  query: RequestQuery;
  session: RequestSession;
}

export interface Response {
  redirect: (str: string) => any;
  render: (str: string, object: any) => any; // eslint-disable-line @typescript-eslint/no-explicit-any
  locals: ResponseLocals;
  setHeader: (str1: string, str2?: string) => any; // eslint-disable-line @typescript-eslint/no-explicit-any
  removeHeader: (str1: string) => any; // eslint-disable-line @typescript-eslint/no-explicit-any
  status: (status: number) => any;
  type: (type: string) => any;
  write: (str: string) => any;
  send: () => any;
}

export interface ResponseInsurance extends Response {
  locals: ResponseLocalsInsurance;
}

declare module 'express-session' {
  interface SessionData {
    submittedData: SubmittedData;
  }
}
