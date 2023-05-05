const typeDefs = `
  type AccountResponse {
    id: String
    firstName: String
    lastName: String
    email: String
    isVerified: Boolean
  }

  input AccountInput {
    firstName: String
    lastName: String
    email: String
    password: String
  }

  type CreateAnAccountResponse {
    success: Boolean
    id: String
    firstName: String
    lastName: String
    email: String
    verificationHash: String
  }

  # fields from registered_office_address object
  type CompaniesHouseCompanyAddress {
    addressLine1: String
    addressLine2: String
    careOf: String
    locality: String
    region: String
    postalCode: String
    country: String
    premises: String
  }

  type CompaniesHouseResponse {
    companyName: String
    registeredOfficeAddress: ExporterCompanyAddress
    companyNumber: String
    dateOfCreation: String
    sicCodes: [String]
    industrySectorNames: [String]
    financialYearEndDate: DateTime
    success: Boolean
    apiError: Boolean
  }

  type ExporterCompanyAddress {
    addressLine1: String
    addressLine2: String
    careOf: String
    locality: String
    region: String
    postalCode: String
    country: String
    premises: String
  }

  input OldSicCodes {
    id: String
  }

  input ExporterCompanyAddressInput {
    addressLine1: String
    addressLine2: String
    careOf: String
    locality: String
    region: String
    postalCode: String
    country: String
    premises: String
  }

  type ExporterCompanyAndCompanyAddress {
    id: ID
    registeredOfficeAddress: ExporterCompanyAddress
    companyName: String
    companyNumber: String
    dateOfCreation: DateTime
    hasTradingAddress: String
    hasTradingName: String
    companyWebsite: String
    phoneNumber: String
  }

  input ExporterCompanyAndCompanyAddressInput {
    address: ExporterCompanyAddressInput
    sicCodes: [String]
    industrySectorNames: [String]
    companyName: String
    companyNumber: String
    dateOfCreation: DateTime
    hasTradingAddress: String
    hasTradingName: String
    companyWebsite: String
    phoneNumber: String
    financialYearEndDate: DateTime
    oldSicCodes: [OldSicCodes]
  }

  type EmailResponse {
    success: Boolean
    emailRecipient: String
  }

  type SuccessResponse {
    success: Boolean!
  }

  type AccountSignInResponse {
    accountId: String
    firstName: String
    lastName: String
    token: String
    sessionIdentifier: String
    expires: DateTime
    success: Boolean!
  }

  type AddAndGetOtpResponse {
    success: Boolean!
    securityCode: String!
  }

  type AccountPasswordResetTokenResponse {
    success: Boolean!
    token: String
    expired: Boolean
  }

  type VerifyAccountEmailAddressResponse {
    success: Boolean!
    accountId: String
  }

  type Mutation {
    """ create an account """
    createAnAccount(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): CreateAnAccountResponse

    """ verify an account's email address """
    verifyAccountEmailAddress(
      token: String!
    ): VerifyAccountEmailAddressResponse

    """ send confirm email address email """
    sendEmailConfirmEmailAddress(
      accountId: String!
    ): EmailResponse

    """ validate credentials, generate and email a OTP security code """
    accountSignIn(
      email: String!
      password: String!
    ): AccountSignInResponse

    """ generate and email a new OTP security code """
    accountSignInSendNewCode(
      accountId: String!
    ): AccountSignInResponse

    """ verify an account's OTP security code """
    verifyAccountSignInCode(
      accountId: String!
      securityCode: String!
    ): AccountSignInResponse

    """ add an OTP security code to an account and return"""
    addAndGetOTP(
      email: String!
    ): AddAndGetOtpResponse

    """ send email with password reset link """
    sendEmailPasswordResetLink(
      email: String!
    ): SuccessResponse

    """ reset account password """
    accountPasswordReset(
      token: String!
      password: String!
    ): SuccessResponse

    """ update exporter company and company address """
    updateExporterCompanyAndCompanyAddress(
      companyId: ID!
      companyAddressId: ID!
      data: ExporterCompanyAndCompanyAddressInput!
    ): ExporterCompanyAndCompanyAddress

    """ delete an application by reference number """
    deleteApplicationByReferenceNumber(
      referenceNumber: Int!
    ): SuccessResponse

    """ submit an application """
    submitApplication(
      applicationId: String!
    ): SuccessResponse

    """ send email for insurance feedback """
    sendEmailInsuranceFeedback(
      satisfaction: String
      improvement: String
      otherComments: String
    ): SuccessResponse
  }

  type Query {
    """ get an account by email """
    getAccountByEmail(
      email: String!
    ): AccountResponse

    """ get an account's password reset token """
    getAccountPasswordResetToken(
      email: String!
    ): AccountPasswordResetTokenResponse

    """ verify an account's password reset token """
    verifyAccountPasswordResetToken(
      token: String!
    ): AccountPasswordResetTokenResponse

    """ get companies house information """
    getCompaniesHouseInformation(
      companiesHouseNumber: String!
    ): CompaniesHouseResponse
  }
`;

export default typeDefs;
