context(
  'Insurance - submit an application - Single policy type, fully populated - As an Exporter, I want to submit my completed credit insurance application, So that UKEF can process and make a decision on my application',
  () => {
    let referenceNumber;

    before(() => {
      cy.completeSignInAndSubmitAnApplication({
        alternativeCurrencyBuyer: true,
        differentTradingName: true,
        differentTradingAddress: true,
        exporterHasTradedWithBuyer: true,
        hasAntiBriberyCodeOfConduct: true,
        exportingWithCodeOfConduct: true,
        policyValueOverMvpMaximum: true,
        usingBroker: true,
        brokerIsBasedInUk: true,
        otherCompanyInvolved: true,
        differentPolicyContact: true,
        needPreCreditPeriod: true,
        isAppointingLossPayee: true,
        lossPayeeIsLocatedInUK: true,
        totalContractValueOverThreshold: true,
        attemptedPrivateMarketCover: true,
        contractAwardedOtherMethod: true,
        isUsingAgent: true,
        agentIsCharging: true,
        agentChargeMethodFixedSum: true,
        hasConnectionToBuyer: true,
        buyerOutstandingPayments: true,
        buyerFailedToPayOnTime: true,
        finalDestinationKnown: true,
        fullyPopulatedBuyerTradingHistory: true,
        hasHadCreditInsuranceCoverWithBuyer: true,
        exporterHasBuyerFinancialAccounts: true,
      }).then((refNumber) => {
        referenceNumber = refNumber;
      });
    });

    beforeEach(() => {
      cy.saveSession();
    });

    after(() => {
      cy.deleteApplication(referenceNumber);
    });

    it('should successfully submit the application and redirect to `application submitted`', () => {
      cy.assertApplicationSubmittedUrl(referenceNumber);
    });

    it('should render the application in a `submitted` state in the dashboard', () => {
      cy.assertDashboardApplicationSubmitted(referenceNumber);
    });
  },
);
