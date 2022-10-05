/* eslint-disable no-unused-vars */
export {};
import { SubmittedData } from '../submitted-data';
import { Quote } from '../quote';

interface RequestSession {
  submittedData: SubmittedData;
  quote?: Quote;
  cookieConsentNewDecision?: boolean;
}

interface RequestBody {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

interface RequestCookies {
  optionalCookies?: string;
}

interface RequestHeaders {
  referer: string;
}

interface ResponseLocals {
  csrfToken: string;
  cookieConsent?: boolean;
  cookieConsentDecision?: boolean;
  cookieConsentNewDecision?: boolean;
  googleAnalyticsId?: string;
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

export { Request, RequestBody, RequestSession, Response };
