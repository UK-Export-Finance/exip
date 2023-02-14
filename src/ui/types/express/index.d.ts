/* eslint-disable no-unused-vars */
export {};
import { SubmittedData } from '../submitted-data';
import { Quote } from '../quote';
import { Application } from '../application';

interface Next {
  (err?: any): void;
}

interface RequestBody {
  _csrf?: string;
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

interface RequestCookies {
  optionalCookies?: string;
}

interface RequestHeaders {
  referer: string;
}

interface ResponseLocals {
  application?: Application;
  csrfToken: string;
  cookieConsent?: boolean;
  cookieConsentDecision?: boolean;
  cookieConsentNewDecision?: boolean;
  googleAnalyticsId?: string;
}

interface RequestParams {
  referenceNumber?: string;
}

interface RequestQuery {
  token?: string;
}

interface RequestSession {
  submittedData: SubmittedData;
  quote?: Quote;
  cookieConsentNewDecision?: boolean;
  emailAddressToConfirm?: string;
}

interface Request {
  body: RequestBody;
  cookies: RequestCookies;
  csrfToken: () => string;
  flash: (str1: string, str2?: string) => string;
  headers: RequestHeaders;
  method: string;
  originalUrl: string;
  redirect: (str: string) => any;
  params: RequestParams;
  query: RequestQuery;
  session: RequestSession;
}

interface Response {
  redirect: (str: string) => any;
  render: (str: string, object: any) => any; // eslint-disable-line @typescript-eslint/no-explicit-any
  locals: ResponseLocals;
  setHeader: (str1: string, str2?: string) => any; // eslint-disable-line @typescript-eslint/no-explicit-any
  removeHeader: (str1: string) => any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

declare module 'express-session' {
  interface SessionData {
    submittedData: SubmittedData;
  }
}

export { Next, Request, RequestBody, RequestSession, Response };
