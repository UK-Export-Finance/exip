/* eslint-disable no-unused-vars */
export {};
import { SubmittedData } from '../submitted-data';
import { Quote } from '../quote';

interface RequestSession {
  submittedData: SubmittedData;
  quote?: Quote;
}

interface RequestBody {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

interface RequestHeaders {
  referer?: string;
}

interface ResponseLocals {
  csrfToken: string;
}

interface Request {
  body: RequestBody;
  csrfToken: () => string;
  flash: (str1: string, str2?: string) => string;
  headers: RequestHeaders;
  method: string;
  originalUrl: string;
  redirect: () => string;
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
