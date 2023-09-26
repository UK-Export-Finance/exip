import { AccountUpdateInput } from '.keystone/types'; // eslint-disable-line
import { SuccessResponse } from '../generic';

export interface AccountCreationVariables {
  urlOrigin: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface AccountDeletionVariables {
  email: string;
}

export interface AccountInput {
  createdAt: Date;
  updatedAt: Date;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isVerified?: boolean;
  verificationHash: string;
  verificationExpiry: Date;
}

export interface AddOtpToAccountVariables {
  email: string;
}

export interface AddAndGetOtpResponse extends SuccessResponse {
  securityCode?: string;
}

export interface AccountPasswordResetResponse extends SuccessResponse {
  hasBeenUsedBefore?: boolean;
}

export interface AccountPasswordResetTokenResponse extends SuccessResponse {
  token?: string;
  expired?: boolean;
  invalid?: boolean;
  accountId?: string;
}

export interface AccountPasswordResetVariables {
  token: string;
  password: string;
}

export interface AccountSendEmailReactivateLinkVariables {
  urlOrigin: string;
  accountId: string;
}

export interface AccountSendEmailPasswordResetLinkResponse extends SuccessResponse {
  accountId?: string;
  isBlocked?: boolean;
}

export interface AccountSendEmailPasswordResetLinkVariables {
  urlOrigin: string;
  email: string;
}

export interface AccountSendEmailReactivateLinkResponse extends SuccessResponse {
  accountId?: string;
  email?: string;
}

export interface AccountSignInResponse extends SuccessResponse {
  accountId?: string;
  resentVerificationEmail?: boolean;
  isBlocked?: boolean;
}

export interface AccountSignInSendNewCodeVariables {
  accountId: string;
}

export interface AccountSignInVariables {
  urlOrigin: string;
  email: string;
  password: string;
}

export interface Account extends AccountUpdateInput {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  salt: string;
  hash: string;
  verificationHash: string;
  optSalt?: string;
  optHash?: string;
  otpExpiry?: Date;
  sessionIdentifier?: string;
  passwordResetHash?: string;
  passwordResetExpiry?: Date;
  isVerified: boolean;
  reactivationHash?: string;
  reactivationExpiry?: Date;
}

export interface GetAccountPasswordResetTokenVariables {
  email: string;
}

export interface VerifyAccountPasswordResetTokenVariables {
  token: string;
}

export interface VerifyAccountReactivationTokenVariables {
  token: string;
}

export interface VerifyAccountReactivationTokenResponse extends SuccessResponse {
  expired?: boolean;
  invalid?: boolean;
  accountId?: string;
}

export interface VerifyAccountSessionVariables {
  token: string;
}

export interface VerifyAccountSignInCodeVariables {
  accountId: string;
  securityCode: string;
}

export interface VerifyAccountSignInCodeResponse extends SuccessResponse {
  expired?: boolean;
  accountId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  token?: string;
  expires?: string;
  sessionIdentifier?: string;
}

export interface VerifyEmailAddressResponse extends SuccessResponse {
  accountId?: string;
  expired?: boolean;
  invalid?: boolean;
  emailRecipient?: string;
}

export interface VerifyEmailAddressVariables {
  token: string;
}

export default {};
