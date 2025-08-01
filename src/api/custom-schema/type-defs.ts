/**
 * Custom GraphQL schema definition
 * This extends the GraphQL schema automatically generated by KeystoneJS.
 * This is required so that any resolvers in ./custom-resolvers.ts are added to the schema.
 * @returns GraphQLSchema - GraphQL schema definition
 */
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
    alreadyExists: Boolean
    isVerified: Boolean
    id: String
    email: String
    verificationHash: String
    isBlocked: Boolean
  }

  type CompaniesHouseResponse {
    companyName: String
    registeredOfficeAddress: CompanyAddress
    companyNumber: String
    dateOfCreation: String
    sicCodes: [String]
    industrySectorNames: [String]
    financialYearEndDate: DateTime
    success: Boolean
    apiError: Boolean
    isActive: Boolean
    notFound: Boolean
  }

  type CompanyAddress {
    addressLine1: String
    addressLine2: String
    postalCode: String
    country: String
    locality: String
    region: String
    postalCode: String
    careOf: String
    premises: String
  }

  type OrdnanceSurveyAddress {
    addressLine1: String
    addressLine2: String
    postcode: String
    country: String
    county: String
    town: String
  }

  input OldSicCodes {
    id: String
  }

  input CompanyAddressInput {
    addressLine1: String
    addressLine2: String
    careOf: String
    locality: String
    region: String
    postalCode: String
    country: String
    premises: String
  }

  input CompanyInput {
    companyName: String
    companyNumber: String
    dateOfCreation: String
    sicCodes: [String]
    industrySectorNames: [String]
    financialYearEndDate: DateTime
    registeredOfficeAddress: CompanyAddressInput
    isActive: Boolean
  }

  input SectionReviewInput {
    eligibility: Boolean!
  }

  input ApplicationWhereUniqueInput {
    id: ID
    referenceNumber: Int
  }

  input LossPayeeFinancialDetailsUkInput {
    id: String
    accountNumber: String
    sortCode: String
    bankAddress: String
  }

   type OrdnanceSurveyResponse {
    success: Boolean
    addresses: [OrdnanceSurveyAddress]
    apiError: Boolean
    noAddressesFound: Boolean
    invalidPostcode: Boolean
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
    email: String
    token: String
    sessionIdentifier: String
    expires: DateTime
    success: Boolean!
    resentVerificationEmail: Boolean
    isBlocked: Boolean
  }

  type AddAndGetOtpResponse {
    success: Boolean!
    securityCode: String!
  }

  type AccountPasswordResetResponse {
    success: Boolean!
    hasBeenUsedBefore: Boolean
  }

  type AccountSendEmailPasswordResetLinkResponse {
    success: Boolean!
    isBlocked: Boolean
    accountId: String
  }

  type AccountPasswordResetTokenResponse {
    success: Boolean!
    token: String
    expired: Boolean
    invalid: Boolean
    accountId: String
  }

  type VerifyAccountEmailAddressResponse {
    success: Boolean!
    expired: Boolean
    invalid: Boolean
    accountId: String
  }

  type VerifyAccountReactivationTokenResponse {
    success: Boolean!
    expired: Boolean
    invalid: Boolean
    accountId: String
  }

  type AccountSendEmailReactivateAccountLinkResponse {
    success: Boolean!
    accountId: String!
    email: String
  }

  input ApplicationEligibility {
    buyerCountryIsoCode: String!
    coverPeriodId: Int!
    hasCompaniesHouseNumber: Boolean!
    hasEndBuyer: Boolean!
    hasMinimumUkGoodsOrServices: Boolean!
    isMemberOfAGroup: Boolean!
    isPartyToConsortium: Boolean!
    totalContractValueId: Int!
    validExporterLocation: Boolean!
  }

  type CreateAnApplicationResponse {
    success: Boolean!
    id: String
    referenceNumber: Int
  }

  type ApplicationResponse {
    id: String
    referenceNumber: Int
  }

  type CreateManyApplicationsResponse {
    success: Boolean!
    applications: [ApplicationResponse]
  }

  type CreateAnAbandonedApplicationResponse {
    success: Boolean!
    id: String
    referenceNumber: Int
  }

  type Country {
    isoCode: String!
    name: String!
  }

  type MappedCisCountry {
    isoCode: String!
    name: String
    shortTermCover: Boolean
    esraClassification: String
    canGetAQuoteOnline: Boolean
    cannotGetAQuote: Boolean
    canApplyForInsuranceOnline: Boolean
    noOnlineSupport: Boolean
    noInsuranceSupport: Boolean
    isHighRisk: Boolean
  }

  type MappedCurrency {
    isoCode: String!
    name: String!
  }

  type GetApimCurrencyResponse {
    supportedCurrencies: [MappedCurrency]
    alternativeCurrencies: [MappedCurrency]
    allCurrencies: [MappedCurrency]
  }

  type GetCountriesAndCurrenciesResponse {
    countries: [Country]
    supportedCurrencies: [MappedCurrency]
    alternativeCurrencies: [MappedCurrency]
    allCurrencies: [MappedCurrency]
  }

  type Owner {
    id: String
    firstName: String
    lastName: String
    email: String
  }

  type ApplicationNominatedLossPayeeUk {
    id: String
    accountNumber: String
    sortCode: String
    bankAddress: String
  }

  type ApplicationNominatedLossPayeeInternational {
    id: String
    iban: String
    bicSwiftCode: String
    bankAddress: String
  }

  type ApplicationNominatedLossPayee {
    id: String
    isAppointed: Boolean
    isLocatedInUk: Boolean
    isLocatedInternationally: Boolean
    name: String
    financialUk: ApplicationNominatedLossPayeeUk
    financialInternational: ApplicationNominatedLossPayeeInternational
  }

  type PopulatedApplication {
    id: String!
    version: Int
    createdAt: DateTime!
    updatedAt: DateTime!
    dealType: String!
    submissionCount: Int
    submissionDeadline: DateTime
    submissionType: String
    submissionDate: DateTime
    referenceNumber: Int
    status: String!
    totalContractValueOverThreshold: Boolean
    eligibility: Eligibility
    exportContract: ExportContract
    policy: Policy
    nominatedLossPayee: ApplicationNominatedLossPayee
    policyContact: PolicyContact
    owner: Owner
    company: Company
    business: Business
    broker: Broker
    buyer: Buyer
    sectionReview: SectionReview
    declaration: Declaration
  }

  type ApplicationSuccessResponse {
    success: Boolean!
    application: PopulatedApplication
  }

  type Mutation {
    """ create an account """
    createAnAccount(
      urlOrigin: String!
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): CreateAnAccountResponse

    """ create an application """
    createAnApplication(
      accountId: String!
      eligibilityAnswers: ApplicationEligibility!
      company: CompanyInput!
      sectionReview: SectionReviewInput!
    ): CreateAnApplicationResponse

     """ create many applications """
    createManyApplications(
      accountId: String!
      count: Int!
    ): CreateManyApplicationsResponse

    """ create an application """
    createAnAbandonedApplication(
      accountId: String!
      eligibilityAnswers: ApplicationEligibility!
      company: CompanyInput!
      sectionReview: SectionReviewInput!
    ): CreateAnAbandonedApplicationResponse

    """ delete an account """
    deleteAnAccount(
      email: String!
    ): SuccessResponse

    """ verify an account's email address """
    verifyAccountEmailAddress(
      token: String!
      id: String!
    ): VerifyAccountEmailAddressResponse

    """ verify an account's reactivation token """
    verifyAccountReactivationToken(
      token: String!
    ): VerifyAccountReactivationTokenResponse

    """ send confirm email address email """
    sendEmailConfirmEmailAddress(
      urlOrigin: String!
      accountId: String!
    ): EmailResponse

    """ validate credentials, generate and email a OTP security code """
    accountSignIn(
      urlOrigin: String!
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
      urlOrigin: String!
      email: String!
    ): AccountSendEmailPasswordResetLinkResponse

    """ send email with reactivate account link """
    sendEmailReactivateAccountLink(
      urlOrigin: String!
      accountId: String!
    ): AccountSendEmailReactivateAccountLinkResponse

    """ reset account password """
    accountPasswordReset(
      token: String!
      password: String!
      hasBeenUsedBefore: Boolean
    ): AccountPasswordResetResponse

    """ delete an application by reference number """
    deleteApplicationByReferenceNumber(
      referenceNumber: Int!
    ): SuccessResponse

    """ submit an application """
    submitApplication(
      applicationId: String!
    ): SuccessResponse

    """ create and send email for insurance feedback """
    createFeedbackAndSendEmail(
      satisfaction: String
      improvement: String
      otherComments: String
      referralUrl: String
      product: String
      service: String
    ): SuccessResponse

    """ update loss payee financial uk """
    updateLossPayeeFinancialDetailsUk(
      id: String
      bankAddress: String
      accountNumber: String
      sortCode: String
    ): SuccessResponse

    """ update loss payee financial international """
    updateLossPayeeFinancialDetailsInternational(
      id: String
      bankAddress: String
      iban: String
      bicSwiftCode: String
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

    """ gets application by reference number """
    getApplicationByReferenceNumber(
      referenceNumber: Int
      decryptFinancialUk: Boolean
      decryptFinancialInternational: Boolean
    ): ApplicationSuccessResponse

    """ get Ordnance Survey addresses """
    getOrdnanceSurveyAddresses(
      postcode: String!
      houseNameOrNumber: String!
    ): OrdnanceSurveyResponse

    """ get CIS countries from APIM """
    getApimCisCountries: [MappedCisCountry]

    """ get currencies from APIM """
    getApimCurrencies: GetApimCurrencyResponse

    """ get countries and currencies """
    getCountriesAndCurrencies: GetCountriesAndCurrenciesResponse
  }
`;

export default typeDefs;
